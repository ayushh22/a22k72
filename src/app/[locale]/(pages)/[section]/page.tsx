import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { buildLocalizedHref, isAppLocale } from "@/lib/i18n";

const SECTION_COPY = {
  work: {
    en: {
      title: "Selected client partnerships",
      description:
        "From national campaigns to global product launches, our work blends strategy, storytelling, and craft to move brands forward.",
      cta: "View case studies",
    },
    fr: {
      title: "Sélection de collaborations client",
      description:
        "Des campagnes nationales aux lancements de produits mondiaux, notre travail allie stratégie, narration et exécution pour propulser les marques.",
      cta: "Voir les études de cas",
    },
  },
  services: {
    en: {
      title: "Integrated services for modern brands",
      description:
        "We create clarity across brand strategy, design systems, digital products, content, and growth campaigns.",
      cta: "Explore our capabilities",
    },
    fr: {
      title: "Des services intégrés pour les marques modernes",
      description:
        "Nous créons de la clarté à travers la stratégie de marque, les systèmes de design, les produits numériques, le contenu et les campagnes de croissance.",
      cta: "Explorer nos expertises",
    },
  },
  culture: {
    en: {
      title: "Culture-first, people-powered",
      description:
        "Our studio is built on collaboration, experimentation, and a relentless curiosity for what’s next.",
      cta: "Inside the studio",
    },
    fr: {
      title: "Une culture avant tout, propulsée par les gens",
      description:
        "Notre studio repose sur la collaboration, l'expérimentation et une curiosité constante pour ce qui s'en vient.",
      cta: "Dans les coulisses du studio",
    },
  },
  journal: {
    en: {
      title: "News, insights, and perspectives",
      description:
        "Thinking on creativity, technology, and the shifts shaping culture from the K72 team.",
      cta: "Read the latest",
    },
    fr: {
      title: "Nouvelles, perspectives et inspirations",
      description:
        "Réflexions sur la créativité, la technologie et les tendances culturelles selon l'équipe de K72.",
      cta: "Lire les plus récentes",
    },
  },
  careers: {
    en: {
      title: "Join the team",
      description:
        "We’re always looking for collaborators who love solving complex problems with craft and empathy.",
      cta: "See open roles",
    },
    fr: {
      title: "Joindre l'équipe",
      description:
        "Nous sommes toujours à la recherche de collaborateurs et collaboratrices passionné·e·s par les défis ambitieux, le design soigné et l'empathie.",
      cta: "Voir les postes ouverts",
    },
  },
  contact: {
    en: {
      title: "Start a conversation",
      description:
        "Tell us about your next challenge. We’ll assemble the right team to bring it to life.",
      cta: "Email the team",
    },
    fr: {
      title: "Discutons de votre prochain projet",
      description:
        "Parlez-nous de votre prochain défi. Nous réunirons l'équipe idéale pour lui donner vie.",
      cta: "Écrire à l'équipe",
    },
  },
} as const;

const SECTION_KEYS = Object.keys(SECTION_COPY) as Array<keyof typeof SECTION_COPY>;

export const dynamicParams = false;

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!isAppLocale(params.locale)) {
    return [];
  }

  return SECTION_KEYS.map((section) => ({
    locale: params.locale,
    section,
  }));
}

type SectionPageProps = {
  params: {
    locale: string;
    section: string;
  };
};

export default function SectionPage({ params }: SectionPageProps) {
  const { locale, section } = params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  if (!SECTION_KEYS.includes(section as keyof typeof SECTION_COPY)) {
    notFound();
  }

  const copy = SECTION_COPY[section as keyof typeof SECTION_COPY][locale];

  const ctaHref =
    section === "contact"
      ? siteConfig.links.contact
      : buildLocalizedHref(section, locale);

  const isExternal = ctaHref.startsWith("http") || ctaHref.startsWith("mailto:");

  const ctaInner = (
    <>
      {copy.cta}
      <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current transition-transform group-hover:translate-x-1">
        →
      </span>
    </>
  );

  const content = isExternal ? (
    <Button size="lg" asChild className="group">
      <a href={ctaHref} target="_blank" rel="noreferrer">
        {ctaInner}
      </a>
    </Button>
  ) : (
    <Button size="lg" asChild className="group">
      <Link href={ctaHref}>{ctaInner}</Link>
    </Button>
  );

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:px-8 md:gap-12 md:py-24 lg:px-10">
      <div className="space-y-6 md:space-y-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {siteConfig.name}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.title}
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          {copy.description}
        </p>
        <div className="pt-2">{content}</div>
      </div>
    </section>
  );
}
