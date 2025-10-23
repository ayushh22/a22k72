# Design Tokens and Tailwind Configuration

This document outlines the design tokens and Tailwind CSS configuration used in this project, ensuring a consistent and visually cohesive user interface.

## Color Palette

The color palette is defined in `tailwind.config.ts` and uses a minimalistic black and white scheme.

- `white`: `#fff`
- `black`: `#1c1c1c`

## Spacing

Spacing is managed through CSS variables in `global.css` and mapped in `tailwind.config.ts`. The variables provide a consistent and scalable system for margins, paddings, and gaps.

- `--space-1`: 0.25rem
- `--space-2`: 0.5rem
- `--space-3`: 0.75rem
- `--space-4`: 1rem
- `--space-5`: 1.25rem
- `--space-6`: 1.5rem
- `--space-7`: 1.75rem
- `--space-8`: 2rem
- `--space-9`: 2.25rem
- `--space-10`: 2.5rem

## Elevations

Elevations are defined with CSS variables to create a consistent shadow system.

- `--elevation-1`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- `--elevation-2`: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`
- `--elevation-3`: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- `--elevation-4`: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- `--elevation-5`: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`
- `--elevation-6`: `0 25px 50px -12px rgb(0 0 0 / 0.25)`

## Radii

Border radii are defined with a base variable and scaled for different sizes.

- `--border-radius`: 0.25rem
- `sm`: `calc(var(--border-radius) * 0.5)`
- `lg`: `calc(var(--border-radius) * 2)`

## Container

The container utility centers content and applies consistent horizontal padding.

- `--container-max-width`: 1440px
- `--container-padding`: 1.5rem

## Responsive Utility Classes

Custom utility classes are available for creating responsive layouts.

- `.fluid-w-1`: A fluid width utility that clamps the width between `2rem` and `15rem` based on the viewport width (`10.4vw`).

## Font

The default font is Inter, configured in `layout.tsx` with the variable `--font-sans`.

This setup ensures that all components and pages adhere to a consistent design system, making the UI predictable and easy to maintain.
