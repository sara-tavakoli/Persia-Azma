import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">خدمت جدید</h1>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  );
}
