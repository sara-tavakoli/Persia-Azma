import { notFound } from "next/navigation";
import { adminGetService } from "@/lib/admin-data";
import { ServiceForm } from "@/components/admin/service-form";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await adminGetService(id);
  if (!service) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">ویرایش خدمت</h1>
      <div className="mt-6">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
