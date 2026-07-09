import { notFound } from "next/navigation";
import { adminGetBlogPost } from "@/lib/admin-data";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await adminGetBlogPost(id);
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">ویرایش مقاله</h1>
      <div className="mt-6">
        <BlogForm post={post} />
      </div>
    </div>
  );
}
