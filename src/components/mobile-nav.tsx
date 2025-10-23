"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { MainNavItem } from "@/types"

interface MobileNavProps {
  items?: MainNavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.logo />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {items?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    pathname={pathname}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
    pathname?: string
  }
  
  function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    pathname,
    ...props
  }: MobileLinkProps) {
    return (
      <Link
        href={href}
        onClick={() => {
          onOpenChange?.(false)
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </Link>
    )
  }