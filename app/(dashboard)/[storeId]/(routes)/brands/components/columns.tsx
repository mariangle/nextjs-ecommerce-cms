"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/components/cell-action"

export type BrandColumn = {
  id: string
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction<BrandColumn> data={row.original} entity="Brand" entities="brands"/>
  },
];