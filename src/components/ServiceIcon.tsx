import {
  ShieldPlus, Droplets, Activity, Crown, Anchor, Sparkles, Stethoscope, Smile, Rows3, Leaf, type LucideIcon,
} from "lucide-react";
import type { ServiceId } from "@/content/clinic";

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  zachowawcza: ShieldPlus,
  higienizacja: Droplets,
  endodoncja: Activity,
  protetyka: Crown,
  implantologia: Anchor,
  estetyczna: Sparkles,
  chirurgia: Stethoscope,
  dziecieca: Smile,
  ortodoncja: Rows3,
  periodontologia: Leaf,
};
