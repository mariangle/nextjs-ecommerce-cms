import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { variantId: string } }
) {
  try {
    if (!params.variantId) {
      return new NextResponse("Product variant id is required", { status: 400 });
    }

    const productVariant = await prismadb.productVariant.findUnique({
      where: {
        id: params.variantId
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true
          }
        },
        images: true,
        size: true,
        color: true,
        storage: true,
        condition: true,
      }
    });
  
    return NextResponse.json(productVariant);
  } catch (error) {
    console.log('[PRODUCTVARIANT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { variantId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.variantId) {
      return new NextResponse("Product variant id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const productVariant = await prismadb.productVariant.delete({
      where: {
        id: params.variantId
      },
    });
  
    return NextResponse.json(productVariant);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { variantId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { 
      productId,
      price,
      images,
      colorId,
      sizeId,
      storageId,
      conditionId
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.variantId) {
      return new NextResponse("Product variant id is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if (!price) {
        return new NextResponse("Price is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.productVariant.update({
      where: {
        id: params.variantId
      },
      data: {
        price,
        colorId,
        sizeId,
        storageId,
        conditionId,
        images: {
          deleteMany: {},
        },
      },
    });

    const productVariant = await prismadb.productVariant.update({
      where: {
        id: params.variantId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })
  
    return NextResponse.json(productVariant);
  } catch (error) {
    console.log('[PRODUCTVARIANT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};