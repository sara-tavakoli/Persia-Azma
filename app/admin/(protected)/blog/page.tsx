import Link from "next/link";
import { adminListBlogPosts } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBlogPost } from "./actions";
import { Plus } from "lucide-react";

export default async function AdminBlogPage() {
  const posts = await adminListBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">مقالات</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت مقالات وبلاگ
          </p>
        </div>
        <Button render={<Link href="/admin/blog/new" />}>
          <Plus className="size-4" />
          مقاله جدید
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>نویسنده</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title.fa}</TableCell>
                <TableCell className="text-muted-foreground">{post.author}</TableCell>
                <TableCell>
                  <Badge variant={post.isPublished ? "default" : "outline"}>
                    {post.isPublished ? "منتشر شده" : "پیش‌نویس"}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      render={<Link href={`/admin/blog/${post.id}`} />}
                    >
                      ویرایش
                    </Button>
                    <DeleteButton
                      title={post.title.fa}
                      onDelete={deleteBlogPost.bind(null, post.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  هنوز مقاله‌ای ثبت نشده است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
