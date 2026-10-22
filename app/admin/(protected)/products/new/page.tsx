import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">کالای جدید</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
