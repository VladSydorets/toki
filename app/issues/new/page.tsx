import React from "react";
import IssueForm from "../components/IssueForm";
import { Metadata } from "next";
import { getAllUsers } from "@/lib/users";

export const metadata: Metadata = {
  title: "Create a New Issue",
  description: "Fill out the form to create a new issue.",
};

export default async function NewIssuePage() {
  const users = await getAllUsers();
  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <IssueForm users={users} />
    </main>
  );
}
