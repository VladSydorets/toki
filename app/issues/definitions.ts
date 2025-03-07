import { Issue, IssueType, IssueStatus, IssuePriority } from "@prisma/client";
import { z } from "zod";

export const NewIssueFormSchema = z.object({
  title: z.string().nonempty("Title is required."),
  description: z.string(),
  type: z
    .enum(["BUG", "FEATURE", "ENHANCEMENT", "DOCUMENTATION", "OTHER"])
    .optional(),
  status: z
    .enum(["TO_DO", "IN_PROGRESS", "CODE_REVIEW", "COMPLETED", "CANCELED"])
    .optional(),
  priority: z
    .enum(["MINOR", "LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST", "CRITICAL"])
    .optional(),
});

export const typeTextMap: Record<IssueType, string> = {
  BUG: "Bug",
  FEATURE: "Feature",
  ENHANCEMENT: "Enhancement",
  DOCUMENTATION: "Documentation",
  OTHER: "Other",
};

export const statusTextMap: Record<IssueStatus, string> = {
  TO_DO: "To do",
  IN_PROGRESS: "In progress",
  CODE_REVIEW: "Code review",
  COMPLETED: "Completed",
  CANCELED: "Canceled",
};

export const priorityTextMap: Record<IssuePriority, string> = {
  MINOR: "Minor",
  LOWEST: "Lowest",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  HIGHEST: "Highest",
  CRITICAL: "Critical",
};

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
    default:
      return "bg-gray-500";
  }
};

export const getStatusColor = (status: Issue["status"]) => {
  switch (status) {
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
