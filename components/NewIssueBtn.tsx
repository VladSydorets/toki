"use client";

import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Variant = "primary" | "outline";

interface Props {
  variant?: Variant;
  hideOnHome?: boolean;
}

export default function NewIssueBtn({
  variant = "primary",
  hideOnHome = false,
}: Props) {
  const pathname = usePathname();

  if (hideOnHome && pathname === "/") return null;
  return (
    <Link
      href={"/issues/new"}
      aria-label="Create new issue"
      className={`font-medium text-sm py-2 px-4 rounded-lg inline-flex items-center gap-1 transition-colors ${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <CirclePlus className="stroke-2 size-4 mb-[1px]" />
      New Issue
    </Link>
  );
}
