import prisma from "@/lib/db";
import PriorityDistribution from "./PriorityDistribution";
import { priorityTextMap } from "@/app/issues/definitions";

export default async function PriorityDistributionWrapper() {
  const issuesByPriority = await prisma.issue.groupBy({
    by: ["priority"],
    _count: { priority: true },
  });

  const priorityOrder: Record<string, number> = {
    MINOR: 0,
    LOWEST: 1,
    LOW: 2,
    MEDIUM: 3,
    HIGH: 4,
    HIGHEST: 5,
    CRITICAL: 6,
  };

  const priorityColors: Record<string, string> = {
    MINOR: "#22c55e",
    LOWEST: "#93c5fd",
    LOW: "#3b82f6",
    MEDIUM: "#eab308",
    HIGH: "#fca5a5",
    HIGHEST: "#ef4444",
    CRITICAL: "#b91c1c",
  };

  const data = issuesByPriority
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .map((entry) => ({
      name: priorityTextMap[entry.priority],
      value: entry._count.priority,
      color: priorityColors[entry.priority],
    }));

  return <PriorityDistribution data={data}></PriorityDistribution>;
}
