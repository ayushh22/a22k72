import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FOOTER_COPY = {
  en: {
    tagline: "Based in Montréal. Collaborating worldwide.",
    rights: "All rights reserved.",
    contactCta: "Start a project",
  },
  fr: {
    tagline: "Basée à Montréal. Collaborations à l'échelle mondiale.",
    rights: "Tous droits réservés.",
    contactCta: "Démarrer un projet",
  },
} as const;

type FooterCopy = (typeof FOOTER_COPY)[keyof typeof FOOTER_COPY];

const SOCIAL_LINKS = [
  {
    id: "instagram",
    href: siteConfig.links.instagram,
    label: "Instagram",
    icon: Icons.instagram,
  },
  {
    id: "linkedin",
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    icon: Icons.linkedin,
  },
  {
    id: "dribbble",
    href: siteConfig.links.dribbble,
    label: "Dribbble",
    icon: Icons.dribbble,
  },
] as const;

export function SiteFooter({ locale }: { locale: AppLocale }) {
  const copy: FooterCopy = FOOTER_COPY[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 text-sm text-muted-foreground">
          <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-foreground/70">
            {siteConfig.name}
          </span>
          <p>{copy.tagline}</p>
          <p>
            © {year} {siteConfig.legalName}. {copy.rights}
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-foreground/60 transition-colors hover:text-foreground"
              >
                <span className="sr-only">{social.label}</span>
                <social.icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
          <a
            href={siteConfig.links.contact}
            className={cn(
              "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-foreground/80 transition-colors hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            {copy.contactCta}
            <Icons.arrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-[0.3em] text-foreground/50 transition-colors hover:text-foreground"
          >
            {siteConfig.links.website.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>
    </footer>
  );
}
