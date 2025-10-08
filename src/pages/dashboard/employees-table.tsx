import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Sort from "@/components/svg/Sort";
import SortUp from "@/components/svg/SortUp";
import SortDown from "@/components/svg/SortDown";



type Employee = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  jobTitle: string
  lineManager: string
  department: string
  office: string
};


const employees: Employee[] = [
  {
    id: 1,
    name: "Pristia Candra",
    email: "jordyn@unpixel.com",
    avatar: "/avatars/jordyn.jpg",
    jobTitle: "UI UX Designer",
    lineManager: "@PristriaCandra",
    department: "Team Product",
    office: "Unpixel"

  },
  {
    id: 2,
    name: "Hannah Baptista",
    email: "skylar@unpixel.com",
    avatar: "/avatars/skylar.jpg",
    jobTitle: "Graphic Designer",
    lineManager: "@PristriaCandra",
    department: "Team Product",
    office: "Unpixel"
  }
];

const EmployeesTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});



  // Define columns
  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      { accessorKey: "id",
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className=""
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto text-xs font-bold w-full"
            >
              Employee Name
 
              {column.getIsSorted() === "asc" ? (
                <SortUp className="inline-block ml-auto " />
              ) : column.getIsSorted() === "desc" ? (
                <SortDown className="inline-block ml-auto " />
              ) : (
                <Sort className="inline-block ml-auto" />
              )}

            </Button>
          );
        },
        cell: ({ row }) => {
          const employee = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={row.original.avatar} />
                <AvatarFallback>
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="">{employee.name}</p>
                <p className="text-[10px] text-[#A0AEC0]">{employee.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "jobTitle",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto text-xs font-bold w-full"
            >
              Job Title
              {column.getIsSorted() === "asc" ? (
                <SortUp  className="ml-auto " />
              ) : column.getIsSorted() === "desc" ? (
                <SortDown className="ml-auto " />
              ) : (
                <Sort className="ml-auto " />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: "lineManager",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto text-xs font-bold w-full"
            >
              Line Manager
              {column.getIsSorted() === "asc" ? (
                <SortUp className="ml-auto " />
              ) : column.getIsSorted() === "desc" ? (
                <SortDown className="ml-auto " />
              ) : (
                <Sort className="ml-auto " />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: "department",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto text-xs font-bold w-full"
            >
              Department
              {column.getIsSorted() === "asc" ? (
                <SortUp className="ml-auto " />
              ) : column.getIsSorted() === "desc" ? (
                <SortDown className="ml-auto " />
              ) : (
                <Sort className="ml-auto " />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: "office",
        // header: "Type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto text-xs font-bold w-full"
            >
              Department
              {column.getIsSorted() === "asc" ? (
                <SortUp className="ml-auto " />
              ) : column.getIsSorted() === "desc" ? (
                <SortDown className="ml-auto " />
              ) : (
                <Sort className="ml-auto " />
              )}
            </Button>
          );
        },

      },
    ],
    []
  );

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="h-[56px]">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={
                      index === 0
                        ? "min-w-6 rounded-tl-[10px] rounded-bl-[10px]"
                        : index === headerGroup.headers.length - 1
                        ? "rounded-tr-[10px] rounded-br-[10px]"
                       
                        : "min-w-36"
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-selected={row.getIsSelected()} 
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

  );
};

export default EmployeesTable;