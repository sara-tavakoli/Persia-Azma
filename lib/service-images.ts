// Keyed by service document id (== English slug, see scripts/seed.mjs) so
// every service gets its own distinct photo instead of sharing one image
// per category.
export const serviceImages: Record<string, string> = {
  "medical-equipment-quality-control": "/images/work/patient-monitor-calibration.jpg",
  "imaging-equipment-quality-control": "/images/work/ct-scanner-qc.jpg",
  "industrial-equipment-calibration": "/images/industrial-gauge2.jpg",
  "physiotherapy-rehab-equipment-quality-control": "/images/physiotherapy-treatment.jpg",
  "staff-training-courses": "/images/training-workshop.jpg",
  "on-site-field-calibration": "/images/field-technician.jpg",
  "cleanroom-certification-iaq-monitoring": "/images/cleanroom-technicians.jpg",
  "calibration-management-system": "/images/calibration-management.jpg",
};

const fallback = "/images/hero-lab.jpg";

export function getServiceImage(serviceId: string): string {
  return serviceImages[serviceId] ?? fallback;
}
