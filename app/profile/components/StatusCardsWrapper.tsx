import prisma from "@/lib/db";
import StatusCard from "./StatusCard";
import CompletionRateCard from "./CompletionRateCard";
import { allStatuses } from "@/app/issues/definitions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/AuthOptions";
import IssueBoard from "@/components/issues/IssueBoard";

interface StatusCardsWrapperProps {
  filterBy: "assigned" | "reported";
}

export default async function StatusCardsWrapper({
  filterBy,
}: StatusCardsWrapperProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return <>Error</>;
  }

  const userId = parseInt(session.user.id, 10);

  const whereClause =
    filterBy === "assigned"
      ? { assignedToId: userId }
      : { reportedById: userId };

  const issueCountByStatus = await prisma.issue.groupBy({
    by: "status",
    where: whereClause,
    _count: {
      status: true,
    },
  });

  const countMap = Object.fromEntries(
    issueCountByStatus.map((item) => [item.status, item._count.status])
  );

  const [totalIssues, completedIssues] = await Promise.all([
    prisma.issue.count({ where: whereClause }),
    prisma.issue.count({ where: { ...whereClause, status: "COMPLETED" } }),
  ]);

  const allIssues = await prisma.issue.findMany({
    where: whereClause,
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {allStatuses.map((status) => (
          <StatusCard
            key={status}
            data={{
              value: countMap[status] || 0,
              status,
            }}
          />
        ))}
        <CompletionRateCard
          data={{
            totalIssues: totalIssues,
            completedIssues: completedIssues,
          }}
        />
      </div>
      <IssueBoard issues={allIssues} />
    </div>
  );
}
