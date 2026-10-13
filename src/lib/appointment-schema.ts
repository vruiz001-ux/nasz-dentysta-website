import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{9,20}$/),
  email: z.union([z.literal(""), z.email().max(120)]),
  service: z.string().max(40),
  date: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
  message: z.string().max(1000),
  consent: z.literal(true),
  locale: z.enum(["pl", "fr", "uk"]),
  // spam protection
  website: z.string().max(200), // honeypot — must be empty, checked in the route
  startedAt: z.number(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
