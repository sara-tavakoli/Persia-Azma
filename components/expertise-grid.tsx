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
          className="group flex flex-col items-center justify-center gap-3 border-b border-e border-border/60 px-3 py-8 text-center transition-colors duration-300 hover:bg-primary"
        >
          <div className="flex size-14 items-center justify-center rounded-full text-primary ring-1 ring-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:ring-white/70">
            <Icon className="size-6" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium transition-colors duration-300 group-hover:text-white">
            {getLabel(key)}
          </span>
        </FadeInStaggerItem>
      ))}
    </FadeInStagger>
  );
}
