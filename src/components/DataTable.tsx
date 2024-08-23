/** @format */

"use client";

import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   useReactTable,
} from "@tanstack/react-table";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   title?: string;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   title,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data: data || [],
      columns: columns || [],
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
   });

   const rows = table.getRowModel()?.rows || [];

   return (
      <div className="overflow-hidden border-[0.6px] rounded-md shadow-lg">
         {title && (
            <h2 className="text-lg font-semibold p-4 bg-white border-b-[0.6px] text-gray-700">
               {title}
            </h2>
         )}
         <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-white">
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup?.headers.map((header) => (
                        <TableHead
                           key={header.id}
                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                           {header.isPlaceholder
                              ? null
                              : flexRender(
                                   header.column.columnDef.header,
                                   header.getContext()
                                )}
                        </TableHead>
                     ))}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
               {rows.length ? (
                  rows.map((row, index) => (
                     <TableRow
                        key={row.id}
                        className={
                           index % 2 === 0 ? "bg-[#3BD64A24]" : "bg-white"
                        }
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell
                              key={cell.id}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                           >
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={columns.length}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                     >
                        No results found.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
         <div className="table-actions">
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
               className="shad-gray-btn"
            >
               <Image
                  src="/assets/icons/arrow.svg"
                  width={24}
                  height={24}
                  alt="arrow"
               />
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
               className="shad-gray-btn"
            >
               <Image
                  src="/assets/icons/arrow.svg"
                  width={24}
                  height={24}
                  alt="arrow"
                  className="rotate-180"
               />
            </Button>
         </div>
      </div>
   );
}
