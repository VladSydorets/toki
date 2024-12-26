import prisma from "@/lib/db";
// import Link from "next/link";

export default async function IssuePage({ params }) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main>
      <h1>{issue?.title}</h1>
      <p>{issue?.description}</p>
    </main>
  );
}
