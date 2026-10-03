"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "number-change-popup-seen-2026-10";

export function NumberChangePopup({ phone }: { phone: string }) {
  const t = useTranslations("numberPopup");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage can be blocked (private mode); showing the popup is still fine.
    }
    // Storage is only readable on the client, so the open decision must happen after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[calc(100%-2rem)] p-6 pt-8 sm:max-w-md">
        <DialogHeader className="items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Phone className="size-7" />
          </div>
          <DialogTitle className="text-xl font-bold leading-snug">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-base leading-7">
            {t("body")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-24 items-center justify-center rounded-xl bg-primary/5 px-4 ring-1 ring-primary/15">
          <p
            className="text-center text-3xl font-bold leading-none tracking-widest text-primary tabular-nums"
            dir="ltr"
          >
            {phone}
          </p>
        </div>

        <DialogFooter className="mt-1">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("close")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
