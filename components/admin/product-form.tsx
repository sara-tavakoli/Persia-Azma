"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveProduct } from "@/app/admin/(protected)/products/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ProductWithId } from "@/lib/data";
import { Undo2, X } from "lucide-react";

const categoryLabels: Record<string, string> = {
  calibrator: "کالیبراتور",
  equipment: "تجهیزات",
  accessory: "لوازم جانبی",
};

const conditionLabels: Record<string, string> = {
  new: "نو",
  used: "کارکرده",
};

// Must stay under serverActions.bodySizeLimit in next.config.ts, with
// headroom for the text fields.
const MAX_UPLOAD_BYTES = 3.5 * 1024 * 1024;

export function ProductForm({ product }: { product?: ProductWithId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<"fa" | "en">("fa");

  // Both language tabs stay mounted (keepMounted) so every field is
  // submitted. If the browser blocks submit on a required field in the
  // hidden tab, switch to that tab so the admin can see what's missing.
  function onInvalid(e: React.FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name ?? "";
    const lang = name.endsWith("En") ? "en" : name.endsWith("Fa") ? "fa" : null;
    if (lang && lang !== tab) {
      setTab(lang);
      toast.error(
        lang === "en"
          ? "لطفاً فیلدهای بخش English را هم کامل کنید."
          : "لطفاً فیلدهای بخش فارسی را کامل کنید.",
        { id: "missing-locale-fields" }
      );
    }
  }
  const [category, setCategory] = useState(product?.category ?? "calibrator");
  const [condition, setCondition] = useState(product?.condition ?? "new");
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [isPublished, setIsPublished] = useState(product?.isPublished ?? true);
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  function toggleRemoved(storagePath: string) {
    setRemoved((prev) => {
      const next = new Set(prev);
      if (next.has(storagePath)) next.delete(storagePath);
      else next.add(storagePath);
      return next;
    });
  }

  async function action(formData: FormData) {
    const uploadBytes = formData
      .getAll("images")
      .reduce((sum, f) => sum + (f instanceof File ? f.size : 0), 0);
    if (uploadBytes > MAX_UPLOAD_BYTES) {
      toast.error("حجم مجموع تصاویر بیش از ۳.۵ مگابایت است. تعداد کمتری انتخاب کنید یا تصاویر را کوچک‌تر کنید.");
      return;
    }

    startTransition(async () => {
      try {
        await saveProduct(formData);
        toast.success("کالا ذخیره شد.");
        router.push("/admin/products");
      } catch {
        toast.error("خطا در ذخیره‌سازی.");
      }
    });
  }

  return (
    <form action={action} onInvalidCapture={onInvalid} className="flex flex-col gap-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      <Tabs value={tab} onValueChange={(v) => setTab(v as "fa" | "en")}>
        <TabsList>
          <TabsTrigger value="fa">فارسی</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        <TabsContent keepMounted value="fa" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleFa">نام کالا (فارسی)</Label>
            <Input id="titleFa" name="titleFa" defaultValue={product?.title.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slugFa">اسلاگ (فارسی)</Label>
            <Input id="slugFa" name="slugFa" defaultValue={product?.slug.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shortDescriptionFa">توضیح کوتاه (فارسی)</Label>
            <Textarea
              id="shortDescriptionFa"
              name="shortDescriptionFa"
              rows={3}
              defaultValue={product?.shortDescription.fa}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bodyFa">مشخصات کامل - Markdown (فارسی، اختیاری)</Label>
            <Textarea id="bodyFa" name="bodyFa" rows={10} defaultValue={product?.body.fa} />
          </div>
        </TabsContent>
        <TabsContent keepMounted value="en" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleEn">Product name (English)</Label>
            <Input id="titleEn" name="titleEn" dir="ltr" defaultValue={product?.title.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slugEn">Slug (English)</Label>
            <Input id="slugEn" name="slugEn" dir="ltr" defaultValue={product?.slug.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shortDescriptionEn">Short Description (English)</Label>
            <Textarea
              id="shortDescriptionEn"
              name="shortDescriptionEn"
              dir="ltr"
              rows={3}
              defaultValue={product?.shortDescription.en}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bodyEn">Full Specs - Markdown (English, optional)</Label>
            <Textarea
              id="bodyEn"
              name="bodyEn"
              dir="ltr"
              rows={10}
              defaultValue={product?.body.en}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="brand">برند (اختیاری)</Label>
          <Input id="brand" name="brand" dir="ltr" defaultValue={product?.brand} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="model">مدل (اختیاری)</Label>
          <Input id="model" name="model" dir="ltr" defaultValue={product?.model} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label>دسته‌بندی</Label>
          <Select value={category} onValueChange={(v) => v && setCategory(v as typeof category)}>
            <SelectTrigger className="w-full">
              <SelectValue>{(v: string) => categoryLabels[v]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="category" value={category} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>وضعیت کالا</Label>
          <Select value={condition} onValueChange={(v) => v && setCondition(v as typeof condition)}>
            <SelectTrigger className="w-full">
              <SelectValue>{(v: string) => conditionLabels[v]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(conditionLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="condition" value={condition} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order">ترتیب نمایش</Label>
          <Input
            id="order"
            name="order"
            type="number"
            min={0}
            defaultValue={product?.order ?? 0}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 sm:w-64">
        <Label htmlFor="price">قیمت (تومان)</Label>
        <Input
          id="price"
          name="price"
          dir="ltr"
          inputMode="numeric"
          defaultValue={product?.price ?? ""}
          placeholder="خالی = تماس بگیرید"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>تصاویر</Label>
        {product && product.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {product.images.map((img, i) => {
              const isRemoved = removed.has(img.storagePath);
              return (
                <div key={img.storagePath} className="relative">
                  <div
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border border-border bg-muted",
                      isRemoved && "opacity-30"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  {i === 0 && !isRemoved && (
                    <span className="absolute start-1.5 top-1.5 rounded bg-background/90 px-1.5 py-0.5 text-[10px] font-medium">
                      تصویر اصلی
                    </span>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute end-1.5 top-1.5 size-7"
                    onClick={() => toggleRemoved(img.storagePath)}
                    aria-label={isRemoved ? "بازگرداندن" : "حذف تصویر"}
                  >
                    {isRemoved ? <Undo2 className="size-3.5" /> : <X className="size-3.5" />}
                  </Button>
                  {!isRemoved && (
                    <input type="hidden" name="keepImages" value={img.storagePath} />
                  )}
                </div>
              );
            })}
          </div>
        )}
        <Input
          id="images"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
        />
        <p className="text-xs text-muted-foreground">
          JPG، PNG یا WebP — حداکثر ۳.۵ مگابایت در هر بار ذخیره. اولین تصویر به‌عنوان تصویر اصلی نمایش داده می‌شود.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Label className="w-fit cursor-pointer gap-3">
          <Switch checked={inStock} onCheckedChange={setInStock} name="inStock" />
          موجود است
        </Label>
        <Label className="w-fit cursor-pointer gap-3">
          <Switch checked={isPublished} onCheckedChange={setIsPublished} name="isPublished" />
          منتشر شده (در سایت نمایش داده شود)
        </Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          انصراف
        </Button>
      </div>
    </form>
  );
}
