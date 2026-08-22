import { adminListQuoteRequests } from "@/lib/admin-data";
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
import { updateQuoteRequestStatus } from "./actions";
import { Paperclip } from "lucide-react";

const statusOptions = [
  { value: "new", label: "جدید" },
  { value: "contacted", label: "تماس گرفته شد" },
  { value: "quoted", label: "قیمت ارسال شد" },
  { value: "closed", label: "بسته شده" },
];

export default async function AdminQuoteRequestsPage() {
  const requests = await adminListQuoteRequests();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">درخواست‌های مشاوره</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        درخواست‌های ارسال شده از فرم مشاوره و کالیبراسیون
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام / شرکت</TableHead>
              <TableHead>تماس</TableHead>
              <TableHead>خدمت مورد نظر</TableHead>
              <TableHead>پیام</TableHead>
              <TableHead>پیوست</TableHead>
              <TableHead>تاریخ</TableHead>
              <TableHead>وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{req.name}</span>
                    {req.company && (
                      <span className="text-xs text-muted-foreground">{req.company}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground" dir="ltr">
                  <div className="flex flex-col">
                    <span>{req.email}</span>
                    <span>{req.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {req.serviceInterest || "—"}
                </TableCell>
                <TableCell className="max-w-xs text-muted-foreground">
                  <MessageCell message={req.message} />
                </TableCell>
                <TableCell>
                  {req.attachments.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {req.attachments.map((att) => (
                        <a
                          key={att.storagePath}
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Paperclip className="size-3" />
                          فایل
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {new Date(req.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell>
                  <StatusSelect
                    value={req.status}
                    options={statusOptions}
                    onUpdate={updateQuoteRequestStatus.bind(null, req.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  درخواستی دریافت نشده است.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
