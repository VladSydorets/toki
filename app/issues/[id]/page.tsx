import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Flag } from "lucide-react";
import Link from "next/link";
import {
  typeTextMap,
  getStatusColor,
  statusTextMap,
  getPriorityColor,
  priorityTextMap,
} from "../definitions";
import { RemoveIssueBtn } from "../components/RemoveIssueBtn";
import IssueEditModal from "../components/IssueEditModal";
import { Metadata } from "next";
import { getAllUsers } from "@/lib/users";

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
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <div className="flex items-center gap-3">
              <div
                className={`inline-block w-1.5 h-8 rounded-full ${getStatusColor(
                  issue.status
                )}`}
              ></div>
              <CardTitle className="text-2xl font-bold space-x-2">
                <span className="text-muted-foreground mr-1">#{issue.id}</span>
                {issue.title}
              </CardTitle>
              <Badge className="text-gray-500 text-foreground bg-transparent border-gray-800 dark:text-white hover:bg-transparent py-1">
                {typeTextMap[issue.type]}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={`${getStatusColor(issue.status)} py-1`}>
              {statusTextMap[issue.status]}
            </Badge>
            <Badge className={`${getPriorityColor(issue.priority)} py-1`}>
              {priorityTextMap[issue.priority]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-2 mb-[1px] h-4 w-4 opacity-70" />
              <span>Created: {new Date(issue.createdAt).toLocaleString()}</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center">
              <Flag className="mr-2 h-4 w-4 opacity-70" />
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
            <p className="text-muted-foreground">{issue.description}</p>
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
          <div className="flex justify-end space-x-4">
            <IssueEditModal issue={issue} users={users} />
            <RemoveIssueBtn issueId={issue.id} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
