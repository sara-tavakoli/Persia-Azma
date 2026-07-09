import { notFound } from "next/navigation";
import { adminGetCertificate } from "@/lib/admin-data";
import { CertificateForm } from "@/components/admin/certificate-form";

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await adminGetCertificate(id);
  if (!certificate) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">ویرایش گواهینامه</h1>
      <div className="mt-6">
        <CertificateForm certificate={certificate} />
      </div>
    </div>
  );
}
