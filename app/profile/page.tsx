import { Metadata } from "next";
import StatusCardsWrapper from "./components/StatusCardsWrapper";

export const metadata: Metadata = {
  title: "User's Profile",
  description:
    "User's Profile with all of the issues assigned to and reported by the user.",
};

export default async function ProfilePage() {
  return (
    <main className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight">My Issues</h2>
      <StatusCardsWrapper />
    </main>
  );
}
