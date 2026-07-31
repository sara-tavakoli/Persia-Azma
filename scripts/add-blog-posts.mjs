// One-off content addition: publishes three more educational blog posts
// alongside the existing "role-of-calibration-in-quality-assurance" post.
// Run with: node --env-file=.env.local scripts/add-blog-posts.mjs
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
const day = 24 * 60 * 60 * 1000;

const posts = [
  {
    id: "calibration-verification-adjustment-difference",
    slug: {
      fa: "تفاوت-کالیبراسیون-وریفیکیشن-و-تنظیم",
      en: "calibration-verification-adjustment-difference",
    },
    title: {
      fa: "کالیبراسیون، وریفیکیشن و تنظیم: سه مفهومی که نباید با هم اشتباه گرفت",
      en: "Calibration, Verification, and Adjustment: Three Terms You Shouldn't Confuse",
    },
    excerpt: {
      fa: "بسیاری از مشتریان از ما می‌خواهند دستگاهشان را «کالیبره و تنظیم» کنیم، در حالی که این دو یک فرآیند نیستند. تفاوت این سه مفهوم را با مثال توضیح می‌دهیم.",
      en: "Many clients ask us to \"calibrate and adjust\" a device in the same breath, but these are not one process. Here's what actually separates the three.",
    },
    body: {
      fa: "یکی از رایج‌ترین سوءتفاهم‌هایی که در بازدیدهای فنی با آن مواجه می‌شویم، یکی‌انگاشتن سه مفهوم کالیبراسیون، وریفیکیشن و تنظیم (adjustment) است. این خلط مفهومی گاهی به تصمیم‌های نادرست در مدیریت تجهیزات منجر می‌شود؛ برای مثال، مدیر یک آزمایشگاه ممکن است تصور کند چون دستگاهش «کالیبره» شده، لزوماً دقیق‌تر هم شده است، در حالی‌که این‌طور نیست.\n\n### کالیبراسیون چیست؟\n\nکالیبراسیون یک فرآیند مقایسه‌ای است: مقدار نشان‌داده‌شده توسط دستگاه تحت آزمون با مقدار مرجع (تولیدشده توسط تجهیزات استاندارد قابل ردیابی) مقایسه می‌شود و انحراف آن مستند و گزارش می‌گردد. کالیبراسیون، به‌خودی‌خود، هیچ تغییری در دستگاه ایجاد نمی‌کند؛ خروجی آن یک گواهی حاوی مقادیر اندازه‌گیری‌شده، عدم قطعیت و انحراف از مقدار مرجع است.\n\n### وریفیکیشن چیست؟\n\nوریفیکیشن (تأیید) گامی فراتر از کالیبراسیون است: نتایج کالیبراسیون با یک معیار پذیرش از پیش تعیین‌شده (مثلاً مشخصات سازنده یا الزامات کاربری) مقایسه می‌شود تا مشخص شود آیا دستگاه «قابل قبول» است یا خیر. به بیان ساده، کالیبراسیون می‌گوید «دستگاه چقدر منحرف است» و وریفیکیشن می‌گوید «آیا این میزان انحراف برای کاربرد موردنظر قابل قبول است یا خیر».\n\n### تنظیم (Adjustment) چیست؟\n\nتنظیم، برخلاف دو مفهوم قبلی، یک مداخله فیزیکی در دستگاه است: تکنسین با تغییر پارامترهای داخلی دستگاه (مثلاً کالیبراسیون صفر و اسپن) تلاش می‌کند انحراف اندازه‌گیری‌شده را کاهش دهد. تنظیم باید همیشه با یک کالیبراسیون پس از تنظیم (post-adjustment calibration) تکمیل شود تا میزان بهبود مستند گردد.\n\n### چرا این تفاوت مهم است؟\n\nاگر یک دستگاه صرفاً وریفای شود اما خارج از محدوده پذیرش باشد، باید یا تنظیم شود یا از رده خارج گردد. تصمیم به تنظیم دستگاه بدون کالیبراسیون اولیه، می‌تواند دستگاهی را که صرفاً کمی خارج از محدوده بوده، به یک وضعیت بدتر برساند. به همین دلیل، در برنامه‌های کالیبراسیون حرفه‌ای، این سه گام همیشه به‌ترتیب و مجزا از هم مستند می‌شوند: ابتدا کالیبراسیون، سپس وریفیکیشن در برابر معیار پذیرش، و در صورت نیاز، تنظیم به همراه کالیبراسیون تأییدی پس از آن.\n\nدر پرشیا آزما سیستم، هر گزارش کالیبراسیون به‌وضوح مشخص می‌کند کدام‌یک از این مراحل انجام شده است، تا مشتری بداند دقیقاً چه اقدامی روی تجهیزش صورت گرفته.",
      en: "One of the most common misunderstandings we run into during technical visits is treating calibration, verification, and adjustment as the same thing. This conceptual mix-up sometimes leads to poor equipment-management decisions — a lab manager might assume that because a device was \"calibrated,\" it must now be more accurate, which isn't necessarily true.\n\n### What Is Calibration?\n\nCalibration is a comparison process: the value shown by the device under test is compared against a reference value (produced by traceable standard equipment), and the deviation is documented and reported. Calibration by itself makes no change to the device — its output is a certificate containing the measured values, uncertainty, and deviation from the reference.\n\n### What Is Verification?\n\nVerification goes one step beyond calibration: the calibration results are compared against a predetermined acceptance criterion (such as the manufacturer's specification or the user's requirements) to determine whether the device is \"acceptable.\" Put simply, calibration tells you how far off a device is, and verification tells you whether that much deviation is acceptable for the intended use.\n\n### What Is Adjustment?\n\nUnlike the first two, adjustment is a physical intervention on the device: a technician changes internal parameters (such as zero and span) to reduce the measured deviation. Adjustment should always be followed by a post-adjustment calibration to document the improvement.\n\n### Why the Difference Matters\n\nIf a device is only verified and found outside its acceptance range, it must either be adjusted or taken out of service. Deciding to adjust a device without an initial calibration can actually make a device that was only slightly out of range worse. That's why, in professional calibration programs, these three steps are always documented separately and in order: calibration first, then verification against the acceptance criterion, and, if needed, adjustment followed by a confirming calibration.\n\nAt Persia Azma System, every calibration report clearly states which of these steps was performed, so the client knows exactly what was done to their equipment.",
    },
    tags: ["calibration", "metrology", "quality-assurance"],
  },
  {
    id: "how-to-set-calibration-intervals",
    slug: {
      fa: "تعیین-فاصله-زمانی-کالیبراسیون-تجهیزات",
      en: "how-to-set-calibration-intervals",
    },
    title: {
      fa: "فاصله زمانی کالیبراسیون تجهیزات را چگونه باید تعیین کرد؟",
      en: "How Should You Set Calibration Intervals for Your Equipment?",
    },
    excerpt: {
      fa: "«هر یک سال یک‌بار» یک پاسخ ساده اما اغلب نادرست است. فاصله کالیبراسیون باید بر اساس ریسک، سابقه عملکرد و شرایط کاربری هر دستگاه تعیین شود.",
      en: "\"Once a year\" is a simple answer, but often the wrong one. Calibration intervals should be set based on risk, performance history, and how each device is actually used.",
    },
    body: {
      fa: "یکی از پرتکرارترین سوالاتی که از سوی مدیران کیفیت و مسئولان فنی مراکز درمانی و صنعتی می‌شنویم این است: «فاصله کالیبراسیون این دستگاه باید چقدر باشد؟» پاسخ رایج و ساده، «یک‌بار در سال» است؛ اما این پاسخ، اگرچه نقطه شروع مناسبی است، همیشه بهینه نیست.\n\n### چرا یک فاصله ثابت برای همه تجهیزات کار نمی‌کند؟\n\nدو دستگاه با کاربرد کاملاً متفاوت را در نظر بگیرید: یک ترازوی آزمایشگاهی که روزانه و در شرایط کنترل‌شده استفاده می‌شود، و یک مانومتر فشار که در محیط صنعتی با ارتعاش، گردوغبار و نوسان دما به‌کار می‌رود. اعمال یک بازه یکسان برای هر دو، یا منجر به کالیبراسیون بیش‌ازحد (و هزینه غیرضروری) دستگاه اول می‌شود، یا کالیبراسیون ناکافی (و ریسک بالا) برای دستگاه دوم.\n\n### چه عواملی فاصله بهینه را تعیین می‌کنند؟\n\nاستانداردهایی مانند ILAC-G24 و راهنمای ISO/IEC 17025 چند عامل کلیدی را برای تعیین فاصله کالیبراسیون پیشنهاد می‌کنند:\n\n- **حساسیت و بحرانی‌بودن کاربرد**: دستگاهی که مستقیماً بر ایمنی بیمار یا کیفیت محصول نهایی اثر می‌گذارد، به فاصله کوتاه‌تری نیاز دارد.\n- **سابقه عملکرد دستگاه**: اگر کالیبراسیون‌های پیشین یک دستگاه، انحراف کم و پایدار نشان داده‌اند، می‌توان فاصله را با احتیاط افزایش داد؛ برعکسِ آن نیز صادق است.\n- **شدت و شرایط کاربری**: دستگاهی که در محیط با نوسان دمایی شدید، رطوبت بالا یا استفاده مکرر قرار دارد، سریع‌تر دچار انحراف می‌شود.\n- **توصیه سازنده**: نقطه شروع مناسبی است، اما نباید تنها معیار باقی بماند.\n- **الزامات قانونی و استانداردهای بخش**: برخی تجهیزات پزشکی و صنعتی، فاصله حداکثری مشخصی از سوی مراجع ناظر دارند که قابل تجاوز نیست.\n\n### رویکرد ما\n\nدر پرشیا آزما سیستم، برای مشتریانی که برنامه مدیریت کالیبراسیون دارند، فاصله هر دستگاه را بر پایه تحلیل ریسک و بازبینی سوابق کالیبراسیون‌های قبلی تنظیم می‌کنیم، نه صرفاً یک عدد ثابت برای کل موجودی تجهیزات. این رویکرد، ضمن حفظ انطباق با الزامات قانونی، هزینه‌های غیرضروری کالیبراسیون بیش‌ازحد را نیز کاهش می‌دهد.",
      en: "One of the most frequent questions we hear from quality managers and technical staff at treatment centers and industrial sites is: \"How often should this device be calibrated?\" The common, simple answer is \"once a year\" — a reasonable starting point, but not always the optimal one.\n\n### Why One Fixed Interval Doesn't Work for Everything\n\nConsider two devices with very different use profiles: a laboratory balance used daily under controlled conditions, and a pressure gauge used in an industrial environment with vibration, dust, and temperature swings. Applying the same interval to both either over-calibrates the first (unnecessary cost) or under-calibrates the second (elevated risk).\n\n### What Determines the Optimal Interval?\n\nStandards such as ILAC-G24 and ISO/IEC 17025 guidance point to several key factors for setting calibration intervals:\n\n- **Sensitivity and criticality of use**: a device that directly affects patient safety or final product quality needs a shorter interval.\n- **The device's performance history**: if previous calibrations show small, stable deviation, the interval can be cautiously extended — and the reverse is also true.\n- **Severity of operating conditions**: a device used in an environment with large temperature swings, high humidity, or heavy use will drift faster.\n- **Manufacturer recommendation**: a reasonable starting point, but shouldn't be the only criterion.\n- **Regulatory and sector requirements**: some medical and industrial equipment has a maximum interval set by a regulatory body that cannot be exceeded.\n\n### Our Approach\n\nFor clients on a managed calibration program, Persia Azma System sets each device's interval based on risk analysis and a review of prior calibration history, rather than a single fixed number applied across the entire equipment inventory. This approach maintains regulatory compliance while cutting the unnecessary cost of over-calibration.",
    },
    tags: ["calibration", "risk-management", "quality-assurance"],
  },
  {
    id: "why-measurement-uncertainty-matters",
    slug: {
      fa: "چرا-عدم-قطعیت-اندازه-گیری-اهمیت-دارد",
      en: "why-measurement-uncertainty-matters",
    },
    title: {
      fa: "عدم قطعیت اندازه‌گیری: عددی که هیچ گواهی کالیبراسیونی نباید بدون آن باشد",
      en: "Measurement Uncertainty: The Number No Calibration Certificate Should Be Without",
    },
    excerpt: {
      fa: "یک عدد اندازه‌گیری‌شده بدون عدم قطعیت، یک عدد ناقص است. این مفهوم که اغلب نادیده گرفته می‌شود، تفاوت بین یک گزارش قابل دفاع و یک گزارش صرفاً تزئینی است.",
      en: "A measured value without its uncertainty is an incomplete number. This often-overlooked concept is the difference between a defensible report and a purely decorative one.",
    },
    body: {
      fa: "وقتی گواهی کالیبراسیونی را مطالعه می‌کنید که در آن نوشته شده «مقدار خوانده‌شده: ۲۰۰٫۳ بار»، این عدد به‌تنهایی چه می‌گوید؟ در واقع، بدون دانستن میزان عدم قطعیت این اندازه‌گیری، این عدد اطلاعات ناقصی ارائه می‌دهد. عدم قطعیت اندازه‌گیری، بازه‌ای است که مقدار واقعی کمیت اندازه‌گیری‌شده با سطح اطمینان مشخصی (معمولاً ۹۵٪) درون آن قرار دارد.\n\n### چرا این عدد نادیده گرفته می‌شود؟\n\nبسیاری از کاربران تجهیزات، عدم قطعیت را یک بخش فنی و پیچیده گزارش می‌دانند که می‌توان از آن گذشت. اما این عدد دقیقاً همان چیزی است که استاندارد ایزو ۱۷۰۲۵ آزمایشگاه‌های آزمون و کالیبراسیون را ملزم به محاسبه و گزارش آن می‌کند، و تفاوت اصلی میان یک آزمایشگاه معتبر و یک بازدید غیررسمی است.\n\n### یک مثال ملموس\n\nفرض کنید مشخصات فنی یک محصول صنعتی، فشار عملیاتی مجاز حداکثر ۲۰۰ بار را تعیین کرده است. مانومتر مرجع، مقدار ۲۰۰٫۳ بار را با عدم قطعیت ۰٫۵± بار گزارش می‌دهد. این یعنی مقدار واقعی می‌تواند بین ۱۹۹٫۸ تا ۲۰۰٫۸ بار باشد؛ به بیان دیگر، احتمال دارد فشار واقعی از حد مجاز فراتر رفته باشد. بدون در نظر گرفتن عدم قطعیت، این نتیجه به‌اشتباه «قابل قبول» تلقی می‌شد.\n\n### عدم قطعیت از کجا می‌آید؟\n\nمنابع عدم قطعیت شامل دقت تجهیز مرجع، شرایط محیطی (دما، رطوبت، ارتعاش)، مهارت اپراتور، و پایداری خود دستگاه تحت آزمون است. یک آزمایشگاه کالیبراسیون معتبر، تمامی این منابع را طبق راهنمای بین‌المللی GUM (Guide to the Expression of Uncertainty in Measurement) شناسایی، ترکیب و در بودجه عدم قطعیت خود لحاظ می‌کند.\n\n### نتیجه عملی برای مشتریان ما\n\nهر گواهی کالیبراسیونی که از پرشیا آزما سیستم دریافت می‌کنید، شامل مقدار عدم قطعیت اندازه‌گیری‌شده در کنار هر نتیجه است. این یعنی شما نه‌تنها می‌دانید دستگاهتان چه مقداری را نشان می‌دهد، بلکه می‌دانید تا چه حد می‌توانید به آن مقدار اعتماد کنید — و این دقیقاً همان چیزی است که یک تصمیم مهندسی یا بالینی معتبر به آن نیاز دارد.",
      en: "When you read a calibration certificate that says \"reading: 200.3 bar,\" what does that number actually tell you on its own? Without knowing the measurement uncertainty, it's an incomplete piece of information. Measurement uncertainty is the range within which the true value of the measured quantity lies, at a stated level of confidence (typically 95%).\n\n### Why Is It Often Ignored?\n\nMany equipment users see uncertainty as a complex technical detail they can skip over. But it's exactly what ISO/IEC 17025 requires testing and calibration laboratories to calculate and report — and it's the core difference between an accredited laboratory and an informal visit.\n\n### A Concrete Example\n\nSuppose a piece of industrial equipment's specification sets a maximum allowed operating pressure of 200 bar. The reference gauge reports 200.3 bar with an uncertainty of ±0.5 bar. That means the true value could be anywhere from 199.8 to 200.8 bar — in other words, the actual pressure may well exceed the allowed limit. Without accounting for uncertainty, this result would be wrongly read as \"acceptable.\"\n\n### Where Does Uncertainty Come From?\n\nSources of uncertainty include the accuracy of the reference instrument, environmental conditions (temperature, humidity, vibration), operator skill, and the stability of the device under test itself. An accredited calibration laboratory identifies, combines, and accounts for all of these sources in its uncertainty budget, following the international GUM (Guide to the Expression of Uncertainty in Measurement).\n\n### What This Means for Our Clients\n\nEvery calibration certificate you receive from Persia Azma System includes the measurement uncertainty alongside each result. That means you don't just know what value your device is showing — you know how much you can trust that value. And that's exactly what a sound engineering or clinical decision requires.",
    },
    tags: ["measurement-uncertainty", "iso-17025", "metrology"],
  },
];

async function run() {
  const batch = db.batch();

  posts.forEach(({ id, ...post }, i) => {
    batch.set(db.collection("blogPosts").doc(id), {
      ...post,
      author: "پرشیا آزما سیستم",
      locales: ["fa", "en"],
      isPublished: true,
      publishedAt: now - i * day,
      createdAt: now - i * day,
      updatedAt: now - i * day,
    });
  });

  await batch.commit();
  console.log(`Published ${posts.length} new blog posts.`);
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
