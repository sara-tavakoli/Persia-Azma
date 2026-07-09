"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveCertificate } from "@/app/admin/(protected)/certificates/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CertificateWithId } from "@/lib/data";

export function CertificateForm({ certificate }: { certificate?: CertificateWithId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPublished, setIsPublished] = useState(certificate?.isPublished ?? false);

  async function action(formData: FormData) {
    startTransition(async () => {
      try {
        await saveCertificate(formData);
        toast.success("گواهینامه ذخیره شد.");
        router.push("/admin/certificates");
      } catch {
        toast.error("خطا در ذخیره‌سازی.");
      }
    });
  }

  return (
    <form action={action} className="flex flex-col gap-6">
      {certificate && <input type="hidden" name="id" value={certificate.id} />}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="issuer">صادرکننده (مثلاً ISO 17025)</Label>
        <Input id="issuer" name="issuer" dir="ltr" defaultValue={certificate?.issuer} required />
      </div>

      <Tabs defaultValue="fa">
        <TabsList>
          <TabsTrigger value="fa">فارسی</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        <TabsContent value="fa" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleFa">عنوان (فارسی)</Label>
            <Input id="titleFa" name="titleFa" defaultValue={certificate?.title.fa} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descriptionFa">توضیح (فارسی)</Label>
            <Textarea
              id="descriptionFa"
              name="descriptionFa"
              rows={3}
              defaultValue={certificate?.description.fa}
              required
            />
          </div>
        </TabsContent>
        <TabsContent value="en" className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="titleEn">Title (English)</Label>
            <Input id="titleEn" name="titleEn" dir="ltr" defaultValue={certificate?.title.en} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descriptionEn">Description (English)</Label>
            <Textarea
              id="descriptionEn"
              name="descriptionEn"
              dir="ltr"
              rows={3}
              defaultValue={certificate?.description.en}
              required
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-1.5 sm:w-40">
        <Label htmlFor="order">ترتیب نمایش</Label>
        <Input
          id="order"
          name="order"
          type="number"
          min={0}
          defaultValue={certificate?.order ?? 0}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={isPublished} onCheckedChange={setIsPublished} name="isPublished" />
        <Label>منتشر شده (در سایت نمایش داده شود)</Label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/certificates")}>
          انصراف
        </Button>
      </div>
    </form>
  );
}
