"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <p>Are you sure you want to sign out?</p>
      <Button
        variant="outline"
        color="indigo"
        onClick={() => {
          console.log("hallo");
          signOut({ callbackUrl: "/", redirect: true });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
