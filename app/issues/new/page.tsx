import React from "react";
import IssueForm from "../components/IssueForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Issue",
  description: "Fill out the form to create a new issue.",
};

export default function NewIssuePage() {
  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <IssueForm />
    </main>
  );
}
