import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tCommon = await getTranslations("common");

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <FadeIn className="flex flex-col items-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </div>
        <p className="font-mono mt-6 text-sm font-medium tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            {tCommon("backToHome")}
          </Link>
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("viewServices")}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
