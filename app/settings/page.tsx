import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  Mail,
  Clock,
  Activity,
  Users,
} from "lucide-react";
import Image from "next/image";

import prisma from "@/lib/db";

import { authOptions } from "../(auth)/AuthOptions";
import RoleBadge from "./components/RoleBadge";
import SettingsTabs from "./components/SettingsTabs";

export const metadata: Metadata = {
  title: "User's Settings",
  description: "A place where a user can change his personal information.",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  // Get user with assigned issues count
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      _count: {
        select: {
          assignedIssues: true,
          reportedIssues: true,
        },
      },
    },
  });

  // Get the user's active issues
  const activeIssues = await prisma.issue.count({
    where: {
      assignedToId: session?.user.id,
      status: {
        not: {
          in: ["COMPLETED", "CANCELED"],
        },
      },
    },
  });

  // Calculate user activity metrics
  const daysSinceJoined = Math.floor(
    (new Date().getTime() - new Date(user?.createdAt || 0).getTime()) /
      (1000 * 3600 * 24)
  );
  const issuesPerDay =
    daysSinceJoined > 0
      ? (user?._count?.assignedIssues || 0) / daysSinceJoined
      : 0;

  return (
    <main className="container mx-auto space-y-6 py-4 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
              {user?.role === "ADMIN"
                ? "Administrator"
                : user?.role === "MANAGER"
                ? "Project Manager"
                : "Team Member"}
            </Badge>
          </div>
        </div>
        {user && (
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col items-center">
              <div className="relative -mt-24 md:-mt-28">
                <span className="bg-gradient-to-br from-red-400 to-pink-500 relative flex shrink-0 overflow-hidden rounded-full h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-xl">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={`${user.firstName}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-white font-bold">
                      {`${user.firstName?.charAt(0) || ""}${
                        user.lastName?.charAt(0) || ""
                      }`}
                    </div>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-1 mt-4 items-center">
                <RoleBadge role={user.role} className="mt-2" />
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-grow">
              <div>
                <h2 className="text-3xl font-bold">{`${user.firstName || ""} ${
                  user.lastName || ""
                }`}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/30 border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-2">
                      <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <CardDescription>Member Since</CardDescription>
                      <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/30 border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-2">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardDescription>Issues Assigned</CardDescription>
                      <p className="font-medium">
                        {user._count?.assignedIssues || 0} total
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/50 dark:to-red-950/30 border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-pink-100 dark:bg-pink-900/50 rounded-full p-2">
                      <Activity className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <CardDescription>Active Issues</CardDescription>
                      <p className="font-medium">{activeIssues} in progress</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">
                      {user._count?.reportedIssues || 0}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      issues reported
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">{daysSinceJoined}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      days as member
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">
                      {issuesPerDay.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      issues per day
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {user && <SettingsTabs userData={user} />}
    </main>
  );
}
