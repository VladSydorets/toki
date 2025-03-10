import prisma from "@/lib/db";
import StatusCard from "./StatusCard";
import CompletionRateCard from "./CompletionRateCard";
import { allStatuses } from "@/app/issues/definitions";

export default async function StatusCardsWrapper() {
  const issueCountByStatus = await prisma.issue.groupBy({
    by: "status",
    _count: {
      status: true,
    },
  });

  const countMap = Object.fromEntries(
    issueCountByStatus.map((item) => [item.status, item._count.status])
  );

  const [totalIssues, completedIssues] = await Promise.all([
    prisma.issue.count(),
    prisma.issue.count({ where: { status: "COMPLETED" } }),
  ]);

  return (
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
  );
}
