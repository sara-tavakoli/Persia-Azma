import { CertificateForm } from "@/components/admin/certificate-form";

export default function NewCertificatePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">گواهینامه جدید</h1>
      <div className="mt-6">
        <CertificateForm />
      </div>
    </div>
  );
}
