import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatisticsPageLoading() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8" />
            <Skeleton className="h-4 mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8" />
            <Skeleton className="h-4 mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8" />
            <Skeleton className="h-4 mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8" />
            <Skeleton className="h-4 mt-1" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardHeader className="pb-2 flex flex-col items-start">
            <CardTitle className="text-base">Issue Type Distribution</CardTitle>
            <CardDescription>
              Current distribution of issues by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[250px] pb-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-col items-start">
            <CardTitle className="text-base">
              Issue Priority Distribution
            </CardTitle>
            <CardDescription>
              Current distribution of issues by priority
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[250px] pb-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-col items-start">
            <CardTitle className="text-base">Issue Type Distribution</CardTitle>
            <CardDescription>
              Current distribution of issues by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[250px] pb-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-col items-start">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Most recently reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[250px] pb-2" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
