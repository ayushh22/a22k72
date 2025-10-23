import { appLocales, defaultLocale } from "@/lib/i18n";

export const siteConfig = {
  name: "K72",
  legalName: "K72 Agency",
  description:
    "Global creative agency building bold brand platforms, digital products, and immersive experiences.",
  email: "hello@k72.ca",
  locales: {
    available: appLocales,
    default: defaultLocale,
  },
  links: {
    website: "https://k72.ca",
    contact: "mailto:hello@k72.ca",
    instagram: "https://www.instagram.com/k72.ca",
    linkedin: "https://www.linkedin.com/company/k72/",
    dribbble: "https://dribbble.com/k72",
    github: "https://github.com/k72",
  },
};

export type SiteConfig = typeof siteConfig;
