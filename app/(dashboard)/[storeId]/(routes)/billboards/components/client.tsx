"use client"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { BillboardColumn, columns } from "./columns"

import { Plus } from "lucide-react"

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

interface BillboardClientProps {
    data: BillboardColumn[];
  }
  
  export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
  }) => {
    const params = useParams();
    const router = useRouter();
  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading 
                title={`Billboards (${data.length})`}
                description="Manage billboards for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className="mr-2 h-4 w-4"/> Add New
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={data} />
        <Heading title="API" description="API calls for Billboards"/>
        <Separator />
        <ApiList entityIdName="billboardId" entityName="billboards"/>
    </>
  )
}
