import prisma from "@/lib/prisma";
import IssuesTable from "../components/IssuesTable";

export default async function Home() {
  const issues = await prisma.issue.findMany();

  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks!
        </p>
      </div>
      <IssuesTable issues={issues}></IssuesTable>
    </main>
  );
}
