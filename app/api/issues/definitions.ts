import { z } from "zod";

// At least one property is required for patch
export const patchIssueSchema = z
  .object({
    title: z.string().min(1).max(256).optional(),
    description: z.string().max(1000).optional(),
    type: z
      .enum(["BUG", "FEATURE", "ENHANCEMENT", "DOCUMENTATION", "OTHER"])
      .optional(),
    status: z
      .enum([
        "BACKLOG",
        "TO_DO",
        "IN_PROGRESS",
        "CODE_REVIEW",
        "COMPLETED",
        "CANCELED",
      ])
      .optional(),
    priority: z
      .enum(["MINOR", "LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST", "CRITICAL"])
      .optional(),
    assignedToId: z.string().nullable().optional(),
    tags: z.string().array().optional(),
  })
  .refine(
    ({ title, description, status, priority, assignedToId, tags }) =>
      title !== undefined ||
      description !== undefined ||
      status !== undefined ||
      priority !== undefined ||
      assignedToId !== undefined ||
      tags !== undefined,
    { message: "One of the fields must be defined" }
  );

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
  assignedToId: z.string().nullable(),
  tags: z.string().array().optional(),
});
