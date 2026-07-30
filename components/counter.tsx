"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

export function Counter({
  value,
  decimals = 0,
  locale,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  locale: "fa" | "en";
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [isInView, value]);

  const formatted = display.toLocaleString(locale === "fa" ? "fa-IR" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
