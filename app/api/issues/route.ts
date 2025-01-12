import { authOptions } from "@/app/auth/AuthOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issuePostRequestSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(1000),
});

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

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority,
      userId: parseInt(session.user.id, 10),
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
