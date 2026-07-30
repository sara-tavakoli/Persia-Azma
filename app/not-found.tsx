import Link from "next/link";
import { SearchX } from "lucide-react";

export default function RootNotFound() {
  return (
    <section
      dir="rtl"
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "1.5rem",
        textAlign: "center",
        color: "#0f172a",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 64,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "1rem",
          background: "rgba(30, 58, 138, 0.1)",
          color: "#1e3a8a",
        }}
      >
        <SearchX size={32} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>404</p>
        <h1 style={{ margin: "0.25rem 0 0", fontSize: "1.5rem", fontWeight: 700 }}>
          صفحه مورد نظر یافت نشد
        </h1>
        <p style={{ margin: "0.5rem 0 0", color: "#64748b", maxWidth: 420 }}>
          ممکن است آدرس اشتباه بوده یا این صفحه جابه‌جا شده باشد.
        </p>
      </div>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          borderRadius: "0.5rem",
          background: "#1e3a8a",
          color: "#fff",
          padding: "0.625rem 1.5rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        بازگشت به خانه
      </Link>
    </section>
  );
}
