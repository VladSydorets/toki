import { statusTextMap } from "@/app/issues/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";

import StatusDistribution from "./StatusDistribution";

export default async function StatusDistributionWrapper() {
  const issuesByStatus = await prisma.issue.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const statusColors: Record<string, string> = {
    BACKLOG: "#94a3b8",
    TO_DO: "#eab308",
    IN_PROGRESS: "#a855f7",
    CODE_REVIEW: "#3b82f6",
    COMPLETED: "#22c55e",
    CANCELED: "#ef4444",
  };

  const data = issuesByStatus.map((entry) => ({
    name: statusTextMap[entry.status],
    value: entry._count.status,
    color: statusColors[entry.status],
  }));

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-col items-start">
        <CardTitle className="text-base">Issue Type Distribution</CardTitle>
        <CardDescription>
          Current distribution of issues by type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StatusDistribution data={data}></StatusDistribution>
      </CardContent>
    </Card>
  );
}
