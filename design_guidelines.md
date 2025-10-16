# Design Guidelines: Mentor Health Platform Admin

## Design Approach

**System Selected**: Modern Admin Dashboard Pattern (inspired by Linear, Vercel Dashboard, and shadcn/ui design principles)

**Rationale**: This is an enterprise admin platform requiring clarity, efficiency, and data density. The design prioritizes information hierarchy, scannable layouts, and professional aesthetics over visual flair.

**Core Principles**:
- Data-first clarity with minimal decoration
- Sophisticated restraint using primarily black/white palette
- Strategic blue accents for CTAs and key interactions only
- Clean, spacious layouts despite information density
- Professional, trustworthy aesthetic for healthcare context

## Color System

### Base Palette (Primary Usage)
- **Background**: White #FFFFFF (light mode), Black #11111F (dark mode)
- **Surface**: Use subtle gray variations (neutral-50 to neutral-900)
- **Text**: Black #11111F (light), White #FFFFFF (dark)
- **Borders**: neutral-200 (light), neutral-800 (dark)

### Accent & Semantic Colors
- **Primary Action**: Mentor Blue #0048FF - Use sparingly for primary buttons, links, and active states only
- **Success/Positive**: Green #6BDFAB - confirmations, success states, positive metrics
- **Warning**: Orange #FF6F43 - warnings, pending states
- **Error/Critical**: Red #FF5151 - errors, critical alerts, destructive actions
- **Info**: Violet #8F91FF - informational highlights, badges
- **Special**: Pink #FF0569 - premium features, special callouts (minimal use)

**Color Usage Philosophy**: 90% black/white/gray, 10% color for meaning and hierarchy. Never use multiple accent colors in the same component.

## Typography System

**Font Stack**: 'Axiforma', 'Inter', sans-serif (TODO: Add Axiforma woff2 files)

### Hierarchy
- **Display/H1**: text-4xl font-bold (36px) - Page titles, dashboard headings
- **H2**: text-2xl font-semibold (24px) - Section headers, card titles
- **H3**: text-xl font-semibold (20px) - Subsection headers
- **H4**: text-lg font-medium (18px) - Card subtitles, table headers
- **Body**: text-base (16px) - Default content, table cells
- **Small**: text-sm (14px) - Metadata, labels, helper text
- **Tiny**: text-xs (12px) - Timestamps, badges, fine print

**Weight Usage**: Regular (400) for body, Medium (500) for labels, Semibold (600) for headings, Bold (700) for emphasis

## Layout System

**Spacing Primitives**: Consistently use Tailwind units of **2, 4, 6, 8, 12, 16, 24** (e.g., p-4, m-8, gap-6)

### Structure
- **Sidebar**: Fixed 280px width, full height, dark background (neutral-900)
- **Navbar**: Fixed top, h-16, border-b, white/dark surface
- **Content Area**: ml-[280px], mt-16, p-6 to p-8
- **Cards**: Consistent p-6 padding, rounded-lg, border or subtle shadow
- **Tables**: Full-width containers with proper overflow handling

### Grid Patterns
- **Dashboard**: 3-4 column grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- **Data Tables**: Full-width responsive containers
- **Forms**: 2-column layouts on desktop (grid-cols-1 md:grid-cols-2)
- **Detail Pages**: 2/3 main content + 1/3 sidebar pattern

## Component Library

### Navigation
- **Sidebar**: Dark theme (neutral-900 bg), white/neutral-400 text, blue highlight for active route, Lucide icons with text labels
- **Navbar**: Clean white/dark surface, search bar (max-w-md), icon buttons for notifications/settings, avatar dropdown

### Data Display
- **Cards**: White/dark surface, rounded-lg, border or shadow-sm, p-6, clear header with optional action button
- **Tables**: shadcn/ui table component, hover states on rows, sticky headers for long lists, alternating row backgrounds (subtle)
- **Charts**: Recharts with brand color palette, clean axes, subtle gridlines, tooltips on hover

### Interactive Elements
- **Buttons**: 
  - Primary: bg-blue-600 (Mentor Blue), white text
  - Secondary: border with neutral colors, transparent bg
  - Ghost: No background, hover state with bg-neutral-100
  - Sizes: h-10 (default), h-8 (small), h-12 (large)
- **Inputs**: border-neutral-300, focus:ring-blue-500, rounded-md, h-10
- **Modals**: Overlay with backdrop-blur-sm, centered, max-w-2xl, slide-in animation
- **Tabs**: Underline active state with blue, subtle hover effects

### Status Indicators
- **Badges**: Small rounded-full or rounded-md, semantic colors (green/orange/red/blue), text-xs uppercase
- **Progress**: Linear bars using brand green for completion
- **Loading**: Subtle spinners, skeleton screens for data-heavy pages

## Admin-Specific Patterns

### Dashboard Layout
- **Stats Row**: 4-column grid of metric cards with number + label + trend indicator
- **Chart Section**: 2-column or full-width chart containers with period selector (7d/30d/90d)
- **Recent Activity**: Table or list widget showing latest actions/events

### Data Tables
- **Filters**: Top bar with search, dropdowns, date pickers aligned left
- **Actions**: Row-level actions (icons), bulk actions toolbar when items selected
- **Pagination**: Bottom-right, showing "1-20 of 500" with prev/next
- **Empty States**: Centered illustration/icon + text + CTA

### Forms & Settings
- **Section Groups**: Logical grouping with h3 headers, dividers between sections
- **Field Layout**: Label above input, helper text below, inline validation
- **Action Footer**: Sticky bottom bar with Cancel (secondary) + Save (primary) buttons

### Permission & Roles
- **Matrix View**: Table with users/roles as rows, permissions as columns, checkbox toggles
- **Role Cards**: Visual cards showing role name, member count, permission summary

## Animations & Interactions

**Philosophy**: Minimal, purposeful motion only

- **Page Transitions**: None or subtle fade (200ms)
- **Hover States**: Scale (1.02) on cards, bg change on buttons/rows
- **Loading**: Skeleton screens, subtle pulse on placeholders
- **Notifications**: Toast slides from top-right, auto-dismiss in 4s
- **Modal Entry**: Fade in overlay + scale modal from 95% to 100%

**Forbidden**: Parallax, excessive shadows, gradient animations, page-load spinners longer than 300ms

## Dark Mode Strategy

Implement comprehensive dark mode using Tailwind's dark: prefix:
- **Background**: neutral-950 base, neutral-900 surfaces
- **Text**: neutral-100 primary, neutral-400 secondary
- **Borders**: neutral-800
- **Blue Accent**: Remains #0048FF but ensure sufficient contrast
- **All semantic colors**: Maintain same hues, adjust lightness for dark backgrounds

---

**Final Note**: This is a professional admin tool for healthcare data management. Every design decision should prioritize clarity, efficiency, and trust. Avoid decorative elements; let data and functionality speak through clean, sophisticated design execution.