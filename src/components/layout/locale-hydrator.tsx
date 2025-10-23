"use client";

import * as React from "react";

import type { AppLocale } from "@/lib/i18n";

export function LocaleHydrator({ locale }: { locale: AppLocale }) {
  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
