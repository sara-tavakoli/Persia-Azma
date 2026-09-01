import { adminListContactSubmissions } from "@/lib/admin-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusSelect } from "@/components/admin/status-select";
import { MessageCell } from "@/components/admin/message-cell";
import { DeleteButton } from "@/components/admin/delete-button";
import { updateContactSubmissionStatus, deleteContactSubmission } from "./actions";

const statusOptions = [
  { value: "new", label: "جدید" },
  { value: "read", label: "خوانده شده" },
  { value: "archived", label: "بایگانی شده" },
];

export default async function AdminContactSubmissionsPage() {
  const submissions = await adminListContactSubmissions();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">پیام‌های تماس</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        پیام‌های ارسال شده از فرم تماس سریع سایت
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام</TableHead>
              <TableHead>ایمیل / تلفن</TableHead>
              <TableHead>پیام</TableHead>
              <TableHead>تاریخ</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">{sub.name}</TableCell>
                <TableCell className="text-muted-foreground" dir="ltr">
                  <div className="flex flex-col">
                    <span>{sub.email}</span>
                    <span>{sub.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs text-muted-foreground">
                  <MessageCell message={sub.message} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {new Date(sub.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell>
                  <StatusSelect
                    value={sub.status}
                    options={statusOptions}
                    onUpdate={updateContactSubmissionStatus.bind(null, sub.id)}
                  />
                </TableCell>
                <TableCell>
                  <DeleteButton
                    title={sub.name}
                    onDelete={deleteContactSubmission.bind(null, sub.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {submissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  پیامی دریافت نشده است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
