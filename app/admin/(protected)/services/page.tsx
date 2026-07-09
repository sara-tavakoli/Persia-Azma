import Link from "next/link";
import { adminListServices } from "@/lib/admin-data";
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
import { deleteService } from "./actions";
import { Plus } from "lucide-react";

export default async function AdminServicesPage() {
  const services = await adminListServices();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">خدمات</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت خدمات نمایش داده شده در سایت
          </p>
        </div>
        <Button render={<Link href="/admin/services/new" />}>
          <Plus className="size-4" />
          خدمت جدید
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>دسته‌بندی</TableHead>
              <TableHead>ترتیب</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title.fa}</TableCell>
                <TableCell className="text-muted-foreground">{service.category}</TableCell>
                <TableCell className="text-muted-foreground">{service.order}</TableCell>
                <TableCell>
                  <Badge variant={service.isPublished ? "default" : "outline"}>
                    {service.isPublished ? "منتشر شده" : "پیش‌نویس"}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      render={<Link href={`/admin/services/${service.id}`} />}
                    >
                      ویرایش
                    </Button>
                    <DeleteButton
                      title={service.title.fa}
                      onDelete={deleteService.bind(null, service.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  هنوز خدمتی ثبت نشده است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
