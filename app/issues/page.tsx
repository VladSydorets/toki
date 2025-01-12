import prisma from "@/lib/db";
import IssuesTable from "./components/IssuesTable";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <main className="container mx-auto py-10">
      <IssuesTable issues={issues}></IssuesTable>
    </main>
  );
}
