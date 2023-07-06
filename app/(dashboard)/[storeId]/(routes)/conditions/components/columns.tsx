"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/components/cell-action"

export type ConditionColumn = {
  id: string
  name: string;
  description: string;
  createdAt: string;
}

export const columns: ColumnDef<ConditionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction<ConditionColumn> data={row.original} entity="Condition" entities="conditions"/>
  },
];