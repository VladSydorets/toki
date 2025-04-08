import { columns, Issue } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import prisma from "@/lib/prisma";

async function getData(): Promise<Issue[]> {
  return await prisma.issue.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      type: true,
      createdAt: true,
    },
  });
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getData();

  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks!
        </p>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
