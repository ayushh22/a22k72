"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { ResolvedNavigationItem } from "@/config/navigation";
import { isExternalHref, isRouteActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MainNavProps = {
  items: ResolvedNavigationItem[];
  className?: string;
};

export function MainNav({ items, className }: MainNavProps) {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const activeId = React.useMemo(() => {
    if (!pathname) {
      return null;
    }

    const match = items.find((item) => isRouteActive(pathname, item.href));
    return match?.id ?? null;
  }, [items, pathname]);

  const highlightedId = hoveredId ?? activeId;

  if (!items?.length) {
    return null;
  }

  return (
    <NavigationMenu
      viewport={false}
      aria-label="Primary navigation"
      className={cn(
        "relative hidden flex-1 items-center justify-center md:flex",
        className
      )}
    >
      <LayoutGroup id="desktop-primary-nav">
        <NavigationMenuList className="relative flex w-full items-center justify-center gap-8">
          {items.map((item) => {
            const isCurrent = activeId === item.id;
            const isHighlighted = highlightedId === item.id;
            const isExternal = item.external ?? isExternalHref(item.href);

            const linkClasses = cn(
              "relative inline-flex items-center pb-1 text-[0.72rem] uppercase tracking-[0.32em] transition-colors duration-200",
              isCurrent
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground focus-visible:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            );

            const content = (
              <span className="relative block">
                <span>{item.label}</span>
                <span className="absolute inset-x-0 -bottom-1 h-[2px] overflow-hidden">
                  <AnimatePresence>
                    {isHighlighted && (
                      <motion.span
                        layoutId="desktop-nav-underline"
                        className="block h-full w-full rounded-full bg-foreground"
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                </span>
              </span>
            );

            const commonProps = {
              className: linkClasses,
              "data-active": isCurrent,
              onMouseEnter: () => setHoveredId(item.id),
              onMouseLeave: () => setHoveredId(null),
              onFocus: () => setHoveredId(item.id),
              onBlur: () => setHoveredId(null),
            } as const;

            return (
              <NavigationMenuItem key={item.id} className="relative">
                <NavigationMenuLink asChild>
                  {isExternal ? (
                    <a
                      href={item.href}
                      target={item.target ?? "_blank"}
                      rel="noreferrer"
                      {...commonProps}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      {...commonProps}
                    >
                      {content}
                    </Link>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </LayoutGroup>
    </NavigationMenu>
  );
}
