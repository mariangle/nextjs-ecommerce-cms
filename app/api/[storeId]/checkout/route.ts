import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { variantIds } = await req.json();

  if (!variantIds || variantIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  const variants = await prismadb.productVariant.findMany({
    where: {
      id: {
        in: variantIds
      }
    },
    include: {
        product: true
    }
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  variants.forEach((variant) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: variant.product.name,
        },
        unit_amount: variant.price.toNumber() * 100
      }
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: variantIds.map((variantId: string) => ({
          variant: {
            connect: {
              id: variantId
            }
          }
        }))
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });

  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};