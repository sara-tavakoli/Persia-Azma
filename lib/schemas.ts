import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(30),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(["fa", "en"]),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(200),
  company: z.string().trim().max(200),
  email: z.email().max(200),
  phone: z.string().trim().min(6).max(30),
  serviceInterest: z.string().trim().max(200),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(["fa", "en"]),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;

export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];
export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_ATTACHMENTS = 3;
