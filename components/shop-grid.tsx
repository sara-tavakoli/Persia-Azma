"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/spotlight-card";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import type { ProductCategory } from "@/lib/types";

export type ShopGridItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: ProductCategory;
  imageUrl?: string;
  priceLabel: string;
  inStock: boolean;
};

export function ShopGrid({
  products,
  categoryLabels,
  allLabel,
  outOfStockLabel,
}: {
  products: ShopGridItem[];
  categoryLabels: Record<ProductCategory, string>;
  allLabel: string;
  outOfStockLabel: string;
}) {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const present = (Object.keys(categoryLabels) as ProductCategory[]).filter((c) =>
    products.some((p) => p.category === c)
  );
  const visible = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      {present.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {(["all", ...present] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {c === "all" ? allLabel : categoryLabels[c]}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <Link key={product.id} href={`/shop/${product.slug}`} className="group block h-full">
            <SpotlightCard className="h-full rounded-xl">
              <Card className="h-full overflow-hidden py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-white">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                      <Package className="size-12" />
                    </div>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="absolute top-3 start-3">
                      {outOfStockLabel}
                    </Badge>
                  )}
                </div>
                <CardHeader className="pt-4">
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between gap-2 pb-4">
                  <Badge variant="outline">{categoryLabels[product.category]}</Badge>
                  <span className="font-heading text-sm font-semibold text-primary">
                    {product.priceLabel}
                  </span>
                </CardContent>
              </Card>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </>
  );
}
