"use client";

import { motion } from "motion/react";

export function ConnectorLine() {
  return (
    <div className="pointer-events-none absolute inset-x-8 top-9 hidden lg:block">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-px origin-left bg-gradient-to-r from-transparent via-border to-transparent rtl:origin-right"
      />
    </div>
  );
}
