import prisma from "@/lib/db";
import StatusDistribution from "./StatusDistribution";
import { statusTextMap } from "@/app/issues/definitions";

export default async function StatusDistributionWrapper() {
  const issuesByStatus = await prisma.issue.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const statusColors: Record<string, string> = {
    TO_DO: "#eab308",
    IN_PROGRESS: "#a855f7",
    CODE_REVIEW: "#3b82f6",
    COMPLETED: "#22c55e",
  };

  const data = issuesByStatus.map((entry) => ({
    name: statusTextMap[entry.status],
    value: entry._count.status,
    color: statusColors[entry.status],
  }));

  return <StatusDistribution data={data}></StatusDistribution>;
}
