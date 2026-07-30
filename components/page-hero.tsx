import Image from "next/image";
import { FadeIn } from "@/components/fade-in";

export function PageHero({
  title,
  subtitle,
  image = "/images/facility-interior.jpg",
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="bg-hero-scrim relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <FadeIn className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-balance text-white/85">
            {subtitle}
          </p>
        )}
      </FadeIn>
    </section>
  );
}
