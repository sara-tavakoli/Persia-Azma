export const siteConfig = {
  name: "Persia Azma System",
  nameFa: "پرشیا آزما سیستم",
  url: "https://persiancal.com",
  phones: ["071-36245649", "071-36359305", "09380679361"],
  whatsappNumber: "989380679361",
  // Same number as whatsappNumber. ble.ir/<number> (international format,
  // no "+") redirects to a "chat with this number" page on web.bale.ai —
  // verified by comparing against a garbage identifier, which 404s instead.
  baleNumber: "989380679361",
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
