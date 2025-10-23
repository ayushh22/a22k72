import { AppLocale, buildLocalizedHref, defaultLocale } from "@/lib/i18n";

export type LocalizedCopy = Record<AppLocale, string>;

export type NavigationItemDefinition = {
  id: string;
  label: LocalizedCopy;
  href: string;
  description?: LocalizedCopy;
  external?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export type NavigationDefinition = {
  primary: NavigationItemDefinition[];
  secondary: NavigationItemDefinition[];
  cta: NavigationItemDefinition;
};

export type ResolvedNavigationItem = {
  id: string;
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export type ResolvedNavigation = {
  locale: AppLocale;
  primary: ResolvedNavigationItem[];
  secondary: ResolvedNavigationItem[];
  cta: ResolvedNavigationItem;
};

const NAVIGATION_BLUEPRINT: NavigationDefinition = {
  primary: [
    {
      id: "work",
      label: {
        en: "Work",
        fr: "Projets",
      },
      href: "/work",
    },
    {
      id: "services",
      label: {
        en: "Services",
        fr: "Services",
      },
      href: "/services",
    },
    {
      id: "culture",
      label: {
        en: "Culture",
        fr: "Culture",
      },
      href: "/culture",
    },
    {
      id: "journal",
      label: {
        en: "Journal",
        fr: "Journal",
      },
      href: "/journal",
    },
  ],
  secondary: [
    {
      id: "careers",
      label: {
        en: "Careers",
        fr: "Carrières",
      },
      href: "/careers",
    },
  ],
  cta: {
    id: "contact",
    label: {
      en: "Start a project",
      fr: "Démarrer un projet",
    },
    href: "/contact",
  },
};

function localize(copy: LocalizedCopy | undefined, locale: AppLocale): string | undefined {
  if (!copy) {
    return undefined;
  }

  return copy[locale] ?? copy[defaultLocale];
}

function resolveHref(item: NavigationItemDefinition, locale: AppLocale): string {
  if (item.external) {
    return item.href;
  }

  return buildLocalizedHref(item.href, locale);
}

export function getNavigation(locale: AppLocale): ResolvedNavigation {
  const primary = NAVIGATION_BLUEPRINT.primary.map((item) => ({
    id: item.id,
    label: localize(item.label, locale) ?? localize(item.label, defaultLocale) ?? item.id,
    href: resolveHref(item, locale),
    description: localize(item.description, locale),
    external: item.external,
    target: item.target,
  }));

  const secondary = NAVIGATION_BLUEPRINT.secondary.map((item) => ({
    id: item.id,
    label: localize(item.label, locale) ?? localize(item.label, defaultLocale) ?? item.id,
    href: resolveHref(item, locale),
    description: localize(item.description, locale),
    external: item.external,
    target: item.target,
  }));

  const ctaDefinition = NAVIGATION_BLUEPRINT.cta;
  const cta: ResolvedNavigationItem = {
    id: ctaDefinition.id,
    label:
      localize(ctaDefinition.label, locale) ??
      localize(ctaDefinition.label, defaultLocale) ??
      ctaDefinition.id,
    href: resolveHref(ctaDefinition, locale),
    description: localize(ctaDefinition.description, locale),
    external: ctaDefinition.external,
    target: ctaDefinition.target,
  };

  return {
    locale,
    primary,
    secondary,
    cta,
  };
}
