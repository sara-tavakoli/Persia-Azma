"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MessageCell({ message }: { message: string }) {
  return (
    <Dialog>
      <DialogTrigger
        className="line-clamp-2 block w-full max-w-full appearance-none whitespace-normal break-words bg-transparent p-0 text-start hover:text-foreground hover:underline"
        render={<button type="button" />}
      >
        {message}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>متن پیام</DialogTitle>
        </DialogHeader>
        <p className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm text-muted-foreground">
          {message}
        </p>
      </DialogContent>
    </Dialog>
  );
}
