"use client";

import { useState } from "react";
import IssueCard from "./IssueCard";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import EmptyCard from "./EmptyCard";
import { IssueStatus } from "@prisma/client";
import { getStatusColor, statusTextMap } from "@/app/issues/definitions";
import { Issue } from "@prisma/client";

interface IssuesBoardLayoutProps {
  issues: Issue[];
}

export default function IssuesBoardLayout({ issues }: IssuesBoardLayoutProps) {
  const [expandedColumns, setExpandedColumns] = useState({
    TO_DO: false,
    IN_PROGRESS: false,
    COMPLETED: false,
  });

  const toggleExpand = (status: "TO_DO" | "IN_PROGRESS" | "COMPLETED") => {
    setExpandedColumns((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const statuses = ["TO_DO", "IN_PROGRESS", "COMPLETED"] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {statuses.map((status) => {
        const filteredIssues = issues.filter(
          (issue) => issue.status === status
        );
        const isExpanded = expandedColumns[status];
        const displayedIssues = isExpanded
          ? filteredIssues
          : filteredIssues.slice(0, 5);

        return (
          <div key={status} className="space-y-4">
            <h3 className="text-lg font-medium capitalize flex gap-2 items-center px-4">
              <Badge
                className={
                  getStatusColor(status as IssueStatus) +
                  " text-xs rounded-full"
                }
              >
                {filteredIssues.length}
              </Badge>
              {statusTextMap[status]}
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-3">
              {filteredIssues.length > 0 ? (
                <>
                  {displayedIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                  {filteredIssues.length > 5 && (
                    <Button
                      variant="ghost"
                      className="w-full mt-2"
                      onClick={() => toggleExpand(status)}
                    >
                      {isExpanded
                        ? "Show Less"
                        : `Show ${filteredIssues.length - 5} More`}
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  )}
                </>
              ) : (
                <EmptyCard status={status} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
