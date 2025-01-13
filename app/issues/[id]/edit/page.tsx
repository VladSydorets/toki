import prisma from "@/prisma/client";
import IssueForm from "../../components/IssueForm";

export default async function EditPage({ params }: { params: { id: string } }) {
  const issueId = parseInt(params.id, 10);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <main className="container mx-auto py-10">
      <IssueForm issue={issue} />
    </main>
  );
}
