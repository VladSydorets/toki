import PriorityDistributionWrapper from "./components/PriorityDistribution/PriorityDistributionWrapper";
import StatusDistributionWrapper from "./components/StatusDistribution/StatusDistributionWrapper";

export default function StatisticsPage() {
  return (
    <main className="container mx-auto py-10">
      <h2 className="text-2xl font-bold tracking-tight">
        Statistics & Analytics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <StatusDistributionWrapper />
        <PriorityDistributionWrapper />
      </div>
    </main>
  );
}
