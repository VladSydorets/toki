import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
  const skeletonRows = 8;
  const skeletonColumns = 4;

  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks!
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:flex gap-4 items-center mb-4">
          <Skeleton className="h-10 pl-7 max-w-sm w-full" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: skeletonColumns }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: skeletonColumns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <Skeleton className="w-[100px] h-8" />
        <div className="flex items-center space-x-2">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-36 h-8" />
        </div>
      </div>
    </main>
  );
}
