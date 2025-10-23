export const appLocales = ["en", "fr"] as const;

export type AppLocale = (typeof appLocales)[number];

export const defaultLocale: AppLocale = "en";

const EXTERNAL_LINK_PATTERN = /^(https?:\/\/|mailto:|tel:)/i;

export function isAppLocale(value: string): value is AppLocale {
  return appLocales.includes(value as AppLocale);
}

export function buildLocalizedHref(path: string, locale: AppLocale): string {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  if (EXTERNAL_LINK_PATTERN.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path.slice(1) : path;

  if (!normalized.length) {
    return `/${locale}`;
  }

  return `/${locale}/${normalized}`;
}

export function getAlternateLocale(current: AppLocale): AppLocale {
  return appLocales.find((locale) => locale !== current) ?? defaultLocale;
}

export function rewritePathWithLocale(
  pathname: string | null,
  currentLocale: AppLocale,
  nextLocale: AppLocale
): string {
  if (!pathname) {
    return `/${nextLocale}`;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return `/${nextLocale}`;
  }

  if (!appLocales.includes(segments[0] as AppLocale)) {
    return `/${nextLocale}`;
  }

  if (segments[0] === currentLocale) {
    segments[0] = nextLocale;
  }

  return `/${segments.join("/")}`;
}
