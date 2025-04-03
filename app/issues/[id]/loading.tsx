import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ScrollToTop from "@/components/animations/ScrollToTop";

export default function IssueLoadingPage() {
  return (
    <Card className="w-full mx-auto">
      <ScrollToTop />
      <Skeleton className="h-8" />
      <form>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="space-y-4 sm:w-3/4">
              <div className="space-y-2 sm:w-1/2">
                <Label htmlFor="title">Title:</Label>
                <Skeleton className="h-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description:</Label>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-4 gap-x-2 md:w-1/4">
              <div className="space-y-2">
                <Label htmlFor="type">Type:</Label>
                <Skeleton className="h-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status:</Label>
                <Skeleton className="h-9" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority:</Label>
                <Skeleton className="h-9" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-9" />
              </div>
            </div>
          </div>
          <CardFooter>
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
}
