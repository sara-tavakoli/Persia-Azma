"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusSelect({
  value,
  options,
  onUpdate,
}: {
  value: string;
  options: { value: string; label: string }[];
  onUpdate: (status: string) => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onChange(next: string | null) {
    if (!next) return;
    startTransition(async () => {
      try {
        await onUpdate(next);
        router.refresh();
      } catch {
        toast.error("خطا در به‌روزرسانی وضعیت.");
      }
    });
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={isPending}>
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
