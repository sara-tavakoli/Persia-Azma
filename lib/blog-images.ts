import type { BlogPostWithId } from "@/lib/data";

// Falls back to a relevant static photo when a post has no uploaded
// coverImage yet (see BlogPostDoc.coverImage in lib/types.ts).
const fallbackByPostId: Record<string, string> = {
  "role-of-calibration-in-quality-assurance": "/images/industrial-gauge2.jpg",
};

const defaultFallback = "/images/industrial-gauge2.jpg";

export function getBlogCoverImage(post: BlogPostWithId): string {
  return post.coverImage?.url ?? fallbackByPostId[post.id] ?? defaultFallback;
}
