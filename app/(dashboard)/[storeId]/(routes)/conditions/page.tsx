import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ConditionColumn, columns } from "./components/columns"
import { EntityClient } from "@/components/client";

const ConditionsPage = async ({ 
  params
}: {
  params: { storeId: string }
}) => {
  const conditions = await prismadb.condition.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedConditions: ConditionColumn[] = conditions.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EntityClient<ConditionColumn> 
          title="Conditions"
          description="Manage conditions for your store"
          data={formattedConditions} 
          searchKey="name"
          columns={columns}
          entityName="conditions"
          entityIdName="conditionId"
          />
      </div>
    </div>
  );
};

export default ConditionsPage;