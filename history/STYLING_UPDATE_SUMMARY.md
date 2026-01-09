# Styling Update Summary

**Status:** ✅ Completed
**Date:** 2026-01-09

## Overview

The styling of the `/immobili` (listing) and `/immobili/[slug]` (detail) pages has been updated to match the frontpage aesthetic, using Shadcn/UI principles and Tailwind CSS theme variables defined in `src/app.css`.

## Changes Implemented

### 1. Theme Consistency

- Replaced hardcoded tailwind colors (e.g., `bg-gray-50`, `text-gray-900`) with semantic theme variables (e.g., `bg-background`, `text-foreground`).
- Standardized border colors to `border-border`.
- Standardized muted text to `text-muted-foreground`.

### 2. Component Updates

#### Property Listing Page (`/immobili`)

- **Background**: Changed from gray to `bg-background`.
- **Headers**: Updated text colors to respect dark mode/theme.
- **Pagination**: Updated buttons to use `bg-primary` for active state and `border-border` for others.

#### Property Detail Page (`/immobili/[slug]`)

- **Background**: Changed main container to `bg-background`.
- **Icons**: Changed `text-blue-600` icons to `text-primary` to match the theme's primary color properly.
- **Amenities**: Updated amenity cards to use `bg-card` and `border-border`.
- **Status Badges**: Refined to blend better with the theme while keeping semantic meaning (sale/rent).

#### Property Card Component (`src/lib/components/listing/PropertyCard.svelte`)

- **Card Style**: Updated to use `bg-card` and `border-border`.
- **Text**: Updated styling for price, title, and address to use theme variables.
- **Interactions**: Updated hover states.

#### Filter Sidebar (`src/lib/components/listing/FilterSidebar.svelte`)

- **Inputs**: Refactored to match Shadcn input style (`border-input`, `focus:ring-ring`).
- **Buttons**: Updated to use `bg-primary`/`text-primary-foreground` for primary actions.
- **Toggles**: Updated to use theme colors for selected states.

## Verification

The pages should now visually align with the frontpage, sharing the same color palette, spacing, and component feel.
