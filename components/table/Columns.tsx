"use client";

import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IssuePriority, IssueStatus, IssueType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import CreatedAt from "../CreatedAt";
import BadgeWrapper from "../utility/BadgeWrapper";

export type Issue = {
  id: number;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: Date;
  type: IssueType;
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    enableHiding: false,
    enableResizing: false,
    size: 400,
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <>
          <BadgeWrapper
            type="type"
            value={row.original.type}
            variant="outline"
            className="hidden sm:inline-block mr-2"
          />
          <Link href={`/issues/${row.original.id}`} className="">
            {row.getValue("title")}
          </Link>
        </>
      );
    },
  },
  {
    accessorKey: "status",
    filterFn: "arrIncludesSome",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusVal = row.getValue("status") as IssueStatus;
      return (
        <span className="px-4 py-2">
          <BadgeWrapper type="status" value={statusVal} />
        </span>
      );
    },
  },
  {
    accessorKey: "priority",
    filterFn: "arrIncludesSome",
    size: 180,
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priorityVal = row.getValue("priority") as IssuePriority;
      return (
        <span className="px-4 py-2">
          <BadgeWrapper type="priority" value={priorityVal} />
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    size: 180,
    filterFn: (row, columnId, filterValue) => {
      const date = row.getValue(columnId) as Date;
      const { from, to } = filterValue || {};

      if (!from && !to) return true;
      if (from && !to) return date >= from;
      if (!from && to) return date <= to;

      return date >= from && date <= to;
    },
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-end"
        >
          <span className="text-right">Created At</span>
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <CreatedAt
          className="px-4 py-2"
          createdAt={new Date(row.getValue("createdAt"))}
        />
      );
    },
  },
];
