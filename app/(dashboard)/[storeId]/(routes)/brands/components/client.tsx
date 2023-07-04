"use client"
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, BrandColumn } from "./columns";

interface BrandClientProps {
  data: BrandColumn[];
}

export const BrandClient: React.FC<BrandClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Brands (${data.length})`} description="Manage brands for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/brands/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Brands" />
      <Separator />
      <ApiList entityName="brands" entityIdName="brandId" />
    </>
  );
};