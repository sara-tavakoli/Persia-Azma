import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localePrefix: "always",
  // Always default new visitors to Farsi regardless of browser language;
  // the language switcher still lets them opt into English explicitly.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
