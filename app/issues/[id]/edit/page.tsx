import prisma from "@/prisma/client";
import IssueForm from "../../components/IssueForm";

export default async function EditPage({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <IssueForm issue={issue} />
    </main>
  );
}
