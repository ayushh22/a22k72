import plugin from "tailwindcss/plugin";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function clamp(minSize, maxSize, minWidth = 48, maxWidth = 100) {
  const min = (minSize / 16).toFixed(4);
  const max = (maxSize / 16).toFixed(4);
  const slope = ((maxSize - minSize) / (maxWidth - minWidth)).toFixed(4);
  const yAxis = ((minSize - slope * minWidth) / 16).toFixed(4);

  return `clamp(${min}rem, ${yAxis}rem + ${slope}vw, ${max}rem)`;
}

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const FONT_HEADLINE = "var(--font-lausanne)";
const FONT_SANS = "var(--font-lausanne)";

const textStyles = {
  // headline
  h1: {
    fontFamily: FONT_HEADLINE,
    fontSize: clamp(40, 150),
    fontWeight: 300,
    letterSpacing: "-0.05em",
  },
  h2: {
    fontFamily: FONT_HEADLINE,
    fontSize: clamp(40, 120),
    fontWeight: 300,
    letterSpacing: "-0.05em",
  },
  h3: {
    fontFamily: FONT_HEADLINE,
    fontSize: clamp(40, 80),
    fontWeight: 300,
    letterSpacing: "-0.05em",
  },

  // sans
  sans: {
    fontFamily: FONT_SANS,
    fontSize: clamp(16, 18),
    fontWeight: 300,
  },
  "sans-sm": {
    fontFamily: FONT_SANS,
    fontSize: clamp(14, 16),
    fontWeight: 300,
  },
  "sans-xs": {
    fontFamily: FONT_SANS,
    fontSize: clamp(12, 14),
    fontWeight: 300,
  },
};

// -----------------------------------------------------------------------------
// Plugin
// -----------------------------------------------------------------------------

export const typographyPlugin = plugin(
  ({ addUtilities }) => {
    addUtilities(
      Object.entries(textStyles).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`.text-${key}`]: value,
        }),
        {},
      ),
    );
  },
  {
    theme: {
      extend: {
        fontFamily: {
          sans: FONT_SANS,
        },
      },
    },
  },
);
