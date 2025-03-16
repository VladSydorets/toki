import { Clock } from "lucide-react";
import React from "react";

export default function CreatedAt({
  createdAt,
  className,
}: {
  createdAt: Date;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-xs text-muted-foreground gap-1 ${className}`}
    >
      <Clock className="stroke-2 size-3 mb-[1px]" />
      {createdAt.toLocaleDateString()}
    </span>
  );
}
