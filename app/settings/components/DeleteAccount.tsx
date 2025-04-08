"use client";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DeleteAccount({ userId }: { userId: string }) {
  const router = useRouter();

  const handleUserDelete = async () => {
    try {
      signOut({ callbackUrl: "/", redirect: true });

      const response = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          If you wish to delete your account, you can do so here
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          No longer using the Toki app? You may delete your account and all
          associated data. This cannot be undone, so please be certain.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="p-3 flex items-center gap-1"
            >
              <Trash className="stroke-2 size-4 mb-[1px]" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="mb-4">
                This action cannot be undone. This action will permanently
                delete your account and all associated data (inlcuding all
                reported by you issues).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button variant="ghost" color="gray">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction className="p-0">
                <Button onClick={() => handleUserDelete()}>
                  Delete Account
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
