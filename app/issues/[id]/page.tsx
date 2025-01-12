import prisma from "@/lib/db";
// import Link from "next/link";

interface Params {
  id: string;
}

export default async function IssuePage({ params }: { params: Params }) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id, 10),
    },
  });

  return (
    <main>
      <h1>{issue?.title}</h1>
      <p>{issue?.description}</p>
      <p>{issue?.priority}</p>
    </main>
  );
}
