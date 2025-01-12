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
