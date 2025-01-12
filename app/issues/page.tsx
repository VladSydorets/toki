import prisma from "@/lib/db";
import Link from "next/link";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <main>
      <h1>All Issues</h1>
      {issues.map((issue) => (
        <li key={issue.id}>
          <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
        </li>
      ))}
      <div>
        <Link href={"/issues/new"}>New Issue</Link>
      </div>
    </main>
  );
}
