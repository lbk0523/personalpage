import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    type: z.enum(['essay', 'note']),
    topics: z.array(z.string()).default([]),
    series: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string().optional(),
    role: z.string().optional(),
    organization: z.string().optional(),
    kind: z.enum(['professional', 'personal']),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, work };
