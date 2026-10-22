"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import type { StoredFile } from "@/lib/types";

export function ProductGallery({ images, alt }: { images: StoredFile[]; alt: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-black/5">
        <Package className="size-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
        <Image
          src={images[active].url}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.storagePath}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-white ring-1 transition-all",
                i === active ? "ring-2 ring-primary" : "ring-border opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img.url} alt="" fill sizes="96px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
