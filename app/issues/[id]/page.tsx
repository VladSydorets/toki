import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Flag } from "lucide-react";
import Link from "next/link";
import { getStatusColor } from "../definitions";
import { RemoveIssueBtn } from "../components/RemoveIssueBtn";
import IssueEditModal from "../components/IssueEditModal";
import { Metadata } from "next";
import { getAllUsers } from "@/lib/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/AuthOptions";
import BadgeWrapper from "@/components/utility/BadgeWrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!issue) {
    return {
      title: "Issue Not Found",
      description: "The requested issue does not exist.",
    };
  }

  return {
    title: `Issue #${issue.id} - ${issue.title}`,
    description: `Details about the issue: ${issue.title}`,
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  const { id } = await params;
  if (isNaN(parseInt(id, 10))) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!issue) {
    notFound();
  }

  const assignedToUser = issue.assignedToId
    ? await prisma.user.findUnique({ where: { id: issue.assignedToId } })
    : null;

  const reportedByUser = await prisma.user.findUnique({
    where: {
      id: issue.reportedById,
    },
  });

  const users = await getAllUsers();
  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all issues
      </Link>
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`inline-block w-1.5 self-stretch rounded-full ${getStatusColor(
                issue.status
              )}`}
            ></div>
            <CardTitle className="text-lg md:text-xl sm:text-2xl font-bold space-x-2 break-words">
              <span className="text-muted-foreground mr-1">#{issue.id}</span>
              {issue.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <BadgeWrapper type="type" value={issue.type} variant="outline" />
            <BadgeWrapper type="status" value={issue.status} />
            <BadgeWrapper type="priority" value={issue.priority} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-start sm:items-center">
              <Clock className="mr-2 sm:mb-[1px] h-4 w-4 opacity-70" />
              <span>Created: {new Date(issue.createdAt).toLocaleString()}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-start sm:items-center">
              <Flag className="mr-2 sm:mb-[1px] h-4 w-4 opacity-70" />
              <span>Updated: {new Date(issue.updatedAt).toLocaleString()}</span>
            </div>
            {issue.completedAt && (
              <>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center">
                  <Flag className="mr-2 h-4 w-4 opacity-70" />
                  <span>
                    Completed: {new Date(issue.completedAt).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {issue.description}
            </p>
          </div>
          {/* TODO: Add user's icon */}
          {assignedToUser && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Assigned to</h3>
              <p className="text-muted-foreground">{`${assignedToUser.firstName} ${assignedToUser.lastName}`}</p>
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold mb-2">Reported By</h3>
            <p className="text-muted-foreground">{`${reportedByUser?.firstName} ${reportedByUser?.lastName}`}</p>
          </div>
          <div className="flex flex-col gap-3 items-start sm:flex-row sm:justify-end">
            <IssueEditModal issue={issue} users={users} isDisabled={!session} />
            <RemoveIssueBtn issueId={issue.id} isDisabled={!session} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
