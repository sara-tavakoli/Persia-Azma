"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveBlogPost } from "@/app/admin/(protected)/blog/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlogPostWithId } from "@/lib/data";

export function BlogForm({ post }: { post?: BlogPostWithId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPublished, setIsPublished] = useState(post?.isPublished ?? false);

  async function action(formData: FormData) {
    startTransition(async () => {
      try {
        await saveBlogPost(formData);
        toast.success("مقاله ذخیره شد.");
        router.push("/admin/blog");
      } catch {
        toast.error("خطا در ذخیره‌سازی.");
      }
    });
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="author">نویسنده</Label>
          <Input id="author" name="author" defaultValue={post?.author} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tags">برچسب‌ها (با کاما جدا کنید)</Label>
          <Input id="tags" name="tags" dir="ltr" defaultValue={post?.tags.join(", ")} />
        </div>
      </div>

      <Tabs defaultValue="fa">
        <TabsList>
          <TabsTrigger value="fa">فارسی</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        <TabsContent value="fa" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleFa">عنوان (فارسی)</Label>
            <Input id="titleFa" name="titleFa" defaultValue={post?.title.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slugFa">اسلاگ (فارسی)</Label>
            <Input id="slugFa" name="slugFa" defaultValue={post?.slug.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="excerptFa">خلاصه (فارسی)</Label>
            <Textarea id="excerptFa" name="excerptFa" rows={2} defaultValue={post?.excerpt.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bodyFa">متن کامل - Markdown (فارسی)</Label>
            <Textarea id="bodyFa" name="bodyFa" rows={12} defaultValue={post?.body.fa} required />
          </div>
        </TabsContent>
        <TabsContent value="en" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleEn">Title (English)</Label>
            <Input id="titleEn" name="titleEn" dir="ltr" defaultValue={post?.title.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slugEn">Slug (English)</Label>
            <Input id="slugEn" name="slugEn" dir="ltr" defaultValue={post?.slug.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="excerptEn">Excerpt (English)</Label>
            <Textarea id="excerptEn" name="excerptEn" dir="ltr" rows={2} defaultValue={post?.excerpt.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bodyEn">Full Body - Markdown (English)</Label>
            <Textarea id="bodyEn" name="bodyEn" dir="ltr" rows={12} defaultValue={post?.body.en} required />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={setIsPublished} name="isPublished" />
        <Label>منتشر شده (در سایت نمایش داده شود)</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
          انصراف
        </Button>
      </div>
    </form>
  );
}
