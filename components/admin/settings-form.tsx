"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateSiteSettings } from "@/app/admin/(protected)/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { SiteSettingsDoc } from "@/lib/types";

export function SettingsForm({ settings }: { settings: SiteSettingsDoc }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function action(formData: FormData) {
    startTransition(async () => {
      try {
        await updateSiteSettings(formData);
        toast.success("اطلاعات تماس ذخیره شد.");
        router.refresh();
      } catch {
        toast.error("خطا در ذخیره‌سازی. شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.");
      }
    });
  }

  return (
    <form action={action} className="flex max-w-xl flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone1">تلفن ثابت ۱</Label>
          <Input
            id="phone1"
            name="phone1"
            dir="ltr"
            defaultValue={settings.phones[0]}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone2">تلفن ثابت ۲</Label>
          <Input
            id="phone2"
            name="phone2"
            dir="ltr"
            defaultValue={settings.phones[1]}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mobile">موبایل (واتساپ و بله)</Label>
        <Input
          id="mobile"
          name="mobile"
          dir="ltr"
          defaultValue={settings.phones[2]}
          placeholder="09xxxxxxxxx"
          required
        />
        <p className="text-xs text-muted-foreground">
          همین شماره برای دکمه‌های واتساپ و بله در سایت استفاده می‌شود.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          dir="ltr"
          defaultValue={settings.email}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="addressFa">آدرس (فارسی)</Label>
        <Textarea
          id="addressFa"
          name="addressFa"
          rows={2}
          defaultValue={settings.addressFa}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="addressEn">Address (English)</Label>
        <Textarea
          id="addressEn"
          name="addressEn"
          dir="ltr"
          rows={2}
          defaultValue={settings.addressEn}
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </Button>
      </div>
    </form>
  );
}
