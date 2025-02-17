import IssueColumns from "@/components/IssueColumns";
import prisma from "@/lib/prisma";

export default async function Home() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <IssueColumns issues={issues} />
    </div>
  );
}
