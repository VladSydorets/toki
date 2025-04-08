import { Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

import prisma from "@/lib/db";

import HoverLink from "./HoverLink";
import StatisticsCard from "./StatisticsCard";

export default async function StatisticsDashboard() {
  const totalIssues = await prisma.issue.count();

  const completedIssues = await prisma.issue.count({
    where: {
      status: "COMPLETED",
    },
  });

  const oldestIssue = await prisma.issue.findFirst({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });
  const daysSinceOldestIssue = oldestIssue
    ? Math.floor(
        (Date.now() - oldestIssue.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  const totalCriticalIssues = await prisma.issue.count({
    where: {
      priority: "CRITICAL",
    },
  });
  const oldestCriticalIssue = await prisma.issue.findFirst({
    where: {
      priority: "CRITICAL",
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <StatisticsCard
        title="Total Issues"
        value={totalIssues.toString()}
        description={`${
          totalIssues - completedIssues
        } open, ${completedIssues} closed`}
        icon={<Activity className="h-4 w-4" />}
      />
      <StatisticsCard
        title="Completed"
        value={completedIssues.toString()}
        description={`${
          totalIssues > 0
            ? Math.round((100 * completedIssues) / totalIssues)
            : 0
        }% completion rate`}
        icon={<CheckCircle2 className="h-4 w-4" />}
      />
      <StatisticsCard
        title="Oldest Open Issue"
        value={`${daysSinceOldestIssue} days`}
        description={oldestIssue ? <HoverLink data={oldestIssue} /> : ""}
        icon={<Clock className="h-4 w-4" />}
      />
      <StatisticsCard
        title="Critical Issues"
        value={totalCriticalIssues.toString()}
        description={
          oldestCriticalIssue ? <HoverLink data={oldestCriticalIssue} /> : ""
        }
        icon={<AlertTriangle className="h-4 w-4" />}
      />
    </div>
  );
}
