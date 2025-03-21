import Link from "next/link";

import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

import NewIssueBtn from "./NewIssueBtn";
import UserProfile from "./UserProfile";

export async function Navbar() {
  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-10 h-16">
          <Link href="/" className="flex items-center gap-1">
            <div className="rounded-md p-1">
              <Image
                src="/favicon.svg"
                alt="logo"
                width="35"
                height="35"
              ></Image>
            </div>
            <span className="hidden sm:inline-block font-bold text-xl">
              Toki
            </span>
          </Link>
          <div className="hidden sm:flex items-baseline gap-x-5">
            <Link
              href="/issues"
              className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
            >
              All Issues
            </Link>
            <Link
              href="/statistics"
              className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
            >
              Statistics
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <NewIssueBtn variant="outline" hideOnHome />
          <div>
            <ThemeToggle />
          </div>
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
