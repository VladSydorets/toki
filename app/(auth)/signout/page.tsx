"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
      <p>Are you sure you want to sign out?</p>
      <Button
        variant="outline"
        color="indigo"
        className="w-fit"
        onClick={() => {
          signOut({ callbackUrl: "/", redirect: true });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
