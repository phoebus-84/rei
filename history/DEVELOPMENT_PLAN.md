# Property Management System - Development Plan

## Epic Breakdown & Beads Issues

### Epic 1: Database Setup & PocketBase Configuration
**Priority:** 1 (High)

#### Tasks:
- [ ] `paons_immobiliare-avw.1` - Create properties collection with full schema
  - Fields: title, slug, description, price, status, property_type, address, city, bedrooms, bathrooms, area_sqm, images, agent, amenities, featured
  - Unique constraint on slug
  - Set API rules: View (Public), Create/Update (Admin/Agent only)

- [ ] `paons_immobiliare-avw.2` - Create users collection (extend auth)
  - Fields: name, avatar, type (customer/agent/admin), phone, saved_properties
  - saved_properties: Relation to properties (Many)

- [ ] `paons_immobiliare-avw.3` - Create inquiries collection
  - Fields: property (relation), customer_name, customer_email, customer_phone, message, status
  - API rules: Create (Public), View (Admin/Agent only)

- [ ] `paons_immobiliare-avw.4` - Configure API access rules
  - Properties: Public read, Admin/Agent write
  - Users: Public read partial, Auth write own
  - Inquiries: Public create, Admin/Agent read

---

### Epic 2: Frontend Setup & Core Integration
**Priority:** 1 (High)
**Dependencies:** Epic 1

#### Tasks:
- [ ] `paons_immobiliare-b5h.1` - Setup SvelteKit folder structure
  - Create /lib/components directories (common, listing, detail, layout)
  - Create /lib/stores
  - Create /lib/utils
  - Create /routes structure per spec

- [ ] `paons_immobiliare-b5h.2` - Setup auth store & PocketBase client
  - Create src/lib/stores/auth.js
  - Initialize PocketBase with reactive currentUser
  - Implement auth onChange listener

- [ ] `paons_immobiliare-b5h.3` - Create utility functions
  - getImageUrl() for PocketBase images
  - currencyFormat() for property prices
  - slugify() helper if needed

- [ ] `paons_immobiliare-b5h.4` - Setup Tailwind theme configuration
  - Add primary/secondary colors (Blue/Slate)
  - Configure Inter font
  - Add custom spacing/shadows for cards

---

### Epic 3: Property Listing Page
**Priority:** 1 (High)
**Dependencies:** Epic 1, 2

#### Tasks:
- [ ] `paons_immobiliare-c7k.1` - Build PropertyCard component
  - Layout: Image (60%) + Content (40%)
  - Hover effects: shadow, scale-up, lift animation
  - Badges: For Sale (emerald), For Rent (blue)
  - Heart/Like button (top-right, toggle state)
  - Specs row: bedrooms, bathrooms, area
  - Navigate to /properties/[slug] on click

- [ ] `paons_immobiliare-c7k.2` - Build FilterSidebar component
  - Keyword search input
  - Status toggle (Buy/Rent)
  - Price range (min/max inputs or dual slider)
  - Property type checkboxes
  - Room count circle buttons
  - Apply/Reset buttons
  - Mobile: Hidden by default, FAB or drawer trigger

- [ ] `paons_immobiliare-c7k.3` - Implement listing page layout
  - Route: /properties
  - Server load: Fetch properties with pagination
  - Filter sync with URL query params
  - Grid layout (responsive: 1 col mobile, 2 tablet, 3+ desktop)
  - Pagination controls

- [ ] `paons_immobiliare-c7k.4` - Implement filter logic
  - Build filter string for PocketBase queries
  - URL param binding (minPrice, maxPrice, type, city, bedrooms, status)
  - Real-time filter updates with SvelteKit goto()
  - Support for sorting (price ASC/DESC, newest, featured)

---

### Epic 4: Property Detail Page
**Priority:** 1 (High)
**Dependencies:** Epic 1, 2

#### Tasks:
- [ ] `paons_immobiliare-d9m.1` - Build ImageGallery component
  - CSS Grid layout (4 cols, 2 rows, main image 2x2, secondaries 1x1)
  - Lazy loading on images
  - Lightbox modal on image click
  - Lightbox navigation (arrow keys, escape to close)
  - "View all" overlay on last image (+N more)

- [ ] `paons_immobiliare-d9m.2` - Build AgentContactForm component
  - Agent header: avatar, name, label
  - Form inputs: name, email, phone, message (textarea)
  - Submit to /inquiries collection
  - Loading state (disabled, spinner)
  - Success state (green check, confirmation message)
  - Quick actions: Call, WhatsApp buttons

- [ ] `paons_immobiliare-d9m.3` - Implement detail page layout
  - Route: /properties/[slug]
  - Server load: Fetch property by slug with expand: agent
  - Display full specs in grid (bedrooms, bathrooms, area, etc)
  - Show amenities (pills/badges)
  - Show agent details
  - Sticky sidebar with contact form (desktop) or modal (mobile)
  - Breadcrumb navigation

- [ ] `paons_immobiliare-d9m.4` - Implement inquiry submission
  - Form validation (email, phone format)
  - POST to /inquiries collection (public create)
  - Set status = "new"
  - Error handling & user feedback

---

### Epic 5: User Authentication & Favorites
**Priority:** 2 (Medium)
**Dependencies:** Epic 1, 2

