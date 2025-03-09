import prisma from "@/lib/db";
import TypeDistribution from "./TypeDistribution";
import { typeTextMap } from "@/app/issues/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-col items-start">
        <CardTitle className="text-base">Issue Type Distribution</CardTitle>
        <CardDescription>
          Current distribution of issues by type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TypeDistribution data={data}></TypeDistribution>
      </CardContent>
    </Card>
  );
}
