"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/cell-action"

export type StorageColumn = {
  id: string
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<StorageColumn>[] = [
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction<StorageColumn> data={row.original} entity="Storage" entities="storages"/>
  },
];