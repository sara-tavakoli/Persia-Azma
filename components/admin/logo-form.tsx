"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveClientLogo } from "@/app/admin/(protected)/logos/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const categoryLabels: Record<string, string> = {
  hospital: "بیمارستان",
  industrial: "صنعتی",
  government: "دولتی",
};

export function LogoForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("hospital");

  async function action(formData: FormData) {
    startTransition(async () => {
      try {
        await saveClientLogo(formData);
        toast.success("لوگو اضافه شد.");
        setOpen(false);
        router.refresh();
      } catch {
        toast.error("خطا در ذخیره‌سازی.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button><Plus className="size-4" />لوگوی جدید</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>افزودن لوگوی مشتری</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">نام مشتری</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>دسته‌بندی</Label>
            <Select value={category} onValueChange={(v) => v && setCategory(v)}>
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
            <Label htmlFor="order">ترتیب نمایش</Label>
            <Input id="order" name="order" type="number" min={0} defaultValue={0} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="logo">فایل لوگو (SVG یا PNG)</Label>
            <Input id="logo" name="logo" type="file" accept="image/svg+xml,image/png,image/jpeg" required />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
