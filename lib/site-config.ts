export const siteConfig = {
  name: "Persia Azma System",
  nameFa: "پرشیا آزما سیستم",
  url: "https://persiaazma.com",
  phones: ["071-36245649", "071-36359305", "09380679361"],
  whatsappNumber: "989380679361",
  email: "persia.azmasystem1@gmail.com",
  addressFa: "شیراز، پارک علم و فناوری فارس",
  addressEn: "Fars Science & Technology Park, Shiraz, Iran",
  social: {
    instagram: "",
    telegram: "",
  },
} as const;

export const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "certificates", href: "/certificates" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;
