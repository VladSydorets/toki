import {
  getPriorityColor,
  getStatusColor,
  priorityTextMap,
  statusTextMap,
  typeTextMap,
} from "@/app/issues/definitions";
import CreatedAt from "@/components/CreatedAt";
import { Badge } from "@/components/ui/badge";
import { Issue } from "@prisma/client";
import Link from "next/link";

type RecentActivityProps = {
  recentIssues: {
    id: number;
    title: string;
    type: Issue["type"];
    status: Issue["status"];
    priority: Issue["priority"];
    createdAt: Date;
  }[];
};

export default function RecentActivity({ recentIssues }: RecentActivityProps) {
  return (
    <div className="h-[250px] overflow-auto pr-2">
      <div className="space-y-3">
        {recentIssues.length > 0 ? (
          recentIssues.map((item) => (
            <div
              key={item.id}
              className="flex items-start p-3 border rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="font-medium text-base">
                  <Link href={`/issues/${item.id}`}>{item.title}</Link>
                </div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <div className="flex gap-2">
                    <Badge className="text-gray-500 text-foreground bg-transparent border-gray-800 dark:text-white hover:bg-transparent">
                      {typeTextMap[item.type]}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {statusTextMap[item.status]}
                    </Badge>
                    <Badge className={getPriorityColor(item.priority)}>
                      {priorityTextMap[item.priority]}
                    </Badge>
                  </div>
                  <CreatedAt createdAt={item.createdAt} />
                </div>
              </div>
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
