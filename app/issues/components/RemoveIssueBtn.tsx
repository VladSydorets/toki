"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function RemoveIssueBtn({
  issueId,
  isDisabled,
}: {
  issueId: number;
  isDisabled?: boolean;
}) {
  const router = useRouter();
  const handleIssueDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/issues");
      } else {
        await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={isDisabled}
          className="p-3 flex items-center gap-1"
        >
          <Trash className="stroke-2 size-4 mb-[1px]" />
          Delete issue
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="mb-4">
            This action cannot be undone. This action will permanently delete an
            issue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="ghost" color="gray">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction className="p-0">
            <Button onClick={() => handleIssueDelete(issueId)}>
              Delete Issue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
