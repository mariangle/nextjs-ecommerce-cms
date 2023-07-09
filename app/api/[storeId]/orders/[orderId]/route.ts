import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function DELETE(
    req: Request,
    { params }: { params: { orderId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.orderId) {
        return new NextResponse("Order id is required", { status: 400 });
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
  
      const order = await prismadb.order.delete({
        where: {
          id: params.orderId,
        }
      });
    
      return NextResponse.json(order);
    } catch (error) {
      console.log('[ORDER_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  