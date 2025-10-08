import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, FileDownIcon, } from "lucide-react";
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

type TimeOffRequest = {
  id: number;
  from: string;
  to: string;
  total: string;
  type: string;
  attachment: string | null;
  status: "approve" | "pending";
};

type Employee = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  date: string;
};

type RequestWithEmployee = TimeOffRequest & {
  employee: Employee;
};

const timeOffRequests: TimeOffRequest[] = [
  {
    id: 1,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: null,
    status: "approve",
  },
  {
    id: 2,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "approve",
  },
  {
    id: 3,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "pending",
  },
  {
    id: 4,
    from: "01 Mar 2023",
    to: "05 Mar 2023",
    total: "5 Days",
    type: "Engagement",
    attachment: null,
    status: "approve",
  },
  {
    id: 5,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: "File.pdf",
    status: "pending",
  },
  {
    id: 6,
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    type: "Engagement",
    attachment: null,
    status: "approve",
  },
];

const employees: Employee[] = [
  {
    id: 1,
    name: "Jordyn George",
    email: "jordyn@unpixel.com",
    avatar: "/avatars/jordyn.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 2,
    name: "Skylar Herwitz",
    email: "skylar@unpixel.com",
    avatar: "/avatars/skylar.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    email: "kathryn@unpixel.com",
    avatar: "/avatars/kathryn.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 4,
    name: "Cameron Williamson",
    email: "cameron@unpixel.com",
    avatar: "/avatars/cameron.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 5,
    name: "Esther Howard",
    email: "esther@unpixel.com",
    avatar: "/avatars/esther.jpg",
    date: "01 Mar 2023",
  },
  {
    id: 6,
    name: "Jenny Wilson",
    email: "jenny@unpixel.com",
    avatar: "/avatars/jenny.jpg",
    date: "01 Mar 2023",
  },
];

const RequestsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approve":
        return <Badge variant="success">APPROVE</Badge>;
      case "pending":
        return <Badge variant="warning">PENDING</Badge>;
      default:
        return <Badge variant="secondary">{status.toUpperCase()}</Badge>;
    }
  };

  // Combine requests with employees
  const data = useMemo<RequestWithEmployee[]>(() => {
    return timeOffRequests.map((request) => ({
      ...request,
      employee: employees.find((emp) => emp.id === request.id)!,
    }));
  }, []);

  // Define columns
  const columns = useMemo<ColumnDef<RequestWithEmployee>[]>(
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
        accessorKey: "employee.name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium w-full"
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
          const employee = row.original.employee;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={employee.avatar} />
                <AvatarFallback>
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{employee.name}</p>
                <p className="text-xs text-muted-foreground">{employee.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "from",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium w-full"
            >
              From
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
        accessorKey: "to",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium w-full"
            >
              To
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
        accessorKey: "total",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium w-full"
            >
              Total
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
        accessorKey: "type",
        // header: "Type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium w-full"
            >
              Type
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
        accessorKey: "attachment",
        // header: "Attachment",
         header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium w-full"
            >
              Attachment
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
        cell: ({ row }) => {
          const attachment = row.original.attachment;
          return (
            <div className="flex items-center justify-between">
              <span className="cursor-pointer">{attachment || "-"}</span>
              <FileDownIcon className="w-4 h-4 text-[#A0AEC0]" />
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent p-0 h-auto font-medium"
            >
              Status
            
            </Button>
          );
        },
        cell: ({ row }) => getStatusBadge(row.original.status),
        enableSorting: false
      },
    ],
    []
  );

  const table = useReactTable({
    data,
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
    <Card className="lg:col-span-4">
      <CardContent className="p-0">
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
                        : header.column.id === "from" ||
                          header.column.id === "to" ||
                          header.column.id === "total"
                        ? "min-w-36"
                        : ""
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

        {/* Pagination */}
        <div className="border-t p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 bg-tertiary text-tertiary-foreground">
              1
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex w-8 h-8">
              2
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex w-8 h-8">
              3
            </Button>
            <span className="hidden md:inline-flex text-muted-foreground">...</span>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex w-8 h-8">
              10
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex text-sm text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {data.length} entries
            </span>
            <Select defaultValue="6">
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">Show 6</SelectItem>
                <SelectItem value="16">Show 16</SelectItem>
                <SelectItem value="24">Show 24</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestsTable;