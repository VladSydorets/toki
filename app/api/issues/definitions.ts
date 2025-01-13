import { z } from "zod";

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256).optional(),
  description: z.string().min(1).max(1000).optional(),
  type: z
    .enum(["BUG", "FEATURE", "ENHANCEMENT", "DOCUMENTATION", "OTHER"])
    .optional(),
  status: z
    .enum(["TO_DO", "IN_PROGRESS", "CODE_REVIEW", "COMPLETED"])
    .optional(),
  priority: z
    .enum(["MINOR", "LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST", "CRITICAL"])
    .optional(),
});

export const issuePostRequestSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(1000),
  type: z
    .enum(["BUG", "FEATURE", "ENHANCEMENT", "DOCUMENTATION", "OTHER"])
    .optional(),
  status: z
    .enum(["TO_DO", "IN_PROGRESS", "CODE_REVIEW", "COMPLETED"])
    .optional(),
  priority: z
    .enum(["MINOR", "LOWEST", "LOW", "MEDIUM", "HIGH", "HIGHEST", "CRITICAL"])
    .optional(),
});
