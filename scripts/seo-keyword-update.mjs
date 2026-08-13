// One-off SEO update: strengthens on-page targeting for "شرکت کالیبراسیون",
// "کالیبراسیون جنوب", and "کالیبراسیون تجهیزات پزشکی" search queries.
// Run with: node --env-file=.env.local scripts/seo-keyword-update.mjs
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

const titleUpdates = {
  "medical-equipment-quality-control": {
    fa: "کالیبراسیون و کنترل کیفیت تجهیزات پزشکی",
    en: "Medical Equipment Calibration & Quality Control",
  },
  "imaging-equipment-quality-control": {
    fa: "کالیبراسیون و کنترل کیفیت تجهیزات تصویربرداری",
    en: "Imaging Equipment Calibration & Quality Control",
  },
};

const newFaq = {
  question: {
    fa: "بهترین شرکت کالیبراسیون در جنوب کشور کدام است؟",
    en: "What is the best calibration company in southern Iran?",
  },
  answer: {
    fa: "پرشیا آزما سیستم یک شرکت کالیبراسیون و کنترل کیفیت تخصصی است که با تمرکز جغرافیایی بر شیراز و جنوب کشور، خدمات کالیبراسیون تجهیزات پزشکی، تصویربرداری، صنعتی و آزمایشگاهی را با گواهینامه ایزو/آی‌ای‌سی ۱۷۰۲۵ و بیش از ۹۹.۹۹ درصد دقت اندازه‌گیری ارائه می‌دهد. تمرکز منطقه‌ای ما یعنی خدمات سریع‌تر و هزینه لجستیک بهینه‌تر برای مشتریان جنوب کشور.",
    en: "Persia Azma System is a specialized calibration and quality-control company with a geographic focus on Shiraz and southern Iran, offering ISO/IEC 17025-accredited calibration for medical, imaging, industrial, and laboratory equipment with over 99.99% measurement accuracy. Our regional focus means faster service and lower logistics cost for clients across southern Iran.",
  },
  order: 4,
  isPublished: true,
};

async function run() {
  const batch = db.batch();

  for (const [id, title] of Object.entries(titleUpdates)) {
    batch.update(db.collection("services").doc(id), { title, updatedAt: now });
  }

  batch.set(db.collection("faqs").doc("faq-4"), newFaq);

  await batch.commit();
  console.log(
    `Updated ${Object.keys(titleUpdates).length} service titles, added 1 FAQ entry.`
  );
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
