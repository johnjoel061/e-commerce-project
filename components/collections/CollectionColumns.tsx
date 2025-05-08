"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

export const columns: ColumnDef<CollectionType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <p>{row.original.title}</p>
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({ row }) => <p>{row.original.products.length}</p>
    },
    {
        id: "actions",
        cell: ({ row }) => <Button type="button" className="bg-red-600 text-white hover:bg-red-600 hover:opacity-100"
        ><Trash className="h-4 w-4" /></Button>,
    },
]