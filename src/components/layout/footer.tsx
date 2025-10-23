import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col-reverse md:flex-row md:justify-between">
          <div className="text-center text-sm text-gray-500 md:text-left">
            <p className="mb-2">
              © {new Date().getFullYear()} My Company, Inc. All rights reserved.
            </p>
            <p>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
          <div className="mb-8 flex justify-center space-x-6 md:mb-0">
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <Icons.twitter className="h-6 w-6" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <Icons.gitHub className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
