export type LocalizedText = { fa: string; en: string };

export type ServiceItem = {
  slug: LocalizedText;
  title: LocalizedText;
  shortDescription: LocalizedText;
  category: "medical" | "imaging" | "industrial" | "consulting";
  iconKey: "stethoscope" | "scan" | "gauge" | "lineChart" | "shieldCheck" | "wrench";
};

export const services: ServiceItem[] = [
  {
    slug: { fa: "کنترل-کیفیت-تجهیزات-پزشکی", en: "medical-equipment-quality-control" },
    title: { fa: "کنترل کیفیت تجهیزات پزشکی", en: "Medical Equipment Quality Control" },
    shortDescription: {
      fa: "ارزیابی و کنترل کیفیت دستگاه‌های پزشکی مطابق با مجوز سازمان غذا و دارو، برای اطمینان از عملکرد ایمن و دقیق تجهیزات بیمارستانی.",
      en: "Quality assessment for medical devices, licensed by Iran's Food & Drug Organization, ensuring safe and accurate performance of hospital equipment.",
    },
    category: "medical",
    iconKey: "stethoscope",
  },
  {
    slug: { fa: "کنترل-کیفیت-تجهیزات-تصویربرداری", en: "imaging-equipment-quality-control" },
    title: { fa: "کنترل کیفیت تجهیزات تصویربرداری", en: "Imaging Equipment Quality Control" },
    shortDescription: {
      fa: "بازرسی و تست دستگاه‌های تصویربرداری پزشکی زیر نظر سازمان انرژی اتمی، برای تضمین دقت تشخیصی و ایمنی پرتوی.",
      en: "Inspection and testing of medical imaging devices under the supervision of the Atomic Energy Organization of Iran, ensuring diagnostic accuracy and radiation safety.",
    },
    category: "imaging",
    iconKey: "scan",
  },
  {
    slug: { fa: "کالیبراسیون-تجهیزات-صنعتی", en: "industrial-equipment-calibration" },
    title: { fa: "کالیبراسیون تجهیزات صنعتی و آزمایشگاهی", en: "Industrial & Laboratory Equipment Calibration" },
    shortDescription: {
      fa: "کالیبراسیون دقیق ابزار اندازه‌گیری صنعتی و آزمایشگاهی مطابق استانداردهای ملی و بین‌المللی با بیش از ۹۹.۹۹ درصد دقت.",
      en: "Precise calibration of industrial and laboratory measuring instruments to national and international standards, with over 99.99% accuracy.",
    },
    category: "industrial",
    iconKey: "gauge",
  },
  {
    slug: { fa: "تحلیل-عملکرد-تجهیزات", en: "equipment-performance-analysis" },
    title: { fa: "تحلیل و گزارش عملکرد تجهیزات", en: "Equipment Performance Analysis & Reporting" },
    shortDescription: {
      fa: "ارزیابی فنی و تحلیل داده‌های عملکردی تجهیزات به همراه گزارش کامل، برای پشتیبانی از تصمیم‌گیری‌های خرید و نگهداری.",
      en: "Technical evaluation and performance-data analysis of equipment with comprehensive reporting, supporting purchasing and maintenance decisions.",
    },
    category: "consulting",
    iconKey: "lineChart",
  },
  {
    slug: { fa: "مشاوره-کاهش-هزینه", en: "cost-reduction-consulting" },
    title: { fa: "مشاوره کاهش هزینه", en: "Cost Reduction Consulting" },
    shortDescription: {
      fa: "شناسایی فرصت‌های کاهش هزینه در بهره‌برداری و نگهداری تجهیزات، بدون کاهش کیفیت یا دقت.",
      en: "Identifying cost-reduction opportunities in equipment operation and maintenance, without compromising quality or accuracy.",
    },
    category: "consulting",
    iconKey: "shieldCheck",
  },
  {
    slug: { fa: "حل-مسئله-و-عیب‌یابی", en: "troubleshooting-consultation" },
    title: { fa: "مشاوره حل مسئله و عیب‌یابی", en: "Troubleshooting Consultation" },
    shortDescription: {
      fa: "بررسی تخصصی مشکلات عملکردی تجهیزات و ارائه راهکار عملی برای رفع سریع و مقرون‌به‌صرفه آن‌ها.",
      en: "Expert investigation of equipment performance issues, with practical, cost-effective solutions for fast resolution.",
    },
    category: "industrial",
    iconKey: "wrench",
  },
];

export type CertificateItem = {
  title: LocalizedText;
  issuer: string;
  description: LocalizedText;
};

export const certificates: CertificateItem[] = [
  {
    title: { fa: "گواهینامه ISO/IEC 17025", en: "ISO/IEC 17025 Accreditation" },
    issuer: "ISO 17025",
    description: {
      fa: "استاندارد بین‌المللی صلاحیت آزمایشگاه‌های آزمون و کالیبراسیون.",
      en: "The international standard for the competence of testing and calibration laboratories.",
    },
  },
  {
    title: { fa: "مجوز سازمان غذا و دارو", en: "Food & Drug Organization License" },
    issuer: "Iran FDA",
    description: {
      fa: "مجوز رسمی کنترل کیفیت تجهیزات پزشکی از سازمان غذا و دارو.",
      en: "Official license for medical-device quality control from Iran's Food & Drug Organization.",
    },
  },
  {
    title: { fa: "مجوز سازمان انرژی اتمی", en: "Atomic Energy Organization License" },
    issuer: "AEOI",
    description: {
      fa: "مجوز رسمی کنترل کیفیت تجهیزات تصویربرداری پزشکی از سازمان انرژی اتمی ایران.",
      en: "Official license for medical imaging equipment quality control from the Atomic Energy Organization of Iran.",
    },
  },
];

export const homeStats = [
  { key: "accuracy", value: 99.99, decimals: 2, symbolFa: "٪", symbolEn: "%" },
  { key: "clients", value: 500, decimals: 0, symbolFa: "+", symbolEn: "+" },
  { key: "years", value: 10, decimals: 0, symbolFa: "+", symbolEn: "+" },
  { key: "services", value: 8, decimals: 0, symbolFa: "", symbolEn: "" },
];
