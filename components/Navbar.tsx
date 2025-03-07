import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/AuthOptions";

import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  function getInitials(fullName: string) {
    const names = fullName.split(" ");
    return names.map((name) => name[0]).join("");
  }

  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-10 h-16">
          <Link href="/" className="text-xl font-bold">
            Issue Tracker
          </Link>
          <div className="flex items-baseline gap-x-5">
            <Link
              href="/issues"
              className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
            >
              Issues
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
          <div>
            <ThemeToggle />
          </div>
          {!session?.user ? (
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
              href="/auth/signin"
            >
              Sign In
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-100 dark:bg-gray-900"
                >
                  {session?.user?.image ? (
                    <Image
                      className="rounded-full"
                      width={30}
                      height={30}
                      alt="User Avatar"
                      src={session?.user?.image || ""}
                    />
                  ) : (
                    getInitials(session?.user?.name)
                  )}
                  {/* <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="px-2 min-w-48">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>New Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/signout">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
