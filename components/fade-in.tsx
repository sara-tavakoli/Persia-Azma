"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// once: true means each section reveals the first time it scrolls into
// view and then stays visible - never re-hides, never re-triggers.
// amount is deliberately tiny (not e.g. 0.2): for a tall multi-row grid,
// a 20%-of-the-whole-container threshold isn't met until the container is
// mostly scrolled past, leaving a large blank gap on mobile before content
// appears. Triggering as soon as any part is visible reveals it promptly.
const viewport = { once: true, amount: 0.01, margin: "0px 0px -60px 0px" } as const;

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
