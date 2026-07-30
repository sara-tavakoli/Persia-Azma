// One-off content migration: replaces placeholder services with the client's
// real service catalog and publishes the first blog post.
// Run with: node --env-file=.env.local scripts/migrate-content.mjs
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

const staleServiceIds = [
  "equipment-performance-analysis",
  "cost-reduction-consulting",
  "troubleshooting-consultation",
];

const rewrittenServiceBodies = {
  "medical-equipment-quality-control": {
    fa: "دقت و صحت تجهیزات پزشکی و آزمایشگاهی به‌طور مستقیم بر سلامت بیماران، اعتبار نتایج تشخیصی و ایمنی کادر درمان اثر می‌گذارد. یک انکوباتور با دمای انحراف‌یافته می‌تواند فرآیند کشت میکروبی را باطل کند، یک اتوکلاو با فشار یا زمان استریلیزاسیون نامناسب می‌تواند به انتقال عفونت بیمارستانی منجر شود و یک سمپلر با حجم برداشت خطادار می‌تواند نتیجه یک آزمایش تشخیصی حیاتی را به‌کلی تغییر دهد.\n\nالزامات وزارت بهداشت، اداره کل تجهیزات پزشکی، استاندارد اعتباربخشی بیمارستان‌ها و استاندارد ایزو ۱۵۱۸۹ ویژه آزمایشگاه‌های تشخیص طبی، مراکز درمانی و آزمایشگاهی را ملزم می‌کنند که دقت، صحت و ردیابی‌پذیری تجهیزات خود را در بازه‌های زمانی مشخص و مستند اثبات کنند.\n\n### خدمات تخصصی ما\n\nشرکت پرشیا آزما سیستم با در اختیار داشتن تجهیزات مرجع و کارشناسان مجرب، طیف گسترده‌ای از خدمات کنترل کیفیت را برای تجهیزات پزشکی و آزمایشگاهی ارائه می‌کند. هر بازدید فنی شامل موارد زیر است:\n\n- ارزیابی اولیه وضعیت دستگاه\n- اجرای آزمون‌های استاندارد با تجهیزات مرجع قابل ردیابی\n- ثبت مستندات دقیق و برچسب‌گذاری وضعیت\n- صدور گزارش کالیبراسیون همراه با محاسبه عدم قطعیت اندازه‌گیری\n\nبرنامه‌های ادواری کنترل کیفیت مطابق تعداد دستگاه‌های تحت مسئولیت مرکز، سطح کاربرد بالینی هر دستگاه و توصیه‌های سازنده طراحی می‌شوند تا مدیران مراکز درمانی بدون دغدغه از انطباق دائمی تجهیزات با استانداردهای ملی و بین‌المللی اطمینان حاصل کنند.",
    en: "The accuracy of medical and laboratory equipment has a direct effect on patient health, the reliability of diagnostic results, and staff safety. An incubator running off-temperature can invalidate a microbial culture, an autoclave with incorrect pressure or sterilization time can lead to hospital-acquired infection, and a sampler with an inaccurate draw volume can completely change the result of a critical diagnostic test.\n\nRequirements from the Ministry of Health, the Medical Equipment Directorate, hospital accreditation standards, and ISO 15189 (for medical diagnostic laboratories) all require treatment centers and laboratories to demonstrate the accuracy, correctness, and traceability of their equipment at documented, regular intervals.\n\n### Our Specialized Services\n\nWith reference-grade equipment and experienced specialists, Persia Azma System provides a wide range of quality-control services for medical and laboratory equipment. Every technical visit includes:\n\n- Initial assessment of the device's condition\n- Standard testing with traceable reference equipment\n- Precise documentation and status labeling\n- Issuance of a calibration report with calculated measurement uncertainty\n\nPeriodic quality-control programs are designed around the number of devices under a center's responsibility, each device's level of clinical use, and manufacturer recommendations — so treatment-center managers can be confident their equipment is continuously compliant with national and international standards, without having to worry about it.",
  },
  "imaging-equipment-quality-control": {
    fa: "تصویربرداری پزشکی سنگ‌بنای تشخیص بالینی مدرن است و کیفیت هر تصویر به‌طور مستقیم بر دقت تشخیص، انتخاب مسیر درمان و پیش‌آگهی بیمار اثر می‌گذارد. در دستگاه‌های مبتنی بر پرتوهای یونیزان مانند رادیولوژی، فلوروسکوپی، سی‌تی اسکن و ماموگرافی، انحراف در پارامترهای فنی می‌تواند از یک سو دز غیرضروری به بیمار و کادر تحمیل کند و از سوی دیگر تصویری کم‌کیفیت یا قابل تفسیر اشتباه پدید آورد.\n\nسازمان انرژی اتمی ایران، اداره کل تجهیزات پزشکی و مراجع بین‌المللی از جمله آژانس بین‌المللی انرژی اتمی و انجمن فیزیک پزشکی آمریکا، اجرای برنامه‌های منظم کنترل کیفیت و پایش دز را برای این تجهیزات الزامی کرده‌اند.\n\n### خدمات تخصصی ما\n\nشرکت پرشیا آزما سیستم با بهره‌گیری از فانتوم‌ها و تجهیزات اندازه‌گیری تخصصی، طیف وسیعی از خدمات کنترل کیفیت تصویربرداری را ارائه می‌کند:\n\n- آزمون‌های کنترل کیفیت رادیولوژی ثابت و پرتابل، شامل ارزیابی کیلوولتاژ، زمان‌سنج، دز خروجی، هم‌راستایی پرتو و کولیمیشن\n- تست‌های جامع دستگاه‌های سی‌تی اسکن شامل عدد سی‌تی، یکنواختی، نویز، ضخامت برش و شاخص دز حجمی\n- کنترل کیفیت ماموگرافی دیجیتال بر اساس پروتکل‌های اروپایی\n- تست‌های دانسیتومتری استخوان\n- کنترل کیفیت دستگاه‌های سی‌آرم اتاق عمل و آنژیوگرافی\n- پایش عملکرد سیستم‌های پرینت و مانیتورهای تشخیصی\n- خدمات کنترل کیفیت غیرپرتوی: ارزیابی سونوگرافی با فانتوم‌های مرجع و بررسی عملکرد دستگاه‌های ام‌آرآی\n\nتمامی گزارش‌های صادره حاوی مقدار عدم قطعیت، مقایسه با محدوده مجاز استاندارد و توصیه‌های عملی جهت رفع ناهم‌خوانی‌ها هستند.",
    en: "Medical imaging is the cornerstone of modern clinical diagnosis, and the quality of every image directly affects diagnostic accuracy, treatment-path decisions, and patient outcomes. In ionizing-radiation devices such as radiology, fluoroscopy, CT, and mammography systems, a deviation in technical parameters can both expose patients and staff to unnecessary dose and produce a low-quality or misleading image.\n\nThe Atomic Energy Organization of Iran, the Medical Equipment Directorate, and international bodies including the IAEA and the American Association of Physicists in Medicine all require regular quality-control and dose-monitoring programs for this equipment.\n\n### Our Specialized Services\n\nUsing phantoms and specialized measurement equipment, Persia Azma System provides a wide range of imaging quality-control services:\n\n- Fixed and portable radiology QC testing, including kVp, timer, output dose, beam alignment, and collimation\n- Comprehensive CT scanner testing, including CT number, uniformity, noise, slice thickness, and volume dose index\n- Digital mammography quality control based on European protocols\n- Bone densitometry testing\n- QC of operating-room C-arm and angiography systems\n- Performance monitoring of print systems and diagnostic monitors\n- Non-radiation QC services: ultrasound assessment with reference phantoms and MRI performance testing\n\nEvery report we issue includes measurement uncertainty, a comparison against the permitted standard range, and practical recommendations for resolving any discrepancy.",
  },
  "industrial-equipment-calibration": {
    fa: "در صنایع فرآیندی شامل نفت، گاز، پتروشیمی، پالایشگاه‌ها، فولاد، آب و برق، دارویی و غذایی، هزاران ابزار اندازه‌گیری به‌طور مستمر پارامترهایی نظیر فشار، دما، دبی، سطح، ولتاژ، جریان، ابعادی و نیرو را پایش می‌کنند. یک ترانسمیتر فشار با انحراف چند درصدی می‌تواند به تصمیم‌گیری اشتباه در فرآیند و افت راندمان انرژی منجر شود؛ یک ترموکوپل خطادار در کوره فولاد می‌تواند کیفیت متالورژیکی محصول را مخدوش کند.\n\nعلاوه بر ملاحظات عملیاتی و مالی، اکثر مراکز تولیدی برای حفظ گواهی‌های ایزو ۹۰۰۱، ایزو ۵۰۰۰۱ (مدیریت انرژی)، ایزو ۴۵۰۰۱ (ایمنی و سلامت شغلی) و ایزو ۱۴۰۰۱ (مدیریت زیست‌محیطی)، ملزم به ارائه شواهد مستند از کالیبراسیون ادواری تجهیزات اندازه‌گیری خود هستند.\n\n### زمینه‌های تخصصی کالیبراسیون\n\nدامنه خدمات ما طیف گسترده‌ای از کمیت‌های فیزیکی را در بر می‌گیرد و در دو مد آزمایشگاه ثابت و در محل مشتری قابل ارائه است:\n\n- **فشار (Pressure):** گیج‌ها، ترانسمیترها، سوئیچ‌ها، مانومترها، تست‌کننده‌های وزنه‌آزاد\n- **دما (Temperature):** ترموکوپل‌ها، آر‌تی‌دی، دماسنج‌های صنعتی و پزشکی، کوره‌ها، آون‌ها\n- **کمیت‌های الکتریکی:** مولتی‌مترها، کلمپ‌مترها، منابع تغذیه، اسیلوسکوپ‌ها\n- **ابعادی:** کولیس، میکرومتر، ساعت اندیکاتور، بلوک گیج، ضخامت‌سنج\n- **جرم و ترازو:** ترازوهای آزمایشگاهی و صنعتی، وزنه‌های مرجع، باسکول\n- **حجم:** سمپلرها، بورت‌ها، پیپت‌ها، بالن ژوژه\n- **جریان سیال:** فلومترهای توربینی، اولتراسونیک، الکترومغناطیسی، کوریولیس\n- **نیرو و بار:** لودسل‌ها، دینامومترها، ماشین‌های تست کشش و فشار\n- **گشتاور:** ترک‌مترها، آچارهای گشتاورسنج\n- **زمان و فرکانس:** کرنومترها، تایمرهای صنعتی، فرکانس‌متر\n- **رطوبت:** رطوبت‌سنج‌ها، دیتالاگرها، اتاقک‌های کلیماتیک\n- **نوری و لیزری:** لوکس‌مترها، توان‌سنج‌های لیزر، طیف‌سنج‌ها\n- **گاز:** گاز آنالایزرها، سنسورهای گاز سمی و قابل اشتعال\n\nدرصورتی‌که تجهیز مورد نظر شما در فهرست فوق ذکر نشده باشد، کارشناسان ما پس از ارزیابی مشخصات فنی، امکان‌پذیری و دستورالعمل کالیبراسیون را برای شما شفاف مشخص می‌کنند.",
    en: "In process industries — oil and gas, petrochemicals, refineries, steel, water and power, pharmaceuticals, and food — thousands of measuring instruments continuously monitor parameters such as pressure, temperature, flow, level, voltage, current, dimension, and force. A pressure transmitter off by a few percent can lead to a wrong process decision and lost energy efficiency; a faulty thermocouple in a steel furnace can compromise the metallurgical quality of the product.\n\nBeyond the operational and financial stakes, most manufacturing sites need documented evidence of periodic equipment calibration to maintain ISO 9001, ISO 50001 (energy management), ISO 45001 (occupational health & safety), and ISO 14001 (environmental management) certification.\n\n### Calibration Specialties\n\nOur calibration services cover a wide range of physical quantities, available both in our fixed laboratory and on-site at your facility:\n\n- **Pressure:** gauges, transmitters, switches, manometers, dead-weight testers\n- **Temperature:** thermocouples, RTDs, industrial and medical thermometers, furnaces, ovens\n- **Electrical quantities:** multimeters, clamp meters, power supplies, oscilloscopes\n- **Dimensional:** calipers, micrometers, dial indicators, gauge blocks, thickness gauges\n- **Mass & balance:** laboratory and industrial scales, reference weights, weighbridges\n- **Volume:** samplers, burettes, pipettes, volumetric flasks\n- **Fluid flow:** turbine, ultrasonic, electromagnetic, and Coriolis flow meters\n- **Force & load:** load cells, dynamometers, tension/compression testing machines\n- **Torque:** torque meters, torque wrenches\n- **Time & frequency:** stopwatches, industrial timers, frequency meters\n- **Humidity:** hygrometers, data loggers, climatic chambers\n- **Optical & laser:** lux meters, laser power meters, spectrometers\n- **Gas:** gas analyzers, toxic and flammable gas sensors\n\nIf the instrument you need calibrated isn't on this list, our specialists will assess its technical specifications and clearly let you know the calibration feasibility and procedure.",
  },
};

