// Keyed by service document id (== English slug, see scripts/seed.mjs) so
// every service gets its own distinct photo instead of sharing one image
// per category.
export const serviceImages: Record<string, string> = {
  "medical-equipment-quality-control": "/images/work/patient-monitor-calibration.jpg",
  "imaging-equipment-quality-control": "/images/work/ct-scanner-qc.jpg",
  "industrial-equipment-calibration": "/images/work/pressure-gauge-calibration.jpg",
  "physiotherapy-rehab-equipment-quality-control": "/images/physiotherapy-treatment.jpg",
  "staff-training-courses": "/images/work/ecg-monitor-documentation.jpg",
  "on-site-field-calibration": "/images/work/ventilator-field-calibration.jpg",
  "cleanroom-certification-iaq-monitoring": "/images/work/data-logger-monitoring.jpg",
  "calibration-management-system": "/images/work/autoclave-validation.jpg",
};

const fallback = "/images/hero-lab.jpg";

export function getServiceImage(serviceId: string): string {
  return serviceImages[serviceId] ?? fallback;
}
