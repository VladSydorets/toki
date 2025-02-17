import IssueCard from "@/components/IssueCard";
import prisma from "@/lib/prisma";
import { IssueStatus } from "@prisma/client";
import { getStatusColor, statusTextMap } from "./issues/definitions";
import EmptyCard from "@/components/EmptyCard";
import { Badge } from "@/components/ui/badge";
export default async function Home() {
  const issues = await prisma.issue.findMany();

  const statuses = ["TO_DO", "IN_PROGRESS", "COMPLETED"] as const;

  return (
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {statuses.map((status) => (
          <div key={status} className="space-y-4">
            <h2 className="text-2xl font-semibold capitalize flex justify-between items-center px-4">
              {statusTextMap[status]}
              <Badge
                className={getStatusColor(status as IssueStatus) + " text-base"}
              >
                {
                  issues.filter(
                    (issue) => issue.status === (status as IssueStatus)
                  ).length
                }
              </Badge>
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg min-h-[200px]">
              {issues
                .filter((issue) => issue.status === (status as IssueStatus))
                .slice(0, 5)
                .map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              {issues.filter(
                (issue) => issue.status === (status as IssueStatus)
              ).length === 0 && <EmptyCard status={status} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
