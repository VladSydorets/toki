import { Issue, Priority, TaskStatus } from "@prisma/client";
import { z } from "zod";

export const NewIssueFormSchema = z.object({
  title: z.string().nonempty("Title is required."),
  description: z.string(),
  priority: z.enum([
    "MINOR",
    "LOWEST",
    "LOW",
    "MEDIUM",
    "HIGH",
    "HIGHEST",
    "CRITICAL",
  ]),
});

export const statusTextMap: Record<TaskStatus, string> = {
  TO_DO: "To do",
  IN_PROGRESS: "In progress",
  CODE_REVIEW: "Code review",
  COMPLETED: "Completed",
};

export const priorityTextMap: Record<Priority, string> = {
  MINOR: "Minor",
  LOWEST: "Lowest",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  HIGHEST: "Highest",
  CRITICAL: "Critical",
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
