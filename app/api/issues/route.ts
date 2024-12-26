// POST request - create an issue
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const issuePostRequestSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(1000),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = issuePostRequestSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
