import prisma from "@/lib/db";
import IssueBoard from "@/components/issues/IssueBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issues Board",
  description: "Board with all issues in the system.",
};

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <main className="container grid items-center py-4 text-center mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl text-left font-bold tracking-tight">
        Issues Board
      </h2>
      <IssueBoard issues={issues} />
    </main>
  );
}
