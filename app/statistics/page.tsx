import { Metadata } from "next";

import PriorityDistributionWrapper from "./components/PriorityDistribution/PriorityDistributionWrapper";
import RecentActivityWrapper from "./components/RecentActivity/RecentActivityWrapper";
import StatisticsDashboard from "./components/StatisticsDashboard/StatisticsDashboard";
import StatusDistributionWrapper from "./components/StatusDistribution/StatusDistributionWrapper";
import TypeDistributionWrapper from "./components/TypeDistribution/TypeDistributionWrapper";

export const metadata: Metadata = {
  title: "Statistics & Analytics",
  description: "Overview of statistics related to issues.",
};

export const dynamic = "force-dynamic";

export default function StatisticsPage() {
  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="text-left">
        <h1 className="text-2xl font-bold tracking-tight">
          Statistics & Analytics
        </h1>
        <p className="text-base text-muted-foreground">
          Explore data and trends for all project issues
        </p>
      </div>
      <StatisticsDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <StatusDistributionWrapper />
        <PriorityDistributionWrapper />
        <TypeDistributionWrapper />
        <RecentActivityWrapper />
      </div>
    </main>
  );
}
