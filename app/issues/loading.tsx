import { Skeleton } from "@/components/ui/skeleton";

export default function IssuesBoardLoading() {
  const statuses = ["TO_DO", "IN_PROGRESS", "COMPLETED"] as const;

  return (
    <main className="container grid items-center py-4 text-center mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-left">
        <h1 className="text-2xl font-bold tracking-tight">All Issues</h1>
        <p className="text-muted-foreground">
          View and manage all issues across the project
        </p>
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
              <div className="bg-gray-100 dark:bg-stone-800 p-4 rounded-lg space-y-3">
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
