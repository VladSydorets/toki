import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getPriorityColor } from "@/app/issues/definitions";
import { Issue } from "@prisma/client";
import CreatedAt from "./CreatedAt";

export default function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Link href={`/issues/${issue.id}`} className="block">
      <Card className="mb-4 p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 hover:bg-slate-100 dark:hover:bg-slate-900">
        <CardHeader className="p-0 mb-2 text-left">
          <CardTitle className="text-base font-medium">{issue.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-between items-center">
            <Badge
              className={
                getPriorityColor(issue.priority) +
                " text-xs font-normal rounded-full text-white pointer-events-none"
              }
            >
              {issue.priority}
            </Badge>
            <CreatedAt createdAt={issue.createdAt} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
