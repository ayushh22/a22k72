import { AppLocale } from "@/types/i18n";

export const HOME_COPY = {
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

export type HomeCopy = (typeof HOME_COPY)[keyof typeof HOME_COPY];

export const getHomeCopy = (locale: AppLocale) => HOME_COPY[locale];

export const CAPABILITIES = [
  {
    title: "Strategy",
    items: ["Branding", "Marketing", "Content"],
  },
  {
    title: "Design",
    items: ["User Experience", "Product", "Websites"],
  },
  {
    title: "Technology",
    items: ["Web Development", "Mobile Apps", "eCommerce"],
  },
];

export const CASE_STUDIES = [
  {
    title: "Shopify",
    description: "Reinventing a brand's presence for a new generation",
    image: "/images/shopify.png",
    url: "/work/shopify",
  },
  {
    title: "Bundle",
    description: "A fresh identity for a modern product",
    image: "/images/bundle.png",
    url: "/work/bundle",
  },
  {
    title: "Oshun",
    description: "A new digital home for a luxury brand",
    image: "/images/oshun.png",
    url: "/work/oshun",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We've never seen results like this. The team is incredibly talented and a pleasure to work with.",
    author: "John Doe",
    company: "Acme Inc.",
  },
  {
    quote:
      "The new brand identity has been a huge success. We've seen a 30% increase in engagement.",
    author: "Jane Smith",
    company: "Globex Corp.",
  },
];

export const CTA_COPY = {
  en: {
    title: "Have a project in mind?",
    subtitle: "Let's build something great together.",
    cta: "Get in touch",
  },
  fr: {
    title: "Vous avez un projet en tête ?",
    subtitle: "Construisons quelque chose de grand ensemble.",
    cta: "Contactez-nous",
  },
  de: {
    title: "Haben Sie ein Projekt im Sinn?",
    subtitle: "Lassen Sie uns gemeinsam etwas Großartiges bauen.",
    cta: "In Kontakt treten",
  },
} as const;

export type CtaCopy = (typeof CTA_COPY)[keyof typeof CTA_COPY];

export const getCtaCopy = (locale: AppLocale) => CTA_COPY[locale];
