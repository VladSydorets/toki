import IssueCard from "@/components/issues/IssueCard";
import { Issue } from "@prisma/client";

type RecentActivityProps = {
  recentIssues: Issue[];
};

export default function RecentActivity({ recentIssues }: RecentActivityProps) {
  return (
    <div className="h-[250px] overflow-auto pr-2">
      <div className="space-y-3">
        {recentIssues.length > 0 ? (
          recentIssues.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-stretch p-3 border rounded-md hover:bg-muted/50 transition-colors"
            >
              <IssueCard issue={item} isCondensed />
            </div>
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
