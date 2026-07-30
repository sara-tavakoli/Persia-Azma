"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const locale = useLocale();
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-hidden bg-primary text-primary-foreground"
    >
      <Link
        href="/certificates"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-sm hover:bg-white/5 sm:px-6"
      >
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
        </span>
        <BadgeCheck className="size-4 shrink-0" />
        <span>
          <strong className="font-semibold">{t("badge")}</strong>{" "}
          {t("text")}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 underline underline-offset-2">
          {t("cta")}
          <ArrowIcon className="size-3.5" />
        </span>
      </Link>
    </motion.div>
  );
}
