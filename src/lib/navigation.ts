const EXTERNAL_LINK_PATTERN = /^(https?:\/\/|mailto:|tel:)/i;

export function isExternalHref(href: string): boolean {
  return EXTERNAL_LINK_PATTERN.test(href);
}

export function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  const fragmentStripped = path.split("#")[0];
  const queryStripped = fragmentStripped.split("?")[0];
  const trimmed = queryStripped.replace(/\/+$/, "");

  return trimmed.length ? trimmed : "/";
}

export function isRouteActive(pathname: string, href: string): boolean {
  if (!href || isExternalHref(href) || href.startsWith("#")) {
    return false;
  }

  const normalizedHref = normalizePath(href);
  const normalizedPathname = normalizePath(pathname);

  if (normalizedHref === "/") {
    return normalizedPathname === normalizedHref;
  }

  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}
