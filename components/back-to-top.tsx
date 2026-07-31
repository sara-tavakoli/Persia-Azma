"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

export function BackToTop() {
  const t = useTranslations("common");
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.scrollY > 600
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t("backToTop")}
          className="fixed bottom-6 end-6 z-40 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
