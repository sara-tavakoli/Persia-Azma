import Image from "next/image";
import { adminListClientLogos } from "@/lib/admin-data";
import { LogoForm } from "@/components/admin/logo-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteClientLogo } from "./actions";
import { Card } from "@/components/ui/card";

export default async function AdminLogosPage() {
  const logos = await adminListClientLogos();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">لوگوی مشتریان</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت لوگوهای نمایش داده شده در سایت
          </p>
        </div>
        <LogoForm />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {logos.map((logo) => (
          <Card key={logo.id} className="flex flex-col items-center gap-3 p-4">
            <div className="flex h-16 w-full items-center justify-center">
              <Image
                src={logo.logo.url}
                alt={logo.name}
                width={120}
                height={60}
                className="max-h-16 w-auto object-contain"
                unoptimized
              />
            </div>
            <p className="text-center text-sm font-medium">{logo.name}</p>
            <DeleteButton title={logo.name} onDelete={deleteClientLogo.bind(null, logo.id)} />
          </Card>
        ))}
        {logos.length === 0 && (
          <p className="col-span-full py-8 text-center text-muted-foreground">
            هنوز لوگویی اضافه نشده است.
          </p>
        )}
      </div>
    </div>
  );
}
