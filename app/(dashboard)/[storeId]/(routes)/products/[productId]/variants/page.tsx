import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { VariantClient } from "./components/client";
import { ProductVariantColumn, columns } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductVariantsPage = async ({
  params
}: {
  params: { 
    storeId: string, 
    productId: string 
}
}) => {
  const productVariants = await prismadb.productVariant.findMany({
    where: {
        storeId: params.storeId,
        productId: params.productId
    },
    include: {
      product: true,
      size: true,
      color: true,
      storage: true,
      condition: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    }
  });

  const formattedProductVariants: ProductVariantColumn[] = productVariants.map((item) => ({
    id: item.id,
    price: formatter.format(item.price.toNumber()),
    size: item.size?.value,
    color: item.color?.value,
    storage: item.storage?.value,
    condition: item.condition?.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <VariantClient<ProductVariantColumn> 
          title={`Variants for ${product?.name}`} 
          description="Manage variants for your product"
          data={formattedProductVariants} 
          searchKey="price"
          columns={columns}
          entity="ProductVariant"
          entities="product-variants"
          entityId="variantId"
          />
      </div>
    </div>
  );
};

export default ProductVariantsPage;