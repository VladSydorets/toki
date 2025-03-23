import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageLoading() {
  const statuses = ["TO_DO", "IN_PROGRESS", "COMPLETED"] as const;

  return (
    <main className="container mx-auto space-y-4 py-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <Skeleton className="h-9" />
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-bold tracking-tight">My Issues</h2>
        <p className="text-base text-muted-foreground">
          These are the issues assigned to you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-1 w-full bg-gray-400"></div>
              <CardContent className="flex items-center gap-4 p-6 pr-2">
                <Skeleton className="rounded-full h-10 w-10" />
                <div className="flex flex-col w-full gap-2">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="overflow-hidden col-span-1 sm:col-span-2">
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <CardContent className="flex flex-col gap-2 p-6">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-2 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="py-4">
        <div className="flex gap-2 mb-4 justify-end">
          <Skeleton className="h-9 w-12" />
          <Skeleton className="h-9 w-12" />
          <Skeleton className="h-9 w-12" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statuses.map((status) => (
            <div key={status} className="space-y-4">
              <h3 className="flex gap-2 items-center px-4">
                <Skeleton className="h-7" />
              </h3>
              <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-3">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="p-4 bg-card rounded-lg border shadow-sm"
                  >
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-full" />
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
