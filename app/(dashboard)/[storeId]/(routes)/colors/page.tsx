import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorColumn, columns } from "./components/columns"
import { EntityClient as ColorsClient } from "@/components/client";

const ColorsPage = async ({ 
  params
}: {
  params: { storeId: string }
}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient<ColorColumn>
          title="Colors"
          data={formattedColors} 
          description="Manage colors for your products"
          searchKey="name"
          columns={columns}
          entity="Color"
          entities="colors"
          entityId="colorId"
        />
      </div>
    </div>
  );
};

export default ColorsPage;