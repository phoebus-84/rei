# Styling Update Plan for Immobili Pages

## Goal

Improve the consistency of the `/immobili` and `/immobili/[slug]` pages with the frontpage style, using shadcn/ui concepts, Tailwind CSS theme variables, and correct colors.

## Analysis

The current implementation utilizes standard Tailwind utility classes (e.g., `text-gray-900`, `bg-blue-500`), whereas the frontpage and the defined theme in `app.css` and `tailwind.config.ts` rely on CSS variables (e.g., `text-foreground`, `bg-primary`).

## Tasks

### 1. `src/routes/immobili/+page.svelte`

- Replace `bg-gray-50` with `bg-background`.
- Replace `border-gray-200` with `border-border`.
- Replace `text-gray-900` with `text-foreground`.
- Replace `text-gray-600`/`700` with `text-muted-foreground`.
- Update pagination buttons:
  - Active: `bg-primary text-primary-foreground`
  - Inactive: `border-border text-foreground hover:bg-muted`

### 2. `src/routes/immobili/[slug]/+page.svelte`

- Replace `bg-gray-50` with `bg-background`.
- Replace `text-gray-*` with `text-foreground` / `text-muted-foreground`.
- Replace `text-blue-600` with `text-primary`.
- Replace `border-gray-200` with `border-border`.
- Update Status Badges to use meaningful theme colors or map them to primary/secondary with variants.

### 3. `src/lib/components/listing/PropertyCard.svelte`

- Update card background to `bg-card`.
- Update text colors.
- Update border to `border-border`.
- Update shadows to match theme (if custom shadows are used).

### 4. `src/lib/components/listing/FilterSidebar.svelte`

- Update sidebar background to `bg-card` or `bg-background`.
- Update inputs to standard shadcn/ui style: `border-input bg-background ring-offset-background`.
- Update buttons to use `bg-primary` / `bg-secondary`.

### 5. `src/lib/components/detail/ImageGallery.svelte` (and others)

- Ensure background colors and icons align with the theme.

## Execution

I will perform these updates file by file.
