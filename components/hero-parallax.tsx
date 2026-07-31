"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}
