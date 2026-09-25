import { getSiteSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">اطلاعات تماس</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        شماره تلفن‌ها، ایمیل و آدرسی که در سراسر سایت نمایش داده می‌شود
      </p>

      <div className="mt-6 rounded-xl border border-border bg-background p-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
