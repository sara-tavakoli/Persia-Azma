import Link from "next/link";
import Image from "next/image";
import { adminListProducts } from "@/lib/admin-data";
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
import { deleteProduct } from "./actions";
import { ImageOff, Plus } from "lucide-react";

const categoryLabels: Record<string, string> = {
  calibrator: "کالیبراتور",
  equipment: "تجهیزات",
  accessory: "لوازم جانبی",
};

export default async function AdminProductsPage() {
  const products = await adminListProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">فروشگاه</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت کالاهای قابل فروش (کالیبراتورها، تجهیزات و لوازم)
          </p>
        </div>
        <Button render={<Link href="/admin/products/new" />}>
          <Plus className="size-4" />
          کالای جدید
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>عنوان</TableHead>
              <TableHead>دسته‌بندی</TableHead>
              <TableHead>قیمت (تومان)</TableHead>
              <TableHead>موجودی</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.title.fa}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageOff className="size-4" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.title.fa}</TableCell>
                <TableCell className="text-muted-foreground">
                  {categoryLabels[product.category]}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.price === null
                    ? "تماس بگیرید"
                    : product.price.toLocaleString("fa-IR")}
                </TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? "secondary" : "outline"}>
                    {product.inStock ? "موجود" : "ناموجود"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={product.isPublished ? "default" : "outline"}>
                    {product.isPublished ? "منتشر شده" : "پیش‌نویس"}
                  </Badge>
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      render={<Link href={`/admin/products/${product.id}`} />}
                    >
                      ویرایش
                    </Button>
                    <DeleteButton
                      title={product.title.fa}
                      onDelete={deleteProduct.bind(null, product.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  هنوز کالایی ثبت نشده است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