#### Tasks:
- [ ] `paons_immobiliare-e2p.1` - Build login page
  - Route: /login
  - Email/password form
  - Error handling (invalid credentials)
  - Redirect to /properties on success
  - Link to register page

- [ ] `paons_immobiliare-e2p.2` - Build registration page
  - Route: /register
  - Name, email, password, password confirm fields
  - Form validation
  - Type selection (customer/agent) - customer by default
  - Create user in /users collection via PocketBase auth

- [ ] `paons_immobiliare-e2p.3` - Implement favorites functionality
  - Heart button state binding to currentUser.saved_properties
  - Add/remove property from saved_properties on click
  - Requires auth (show modal if not logged in)
  - Persist to PocketBase

- [ ] `paons_immobiliare-e2p.4` - Build user dashboard (saved homes)
  - Route: /account
  - Auth-protected
  - Display saved_properties in grid
  - Remove from favorites action
  - Basic profile section (name, avatar, phone)

---

### Epic 6: Homepage & Navigation
**Priority:** 2 (Medium)
**Dependencies:** Epic 1, 2, 3, 4

#### Tasks:
- [ ] `paons_immobiliare-f4q.1` - Build app layout (Navbar & Footer)
  - Navbar: Logo, search bar, nav links (Properties, Login/Account), mobile menu
  - Footer: Links, contact info, socials
  - Sticky navbar on scroll (desktop)

- [ ] `paons_immobiliare-f4q.2` - Add featured properties carousel to homepage
  - Query: properties where featured = true
  - Carousel component (or Swiper integration)
  - Auto-rotate with manual navigation

- [ ] `paons_immobiliare-f4q.3` - Setup SEO metadata
  - Dynamic title/description per page
  - Open Graph meta tags
  - Structured data (Schema.org) for properties

---

## Development Phases

### Phase 1: Backend & Setup (Sprints 1-2)
- Complete Epic 1 (Database)
- Complete Epic 2 (Frontend Setup)
- **Deliverable:** PocketBase running, SvelteKit connected, dummy data loaded

### Phase 2: Listing & Details (Sprints 3-4)
- Complete Epic 3 (Listing)
- Complete Epic 4 (Detail)
- **Deliverable:** Users can browse and view property details

### Phase 3: User Features (Sprints 5-6)
- Complete Epic 5 (Auth & Favorites)
- Complete Epic 6 (Homepage)
- **Deliverable:** Full app with login, favorites, SEO

---

## Quick Start Commands

```bash
# Create the main epic
bd create "Property Management System" -t epic -p 1 --json

# Create sub-epics (link to parent)
bd create "Database Setup & PocketBase Configuration" -t epic -p 1 --deps "discovered-from:paons_immobiliare-352" --json
bd create "Frontend Setup & Core Integration" -t epic -p 1 --deps "discovered-from:paons_immobiliare-352" --json
bd create "Property Listing Page" -t epic -p 1 --deps "discovered-from:paons_immobiliare-352" --json
bd create "Property Detail Page" -t epic -p 1 --deps "discovered-from:paons_immobiliare-352" --json
bd create "User Authentication & Favorites" -t epic -p 2 --deps "discovered-from:paons_immobiliare-352" --json
bd create "Homepage & Navigation" -t epic -p 2 --deps "discovered-from:paons_immobiliare-352" --json

# View ready work
bd ready --json

# Claim a task
bd update <id> --status in_progress --json

# Complete a task
bd close <id> --reason "Completed" --json
```

---

## Key Implementation Details

### PocketBase Filter Examples
```javascript
// For sale, min price
'status = "for_sale" && price >= 200000'

// By city and property type
'city = "Cork" && property_type = "house"'

// Bedrooms filter
'bedrooms >= 3'

// Combine with sorting
// sort: '-featured,-created' (featured first, then newest)
```

### SvelteKit +page.server.js Pattern
```javascript
export async function load({ url }) {
    const filters = {
        minPrice: url.searchParams.get('minPrice'),
        maxPrice: url.searchParams.get('maxPrice'),
        type: url.searchParams.get('type'),
        bedrooms: url.searchParams.get('bedrooms'),
        status: url.searchParams.get('status') || 'for_sale'
    };
    
    // Build filter string...
    const result = await pb.collection('properties').getList(1, 15, {
        filter: filterString,
        sort: '-created',
        expand: 'agent'
    });
    
    return { properties: result.items, totalItems: result.totalItems };
}
```

### Component State Management Pattern
```javascript
// FilterSidebar.svelte
import { goto } from '$app/navigation';

let minPrice, maxPrice, type, bedrooms;

function applyFilters() {
    const params = new URLSearchParams();
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (type) params.set('type', type);
    if (bedrooms) params.set('bedrooms', bedrooms);
    
    goto(`?${params.toString()}`, { replaceState: true });
}
```

---

## Testing & QA Checklist

- [ ] Property cards load lazily with correct images
- [ ] Filters persist in URL and reflect in UI
- [ ] Pagination works with filtered results
- [ ] Detail page loads correct property by slug
- [ ] Lightbox navigation (arrows, escape)
- [ ] Inquiry form validates and submits
- [ ] Login/register redirects properly
- [ ] Favorites persist across sessions
- [ ] Mobile responsive (Tailwind breakpoints)
- [ ] SEO meta tags present
- [ ] PocketBase auth rules working (public read, admin write)
