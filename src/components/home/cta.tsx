import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCtaCopy } from "@/config/home";
import { buildLocalizedHref } from "@/lib/i18n";
import { AppLocale } from "@/types/i18n";

export function Cta({ locale }: { locale: AppLocale }) {
  const copy = getCtaCopy(locale);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 md:py-32 lg:px-10">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {copy.title}
        </h2>
        <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
          {copy.subtitle}
        </p>
        <div className="pt-4">
          <Button asChild size="lg" className="group">
            <Link href={buildLocalizedHref("/contact", locale)}>
              {copy.cta}
              <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}