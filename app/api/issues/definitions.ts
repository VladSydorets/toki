import { z } from "zod";
export const markdownSchema = z.string().max(65535).min(1).optional();

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(256).optional(),
  description: markdownSchema,
  status: z
    .enum(["TO_DO", "IN_PROGRESS", "CODE_REVIEW", "COMPLETED"])
    .optional(),
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
