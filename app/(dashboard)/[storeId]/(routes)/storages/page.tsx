import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { StorageColumn, columns } from "./components/columns"
import { EntityClient as StoragesClient } from "@/components/client";

const StoragePage = async ({ 
  params
}: {
  params: { storeId: string }
}) => {
  const storages = await prismadb.storage.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedStorages: StorageColumn[] = storages.map((item) => ({
    id: item.id,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6">
        <StoragesClient<StorageColumn> 
          title="Storages"
          description="Manage storages for your store"
          data={formattedStorages} 
          searchKey="value"
          columns={columns}
          entity="Storage"
          entities="storages"
          entityId="storageId"
          />
      </div>
    </div>
  );
};

export default StoragePage;