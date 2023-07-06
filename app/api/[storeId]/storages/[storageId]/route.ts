import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { storageId: string } }
) {
  try {
    if (!params.storageId) {
      return new NextResponse("Storage id is required", { status: 400 });
    }

    const storage = await prismadb.storage.findUnique({
      where: {
        id: params.storageId
      },
    });
  
    return NextResponse.json(storage);
  } catch (error) {
    console.log('[STORAGE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { storageId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storageId) {
      return new NextResponse("Storage id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const storage = await prismadb.storage.delete({
      where: {
        id: params.storageId,
      }
    });
  
    return NextResponse.json(storage);
  } catch (error) {
    console.log('[STORAGE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { storageId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { value } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }


    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.storageId) {
      return new NextResponse("Storage id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const storage = await prismadb.storage.update({
      where: {
        id: params.storageId,
      },
      data: {
        value,
      }
    });
  
    return NextResponse.json(storage);
  } catch (error) {
    console.log('[STORAGE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};