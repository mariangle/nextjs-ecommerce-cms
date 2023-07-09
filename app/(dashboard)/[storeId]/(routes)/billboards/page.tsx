import prismadb from "@/lib/prismadb"
import { format } from "date-fns"

import { EntityClient as BillboardsClient } from "@/components/client";
import { BillboardColumn, columns } from "./components/columns";

const BillboardsPage = async ({
  params
} : {
  params: { storeId: string}
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient<BillboardColumn>
          title="Billboards"
          description="Manage billboards for your store"
          data={formattedBillboards}
          searchKey="label"
          columns={columns}
          entity="Billboard"
          entities="billboards"
          entityId="billboardId"
        />
      </div>
    </div>
  );
};

export default BillboardsPage;