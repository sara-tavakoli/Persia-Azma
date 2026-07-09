"use client";

import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { quoteRequestSchema, type QuoteRequestInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServiceOption = { slug: string; title: string };

export function QuoteForm({
  serviceOptions,
  defaultService,
}: {
  serviceOptions: ServiceOption[];
  defaultService?: string;
}) {
  const t = useTranslations("contact.form");
  const locale = useLocale() as "fa" | "en";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      locale,
      name: "",
      company: "",
      email: "",
      phone: "",
      serviceInterest: defaultService ?? "",
      message: "",
    },
  });

  async function onSubmit(data: QuoteRequestInput, files: FileList | null) {
    try {
      const formData = new FormData();
      Object.entries({ ...data, locale }).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });
      if (files) {
        Array.from(files).forEach((file) =>
          formData.append("attachments", file)
        );
      }

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("request_failed");
      toast.success(t("success"));
      reset({
        locale,
        name: "",
        company: "",
        email: "",
        phone: "",
        serviceInterest: "",
        message: "",
      });
    } catch {
      toast.error(t("error"));
    }
  }

  const fileListRef = useRef<FileList | null>(null);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, fileListRef.current))}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="q-name">{t("name")}</Label>
          <Input id="q-name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="q-company">{t("company")}</Label>
          <Input id="q-company" {...register("company")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="q-email">{t("email")}</Label>
          <Input id="q-email" type="email" dir="ltr" {...register("email")} />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="q-phone">{t("phone")}</Label>
          <Input id="q-phone" dir="ltr" {...register("phone")} />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="q-service">{t("serviceInterest")}</Label>
        <Controller
          control={control}
          name="serviceInterest"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="q-service" className="w-full">
                <SelectValue placeholder={t("serviceInterest")} />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((opt) => (
                  <SelectItem key={opt.slug} value={opt.slug}>
                    {opt.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="q-message">{t("message")}</Label>
        <Textarea id="q-message" rows={5} {...register("message")} />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="q-attachment">{t("attachment")}</Label>
        <Input
          id="q-attachment"
          type="file"
          accept="application/pdf,image/jpeg,image/png"
          multiple
          onChange={(e) => {
            fileListRef.current = e.target.files;
          }}
        />
        <p className="text-xs text-muted-foreground">{t("attachmentHint")}</p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
