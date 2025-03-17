import { Issue } from "@prisma/client";
import IssueCard from "./IssueCard";
import { Button } from "../ui/button";
import { usePagination } from "@/hooks/usePagination";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";

interface IssuesListLayoutProps {
  issues: Issue[];
}

export default function IssuesListLayout({ issues }: IssuesListLayoutProps) {
  const issuesPerPage = 5;
  const { visibleIssues, hasMore, showMore, showLess } = usePagination(issues);

  return (
    <div className="grid grid-cols-1 gap-4">
      {visibleIssues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} layout="list" />
      ))}
      <div className="flex gap-2 items-center">
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
