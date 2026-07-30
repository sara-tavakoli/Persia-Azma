"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveService } from "@/app/admin/(protected)/services/actions";
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
import type { ServiceWithId } from "@/lib/data";
import { serviceIconMap } from "@/components/service-icon";

const categoryLabels: Record<string, string> = {
  medical: "تجهیزات پزشکی",
  imaging: "تجهیزات تصویربرداری",
  industrial: "تجهیزات صنعتی و آزمایشگاهی",
  consulting: "مشاوره و کاهش هزینه",
  environmental: "اتاق تمیز و کیفیت هوا",
};

export function ServiceForm({ service }: { service?: ServiceWithId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState(service?.category ?? "medical");
  const [iconKey, setIconKey] = useState(service?.iconKey ?? "stethoscope");
  const [isPublished, setIsPublished] = useState(service?.isPublished ?? false);

  async function action(formData: FormData) {
    startTransition(async () => {
      try {
        await saveService(formData);
        toast.success("خدمت ذخیره شد.");
        router.push("/admin/services");
      } catch {
        toast.error("خطا در ذخیره‌سازی.");
      }
    });
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      {service && <input type="hidden" name="id" value={service.id} />}

      <Tabs defaultValue="fa">
        <TabsList>
          <TabsTrigger value="fa">فارسی</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        <TabsContent value="fa" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleFa">عنوان (فارسی)</Label>
            <Input id="titleFa" name="titleFa" defaultValue={service?.title.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slugFa">اسلاگ (فارسی)</Label>
            <Input id="slugFa" name="slugFa" defaultValue={service?.slug.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shortDescriptionFa">توضیح کوتاه (فارسی)</Label>
            <Textarea
              id="shortDescriptionFa"
              name="shortDescriptionFa"
              rows={3}
              defaultValue={service?.shortDescription.fa}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bodyFa">متن کامل - Markdown (فارسی)</Label>
            <Textarea
              id="bodyFa"
              name="bodyFa"
              rows={10}
              defaultValue={service?.body.fa}
              required
            />
          </div>
        </TabsContent>
        <TabsContent value="en" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleEn">Title (English)</Label>
            <Input id="titleEn" name="titleEn" dir="ltr" defaultValue={service?.title.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slugEn">Slug (English)</Label>
            <Input id="slugEn" name="slugEn" dir="ltr" defaultValue={service?.slug.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shortDescriptionEn">Short Description (English)</Label>
            <Textarea
              id="shortDescriptionEn"
              name="shortDescriptionEn"
              dir="ltr"
              rows={3}
              defaultValue={service?.shortDescription.en}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bodyEn">Full Body - Markdown (English)</Label>
            <Textarea
              id="bodyEn"
              name="bodyEn"
              dir="ltr"
              rows={10}
              defaultValue={service?.body.en}
              required
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label>دسته‌بندی</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
            <SelectTrigger className="w-full">
              <SelectValue />
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
          <Label>آیکون</Label>
          <Select value={iconKey} onValueChange={(v) => v && setIconKey(v)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(serviceIconMap).map((key) => (
                <SelectItem key={key} value={key}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="iconKey" value={iconKey} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order">ترتیب نمایش</Label>
          <Input
            id="order"
            name="order"
            type="number"
            min={0}
            defaultValue={service?.order ?? 0}
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={isPublished}
          onCheckedChange={setIsPublished}
          name="isPublished"
        />
        <Label>منتشر شده (در سایت نمایش داده شود)</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
          انصراف
        </Button>
      </div>
    </form>
  );
}
