import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectLink = z.object({
  label: z.string(),
  url: z.url(),
});

const projectSection = z.object({
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
  bullets: z.array(z.string()).min(1),
});

const mediaItem = z.object({
  title: z.string(),
  caption: z.string(),
  variant: z.enum(['phone', 'dashboard', 'system', 'operations']),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    summary: z.string(),
    description: z.string(),
    status: z.string(),
    privacy: z.enum(['Public product', 'Private system']),
    role: z.string(),
    year: z.string(),
    technologies: z.array(z.string()).min(1),
    featuredOrder: z.number().int().positive(),
    accent: z.enum(['orange', 'blue', 'steel']),
    links: z.array(projectLink),
    facts: z.array(z.object({ value: z.string(), label: z.string() })).length(3),
    challenge: z.string(),
    response: z.string(),
    sections: z.array(projectSection).min(2),
    media: z.array(mediaItem).min(2),
    outcomes: z.array(z.string()).min(2),
    architecture: z.array(z.string()).min(3).max(5),
    disclosure: z.string(),
  }),
});

export const collections = { projects };
