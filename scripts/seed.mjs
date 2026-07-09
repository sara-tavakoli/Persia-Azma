// Seeds Firestore with initial services/certificates/FAQ content.
// Run with: node --env-file=.env.local scripts/seed.mjs
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore(app);
const now = Date.now();

const services = [
  {
    slug: { fa: "کنترل-کیفیت-تجهیزات-پزشکی", en: "medical-equipment-quality-control" },
    title: { fa: "کنترل کیفیت تجهیزات پزشکی", en: "Medical Equipment Quality Control" },
    shortDescription: {
      fa: "ارزیابی و کنترل کیفیت دستگاه‌های پزشکی مطابق با مجوز سازمان غذا و دارو، برای اطمینان از عملکرد ایمن و دقیق تجهیزات بیمارستانی.",
      en: "Quality assessment for medical devices, licensed by Iran's Food & Drug Organization, ensuring safe and accurate performance of hospital equipment.",
    },
    body: {
      fa: "خدمات کنترل کیفیت تجهیزات پزشکی پرشیا آزما سیستم شامل ارزیابی دقیق عملکرد دستگاه‌های پزشکی مطابق با استانداردهای سازمان غذا و دارو است. این خدمات به بیمارستان‌ها و مراکز درمانی کمک می‌کند تا از ایمنی و دقت تجهیزات خود اطمینان حاصل کنند.\n\n### فرآیند کار\n\n۱. بازرسی اولیه تجهیزات\n۲. تست عملکرد مطابق استاندارد\n۳. ارائه گزارش کامل و مستندسازی",
      en: "Persia Azma System's medical equipment quality-control service includes precise performance evaluation of medical devices in accordance with Food & Drug Organization standards. This helps hospitals and clinics ensure the safety and accuracy of their equipment.\n\n### Process\n\n1. Initial equipment inspection\n2. Performance testing to standard\n3. Full report and documentation",
    },
    category: "medical",
    iconKey: "stethoscope",
    order: 1,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: { fa: "کنترل-کیفیت-تجهیزات-تصویربرداری", en: "imaging-equipment-quality-control" },
    title: { fa: "کنترل کیفیت تجهیزات تصویربرداری", en: "Imaging Equipment Quality Control" },
    shortDescription: {
      fa: "بازرسی و تست دستگاه‌های تصویربرداری پزشکی زیر نظر سازمان انرژی اتمی، برای تضمین دقت تشخیصی و ایمنی پرتوی.",
      en: "Inspection and testing of medical imaging devices under the supervision of the Atomic Energy Organization of Iran, ensuring diagnostic accuracy and radiation safety.",
    },
    body: {
      fa: "این خدمت شامل بازرسی فنی، تست دقت تشخیصی و ارزیابی ایمنی پرتوی دستگاه‌های تصویربرداری پزشکی (رادیولوژی، سی‌تی‌اسکن، ماموگرافی و غیره) است.",
      en: "This service includes technical inspection, diagnostic-accuracy testing, and radiation-safety evaluation of medical imaging devices (radiology, CT scan, mammography, and more).",
    },
    category: "imaging",
    iconKey: "scan",
    order: 2,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: { fa: "کالیبراسیون-تجهیزات-صنعتی", en: "industrial-equipment-calibration" },
    title: { fa: "کالیبراسیون تجهیزات صنعتی و آزمایشگاهی", en: "Industrial & Laboratory Equipment Calibration" },
    shortDescription: {
      fa: "کالیبراسیون دقیق ابزار اندازه‌گیری صنعتی و آزمایشگاهی مطابق استانداردهای ملی و بین‌المللی با بیش از ۹۹.۹۹ درصد دقت.",
      en: "Precise calibration of industrial and laboratory measuring instruments to national and international standards, with over 99.99% accuracy.",
    },
    body: {
      fa: "کالیبراسیون دما، رطوبت، حجم، جرم و جریان گاز برای تجهیزات صنعتی و آزمایشگاهی، مطابق با استانداردهای ISO/IEC 17025.",
      en: "Calibration of temperature, humidity, volume, mass, and gas-flow instruments for industrial and laboratory equipment, in accordance with ISO/IEC 17025 standards.",
    },
    category: "industrial",
    iconKey: "gauge",
    order: 3,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: { fa: "تحلیل-عملکرد-تجهیزات", en: "equipment-performance-analysis" },
    title: { fa: "تحلیل و گزارش عملکرد تجهیزات", en: "Equipment Performance Analysis & Reporting" },
    shortDescription: {
      fa: "ارزیابی فنی و تحلیل داده‌های عملکردی تجهیزات به همراه گزارش کامل، برای پشتیبانی از تصمیم‌گیری‌های خرید و نگهداری.",
      en: "Technical evaluation and performance-data analysis of equipment with comprehensive reporting, supporting purchasing and maintenance decisions.",
    },
    body: {
      fa: "تیم فنی ما داده‌های عملکردی تجهیزات شما را تحلیل کرده و گزارشی کامل برای پشتیبانی از تصمیمات خرید، تعمیر یا نگهداری ارائه می‌دهد.",
      en: "Our technical team analyzes your equipment's performance data and delivers a complete report to support purchasing, repair, or maintenance decisions.",
    },
    category: "consulting",
    iconKey: "lineChart",
    order: 4,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: { fa: "مشاوره-کاهش-هزینه", en: "cost-reduction-consulting" },
    title: { fa: "مشاوره کاهش هزینه", en: "Cost Reduction Consulting" },
    shortDescription: {
      fa: "شناسایی فرصت‌های کاهش هزینه در بهره‌برداری و نگهداری تجهیزات، بدون کاهش کیفیت یا دقت.",
      en: "Identifying cost-reduction opportunities in equipment operation and maintenance, without compromising quality or accuracy.",
    },
    body: {
      fa: "با بررسی دقیق فرآیندهای بهره‌برداری و نگهداری تجهیزات، فرصت‌های کاهش هزینه را بدون افت کیفیت شناسایی و پیشنهاد می‌کنیم.",
      en: "Through careful review of your equipment operation and maintenance processes, we identify and recommend cost-reduction opportunities without any drop in quality.",
    },
    category: "consulting",
    iconKey: "shieldCheck",
    order: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    slug: { fa: "حل-مسئله-و-عیب‌یابی", en: "troubleshooting-consultation" },
    title: { fa: "مشاوره حل مسئله و عیب‌یابی", en: "Troubleshooting Consultation" },
    shortDescription: {
      fa: "بررسی تخصصی مشکلات عملکردی تجهیزات و ارائه راهکار عملی برای رفع سریع و مقرون‌به‌صرفه آن‌ها.",
      en: "Expert investigation of equipment performance issues, with practical, cost-effective solutions for fast resolution.",
    },
    body: {
      fa: "کارشناسان ما مشکلات عملکردی تجهیزات شما را بررسی کرده و راهکارهای عملی و مقرون‌به‌صرفه برای رفع سریع آن‌ها ارائه می‌دهند.",
      en: "Our specialists investigate your equipment's performance issues and provide practical, cost-effective solutions for a fast resolution.",
    },
    category: "industrial",
    iconKey: "wrench",
    order: 6,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
];

const certificates = [
  {
    title: { fa: "گواهینامه ISO/IEC 17025", en: "ISO/IEC 17025 Accreditation" },
    issuer: "ISO 17025",
    description: {
      fa: "استاندارد بین‌المللی صلاحیت آزمایشگاه‌های آزمون و کالیبراسیون.",
      en: "The international standard for the competence of testing and calibration laboratories.",
    },
    order: 1,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: { fa: "مجوز سازمان غذا و دارو", en: "Food & Drug Organization License" },
    issuer: "Iran FDA",
    description: {
      fa: "مجوز رسمی کنترل کیفیت تجهیزات پزشکی از سازمان غذا و دارو.",
      en: "Official license for medical-device quality control from Iran's Food & Drug Organization.",
    },
    order: 2,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: { fa: "مجوز سازمان انرژی اتمی", en: "Atomic Energy Organization License" },
    issuer: "AEOI",
    description: {
      fa: "مجوز رسمی کنترل کیفیت تجهیزات تصویربرداری پزشکی از سازمان انرژی اتمی ایران.",
      en: "Official license for medical imaging equipment quality control from the Atomic Energy Organization of Iran.",
    },
    order: 3,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
];

const faqs = [
  {
    question: { fa: "کالیبراسیون چیست؟", en: "What is calibration?" },
    answer: {
      fa: "کالیبراسیون فرآیندی مهندسی است که در آن دقت یک ابزار اندازه‌گیری با مقایسه با یک مرجع استاندارد بررسی و در صورت نیاز تنظیم می‌شود.",
      en: "Calibration is a systematic engineering process that verifies and, if needed, adjusts a measuring instrument's accuracy by comparing it against a reference standard.",
    },
    order: 1,
    isPublished: true,
  },
  {
    question: { fa: "کالیبراسیون هر چند وقت یک‌بار باید انجام شود؟", en: "How often should calibration be performed?" },
    answer: {
      fa: "بازه کالیبراسیون به نوع دستگاه، میزان استفاده و الزامات استاندارد مربوطه بستگی دارد؛ معمولاً هر ۶ تا ۱۲ ماه یک‌بار توصیه می‌شود.",
      en: "The calibration interval depends on the device type, usage frequency, and applicable standard requirements; typically every 6 to 12 months is recommended.",
    },
    order: 2,
    isPublished: true,
  },
  {
    question: { fa: "آیا خدمات شما در محل مشتری هم ارائه می‌شود؟", en: "Do you provide on-site services?" },
    answer: {
      fa: "بله، تیم فنی ما امکان ارائه خدمات کالیبراسیون و کنترل کیفیت را در محل بیمارستان، آزمایشگاه یا کارخانه شما نیز دارد.",
      en: "Yes, our technical team can provide calibration and quality-control services on-site at your hospital, laboratory, or factory.",
    },
    order: 3,
    isPublished: true,
  },
];

async function seed() {
  const batch = db.batch();

  for (const service of services) {
    const ref = db.collection("services").doc(service.slug.en);
    batch.set(ref, service);
  }
  for (const cert of certificates) {
    const ref = db.collection("certificates").doc(cert.issuer.toLowerCase().replace(/\s+/g, "-"));
    batch.set(ref, cert);
  }
  for (const [i, faq] of faqs.entries()) {
    const ref = db.collection("faqs").doc(`faq-${i + 1}`);
    batch.set(ref, faq);
  }

  await batch.commit();
  console.log(`Seeded ${services.length} services, ${certificates.length} certificates, ${faqs.length} FAQs.`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
