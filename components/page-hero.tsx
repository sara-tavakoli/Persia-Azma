import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { HeroParallax } from "@/components/hero-parallax";

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
      <HeroParallax>
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      </HeroParallax>
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
