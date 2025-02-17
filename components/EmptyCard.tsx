import { statusTextMap } from "@/app/issues/definitions";
import { AlertCircle } from "lucide-react";
import React from "react";
import { IssueStatus } from "@prisma/client";

export default function EmptyCard({ status }: { status: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-32 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
      <p className="text-sm text-gray-500">
        No {statusTextMap[status as IssueStatus].toLowerCase()} issues
      </p>
    </div>
  );
}
