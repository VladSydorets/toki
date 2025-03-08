import { authOptions } from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "../definitions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      { error: "Issue ID is required." },
      { status: 400 }
    );
  }

  const body = await req.json();
  const validate = patchIssueSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(
      { error: validate.error.message },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  const { title, description } = body;

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id as string, 10) },
      data: {
        title,
        description,
        type: body.type ? body.type : issue.type || "FEATURE",
        status: body.status ? body.status : issue.status || "BACKLOG",
        priority: body.priority ? body.priority : issue.priority || "MEDIUM",
      },
    });
    return NextResponse.json(
      { message: `Issue #${updatedIssue.id} has been updated successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update the issue." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      { error: "Issue ID is required." },
      { status: 400 }
    );
  }

  try {
    const issue = await prisma.issue.delete({
      where: { id: parseInt(id as string, 10) },
    });
    return NextResponse.json(
      { message: `Issue #${issue.id} has been deleted successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete the issue." },
      { status: 500 }
    );
  }
}