const newServices = [
  {
    id: "physiotherapy-rehab-equipment-quality-control",
    slug: { fa: "کنترل-کیفیت-تجهیزات-فیزیوتراپی", en: "physiotherapy-rehab-equipment-quality-control" },
    title: { fa: "کنترل کیفیت تجهیزات فیزیوتراپی و توانبخشی", en: "Physiotherapy & Rehabilitation Equipment Quality Control" },
    shortDescription: {
      fa: "ارزیابی و کالیبراسیون دستگاه‌های اولتراسوند تراپی، تحریک الکتریکی، لیزر و شاک‌ویو، برای تضمین ایمنی و اثربخشی درمان بیماران.",
      en: "Assessment and calibration of ultrasound therapy, electrical stimulation, laser, and shockwave devices, to ensure treatment safety and effectiveness.",
    },
    body: {
      fa: "تجهیزات فیزیوتراپی و توانبخشی از جمله دستگاه‌هایی هستند که مستقیماً انرژی الکتریکی، صوتی، حرارتی یا نوری را به بدن بیمار وارد می‌کنند و هر انحراف کوچک در دز خروجی می‌تواند بین یک درمان اثربخش و یک آسیب جدی به بافت بیمار تفاوت ایجاد کند. یک دستگاه اولتراسوند تراپی با انحراف در توان خروجی می‌تواند به‌جای بهبود بافت نرم، منجر به سوختگی حرارتی شود؛ یک دستگاه تحریک الکتریکی TENS با شدت جریان نادرست، تجربه دردناک و ناکارآمدی برای بیمار به همراه دارد.\n\n### خدمات تخصصی ما\n\nپرشیا آزما سیستم خدمات کنترل کیفیت طیف کاملی از تجهیزات فیزیوتراپی و طب فیزیکی را ارائه می‌دهد، از جمله:\n\n- ارزیابی توان و شدت خروجی دستگاه‌های اولتراسوند تراپی و تست یکنواختی سر پروب\n- صحت‌سنجی جریان، فرکانس و شکل موج در دستگاه‌های TENS، الکتروتراپی، اینترفرنشیال، دیاترمی موج کوتاه و ماکروویو تراپی\n- اندازه‌گیری توان خروجی و طول موج لیزرهای درمانی کم‌توان و پرتوان\n- کالیبراسیون دستگاه‌های شاک‌ویو تراپی\n- کنترل کیفیت تخت‌های کشش، تخت‌های تیلت و تجهیزات مکانوتراپی\n- ارزیابی عملکرد تجهیزات مغناطیس‌درمانی\n\nبرای هر دستگاه، فرایند ارزیابی مطابق راهنمای سازنده و استانداردهای مرجع اجرا می‌شود و گزارش نهایی به همراه محاسبه عدم قطعیت و توصیه‌های نگهداشت پیشگیرانه تحویل داده می‌شود.",
      en: "Physiotherapy and rehabilitation equipment delivers electrical, acoustic, thermal, or light energy directly into a patient's body, so even a small deviation in output dose can be the difference between an effective treatment and real tissue injury. An ultrasound therapy unit with an output-power deviation can cause a thermal burn instead of improving soft tissue; a TENS electrical-stimulation device with the wrong current intensity makes treatment painful and ineffective.\n\n### Our Specialized Services\n\nPersia Azma System provides quality-control services across the full range of physiotherapy and physical-medicine equipment, including:\n\n- Output power and intensity assessment of ultrasound therapy devices, with probe-head uniformity testing\n- Current, frequency, and waveform verification for TENS, electrotherapy, interferential, shortwave diathermy, and microwave therapy devices\n- Output power and wavelength measurement for low- and high-power therapeutic lasers\n- Calibration of shockwave therapy devices\n- Quality control of traction beds, tilt tables, and mechanotherapy equipment\n- Performance assessment of magnetotherapy equipment\n\nFor every device, the assessment follows the manufacturer's guidance and reference standards, and the final report includes calculated uncertainty and preventive-maintenance recommendations.",
    },
    category: "medical",
    iconKey: "activity",
    order: 4,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "staff-training-courses",
    slug: { fa: "دوره‌های-آموزشی-تخصصی", en: "staff-training-courses" },
    title: { fa: "خدمات آموزش تخصصی کنترل کیفیت و کالیبراسیون", en: "Specialized Training in Quality Control & Calibration" },
    shortDescription: {
      fa: "دوره‌های تخصصی اندازه‌شناسی، ایزو ۱۷۰۲۵ و محاسبه عدم قطعیت، به‌صورت حضوری، آزمایشگاهی یا مجازی.",
      en: "Specialized courses in metrology, ISO 17025, and measurement uncertainty — delivered on-site, in our lab, or virtually.",
    },
    body: {
      fa: "حتی دقیق‌ترین تجهیزات مرجع، بدون کارشناسان آموزش‌دیده‌ای که مفاهیم اندازه‌شناسی، منشأ خطا، منابع عدم قطعیت و مراجع ردیابی‌پذیر را عمیقاً درک کنند، تولید داده معتبر را تضمین نمی‌کنند. بخش قابل توجهی از عدم انطباق‌های گزارش‌شده در ممیزی‌های داخلی و برون‌سازمانی، نه از نقص فنی تجهیزات، بلکه از خطاهای انسانی و اجرای غیراستاندارد دستورالعمل‌ها ناشی می‌شود. استانداردهای ایزو ۱۷۰۲۵، ایزو ۹۰۰۱ و بند شایستگی پرسنل در ایزو ۱۵۱۸۹، سازمان‌ها را ملزم می‌کنند سوابق آموزش و ارزیابی صلاحیت کارکنان مرتبط با اندازه‌گیری را مستند و در دسترس ممیز نگه دارند.\n\n### دوره‌های آموزشی ما\n\nپرشیا آزما سیستم، سبد متنوعی از دوره‌های آموزشی متناسب با سطوح مختلف پرسنل طراحی و اجرا می‌کند، به‌صورت حضوری در محل کارفرما، آزمایشگاهی در مرکز آموزش ما، یا مجازی:\n\n- مفاهیم پایه اندازه‌شناسی و ردیابی‌پذیری\n- تفسیر عملی الزامات استاندارد ایزو ۱۷۰۲۵\n- اصول محاسبه و بیان عدم قطعیت اندازه‌گیری مطابق راهنمای بین‌المللی GUM\n- کالیبراسیون تخصصی در کمیت‌های فشار، دما، جرم، ابعادی، الکتریکی، جریان سیال و گشتاور\n- کنترل کیفیت تجهیزات پزشکی و آزمایشگاهی\n- مبانی کنترل کیفیت تصویربرداری پزشکی و پایش دز\n- استقرار سیستم مدیریت کالیبراسیون در سازمان\n- ممیزی داخلی آزمایشگاه‌های کالیبراسیون\n- تعیین بهینه فواصل کالیبراسیون بر پایه تحلیل ریسک\n\nهمه دوره‌ها به‌صورت کارگاهی و تعاملی طراحی شده‌اند و شرکت‌کنندگان با تجهیزات واقعی، نمونه‌داده صنعتی و مطالعات موردی مواجه می‌شوند. در پایان هر دوره، آزمون پایانی برگزار و گواهی‌نامه شرکت در دوره صادر می‌شود. برای سازمان‌هایی که برنامه توسعه شایستگی خود را تعریف کرده‌اند، امکان طراحی دوره‌های اختصاصی مبتنی بر شرح شغل و تجهیزات موجود نیز فراهم است.",
      en: "Even the most accurate reference equipment cannot guarantee valid data without trained specialists who deeply understand metrology concepts, sources of error, uncertainty contributions, and traceable references. A significant share of the non-conformities reported in internal and external audits come not from equipment faults but from human error and non-standard execution of procedures. ISO 17025, ISO 9001, and the personnel-competence clause of ISO 15189 all require organizations to keep documented, audit-ready records of training and competency assessment for measurement-related staff.\n\n### Our Training Courses\n\nPersia Azma System designs and delivers a varied portfolio of courses suited to different personnel levels — on-site at your facility, in our training lab, or virtually:\n\n- Fundamentals of metrology and traceability\n- Practical interpretation of ISO 17025 requirements\n- Principles of calculating and expressing measurement uncertainty per the international GUM guide\n- Specialized calibration training in pressure, temperature, mass, dimensional, electrical, flow, and torque quantities\n- Quality control of medical and laboratory equipment\n- Fundamentals of medical imaging quality control and dose monitoring\n- Deploying a calibration management system within an organization\n- Internal auditing of calibration laboratories\n- Risk-based optimization of calibration intervals\n\nAll courses are workshop-style and interactive, giving participants hands-on time with real equipment, industrial sample data, and case studies. Each course ends with a final exam and a certificate of completion. For organizations with a defined competency-development program, we can also design custom courses based on specific job roles and in-house equipment.",
    },
    category: "consulting",
    iconKey: "graduationCap",
    order: 5,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "on-site-field-calibration",
    slug: { fa: "کالیبراسیون-در-محل-مشتری", en: "on-site-field-calibration" },
    title: { fa: "خدمات فنی، مهندسی و کالیبراسیون در محل مشتری", en: "On-Site Technical & Field Calibration Services" },
    shortDescription: {
      fa: "کالیبراسیون سیار با آزمایشگاه‌های مجهز و تیم‌های آموزش‌دیده، برای تجهیزاتی که امکان انتقال به آزمایشگاه ثابت را ندارند.",
      en: "Mobile calibration with fully equipped field labs and trained crews, for equipment that can't be moved to a fixed laboratory.",
    },
    body: {
      fa: "برای بسیاری از تجهیزات، امکان انتقال دستگاه از سایت کارفرما به آزمایشگاه ثابت وجود ندارد؛ چه به دلیل ابعاد و وزن دستگاه، چه به دلیل نصب دائم آن در خط تولید، و چه به دلیل هزینه‌های توقف تولید. شرکت پرشیا آزما سیستم با تجهیز تیم‌های سیار خود به تجهیزات و مراجع اندازه‌شناسی پرتابل، آزمایشگاه‌های سیار مجهز، تسهیلات لجستیک و پرسنل آموزش‌دیده، خدمات کالیبراسیون در محل را برای کلیه صنایع جنوب کشور در دسترس قرار داده است.\n\n### پوشش صنعتی گسترده\n\nخدمات کالیبراسیون در محل ما در طیف وسیعی از صنایع اجرا می‌شود:\n\n- میادین بالادستی نفت و گاز (خشکی و دریایی)\n- پالایشگاه‌ها و مجتمع‌های پتروشیمی\n- صنایع فولاد و آلومینیوم\n- نیروگاه‌های حرارتی و برق‌آبی\n- صنایع دریایی و بندری\n- پروژه‌های تصفیه آب و فاضلاب\n- صنایع دارویی و غذایی\n- بیمارستان‌ها و مراکز درمانی بزرگ\n\nتیم‌های میدانی ما با آگاهی از الزامات ایمنی HSE در هر یک از این محیط‌ها، مجوزهای کاری لازم را دریافت کرده و کار را با کمترین تداخل با عملیات جاری کارفرما به انجام می‌رسانند. کلیه فعالیت‌ها با هماهنگی قبلی، برنامه‌ریزی توقف حداقلی و رعایت دستورالعمل‌های ایمنی سایت کارفرما اجرا می‌شود.",
      en: "Many instruments simply can't be moved from a client's site to a fixed laboratory — whether because of their size and weight, their permanent installation on a production line, or the cost of production downtime. Persia Azma System equips its field teams with portable metrology references, fully outfitted mobile labs, logistics support, and trained personnel to make on-site calibration available across all industries in southern Iran.\n\n### Broad Industrial Coverage\n\nOur on-site calibration services run across a wide range of industries:\n\n- Upstream oil & gas fields (onshore and offshore)\n- Refineries and petrochemical complexes\n- Steel and aluminum plants\n- Thermal and hydroelectric power stations\n- Marine and port industries\n- Water and wastewater treatment projects\n- Pharmaceutical and food industries\n- Hospitals and major treatment centers\n\nOur field teams understand the HSE requirements of each of these environments, obtain the necessary work permits, and complete work with minimal disruption to a client's ongoing operations. All activities are coordinated in advance, planned for minimal downtime, and carried out in compliance with the client site's safety procedures.",
    },
    category: "industrial",
    iconKey: "truck",
    order: 6,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cleanroom-certification-iaq-monitoring",
    slug: { fa: "تصدیق-اتاق-تمیز-و-کیفیت-هوا", en: "cleanroom-certification-iaq-monitoring" },
    title: { fa: "تصدیق اتاق‌های تمیز و پایش کیفیت هوای داخل ساختمان", en: "Cleanroom Certification & Indoor Air Quality Monitoring" },
    shortDescription: {
      fa: "طبقه‌بندی اتاق‌های تمیز مطابق ایزو ۱۴۶۴۴ و پایش کیفیت هوای محیط‌های اداری، درمانی و صنعتی.",
      en: "ISO 14644 cleanroom classification, HEPA filter testing, and indoor air quality monitoring for medical, pharmaceutical, and industrial facilities.",
    },
    body: {
      fa: "اتاق‌های تمیز و محیط‌های کنترل‌شده از جمله اتاق‌های عمل، بخش‌های مراقبت ویژه نوزادان، اتاق‌های ایزوله بیماران پیوندی، بخش‌های تولید دارو و صنایع الکترونیک و هوافضا، محیط‌هایی هستند که پارامترهای فیزیکی و بیولوژیکی هوای آن‌ها در محدوده بسیار باریکی کنترل می‌شود. کوچک‌ترین انحراف در تعداد ذرات معلق، اختلاف فشار، دما، رطوبت یا عملکرد فیلترهای هپا می‌تواند به آلودگی محصول دارویی، عفونت پس از عمل جراحی، یا اختلال در فرآیندهای تولیدی حساس منجر شود. استاندارد بین‌المللی ایزو ۱۴۶۴۴، دستورالعمل‌های GMP و الزامات وزارت بهداشت، تصدیق دوره‌ای این محیط‌ها را الزامی می‌کنند.\n\n### خدمات تخصصی ما\n\nبا تجهیز به فلومترها، شمارنده‌های ذرات، آنمومترها، مانومترها و تجهیزات تخصصی آزمون فیلتر، طیف کاملی از خدمات تصدیق را ارائه می‌کنیم:\n\n- شمارش ذرات معلق و طبقه‌بندی اتاق مطابق کلاس‌های استاندارد ایزو ۱۴۶۴۴\n- اندازه‌گیری اختلاف فشار بین اتاق‌ها و کنترل جهت جریان هوا\n- محاسبه تعداد تعویض هوا در ساعت (ACPH)\n- تست نشت و یکپارچگی فیلترهای هپا\n- اندازه‌گیری سرعت و الگوی جریان هوا در نقاط بحرانی\n- کنترل دما و رطوبت نسبی، پایش سطح نویز و شدت روشنایی\n- تست‌های میکروبی سطوح و هوا\n\nاین خدمات به‌طور اختصاصی برای اتاق‌های عمل، بخش نوزادان نارس، اتاق‌های ایزوله فشار مثبت و منفی، هودهای بیوایمنی و اتاق‌های تمیز دارویی ارائه می‌شود.\n\n### پایش کیفیت هوای داخل ساختمان\n\nعلاوه بر اتاق‌های تمیز تخصصی، کیفیت هوای داخل ساختمان‌های اداری، بیمارستانی، آموزشی و صنعتی به‌طور مستقیم بر سلامت، بهره‌وری و راحتی افراد اثر می‌گذارد. خدمات پایش کیفیت هوای داخل ما شامل اندازه‌گیری غلظت دی‌اکسید کربن، مونوکسید کربن، ترکیبات آلی فرار، فرمالدهید، ذرات معلق ۲.۵ و ۱۰ میکرون و پارامترهای آسایش حرارتی است. نتایج به همراه توصیه‌های عملی برای بهبود سیستم تهویه و فیلتراسیون ارائه می‌شود.",
      en: "Cleanrooms and controlled environments — operating rooms, neonatal intensive care units, isolation rooms for transplant patients, pharmaceutical production areas, and electronics and aerospace facilities — are spaces where the physical and biological properties of the air are held within very tight limits. The smallest deviation in particle count, pressure differential, temperature, humidity, or HEPA filter performance can contaminate a pharmaceutical product, cause a post-surgical infection, or disrupt a sensitive production process. ISO 14644, GMP guidelines, and Ministry of Health requirements all mandate periodic certification of these environments.\n\n### Our Specialized Services\n\nEquipped with flow meters, particle counters, anemometers, manometers, and specialized filter-test instruments, we provide a full range of certification services:\n\n- Particle counting and room classification per ISO 14644 standard classes\n- Pressure-differential measurement between rooms and airflow-direction control\n- Air-changes-per-hour (ACPH) calculation\n- HEPA filter leak and integrity testing\n- Airflow velocity and pattern measurement at critical points\n- Temperature and relative-humidity control, plus noise and lighting-level monitoring\n- Surface and air microbial testing\n\nThese services are provided specifically for operating rooms, premature-infant wards, positive- and negative-pressure isolation rooms, biosafety hoods, and pharmaceutical cleanrooms.\n\n### Indoor Air Quality Monitoring\n\nBeyond specialized cleanrooms, the indoor air quality of office, hospital, educational, and industrial buildings directly affects the health, productivity, and comfort of the people inside them. Our indoor air quality monitoring covers carbon dioxide, carbon monoxide, volatile organic compounds, formaldehyde, PM2.5 and PM10 particulates, and thermal-comfort parameters. Results come with practical recommendations for improving ventilation and filtration.",
    },
    category: "environmental",
    iconKey: "wind",
    order: 7,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "calibration-management-system",
    slug: { fa: "سیستم-مدیریت-کالیبراسیون", en: "calibration-management-system" },
    title: { fa: "استقرار سیستم جامع مدیریت کالیبراسیون", en: "Calibration Management System Deployment" },
    shortDescription: {
      fa: "طراحی و استقرار سامانه مدیریت چرخه عمر تجهیزات اندازه‌گیری، با هشدار خودکار سررسید و بایگانی الکترونیکی گواهی‌ها.",
      en: "Design and rollout of an asset-lifecycle calibration management system, with automatic due-date alerts and digital certificate archiving.",
    },
    body: {
      fa: "هر سازمان صنعتی یا درمانی متوسط، صدها تا هزاران قلم تجهیز اندازه‌گیری با فواصل کالیبراسیون متفاوت و مسئولان مستقل دارد. مدیریت دستی این حجم از دارایی، با فایل‌های اکسل پراکنده و پیگیری‌های ایمیلی، به‌سرعت به فراموش‌کاری کالیبراسیون‌ها، تجهیزات منقضی در خط تولید و شکست در ممیزی‌ها منجر می‌شود. الزامات ایزو ۹۰۰۱ و ایزو ۱۷۰۲۵ نیز مستندسازی کامل تاریخچه هر تجهیز، وضعیت فعلی و برنامه کالیبراسیون آتی را ضروری کرده‌اند.\n\n### خدمات تخصصی ما\n\nبا استقرار سامانه جامع مدیریت کالیبراسیون، به سازمان شما امکان می‌دهیم چرخه کامل عمر هر تجهیز اندازه‌گیری، از خرید و کدگذاری اولیه تا از رده خارج شدن، را در یک بستر یکپارچه مدیریت کنید:\n\n- ایجاد شناسنامه فنی برای هر تجهیز\n- تعریف بازه‌های کالیبراسیون مبتنی بر توصیه سازنده و تحلیل ریسک\n- ارسال هشدارهای خودکار پیش از سررسید کالیبراسیون\n- نگهداری الکترونیکی گواهی‌های کالیبراسیون با جست‌وجو و بازیابی سریع در ممیزی‌ها\n- ثبت تاریخچه تعمیرات، تنظیمات و رخدادهای هر تجهیز\n- گزارش‌گیری مدیریتی از وضعیت انطباق کل دارایی‌های اندازه‌گیری\n- کنترل هزینه‌های کالیبراسیون و نگهداری\n\nاین سامانه، فراموش‌کاری کالیبراسیون را از یک ریسک روزمره به یک فرآیند قابل کنترل و مستند تبدیل می‌کند.",
      en: "A mid-sized industrial or medical organization typically owns hundreds to thousands of measuring instruments, each with its own calibration interval and owner. Managing that volume of assets manually — scattered spreadsheets and email follow-ups — quickly leads to missed calibrations, expired equipment left in service, and failed audits. ISO 9001 and ISO 17025 both require complete documentation of each instrument's history, current status, and upcoming calibration schedule.\n\n### Our Specialized Services\n\nBy deploying a comprehensive calibration management system, we let your organization manage the full lifecycle of every measuring instrument — from initial purchase and asset tagging through to decommissioning — on a single platform:\n\n- A technical record for every instrument\n- Calibration intervals defined from manufacturer guidance and risk analysis\n- Automatic alerts ahead of each calibration due date\n- Digital archiving of calibration certificates, with fast search and retrieval during audits\n- A logged history of repairs, adjustments, and events for every instrument\n- Management-level reporting on the compliance status of your entire measurement-asset base\n- Visibility and control over calibration and maintenance costs\n\nThis system turns missed calibrations from a daily risk into a controlled, fully documented process.",
    },
    category: "consulting",
    iconKey: "database",
    order: 8,
    isPublished: true,
    createdAt: now,
    updatedAt: now,
  },
];

