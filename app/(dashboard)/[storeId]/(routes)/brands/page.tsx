import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BrandColumn, columns } from "./components/columns"
import { EntityClient as BrandsClient } from "@/components/client";

const BrandsPage = async ({ 
  params
}: {
  params: { storeId: string }
}) => {
  const brands = await prismadb.brand.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandsClient<BrandColumn> 
          title="Brands"
          description="Manage brands for your products"
          data={formattedBrands} 
          searchKey="name"
          columns={columns}
          entity="Brand"
          entities="brands"
          entityId="brandId"
          />
      </div>
    </div>
  );
};

export default BrandsPage;