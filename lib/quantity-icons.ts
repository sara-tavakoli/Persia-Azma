import {
  Gauge,
  Thermometer,
  Zap,
  Ruler,
  Weight,
  Beaker,
  Waves,
  ArrowDownUp,
  RotateCw,
  Timer,
  Droplets,
  Flashlight,
  Wind,
  type LucideIcon,
} from "lucide-react";

// The 13 measurement quantities Persia Azma calibrates, matching the
// industrial-equipment-calibration service body. Shared between the
// homepage "expertise" grid and the About page's parameters section so
// both stay in sync with one source of truth.
export const calibrationQuantities: { key: string; Icon: LucideIcon }[] = [
  { key: "pressure", Icon: Gauge },
  { key: "temperature", Icon: Thermometer },
  { key: "electrical", Icon: Zap },
  { key: "dimensional", Icon: Ruler },
  { key: "massBalance", Icon: Weight },
  { key: "volume", Icon: Beaker },
  { key: "flow", Icon: Waves },
  { key: "forceLoad", Icon: ArrowDownUp },
  { key: "torque", Icon: RotateCw },
  { key: "timeFrequency", Icon: Timer },
  { key: "humidity", Icon: Droplets },
  { key: "opticalLaser", Icon: Flashlight },
  { key: "gas", Icon: Wind },
];
