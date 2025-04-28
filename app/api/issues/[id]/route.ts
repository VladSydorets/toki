import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/app/(auth)/AuthOptions";
import prisma from "@/prisma/client";

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
    where: { id: parseInt(id, 10) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  const { title, description, type, status, priority, assignedToId } = body;

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        type: type || issue.type || "FEATURE",
        status: status || issue.status || "BACKLOG",
        priority: priority || issue.priority || "MEDIUM",
        completedAt: status
          ? status === "COMPLETED"
            ? new Date()
            : null
          : issue.completedAt,
        assignedToId,
      },
    });

    revalidatePath("/issues");
    revalidatePath("/");

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

  // Users should be able to delete only their own issues (which were reported by them)
  // Users with the role of "ADMIN" should be able to delete any issues
  if (session?.user.role !== "ADMIN") {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
    }

    if (issue.reportedById !== session?.user.id) {
      return NextResponse.json(
        { error: "You are not authorized to delete this issue." },
        { status: 403 }
      );
    }
  }

  if (!id) {
    return NextResponse.json(
      { error: "Issue ID is required." },
      { status: 400 }
    );
  }

  try {
    const issue = await prisma.issue.delete({
      where: { id: parseInt(id, 10) },
    });

    revalidatePath("/issues");
    revalidatePath("/");

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Issue ID is required." },
      { status: 400 }
    );
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!issue) {
      return NextResponse.json(
        { error: `Issue #${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.error("Error fetching issue: ", error);
    return NextResponse.json(
      { error: "Failed to retrieve the issue." },
      { status: 500 }
    );
  }
}
