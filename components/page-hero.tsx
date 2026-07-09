import { FadeIn } from "@/components/fade-in";

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-mesh bg-noise relative overflow-hidden border-b border-border bg-background">
      <FadeIn className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            {subtitle}
          </p>
        )}
      </FadeIn>
    </section>
  );
}
