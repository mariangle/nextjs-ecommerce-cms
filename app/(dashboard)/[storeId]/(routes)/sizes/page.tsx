import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SizeColumn, columns } from "./components/columns"
import { EntityClient } from "@/components/client";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EntityClient<SizeColumn> 
          description="Manage sizes for your store"
          data={formattedSizes} 
          searchKey="name"
          columns={columns}
          entity="Size"
          entities="sizes"
          entityId="sizeId"
          />
      </div>
    </div>
  );
};

export default SizesPage;