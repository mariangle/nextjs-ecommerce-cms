import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { EntityClient as ProductsClient } from "@/components/client";
import { ProductColumn, columns } from "./components/columns";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      brand: true,
      variants: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand?.name,
    category: item.category.name,
    description: item.description,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    stock: item.variants.length,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient<ProductColumn> 
          title="Products"
          description="Manage products for your store"
          data={formattedProducts} 
          searchKey="name"
          columns={columns}
          entity="Product"
          entities="products"
          entityId="productId"
          />
      </div>
    </div>
  );
};

export default ProductsPage;