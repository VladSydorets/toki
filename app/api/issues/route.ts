import { authOptions } from "@/app/(auth)/AuthOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issuePostRequestSchema } from "./definitions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = issuePostRequestSchema.safeParse(body);

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }

  const allIssuesCount = await prisma.issue.count();
  if (allIssuesCount >= 100) {
    return NextResponse.json(
      "The maximum number of issues per user has been reached.",
      {
        status: 400,
      }
    );
  }

  const { title, description, type, status, priority, assignedToId, tags } =
    body;

  const newIssue = await prisma.issue.create({
    data: {
      title: title,
      description: description,
      type: type,
      status: status,
      priority: priority,
      reportedById: session.user.id!, // temporary fix
      assignedToId: assignedToId,
      tags: tags,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
