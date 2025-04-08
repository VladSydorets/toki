"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyRound, User, Ban } from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import PasswordForm from "./PasswordForm";
import DeleteAccount from "./DeleteAccount";
import { User as UserType } from "@prisma/client";

export default function SettingsTabs({ userData }: { userData: UserType }) {
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <Tabs
      defaultValue="personal-info"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6"
    >
      <TabsList className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 grid grid-cols-3">
        <TabsTrigger
          value="personal-info"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Personal Info</span>
          <span className="sm:hidden">Info</span>
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <KeyRound className="h-4 w-4" />
          <span>Change Password</span>
        </TabsTrigger>
        <TabsTrigger
          value="delete-account"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <Ban className="h-4 w-4" />
          <span>Delete Account</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal-info" className="space-y-6">
        {userData && <PersonalInfoForm userData={userData} />}
      </TabsContent>

      <TabsContent value="password" className="space-y-6">
        <PasswordForm />
      </TabsContent>

      <TabsContent value="delete-account" className="space-y-6">
        <DeleteAccount userId={userData.id} />
      </TabsContent>
    </Tabs>
  );
}
