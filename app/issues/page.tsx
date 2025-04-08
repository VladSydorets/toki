import { Metadata } from "next";

import IssueBoard from "@/components/issues/IssueBoard";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "All Issues",
  description: "View and manage all issues across the project.",
};

export const dynamic = "force-dynamic";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <main className="container grid items-center py-4 text-center mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-left">
        <h1 className="text-2xl font-bold tracking-tight">All Issues</h1>
        <p className="text-muted-foreground">
          View and manage all issues across the project
        </p>
      </div>
      <IssueBoard issues={issues} />
    </main>
  );
}
