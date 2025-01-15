"use client";

import { Button } from "@/components/ui/button";
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

export function RemoveIssueBtn({ issueId }: { issueId: number }) {
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
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" className="p-3">
            Delete issue
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="mb-4">
              This action cannot be undone. This action will permanently delete
              an issue.
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
    </>
  );
}
