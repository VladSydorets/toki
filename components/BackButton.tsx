"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="flex gap-2 p-0 items-center text-sm text-muted-foreground bg-transparent hover:bg-transparent hover:text-foreground mb-2"
    >
      <ArrowLeft className="h-5 w-5" />
      Back to previous page
    </Button>
  );
}
