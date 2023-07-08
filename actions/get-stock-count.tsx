import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.productVariant.count({
    where: {
      storeId,
    }
  });

  return stockCount;
};