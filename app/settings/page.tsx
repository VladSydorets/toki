import { Metadata } from "next";
import { getServerSession } from "next-auth";

import prisma from "@/lib/db";

import { authOptions } from "../(auth)/AuthOptions";
import RoleBadge from "./components/RoleBadge";
import SettingsTabs from "./components/SettingsTabs";

// import Image from "next/image";

export const metadata: Metadata = {
  title: "User's Settings",
  description: "A place where a user can change his personal information.",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <main className="container mx-auto space-y-4 py-4 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        {user && (
          <div className="p-6 flex gap-10">
            <div className="relative -mt-16 md:-mt-20">
              <span className="bg-red-400 relative flex shrink-0 overflow-hidden rounded-full h-24 w-24 md:h-32 md:w-32 border-4 border-background">
                {/* <Image
                  src={user.avatar || ""}
                  alt="User's image"
                  width={24}
                  height={24}
                ></Image> */}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <RoleBadge role={user.role} />
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  Joined on {new Date(user.createdAt).toDateString()}
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
