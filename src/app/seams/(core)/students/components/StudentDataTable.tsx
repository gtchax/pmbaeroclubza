"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  approvalStatus: string;
  createdAt: Date;
  studentProfile?: any; // Simplified for now
}

interface StudentDataTableProps {
  students: Student[];
  onViewDetails: (student: Student) => void;
  onRequestInfo: (student: Student) => void;
  onApproval: (student: Student) => void;
  onPauseAccount: (student: Student) => void;
  isLoading: boolean;
}

export function StudentDataTable({
  students,
  onViewDetails,
  onRequestInfo,
  onApproval,
  onPauseAccount,
  isLoading,
}: StudentDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Student>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Student Name",
        cell: ({ row }) => {
          const student = row.original;
          return (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">
                  {student.firstName} {student.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  ID: {student.id.slice(0, 8)}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Contact",
        cell: ({ row }) => {
          const student = row.original;
          return (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 text-gray-400" />
                <span className="text-sm">{student.email}</span>
              </div>
              {student.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-sm">{student.phone}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "licenseInfo",
        header: "License Info",
        cell: ({ row }) => {
          const student = row.original;
          const profile = student.studentProfile;

          if (!profile?.licenseNumber) {
            return <span className="text-gray-400 text-sm">No license</span>;
          }

          return (
            <div className="space-y-1">
              <div className="text-sm font-medium">{profile.licenseNumber}</div>
              {profile.licenseExpiry && (
                <div className="text-xs text-gray-500">
                  Expires:{" "}
                  {new Date(profile.licenseExpiry).toLocaleDateString()}
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "medicalInfo",
        header: "Medical Status",
        cell: ({ row }) => {
          const student = row.original;
          const profile = student.studentProfile;

          if (!profile?.medicalExpiry) {
            return <span className="text-gray-400 text-sm">No medical</span>;
          }

          const medicalExpiry = new Date(profile.medicalExpiry);
          const isExpired = medicalExpiry < new Date();
          const isExpiringSoon =
            medicalExpiry < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          return (
            <div className="space-y-1">
              <div className="text-sm">
                {medicalExpiry.toLocaleDateString()}
              </div>
              {isExpired && (
                <Badge variant="destructive" className="text-xs">
                  Expired
                </Badge>
              )}
              {!isExpired && isExpiringSoon && (
                <Badge variant="secondary" className="text-xs">
                  Expiring Soon
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "flightHours",
        header: "Flight Hours",
        cell: ({ row }) => {
          const student = row.original;
          const profile = student.studentProfile;

          return (
            <div className="text-sm">
              {profile?.totalFlightHours || 0} hours
            </div>
          );
        },
      },
      {
        accessorKey: "approvalStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.approvalStatus;

          const statusConfig = {
            PENDING: { label: "Pending", variant: "secondary", icon: Clock },
            APPROVED: {
              label: "Approved",
              variant: "default",
              icon: CheckCircle,
            },
            REJECTED: {
              label: "Rejected",
              variant: "destructive",
              icon: XCircle,
            },
            UNDER_REVIEW: {
              label: "Under Review",
              variant: "outline",
              icon: AlertTriangle,
            },
          };

          const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.PENDING;
          const Icon = config.icon;

          return (
            <Badge
              variant={config.variant as "default" | "secondary" | "destructive" | "outline"}
              className="flex items-center space-x-1"
            >
              <Icon className="h-3 w-3" />
              <span>{config.label}</span>
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Registration Date",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return (
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="text-sm">{date.toLocaleDateString()}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const student = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onViewDetails(student)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRequestInfo(student)}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Request More Info
                </DropdownMenuItem>
                {student.approvalStatus === "PENDING" && (
                  <DropdownMenuItem onClick={() => onApproval(student)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Review & Approve
                  </DropdownMenuItem>
                )}
                {student.approvalStatus === "APPROVED" && (
                  <DropdownMenuItem onClick={() => onPauseAccount(student)}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Pause Account
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onViewDetails, onRequestInfo, onApproval, onPauseAccount]
  );

  const table = useReactTable({
    data: students,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No students found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {globalFilter || columnFilters.length > 0
            ? "Try adjusting your search or filter criteria."
            : "Get started by registering new students."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Global Search */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center space-x-1"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUp className="h-4 w-4" />,
                          desc: <ChevronDown className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

