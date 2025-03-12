import prisma from "./db";

export async function getIssueById(issueId: number) {
  return await prisma.issue.findFirst({ where: { id: issueId } });
}
