"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/collections/${row.original._id}`}>
        <p className="hover:text-red-500 transition-colors duration-200">{row.original.title}</p>
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => (
      <p>{row.original.products.length}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} />,
  }
]
