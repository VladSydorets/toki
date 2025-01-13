"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RemoveIssueBtn({ issueId }: { issueId: number }) {
  const router = useRouter();
  const handleIssueDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Issue deleted successfully.");
        router.push("/issues");
      } else {
        await response.json();
        alert("Failed to delete issue.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the issue.");
    }
  };

  return (
    <Button onClick={() => handleIssueDelete(issueId)}>Delete Issue</Button>
  );
}
