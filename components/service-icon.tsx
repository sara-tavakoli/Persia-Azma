import {
  Stethoscope,
  Scan,
  Gauge,
  LineChart,
  ShieldCheck,
  Wrench,
  Activity,
  GraduationCap,
  Truck,
  Wind,
  Database,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  scan: Scan,
  gauge: Gauge,
  lineChart: LineChart,
  shieldCheck: ShieldCheck,
  wrench: Wrench,
  activity: Activity,
  graduationCap: GraduationCap,
  truck: Truck,
  wind: Wind,
  database: Database,
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
