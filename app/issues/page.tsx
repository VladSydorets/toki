import prisma from "@/lib/db";
import Link from "next/link";
import IssuesTable from "./components/IssuesTable";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <main>
      <IssuesTable issues={issues}></IssuesTable>
      <div>
        <Link href={"/issues/new"}>New Issue</Link>
      </div>
    </main>
  );
}
