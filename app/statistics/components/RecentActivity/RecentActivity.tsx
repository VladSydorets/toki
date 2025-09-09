import IssueCard from "@/components/issues/IssueCard";
import { Issue } from "@prisma/client";

type RecentActivityProps = {
  recentIssues: Issue[];
};

export default function RecentActivity({ recentIssues }: RecentActivityProps) {
  return (
    <div className="h-[250px] overflow-auto pr-2">
      <div className="space-y-3 py-3">
        {recentIssues.length > 0 ? (
          recentIssues.map((item) => (
            <IssueCard key={item.id} issue={item} isCondensed />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No recently reported issues
          </div>
        )}
      </div>
    </div>
  );
}
