import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">مقاله جدید</h1>
      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  );
}
