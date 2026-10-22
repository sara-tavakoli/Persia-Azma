import { notFound } from "next/navigation";
import { adminGetProduct } from "@/lib/admin-data";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await adminGetProduct(id);
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold">ویرایش کالا</h1>
      <div className="mt-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