const blogPost = {
  id: "role-of-calibration-in-quality-assurance",
  slug: { fa: "نقش-کالیبراسیون-در-تضمین-کیفیت", en: "role-of-calibration-in-quality-assurance" },
  title: { fa: "کالیبراسیون، ستون فقرات اعتماد به داده", en: "Calibration: The Backbone of Data Trust" },
  excerpt: {
    fa: "چرا کالیبراسیون تنها یک الزام قانونی نیست، بلکه سنگ بنای هر سیستم تضمین کیفیت پایدار است.",
    en: "Why calibration isn't just a regulatory checkbox — it's the foundation of every sustainable quality-assurance system.",
  },
  body: {
    fa: "در نگاه سطحی، کالیبراسیون یک الزام فنی و اداری به نظر می‌رسد؛ فرآیندی که به‌طور ادواری تکرار می‌شود، برچسبی روی دستگاه می‌چسبد و گواهی‌ای برای بایگانی صادر می‌شود. اما نگاه دقیق‌تر به سیستم‌های تضمین کیفیت مدرن نشان می‌دهد که کالیبراسیون در واقع ستون فقرات اعتماد به داده در یک سازمان است. هر تصمیمی که در خط تولید، اتاق کنترل، آزمایشگاه تشخیص طبی یا اتاق عمل بیمارستان گرفته می‌شود، در نهایت بر داده‌های اندازه‌گیری استوار است. اگر این داده‌ها ردیابی‌پذیر، دقیق و مستند نباشند، کل زنجیره تصمیم‌گیری در معرض تردید قرار می‌گیرد.\n\n### وقتی یک انحراف کوچک، بزرگ می‌شود\n\nفرض کنید یک ترانسمیتر فشار در یک راکتور پتروشیمی، به‌مرور دچار انحراف صفر شده باشد. اپراتور اتاق کنترل، مقدار نمایش‌داده‌شده را واقعیت می‌پندارد و بر اساس آن، شیرهای کنترلی را تنظیم می‌کند. یک بچ محصول با ترکیب نامنطبق تولید می‌شود؛ ضایعات مواد اولیه و انرژی رخ می‌دهد؛ مشتریان صنعتی شکایت می‌کنند؛ و در بدترین حالت، اگر انحراف در جهت خطرناک بوده باشد، یک حادثه ایمنی رخ می‌دهد.\n\nحال همین سناریو را در یک آزمایشگاه پزشکی تصور کنید: یک سمپلر با انحراف در حجم برداشت، سطح گلوکز خون یک بیمار دیابتی را به‌اشتباه پایین گزارش می‌کند و متخصص، دوز انسولین را نامناسب تنظیم می‌کند. پیامدهای این خطاها با هزینه یک کالیبراسیون سالانه قابل‌مقایسه نیستند.\n\n### سه دلیل کلیدی\n\nکالیبراسیون به سه دلیل کلیدی، بنیان تضمین کیفیت را تشکیل می‌دهد:\n\n۱. **از ادعا به شواهد.** کالیبراسیون داده‌های اندازه‌گیری را از ادعای ذهنی به شواهد قابل‌اثبات تبدیل می‌کند. دستگاهی با گواهی کالیبراسیون معتبر و قابل ردیابی به مراجع ملی و بین‌المللی، تولیدکننده شواهد اندازه‌شناسی قابل دفاع در ممیزی‌ها، دعاوی حقوقی و مذاکرات تجاری است.\n۲. **ابزار کنترل ریسک.** با شناخت عدم قطعیت اندازه‌گیری هر ابزار، مدیر کیفیت می‌تواند تصمیم‌های آگاهانه در مورد حاشیه ایمنی مشخصات محصول، فواصل بازرسی و اقدامات اصلاحی اتخاذ کند.\n۳. **کشف زودهنگام انحراف.** کالیبراسیون منظم، انحرافات تدریجی تجهیزات را در مراحل اولیه شناسایی می‌کند، پیش از آنکه به تولید محصول معیوب یا حادثه بینجامد.\n\n### ویژگی‌های یک برنامه کالیبراسیون کارآمد\n\nیک برنامه کالیبراسیون کارآمد باید مبتنی بر تحلیل ریسک باشد (فواصل کوتاه‌تر برای تجهیزات بحرانی)، ردیابی‌پذیری کامل به مراجع ملی و بین‌المللی داشته باشد، عدم قطعیت اندازه‌گیری را به‌درستی محاسبه و گزارش کند، در یک سامانه مدیریت الکترونیکی مستندسازی شود، و توسط پرسنل آموزش‌دیده در محیطی تحت کنترل اجرا شود.\n\nما در پرشیا آزما سیستم بر این باوریم که کالیبراسیون تنها یک الزام قانونی نیست، بلکه سنگ بنای هر سیستم تضمین کیفیت پایدار و ابزاری مطمئن برای مدیریت ریسک‌های مالی، ایمنی و انطباق است. کالیبراسیون، هزینه نیست؛ زبان مشترک اعتماد میان تولیدکننده، مصرف‌کننده و ناظر است.",
    en: "On the surface, calibration looks like a technical and administrative requirement — a process repeated periodically, a sticker applied to a device, a certificate filed away. But a closer look at modern quality-assurance systems shows that calibration is actually the backbone of an organization's trust in its own data. Every decision made on a production line, in a control room, in a diagnostic laboratory, or in a hospital operating room ultimately rests on measurement data. If that data isn't traceable, accurate, and documented, the entire decision chain is open to doubt.\n\n### When a Small Deviation Becomes a Big One\n\nImagine a pressure transmitter in a petrochemical reactor that has gradually drifted off zero. The control-room operator treats the displayed value as reality and adjusts the control valves accordingly. A batch of product is produced with the wrong composition; raw material and energy are wasted; industrial customers complain; and in the worst case, if the deviation moved in a dangerous direction, a safety incident occurs.\n\nNow picture the same scenario in a medical laboratory: a sampler with a volume-draw error under-reports a diabetic patient's blood glucose level, and the clinician sets an inappropriate insulin dose. The consequences of these errors bear no comparison to the cost of an annual calibration.\n\n### Three Key Reasons\n\nCalibration forms the foundation of quality assurance for three key reasons:\n\n1. **From claim to evidence.** Calibration turns measurement data from a subjective claim into defensible evidence. A device with a valid calibration certificate, traceable to national and international references, produces metrological evidence that holds up in audits, legal disputes, and commercial negotiations.\n2. **A risk-control tool.** By knowing each instrument's measurement uncertainty, a quality manager can make informed decisions about product-specification safety margins, inspection intervals, and corrective actions.\n3. **Early detection of drift.** Regular calibration catches gradual equipment drift at an early stage, before it leads to defective product or an incident.\n\n### What an Effective Calibration Program Looks Like\n\nAn effective calibration program is risk-based (shorter intervals for critical equipment), fully traceable to national and international references, correctly calculates and reports measurement uncertainty, is documented in an electronic management system, and is carried out by trained personnel in a controlled environment.\n\nAt Persia Azma System, we believe calibration isn't just a regulatory requirement — it's the cornerstone of any sustainable quality-assurance system, and a reliable tool for managing financial, safety, and compliance risk. Calibration isn't a cost; it's the shared language of trust between producer, consumer, and regulator.",
  },
  author: "پرشیا آزما سیستم",
  tags: ["quality-assurance", "calibration"],
  locales: ["fa", "en"],
  isPublished: true,
  publishedAt: now,
  createdAt: now,
  updatedAt: now,
};

async function migrate() {
  const batch = db.batch();

  for (const id of staleServiceIds) {
    batch.delete(db.collection("services").doc(id));
  }

  for (const [id, body] of Object.entries(rewrittenServiceBodies)) {
    batch.update(db.collection("services").doc(id), { body, updatedAt: now });
  }

  for (const { id, ...service } of newServices) {
    batch.set(db.collection("services").doc(id), service);
  }

  const { id: blogId, ...post } = blogPost;
  batch.set(db.collection("blogPosts").doc(blogId), post);

  await batch.commit();
  console.log(
    `Deleted ${staleServiceIds.length} stale services, updated ${Object.keys(rewrittenServiceBodies).length} service bodies, created ${newServices.length} new services, published 1 blog post.`
  );
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
