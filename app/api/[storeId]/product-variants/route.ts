import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { 
      productId, images, price, sizeId, colorId, storageId, conditionId,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
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

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const productVariant = await prismadb.productVariant.create({
      data: {
        productId,
        price,
        colorId,
        sizeId,
        storageId,
        conditionId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
  
    return NextResponse.json(productVariant);
  } catch (error) {
    console.log('[PRODUCTVARIANTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const brandId = searchParams.get('brandId') || undefined;
    const storageId = searchParams.get('storageId') || undefined;
    const conditionId = searchParams.get('conditionId') || undefined;

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const productVariants = await prismadb.productVariant.findMany({
      where: {
        storeId: params.storeId,
        colorId,
        sizeId,
        brandId,
        storageId,
        conditionId,
      },
      include: {
        images: true,
        color: true,
        size: true,
        storage: true,
        condition: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(productVariants);
  } catch (error) {
    console.log('[PRODUCTVARIANTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};