---
name: CITAS 2027 Academic Design System
description: De La Salle University green and white academic conference design system
colors:
  dlsu-green-heritage: "#00563F"
  dlsu-dark: "#03261a"
  dlsu-green-900: "#063f2d"
  dlsu-green-800: "#00563F"
  dlsu-green-700: "#086e51"
  dlsu-green-500: "#15a87e"
  dlsu-green-100: "#ddfaee"
  dlsu-green-50: "#f0fbf6"
  gold-accent: "#d97706"
  gold-highlight: "#f59e0b"
  neutral-bg: "#fafbf9"
  neutral-surface: "#ffffff"
  text-primary: "#0f172a"
  text-secondary: "#334155"
  text-muted: "#475569"
typography:
  display:
    fontFamily: "Cinzel, Georgia, serif"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.dlsu-green-heritage}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.dlsu-green-900}"
  card-surface:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: CITAS 2027

## 1. Design Principles

- **DLSU Academic Dignity:** Celebrate De La Salle University's iconic neoclassical heritage (St. La Salle Hall facade, arched colonnades, signature DLSU green and crisp white) paired with contemporary international conference standards.
- **Scientific Scannability:** Present 30+ research topics, important milestone dates, and double-blind ACL submission requirements with high legibility, clean visual grouping, and zero visual clutter.
- **Administrative Autonomy:** Every date, title, link, and guideline is dynamically configurable via the built-in Admin CMS so non-technical conference organizers can update evolving details without code edits.
- **Zero-Friction Portability:** Designed for seamless deployment under `cite4d.com/citas` with relative asset resolution and client-side LocalStorage persistence with JSON backup.

## 2. Color System

- **DLSU Heritage Green (`#00563F`):** The primary brand anchor. Used for primary headers, authoritative buttons, active status badges, and academic crest motifs.
- **DLSU Dark Green (`#03261a` & `#063f2d`):** Deep architectural tone used for the hero background, organizing committee showcase, and footer.
- **Parchment White (`#fafbf9` & `#ffffff`):** Clean, warm neutral grounds that provide contrast and readability for academic prose.
- **Warm Amber Gold (`#d97706` & `#f59e0b`):** Purposeful highlight color reserved for key milestones, spotlight dates, and award indicators.

## 3. Typography & Hierarchy

- **Headings & Display (`Cinzel`):** Classical Roman capital styling for `h1`, `h2`, and major section titles that echo the engraved stone inscriptions on St. La Salle Hall.
- **Body & Functional UI (`Source Sans 3`):** High-legibility, open humanist grotesque designed for continuous academic reading, metadata tables, and dense track lists.
- **Hierarchy Scale:**
  - `h1`: 3.75rem / 60px (`Cinzel`, bold, tracking tight)
  - `h2`: 2.25rem / 36px (`Cinzel`, bold)
  - `h3`: 1.25rem / 20px (bold)
  - Body Copy: 1rem / 16px or 0.875rem / 14px (`max-w-[65ch]` measure)
  - Metadata & Badges: 0.75rem / 12px (semi-bold)

## 4. Spacing & Rhythm

- Vertical section rhythm: Generous 4rem to 6rem (64px to 96px) section separation with subtle hairline dividers.
- Measure: Reading paragraphs are constrained to 60-70 characters per line (`max-w-[68ch]`) with `text-pretty` and `text-balance` to avoid typographic stragglers.

## 5. Component Patterns

- **Connected Milestone Timeline:** Step progression connecting milestone cards horizontally on desktop and vertically on mobile, with distinct status badges (Active, Upcoming, Key Milestone).
- **Searchable Track Explorer:** Chip-filtered research grid featuring 30 topics categorized across AI, Big Data Analytics, Cyber-Physical IoT, and Societal Applications with real-time text query filtering.
- **Author Guidelines Card:** Specification grid for ACL two-column format, 6-page limit, double-blind review checklist, and template download links.
- **Integrated Admin CMS:** Slide-over modal with tabs for General Details, Important Dates, Scope Topics, Submission Guidelines, Registration Fees, Venue & Transit, and Backup / JSON Sync.
