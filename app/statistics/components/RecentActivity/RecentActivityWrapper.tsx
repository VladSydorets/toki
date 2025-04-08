import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";

import RecentActivity from "./RecentActivity";

export default async function RecentActivityWrapper() {
  const recentIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-col items-start">
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription>Most recently reported issues</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentActivity recentIssues={recentIssues} />
      </CardContent>
    </Card>
  );
}
