import {
  Stethoscope,
  Scan,
  Gauge,
  LineChart,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  scan: Scan,
  gauge: Gauge,
  lineChart: LineChart,
  shieldCheck: ShieldCheck,
  wrench: Wrench,
};

export function ServiceIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const Icon = serviceIconMap[iconKey] ?? Wrench;
  return <Icon className={className} />;
}
