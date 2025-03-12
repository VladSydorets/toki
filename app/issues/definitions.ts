import { Issue, IssueType, IssueStatus, IssuePriority } from "@prisma/client";
import { z } from "zod";
import {
  Inbox,
  CheckSquare,
  RotateCcw,
  Code,
  CheckCircle,
  XCircle,
} from "lucide-react";

export const IssueFormSchema = z.object({
  title: z.string().nonempty("Title is required."),
  description: z.string().optional(),
  type: z.enum(["BUG", "FEATURE", "ENHANCEMENT", "DOCUMENTATION", "OTHER"]),
  status: z.enum([
    "BACKLOG",
    "TO_DO",
    "IN_PROGRESS",
    "CODE_REVIEW",
    "COMPLETED",
    "CANCELED",
  ]),
  priority: z.enum([
    "MINOR",
    "LOWEST",
    "LOW",
    "MEDIUM",
    "HIGH",
    "HIGHEST",
    "CRITICAL",
  ]),
  assignedToId: z.number().nullable(),
  tags: z.string().array().optional(),
});

// Maps IssueType enum values to user-friendly display text for UI rendering
export const typeTextMap: Record<IssueType, string> = {
  BUG: "Bug",
  FEATURE: "Feature",
  ENHANCEMENT: "Enhancement",
  DOCUMENTATION: "Documentation",
  OTHER: "Other",
};

// Maps IssueStatus enum values to user-friendly display text for UI rendering
export const statusTextMap: Record<IssueStatus, string> = {
  BACKLOG: "Backlog",
  TO_DO: "To do",
  IN_PROGRESS: "In progress",
  CODE_REVIEW: "Code review",
  COMPLETED: "Completed",
  CANCELED: "Canceled",
};

// Maps IssuePriority enum values to user-friendly display text for UI rendering
export const priorityTextMap: Record<IssuePriority, string> = {
  MINOR: "Minor",
  LOWEST: "Lowest",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  HIGHEST: "Highest",
  CRITICAL: "Critical",
};

// Returns a color based on the given type value
export const getTypeColor = (type: Issue["type"]) => {
  switch (type) {
    case "BUG":
      return "bg-red-500";
    case "FEATURE":
      return "bg-blue-500";
    case "ENHANCEMENT":
      return "bg-green-500";
    case "DOCUMENTATION":
      return "bg-yellow-500";
    case "OTHER":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

// Returns a color based on the given status value
export const getStatusColor = (status: Issue["status"]) => {
  switch (status) {
    case "BACKLOG":
      return "bg-slate-400";
    case "TO_DO":
      return "bg-yellow-500";
    case "IN_PROGRESS":
      return "bg-blue-500";
    case "CODE_REVIEW":
      return "bg-purple-500";
    case "COMPLETED":
      return "bg-green-500";
    case "CANCELED":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

// Returns a color based on the given priority value
export const getPriorityColor = (priority: Issue["priority"]) => {
  switch (priority) {
    case "MINOR":
      return "bg-green-500";
    case "LOWEST":
      return "bg-blue-300";
    case "LOW":
      return "bg-blue-500";
    case "MEDIUM":
      return "bg-yellow-500";
    case "HIGH":
      return "bg-red-300";
    case "HIGHEST":
      return "bg-red-500";
    case "CRITICAL":
      return "bg-red-700";
    default:
      return "bg-gray-500";
  }
};

// Returns an icon component based on the given IssueStatus
export const getStatusIcon = (status: IssueStatus) => {
  switch (status) {
    case "BACKLOG":
      return Inbox;
    case "TO_DO":
      return CheckSquare;
    case "IN_PROGRESS":
      return RotateCcw;
    case "CODE_REVIEW":
      return Code;
    case "COMPLETED":
      return CheckCircle;
    case "CANCELED":
      return XCircle;
    default:
      return CheckSquare;
  }
};

// Exports arrays of all possible issue types/statuses/priorities from the enum values in the Prisma schema
export const allTypes: IssueType[] = Object.values(IssueType);
export const allStatuses: IssueStatus[] = Object.values(IssueStatus);
export const allPriorities: IssuePriority[] = Object.values(IssuePriority);
