import { CircleChevronDown, CircleChevronUp } from "lucide-react";

import { usePagination } from "@/hooks/usePagination";
import { Issue } from "@prisma/client";

import { Button } from "../ui/button";
import IssueCard from "./IssueCard";

interface IssuesGridLayoutProps {
  issues: Issue[];
}

export default function IssuesGridLayout({ issues }: IssuesGridLayoutProps) {
  const issuesPerPage = 6;
  const { visibleIssues, hasMore, showMore, showLess } = usePagination(issues, {
    initialCount: issuesPerPage,
    incrementBy: issuesPerPage,
  });

  return (
    <div className="py-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
      <div className="flex justify-start gap-4">
        {hasMore && (
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={showMore}
          >
            Show More <CircleChevronDown />
          </Button>
        )}
        {visibleIssues.length > issuesPerPage && (
          <Button
            variant="outline"
            onClick={showLess}
            className="flex items-center gap-1"
          >
            Show Less <CircleChevronUp />
          </Button>
        )}
      </div>
    </div>
  );
}
