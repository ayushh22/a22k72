"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import type { ResolvedNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/lib/i18n";
import { getAlternateLocale, rewritePathWithLocale } from "@/lib/i18n";
import { isExternalHref, isRouteActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: AppLocale;
  navigation: ResolvedNavigation;
};

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  const alternateLocale = getAlternateLocale(locale);
  const alternateHref = React.useMemo(
    () => rewritePathWithLocale(pathname, locale, alternateLocale),
    [alternateLocale, locale, pathname]
  );

  const ctaIsExternal =
    navigation.cta.external ?? isExternalHref(navigation.cta.href);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={false}
      animate={{
        boxShadow: scrolled
          ? "0 12px 40px rgba(15,23,42,0.08)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 border-b border-border/60 bg-background/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ backdropFilter: scrolled ? "blur(18px)" : "blur(0px)" }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-transparent via-foreground/35 to-transparent"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Icons.logo className="h-6 w-6" aria-hidden />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <MainNav items={navigation.primary} className="ml-6" />

        <div className="ml-auto flex items-center gap-4">
          <nav
            aria-label="Secondary navigation"
            className="hidden items-center gap-4 text-[0.68rem] uppercase tracking-[0.3em] text-foreground/60 md:flex"
          >
            {navigation.secondary.map((item) => {
              const isActive =
                !!pathname && isRouteActive(pathname, item.href);
              const isExternal =
                item.external ?? isExternalHref(item.href);

              const linkClasses = cn(
                "transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive && "text-foreground"
              );

              return isExternal ? (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.target ?? "_blank"}
                  rel="noreferrer"
                  className={linkClasses}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className={linkClasses}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            {navigation.secondary.length > 0 && (
              <span
                className="block h-3 w-px bg-foreground/20"
                aria-hidden="true"
              />
            )}
            <Link
              href={alternateHref}
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {alternateLocale.toUpperCase()}
            </Link>
          </nav>

          <div className="hidden md:inline-flex">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="uppercase tracking-[0.3em]"
            >
              {ctaIsExternal ? (
                <a
                  href={navigation.cta.href}
                  target={navigation.cta.target ?? "_blank"}
                  rel="noreferrer"
                >
                  {navigation.cta.label}
                </a>
              ) : (
                <Link href={navigation.cta.href}>{navigation.cta.label}</Link>
              )}
            </Button>
          </div>

          <MobileNav locale={locale} navigation={navigation} />
        </div>
      </div>
    </motion.header>
  );
}
