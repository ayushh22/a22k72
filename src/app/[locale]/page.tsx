import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { buildLocalizedHref, isAppLocale } from "@/lib/i18n";

const HOME_COPY = {
  en: {
    eyebrow: "Award-winning creative agency",
    title: "Strategy-led experiences that make brands impossible to ignore.",
    subtitle:
      "We partner with ambitious teams to build brand platforms, digital products, and campaigns that drive cultural relevance.",
    cta: "Explore our work",
  },
  fr: {
    eyebrow: "Agence créative primée",
    title:
      "Des expériences guidées par la stratégie qui rendent les marques inoubliables.",
    subtitle:
      "Nous collaborons avec des équipes ambitieuses afin de créer des plateformes de marque, des produits numériques et des campagnes qui marquent la culture.",
    cta: "Découvrir nos projets",
  },
  de: {
    eyebrow: "Preisgekrönte Kreativagentur",
    title:
      "Strategiegeführte Erlebnisse, die Marken unübersehbar machen.",
    subtitle:
      "Wir arbeiten mit ambitionierten Teams zusammen, um Markenplattformen, digitale Produkte und Kampagnen zu entwickeln, die kulturelle Relevanz fördern.",
    cta: "Entdecken Sie unsere Arbeit",
  },
} as const;

type HomeCopy = (typeof HOME_COPY)[keyof typeof HOME_COPY];

export default function LocaleHome({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const copy: HomeCopy = HOME_COPY[locale];

  return (
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
                <span className="sr-only">{siteConfig.name}</span>
                →
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
