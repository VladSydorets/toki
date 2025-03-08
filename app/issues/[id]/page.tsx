import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Flag } from "lucide-react";
import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/auth/AuthOptions";
import {
  getTypeColor,
  typeTextMap,
  getStatusColor,
  statusTextMap,
  getPriorityColor,
  priorityTextMap,
} from "../definitions";
import { RemoveIssueBtn } from "../components/RemoveIssueBtn";
import EditIssueBtn from "../components/EditIssueBtn";

// interface Params {
//   id: string;
// }

export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>; // temporary fix
}) {
  const { id } = await params;
  if (isNaN(parseInt(id, 10))) notFound();
  // const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!issue) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: issue.userId,
    },
  });

  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <Link
        href="/issues"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all issues
      </Link>
      <Card>
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">
              {issue.title}{" "}
              <Badge className={getTypeColor(issue.type)}>
                {typeTextMap[issue.type]}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Issue #{issue.id}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={getStatusColor(issue.status)}>
              {statusTextMap[issue.status]}
            </Badge>
            <Badge className={getPriorityColor(issue.priority)}>
              {priorityTextMap[issue.priority]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span>Created: {new Date(issue.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Flag className="mr-2 h-4 w-4 opacity-70" />
              <span>Updated: {new Date(issue.updatedAt).toLocaleString()}</span>
            </div>
            {issue.completedAt && (
              <div className="flex items-center">
                <Flag className="mr-2 h-4 w-4 opacity-70" />
                <span>
                  Completed: {new Date(issue.completedAt).toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{issue.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Reported By</h3>
            <p className="text-muted-foreground">{`${user?.firstName} ${user?.lastName}`}</p>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold mb-2">Assigned to</h3>
            <p className="text-muted-foreground">{issue.assignee}</p>
          </div> */}
          <div className="flex justify-end space-x-4">
            <EditIssueBtn issueId={issue.id}></EditIssueBtn>
            <RemoveIssueBtn issueId={issue.id} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
