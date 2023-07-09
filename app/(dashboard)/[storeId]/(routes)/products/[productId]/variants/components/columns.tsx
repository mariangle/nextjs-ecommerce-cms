"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductVariantColumn = {
  id: string;
  price: string;
  size?: string;
  color?: string;
  storage?: string;
  condition?: string;
  createdAt: string;
}

export const columns: ColumnDef<ProductVariantColumn>[] = [
  {
    accessorKey: "price",
    header: "Price",
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
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction<ProductVariantColumn> data={row.original} entity="Variant" entities="product-variants"/>
  },
];