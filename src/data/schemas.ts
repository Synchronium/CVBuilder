import { z } from "zod";

const optionalString = z.string().optional().default("");

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  linkedin: z.string().url().optional(),
  address: z.object({
    line1: z.string(),
    locality: z.string(),
    region: z.string(),
    postcode: z.string(),
    country: z.string()
  })
});

export const personSchema = z.object({
  id: z.string(),
  name: z.string(),
  headline: z.string(),
  contact: contactSchema,
  workAuthorisation: z.string()
});

export const positionSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.string(),
  end: z.string().optional(),
  scope: optionalString
});

export const bulletSchema = z.object({
  id: z.string(),
  text: z.string(),
  detail: z.string().optional()
});

export const roleSchema = z.object({
  id: z.string(),
  condensed: z.boolean().optional().default(false),
  company: z.object({
    name: z.string(),
    description: optionalString,
    websites: z.array(z.object({ label: z.string(), url: z.string() })).default([])
  }),
  product: z.string().optional(),
  positions: z.array(positionSchema).min(1),
  bullets: z.array(bulletSchema),
  tech: z.array(z.string()).default([]),
  interactive: z
    .object({
      context: optionalString
    })
    .optional()
});

export const educationItemSchema = z.object({
  id: z.string(),
  qualification: z.string(),
  grade: z.string(),
  institution: z.string(),
  start: z.string(),
  end: z.string()
});

export const cvSchema = z.object({
  schemaVersion: z.string(),
  metadata: z.object({
    source: z.object({
      type: z.string(),
      file: z.string(),
      extractedAt: z.string()
    }),
    defaultLocale: z.string(),
    notes: z.array(z.string()).default([])
  }),
  person: personSchema,
  summary: z.string(),
  roles: z.array(roleSchema),
  education: z.array(educationItemSchema),
  interests: z.string().optional()
});

export type Contact = z.infer<typeof contactSchema>;
export type Person = z.infer<typeof personSchema>;
export type Position = z.infer<typeof positionSchema>;
export type Bullet = z.infer<typeof bulletSchema>;
export type Role = z.infer<typeof roleSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type CV = z.infer<typeof cvSchema>;
