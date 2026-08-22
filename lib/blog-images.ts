import type { BlogPostWithId } from "@/lib/data";

// Falls back to a relevant static photo when a post has no uploaded
// coverImage yet (see BlogPostDoc.coverImage in lib/types.ts).
const fallbackByPostId: Record<string, string> = {
  "role-of-calibration-in-quality-assurance": "/images/work/calibration-certificate.jpg",
  "calibration-verification-adjustment-difference": "/images/work/syringe-pump-calibration.jpg",
  "how-to-set-calibration-intervals": "/images/work/ph-meter-calibration.jpg",
  "why-measurement-uncertainty-matters": "/images/work/ct-scanner-qc.jpg",
  "medical-equipment-calibration-guide": "/images/work/patient-monitor-calibration.jpg",
};

const defaultFallback = "/images/work/calibration-certificate.jpg";

export function getBlogCoverImage(post: BlogPostWithId): string {
  return post.coverImage?.url ?? fallbackByPostId[post.id] ?? defaultFallback;
}
