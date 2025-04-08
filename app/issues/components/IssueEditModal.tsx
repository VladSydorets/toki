"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Issue, User } from "@prisma/client";

import IssueForm from "./IssueForm";

interface Props {
  issue: Issue;
  users: User[];
  isDisabled?: boolean;
}

export default function IssueEditModal({ issue, users, isDisabled }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-500 flex items-center gap-1 text-white"
          disabled={isDisabled}
          onClick={() => setOpen(true)}
        >
          <Pencil className="stroke-2 size-4 mb-[1px]" /> Edit an issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit an issue</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <IssueForm
          issue={issue}
          users={users}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
