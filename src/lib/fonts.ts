import localFont from "next/font/local";

export const lausanne = localFont({
  src: [
    {
      path: "../../public/fonts/Lausanne-300.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lausanne-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-lausanne",
});
