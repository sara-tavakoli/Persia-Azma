import Link from "next/link";
import { adminListCertificates } from "@/lib/admin-data";
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
import { deleteCertificate } from "./actions";
import { Plus } from "lucide-react";

export default async function AdminCertificatesPage() {
  const certificates = await adminListCertificates();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">گواهینامه‌ها</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت گواهینامه‌ها و مجوزهای نمایش داده شده در سایت
          </p>
        </div>
        <Button render={<Link href="/admin/certificates/new" />}>
          <Plus className="size-4" />
          گواهینامه جدید
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>صادرکننده</TableHead>
              <TableHead>ترتیب</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.title.fa}</TableCell>
                <TableCell className="text-muted-foreground" dir="ltr">
                  {cert.issuer}
                </TableCell>
                <TableCell className="text-muted-foreground">{cert.order}</TableCell>
                <TableCell>
                  <Badge variant={cert.isPublished ? "default" : "outline"}>
                    {cert.isPublished ? "منتشر شده" : "پیش‌نویس"}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      render={<Link href={`/admin/certificates/${cert.id}`} />}
                    >
                      ویرایش
                    </Button>
                    <DeleteButton
                      title={cert.title.fa}
                      onDelete={deleteCertificate.bind(null, cert.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {certificates.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  هنوز گواهینامه‌ای ثبت نشده است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
