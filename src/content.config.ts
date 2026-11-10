import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Build-time validation for research-backed homeowner guides.
 * Astro 5+ content layer: content files live in src/content/guides/.
 * New articles must not impersonate professionals or invent editorial review.
 */
const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string().min(12).max(120),
    description: z.string().min(60).max(190),
    category: z.string().min(3).max(50),
    minutes: z.number().int().min(1).max(45),
    intro: z.string().min(80).max(700),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    publisher: z.literal("Upkeep Atlas"),
    reviewStatus: z.enum([
      "ai-assisted-not-expert-reviewed",
      "human-editor-reviewed",
      "qualified-professional-reviewed"
    ]),
    risk: z.enum(["low", "medium", "high"]),
    sources: z.array(z.enum(["epa", "energy", "hvac", "cpsc", "air", "ftc", "irs"])).min(1)
  }).superRefine((data, ctx) => {
    if (data.updatedAt && data.updatedAt.getTime() < data.publishedAt.getTime()) {
      ctx.addIssue({code:"custom",message:"updatedAt cannot predate publishedAt",path:["updatedAt"]});
    }
  })
});

export const collections = { guides };
