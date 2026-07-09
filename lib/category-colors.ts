import type { ServiceCategory } from "@/lib/types";

export const categoryColorClasses: Record<
  ServiceCategory,
  { bg: string; text: string; ring: string }
> = {
  medical: {
    bg: "bg-cat-medical/12",
    text: "text-cat-medical",
    ring: "ring-cat-medical/20",
  },
  imaging: {
    bg: "bg-cat-imaging/12",
    text: "text-cat-imaging",
    ring: "ring-cat-imaging/20",
  },
  industrial: {
    bg: "bg-cat-industrial/15",
    text: "text-cat-industrial",
    ring: "ring-cat-industrial/25",
  },
  consulting: {
    bg: "bg-cat-consulting/15",
    text: "text-cat-consulting",
    ring: "ring-cat-consulting/25",
  },
};
