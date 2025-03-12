import { Metadata } from "next";
import IssuesTabs from "./components/IssuesTabs";

export const metadata: Metadata = {
  title: "User's Profile",
  description:
    "User's Profile with all of the issues assigned to and reported by the user.",
};

export default async function ProfilePage() {
  return (
    <main className="container mx-auto space-y-4 py-4 px-4 sm:px-6 lg:px-8">
      <IssuesTabs />
    </main>
  );
}
