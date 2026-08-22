import { Fragment } from "react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";

export type Crumb = { label: string; href?: string };

function toAbsoluteUrl(locale: string, href?: string) {
  if (!href) return undefined;
  return href === "/" ? `${siteConfig.url}/${locale}` : `${siteConfig.url}/${locale}${href}`;
}

export function Breadcrumbs({
  items,
  locale,
}: {
  items: Crumb[];
  locale: "fa" | "en";
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsoluteUrl(locale, item.href),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" className="border-b border-border bg-muted/30">
        <ol className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-3 text-sm text-muted-foreground sm:px-6">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Fragment key={index}>
                {index > 0 && <span className="text-muted-foreground/40">/</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-foreground hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-foreground">
                    {item.label}
                  </span>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
