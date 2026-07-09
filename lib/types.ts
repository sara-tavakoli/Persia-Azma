export type LocalizedText = { fa: string; en: string };

export type StoredFile = {
  storagePath: string;
  url: string;
  width?: number;
  height?: number;
  mimeType?: string;
};

export type ServiceCategory = "medical" | "imaging" | "industrial" | "consulting";

export type ServiceDoc = {
  slug: LocalizedText;
  title: LocalizedText;
  shortDescription: LocalizedText;
  body: LocalizedText;
  category: ServiceCategory;
  iconKey: string;
  heroImage?: StoredFile;
  order: number;
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
};

export type BlogPostDoc = {
  slug: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  coverImage?: StoredFile;
  author: string;
  tags: string[];
  locales: ("fa" | "en")[];
  isPublished: boolean;
  publishedAt: number;
  createdAt: number;
  updatedAt: number;
};

export type CertificateDoc = {
  title: LocalizedText;
  issuer: string;
  description: LocalizedText;
  file?: StoredFile;
  order: number;
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
};

export type ClientLogoDoc = {
  name: string;
  logo: StoredFile;
  category: "hospital" | "industrial" | "government";
  order: number;
  isPublished: boolean;
  createdAt: number;
};

export type SubmissionStatus = "new" | "read" | "archived";

export type ContactSubmissionDoc = {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: SubmissionStatus;
  locale: "fa" | "en";
  createdAt: number;
};

export type QuoteRequestStatus = "new" | "contacted" | "quoted" | "closed";

export type QuoteRequestDoc = {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  attachments: StoredFile[];
  status: QuoteRequestStatus;
  locale: "fa" | "en";
  createdAt: number;
};

export type FaqItemDoc = {
  question: LocalizedText;
  answer: LocalizedText;
  order: number;
  isPublished: boolean;
};
