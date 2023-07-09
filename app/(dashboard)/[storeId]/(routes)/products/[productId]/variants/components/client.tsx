"use client"
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

interface VariantClientProps<T> {
  description: string;
  data: T[];
  searchKey: string;
  columns: any[];
  entity: string;
  entities: string;
  entityId: string;
  title?: string;
}

export const VariantClient = <T,>({
  title,
  description,
  data,
  searchKey,
  columns,
  entity,
  entities,
  entityId,
}: VariantClientProps<T>) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title ? title : `${entity} (${data.length})`} description={description} />
        <Button onClick={() => router.push(`/${params.storeId}/products/${params.productId}/variants/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={searchKey} columns={columns} data={data} />
      <Heading title="API" description={`API Calls for ${entities}`} />
      <Separator />
      <ApiList entities={entities} entityId={entityId} />
    </>
  );
};