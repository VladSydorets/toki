import { z } from "zod";

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256).optional(),
  description: z.string().max(1000).optional(),
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
  assignedToId: z.number().nullable().optional(),
  tags: z.string().array().optional(),
});

export const issuePostRequestSchema = z.object({
  title: z.string().min(1, "Title is required").max(256),
  description: z.string().max(1000).optional(),
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
  assignedToId: z.number().nullable().optional(),
  tags: z.string().array().optional(),
});
