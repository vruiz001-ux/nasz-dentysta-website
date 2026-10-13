import { clinic, type ServiceId } from "@/content/clinic";

/**
 * Preview mode (NEXT_PUBLIC_PREVIEW=1) shows every service category so the
 * design can be reviewed before the clinic's real list is filled in.
 * Shows a visible banner and sets noindex. Remove the variable once real data is in.
 */
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";

export const ALL_SERVICES: ServiceId[] = [
  "zachowawcza",
  "higienizacja",
  "endodoncja",
  "protetyka",
  "implantologia",
  "estetyczna",
  "chirurgia",
  "dziecieca",
  "ortodoncja",
  "periodontologia",
];

export const activeServices = (): ServiceId[] =>
  clinic.services.length ? clinic.services : isPreview ? ALL_SERVICES : [];

