import prisma from "@/lib/db";
import TypeDistribution from "./TypeDistribution";
import { typeTextMap } from "@/app/issues/definitions";

export default async function TypeDistributionWrapper() {
  const issuesByType = await prisma.issue.groupBy({
    by: ["type"],
    _count: { type: true },
  });

  const typeColors: Record<string, string> = {
    BUG: "#ef4444",
    FEATURE: "#a855f7",
    ENHANCEMENT: "#22c55e",
    DOCUMENTATION: "#eab308",
    OTHER: "#a855f7",
  };

  const data = issuesByType.map((entry) => ({
    name: typeTextMap[entry.type],
    value: entry._count.type,
    color: typeColors[entry.type],
  }));

  return <TypeDistribution data={data}></TypeDistribution>;
}
