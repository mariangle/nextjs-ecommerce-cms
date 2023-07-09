import prismadb from "@/lib/prismadb";

export const getOrdersCount = async (storeId: string) => {
  const ordersCount = await prismadb.order.count({
    where: {
      storeId,
    },
  });

  return ordersCount;
};