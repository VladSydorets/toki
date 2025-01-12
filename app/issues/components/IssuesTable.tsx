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
import { ChevronDown, ChevronUp, Search } from "lucide-react";

import { Issue, Priority, TaskStatus } from "@prisma/client";
import Link from "next/link";

interface Props {
  issues: Issue[];
}

const statusTextMap: Record<TaskStatus, string> = {
  TO_DO: "To do",
  IN_PROGRESS: "In progress",
  CODE_REVIEW: "Code review",
  COMPLETED: "Completed",
};

const priorityTextMap: Record<Priority, string> = {
  MINOR: "Minor",
  LOWEST: "Lowest",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  HIGHEST: "Highest",
  CRITICAL: "Critical",
};

const getStatusColor = (status: Issue["status"]) => {
  switch (status) {
    case "TO_DO":
      return "bg-yellow-500";
    case "IN_PROGRESS":
      return "bg-blue-500";
    case "CODE_REVIEW":
      return "bg-purple-500";
    case "COMPLETED":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getPriorityColor = (priority: Issue["priority"]) => {
  switch (priority) {
    case "MINOR":
      return "bg-green-500";
    case "LOWEST":
      return "bg-blue-300";
    case "LOW":
      return "bg-blue-500";
    case "MEDIUM":
      return "bg-yellow-500";
    case "HIGH":
      return "bg-red-300";
    case "HIGHEST":
      return "bg-red-500";
    case "CRITICAL":
      return "bg-red-700";
    default:
      return "bg-gray-500";
  }
};
export default function IssuesTable({ issues }: Props) {
  const [updatedIssues, setUpdatedIssues] = useState(issues);
  const [sortColumn, setSortColumn] = useState<keyof Issue | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

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

    const sortedIssues = [...issues].sort((a, b) => {
      if (a[column] !== null && b[column] !== null) {
        if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
        if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUpdatedIssues(sortedIssues);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredIssues = updatedIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Issues</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
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
          {filteredIssues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(issue.status)}>
                  {statusTextMap[issue.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(issue.priority)}>
                  {priorityTextMap[issue.priority]}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {issue.createdAt.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
