import prismadb from "@/lib/prismadb";

import { ProductVariantForm } from "./components/variant-form";

const ProductPage = async ({
  params
}: {
  params: { 
    storeId: string,  
    productId: string,
    variantId: string, 
  }
}) => {
  const productVariant = await prismadb.productVariant.findUnique({
    where: {
      id: params.variantId,
    },
    include: {
      images: true,
    }
  });

  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
  });
  
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const storages = await prismadb.storage.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const conditions = await prismadb.condition.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <ProductVariantForm 
          product={product}
          colors={colors}
          sizes={sizes}
          storages={storages}
          conditions={conditions}
          initialData={productVariant}
        />
      </div>
    </div>
  );
}

export default ProductPage;