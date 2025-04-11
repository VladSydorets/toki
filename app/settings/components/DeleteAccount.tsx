"use client";

import { Trash } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/utility/ErrorMessage";

export default function DeleteAccount({ userId }: { userId: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleUserDelete = async () => {
    setError("");
    try {
      if (email !== user?.email) {
        setError("Email does not match. Please try again.");
        return;
      }
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
            <div className="">
              <Label>Please type {user?.email} to confirm</Label>
              <Input
                id="email"
                type="text"
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
              {error && <ErrorMessage errorMessage={error} />}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Button variant="ghost" color="gray">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button variant="destructive" onClick={handleUserDelete}>
                Delete Account
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
