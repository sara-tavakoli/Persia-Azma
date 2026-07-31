import { calibrationQuantities } from "@/lib/quantity-icons";
import { FadeInStagger, FadeInStaggerItem } from "@/components/fade-in";

// Matches the reference site's "Our Expertise" section: a borderless-card,
// hairline-divided grid (9 columns x 2 rows on desktop), outlined circular
// icons, and a solid-fill navy hover state on the whole cell.
export function ExpertiseGrid({
  getLabel,
}: {
  getLabel: (key: string) => string;
}) {
  return (
    <FadeInStagger className="grid grid-cols-3 border-s border-t border-border/60 sm:grid-cols-6 lg:grid-cols-9">
      {calibrationQuantities.map(({ key, Icon }) => (
        <FadeInStaggerItem
          key={key}
          className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden border-b border-e border-border/60 px-3 py-8 text-center"
        >
          <div
            aria-hidden
            className="absolute inset-0 origin-top scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100"
          />
          <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-primary/8 text-primary shadow-sm ring-1 ring-primary/30 transition-all duration-300 group-hover:scale-[1.15] group-hover:bg-white/15 group-hover:text-white group-hover:shadow-lg group-hover:ring-white/70">
            <Icon className="size-7" strokeWidth={1.75} />
          </div>
          <span className="relative z-10 text-sm font-medium transition-colors duration-300 group-hover:text-white">
            {getLabel(key)}
          </span>
        </FadeInStaggerItem>
      ))}
    </FadeInStagger>
  );
}
