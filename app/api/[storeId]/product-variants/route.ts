import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { Prisma } from '@prisma/client';

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
      isArchived, isFeatured
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
        isArchived,
        isFeatured,
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
    const { searchParams } = new URL(req.url);
    const colorId = searchParams.get('colorId') || undefined;
    const storageId = searchParams.get('storageId') || undefined;
    const conditionId = searchParams.get('conditionId') || undefined;
    const productId = searchParams.get('productId') || undefined;
    const isFeatured = searchParams.get('isFeatured');
    const sorting = searchParams.get('sorting') || undefined;
    const searchQuery = searchParams.get('q');

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const orderBy: Prisma.ProductVariantOrderByWithRelationInput[] = [];

    if (sorting === 'lowest') {
      orderBy.push({ price: 'asc' });
    } else if (sorting === 'highest') {
      orderBy.push({ price: 'desc' });
    }

    orderBy.push({ createdAt: 'desc' });

    const productVariants = await prismadb.productVariant.findMany({
      where: {
        storeId: params.storeId,
        productId,
        colorId,
        storageId,
        conditionId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        OR: [
          { product: { name: { contains: searchQuery || '' } } },
        ],
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
        images: true,
        color: true,
        size: true,
        storage: true,
        condition: true,
      },
      orderBy,
    });

    return NextResponse.json(productVariants);
  } catch (error) {
    console.log('[PRODUCTVARIANTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};