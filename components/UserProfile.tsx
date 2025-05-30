"use client";

import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignOutModal from "./SignOutModal";
import Spinner from "./Spinner";

export default function UserProfile() {
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function getInitials(firstName: string, lastName: string) {
    return firstName[0] + lastName[0];
  }

  const fullName =
    (session?.user?.firstName || "") + " " + (session?.user?.lastName || "");

  if (status === "loading") return <Spinner size="lg" className="mr-1" />;
  return (
    <>
      {!session?.user ? (
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
          href="/login"
        >
          Sign In
        </Link>
      ) : (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 dark:bg-gray-900"
            >
              <Avatar className="w-9 h-9">
                <AvatarImage src={session?.user?.avatar} alt="User Avatar" />
                <AvatarFallback className="bg-gray-100 dark:bg-gray-900">
                  {getInitials(
                    session.user.firstName || "",
                    session.user.lastName || ""
                  )}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="px-2 min-w-40 sm:min-w-48"
          >
            <DropdownMenuLabel className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/profile"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                My Issues
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/settings"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <SignOutModal />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className="sm:hidden">
        <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 dark:bg-gray-900"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="px-2 min-w-32">
            <DropdownMenuItem>
              <Link
                href="/issues"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Issues
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/statistics"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Statistics
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
