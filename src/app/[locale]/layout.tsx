import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/footer";
import { LocaleHydrator } from "@/components/layout/locale-hydrator";
import { SiteHeader } from "@/components/layout/header";
import { getNavigation } from "@/config/navigation";
import { appLocales, isAppLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return appLocales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const localeParam = params.locale;

  if (!isAppLocale(localeParam)) {
    notFound();
  }

  const navigation = getNavigation(localeParam);

  return (
    <div className="flex min-h-screen flex-col">
      <LocaleHydrator locale={localeParam} />
      <SiteHeader locale={localeParam} navigation={navigation} />
      <main id="page-content" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={localeParam} />
    </div>
  );
}
