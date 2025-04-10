"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function SignOutModal() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start px-2 py-1.5 text-sm font-normal"
        >
          Sign out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[300px] md:max-w-[400px] lg:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
            Yes, sign me out
          </Button>
          <Button className="bg-indigo-500" onClick={() => setModalOpen(false)}>
            No, take me back
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
