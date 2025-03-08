"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IssueForm from "./IssueForm";
import { useState } from "react";
import useIssue from "@/hooks/useIssue";

export default function IssueEditModal({ issueId }: { issueId: number }) {
  const [open, setOpen] = useState(false);

  const { issue, error, isLoading } = useIssue(issueId);

  if (isLoading) return <p>Loading...</p>;

  if (error || !issue) {
    return <div>Issue not found</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-500 flex items-center gap-1 text-white"
          onClick={() => setOpen(true)}
        >
          <Pencil className="stroke-2 size-4 mb-[1px]" /> Edit an issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit an issue</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <IssueForm issue={issue} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
