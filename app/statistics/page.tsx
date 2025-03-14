import StatisticsDashboard from "./components/StatisticsDashboard/StatisticsDashboard";
import PriorityDistributionWrapper from "./components/PriorityDistribution/PriorityDistributionWrapper";
import StatusDistributionWrapper from "./components/StatusDistribution/StatusDistributionWrapper";
import TypeDistributionWrapper from "./components/TypeDistribution/TypeDistributionWrapper";
import RecentActivityWrapper from "./components/RecentActivity/RecentActivityWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics & Analytics",
  description: "Overview of statistics related to issues.",
};

export default function StatisticsPage() {
  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight">
        Statistics & Analytics
      </h2>
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
