"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/components/cell-action"

export type ProductColumn = {
  id: string
  name: string;
  description: string;
  price: string;
  category: string;
  size: string;
  color: string;
  brand: string;
  storage: string;
  condition: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
      </div>
    )
  },
  {
    accessorKey: "storage",
    header: "Storage",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction<ProductColumn> data={row.original} entity="Product" entities="products"/>
  },
];