"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ResolvedNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/lib/i18n";
import { appLocales, rewritePathWithLocale } from "@/lib/i18n";
import { isExternalHref, isRouteActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  locale: AppLocale;
  navigation: ResolvedNavigation;
  className?: string;
}


function MenuToggle({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-5 w-7">
      <motion.span
        className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-foreground"
        animate={{ y: open ? 8 : 0, rotate: open ? 45 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-foreground"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-foreground"
        animate={{ y: open ? -8 : 0, rotate: open ? -45 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </span>
  );
}

export function MobileNav({ locale, navigation, className }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  const ctaIsExternal =
    navigation.cta.external ?? isExternalHref(navigation.cta.href);

  const closeMenu = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-mobile-nav-link]");
      gsap.fromTo(
        targets,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.075,
          delay: 0.1,
        }
      );
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    closeMenu();
  }, [pathname, open, closeMenu]);

  return (
    <div className={cn("flex items-center md:hidden", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MenuToggle open={open} />
          </button>
        </DialogTrigger>
        <AnimatePresence>
          {open && (
            <DialogContent
              asChild
              forceMount
              showCloseButton={false}
              className="h-dvh w-full max-w-none translate-x-0 translate-y-0 rounded-none border-none bg-transparent p-0 md:hidden"
            >
              <motion.div
                id="mobile-navigation"
                ref={overlayRef}
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex h-full flex-col overflow-hidden bg-background/95 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between px-6 pt-8">
                  <Link
                    href={`/${locale}`}
                    onClick={closeMenu}
                    className="inline-flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.28em]"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <span>{siteConfig.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={closeMenu}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="Close menu"
                  >
                    <MenuToggle open />
                  </button>
                </div>
                <div className="mt-12 flex flex-1 flex-col gap-10 px-6 pb-16">
                  <nav
                    aria-label="Mobile primary navigation"
                    className="flex flex-col gap-6 text-3xl font-semibold uppercase tracking-[0.3em]"
                  >
                    {navigation.primary.map((item) => {
                      const isActive = pathname ? isRouteActive(pathname, item.href) : false;
                      const external = item.external ?? isExternalHref(item.href);

                      const baseClasses = cn(
                        "flex items-center justify-between text-foreground/70 transition-colors",
                        isActive && "text-foreground"
                      );

                      if (external) {
                        return (
                          <a
                            key={item.id}
                            href={item.href}
                            target={item.target ?? "_blank"}
                            rel="noreferrer"
                            className={baseClasses}
                            data-mobile-nav-link
                            onClick={closeMenu}
                          >
                            <span>{item.label}</span>
                            <span className="text-sm">↗</span>
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={baseClasses}
                          data-mobile-nav-link
                          onClick={closeMenu}
                        >
                          <span>{item.label}</span>
                          {isActive && <span className="text-sm">•</span>}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="flex flex-col gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-xs uppercase tracking-[0.3em]"
                          data-mobile-nav-link
                        >
                          {locale.toUpperCase()}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-[var(--radix-dropdown-menu-trigger-width)]"
                      >
                        {appLocales.map((l) => (
                          <DropdownMenuItem key={l} asChild>
                            <Link
                              href={rewritePathWithLocale(pathname, locale, l)}
                            >
                              {l.toUpperCase()}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <nav
                      aria-label="Mobile secondary navigation"
                      className="flex flex-col gap-3 text-sm uppercase tracking-[0.2em] text-foreground/70"
                    >
                      {navigation.secondary.map((item) => {
                        const external = item.external ?? isExternalHref(item.href);
                        if (external) {
                          return (
                            <a
                              key={item.id}
                              href={item.href}
                              target={item.target ?? "_blank"}
                              rel="noreferrer"
                              data-mobile-nav-link
                              onClick={closeMenu}
                            >
                              {item.label}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            data-mobile-nav-link
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </nav>
                    <Button
                      asChild
                      size="lg"
                      className="justify-center text-base uppercase tracking-[0.28em]"
                    >
                      {ctaIsExternal ? (
                        <a
                          href={navigation.cta.href}
                          target={navigation.cta.target ?? "_blank"}
                          rel="noreferrer"
                          data-mobile-nav-link
                          onClick={closeMenu}
                        >
                          {navigation.cta.label}
                        </a>
                      ) : (
                        <Link
                          href={navigation.cta.href}
                          data-mobile-nav-link
                          onClick={closeMenu}
                        >
                          {navigation.cta.label}
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
