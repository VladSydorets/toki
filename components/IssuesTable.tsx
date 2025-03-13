"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronDown, ChevronUp, Search } from "lucide-react";

import { Issue } from "@prisma/client";
import Link from "next/link";
import {
  statusTextMap,
  priorityTextMap,
  getStatusColor,
  getPriorityColor,
  typeTextMap,
} from "../app/issues/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DateRange } from "react-day-picker";
import CreatedAt from "@/components/CreatedAt";
import NewIssueBtn from "./NewIssueBtn";

interface Props {
  issues: Issue[];
}

export default function IssuesTable({ issues }: Props) {
  const [updatedIssues, setUpdatedIssues] = useState(issues);
  const [sortColumn, setSortColumn] = useState<keyof Issue | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Issue["status"] | "all">(
    "all"
  );
  const [priorityFilter, setPriorityFilter] = useState<
    Issue["priority"] | "all"
  >("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage, setIssuesPerPage] = useState(10);

  const handleSort = (column: keyof Issue) => {
    let newSortDirection: "asc" | "desc" = "asc";
    if (sortColumn === column) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newSortDirection);
    } else {
      setSortColumn(column);
      newSortDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newSortDirection);
    }

    setUpdatedIssues(sortedIssues);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: Issue["status"] | "all") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePriorityFilter = (value: Issue["priority"] | "all") => {
    setPriorityFilter(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const filteredIssues = updatedIssues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || issue.priority === priorityFilter;
    const matchesDateRange =
      (!dateRange?.from || new Date(issue.createdAt) >= dateRange?.from) &&
      (!dateRange?.to || new Date(issue.createdAt) <= dateRange?.to);
    return (
      matchesSearch && matchesStatus && matchesPriority && matchesDateRange
    );
  });

  const sortedIssues = filteredIssues.sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn] !== null && b[sortColumn] !== null) {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = sortedIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <NewIssueBtn variant="primary" />
        <div className="relative w-full">
          <Search className="absolute w-4 left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-7"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="BACKLOG">Backlog</SelectItem>
            <SelectItem value="TO_DO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="CODE_REVIEW">Code Review</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCLED">Canceled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={handlePriorityFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="MINOR">Minor</SelectItem>
            <SelectItem value="LOWEST">Lowest</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="HIGHEST">Highest</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start items-center text-left font-normal"
            >
              <CalendarIcon className="size-4 mb-[2px]" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">
              <Button variant="ghost" onClick={() => handleSort("title")}>
                Title
                {sortColumn === "title" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")}>
                Status
                {sortColumn === "status" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("priority")}>
                Priority
                {sortColumn === "priority" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                Created
                {sortColumn === "createdAt" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentIssues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Badge className="hidden sm:inline-block text-gray-500 text-foreground bg-transparent border-gray-800 dark:text-white hover:bg-transparent mr-2">
                  {typeTextMap[issue.type]}
                </Badge>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </TableCell>
              <TableCell className="min-w-[80px]">
                <Badge className={getStatusColor(issue.status)}>
                  {statusTextMap[issue.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(issue.priority)}>
                  {priorityTextMap[issue.priority]}
                </Badge>
              </TableCell>
              <TableCell className="text-right ">
                <CreatedAt createdAt={issue.createdAt} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <Select
          value={issuesPerPage.toString()}
          onValueChange={(value) => {
            setIssuesPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Issues per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => paginate(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({
              length: Math.ceil(sortedIssues.length / issuesPerPage),
            }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => paginate(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  paginate(
                    Math.min(
                      Math.ceil(sortedIssues.length / issuesPerPage),
                      currentPage + 1
                    )
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
