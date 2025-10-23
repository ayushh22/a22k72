import Image from "next/image";
import Link from "next/link";

import { CASE_STUDIES } from "@/config/home";
import { buildLocalizedHref } from "@/lib/i18n";
import { AppLocale } from "@/types/i18n";

export function CaseStudies({ locale }: { locale: AppLocale }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 md:py-32 lg:px-10">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Case Studies
      </h2>
      <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {CASE_STUDIES.map((study) => (
          <Link
            key={study.title}
            href={buildLocalizedHref(study.url, locale)}
            className="group"
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                src={study.image}
                alt={study.title}
                width={800}
                height={600}
                className="transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {study.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{study.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}