import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta } from "@/components/home/cta";
import { Testimonials } from "@/components/home/testimonials";
import { CaseStudies } from "@/components/home/case-studies";
import { Capabilities } from "@/components/home/capabilities";
import { Button } from "@/components/ui/button";
import { getHomeCopy } from "@/config/home";
import { siteConfig } from "@/config/site";
import { buildLocalizedHref, isAppLocale } from "@/lib/i18n";
import { AppLocale } from "@/types/i18n";

export default function LocaleHome({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const copy = getHomeCopy(locale);

  return (
    <>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 sm:px-8 md:gap-16 md:py-32 lg:px-10">
        <div className="flex flex-col gap-6 text-left md:gap-8">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {copy.eyebrow}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
            {copy.subtitle}
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="group">
              <Link href={buildLocalizedHref("/work", locale)}>
                {copy.cta}
                <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current transition-transform group-hover:translate-x-1">
                  <span className="sr-only">{siteConfig.name}</span>→
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Capabilities />
      <CaseStudies locale={locale as AppLocale} />
      <Testimonials />
      <Cta locale={locale as AppLocale} />
    </>
  );
}
