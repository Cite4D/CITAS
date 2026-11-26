# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Vite + React (TypeScript) + Tailwind CSS + Lucide Icons (Single-page app with dual-mode base path `/citas/` and `/`, client-side CMS with LocalStorage persistence, live reactive preview, JSON export/import, and zero-backend portability for hosting under `cite4d.com/citas`).

## Users
- Academic researchers, faculty members, computer scientists, data analysts, graduate students, and industry practitioners seeking to submit original research papers, view conference scope and tracks, download ACL formatting templates, check deadlines, and register for CITAS 2027.
- Conference organizers (CITE4D and AdRIC at De La Salle University) who need full control to update dates, venue details, submission links, review criteria, track topics, keynote speakers, and committee members without modifying source code.

## Product Purpose
CITAS 2027 (Conference on Innovation, Technology, and Analytics for Society) is an international academic research conference organized by the Center for ICT for Development (CITE4D) and The Advanced Research Institute for Informatics, Computing, and Networking (AdRIC) at De La Salle University (DLSU), Manila, Philippines.
The portal serves as the primary conference identity, public call for papers, submission guidelines repository, milestone tracking system, and live administrative management hub.

## Positioning
An authoritative, distinguished academic conference portal for De La Salle University that elevates crude site drafts into an elegant, high-craft international conference platform with seamless self-service administrative control and instant local/subpath portability.

## Operating Context
- Deployed under `cite4d.com/citas`.
- Must operate cleanly on both mobile and desktop screens.
- Venue: De La Salle University, Manila, Philippines (Main campus: 2401 Taft Avenue, Malate, Manila).
- Main conference date: Wednesday, February 17, 2027 (Conference run: February 16-18, 2027).

## Capabilities and Constraints
- Public Conference Portal:
  - Hero with prestigious DLSU architectural identity (St. La Salle Hall heritage facade motif), conference title, theme, dates, organizers, and clear calls to action (Submit Paper, View Scope, Key Dates).
  - Conference Introduction & Mission (international academic exchange on intelligent technologies, hosted by CITE4D and AdRIC DLSU).
  - Comprehensive Scope & Research Tracks (30+ topics categorized under AI & Intelligent Systems, Data Analytics & Optimization, Cyber-Physical & IoT Systems, Smart Society Applications with dynamic category filtering and instant search).
  - Interactive Important Dates & Timeline (milestone timeline with countdown timer and status badges: Upcoming, Active, Finalized).
  - Paper Submission Guidelines (ACL two-column formatting rules, max 6 pages, double-blind review requirement, direct template repository links for LaTeX & .docx, EasyChair submission portal link).
  - Venue & Campus Guide (De La Salle University Manila campus showcase, interactive Google Maps link/embed, transportation guide from NAIA airport, nearby hotels and accommodations).
  - Registration Information & Fee Structure (pricing tiers: regular author, student, non-author attendee, early bird discounts).
  - Organizing Committee & Institutional Partners (CITE4D, AdRIC, DLSU College of Computer Studies, contact email and inquiry form).
- Administrative CMS Hub:
  - Accessible via `/admin` (or floating Admin bar / secret toggle / password modal).
  - Direct visual field editing with instant preview.
  - Sections management: Edit Hero & Info, Edit Important Dates, Edit Scope Topics, Edit Submission Specs, Edit Registration Tiers, Edit Committee.
  - Persistence: Browser LocalStorage with "Export Config (JSON)" to download updated conference state as `citas-config.json`, "Import Config (JSON)" to load shared configs, and "Reset to Defaults".

## Brand Commitments
- Visual Identity: De La Salle University Green (#00563F / #0f5132 / #064e3b) and crisp White as the foundational theme.
- Supporting Accents: Sophisticated gold/amber accents (#d97706 / #f59e0b) for key dates, status badges, and academic accolades; neutral warm slates for typography.
- Heritage & Dignity: Incorporate authentic DLSU architectural motifs (neoclassical St. La Salle Hall facade, arched colonnades, academic seal styling) with contemporary typography.

## Evidence on Hand
- Original Google Sites draft screenshots provided by organizers with initial text, tracks (30 topics), timeline dates, ACL formatting rules, and EasyChair link (`https://easychair.org/conferences/?conf=ailric2027`).

## Product Principles
1. Prestigious Academic Dignity: Elevate international academic standards with sharp typography, clear hierarchy, and DLSU heritage pride.
2. Complete Administrative Autonomy: Every piece of text, date, and link is editable live through the Admin CMS, so non-technical organizers can update conference details anytime.
3. Resilient Portability: Zero backend or database dependencies required; deploys flawlessly to `cite4d.com/citas` with instantaneous client-side state management and JSON config backup.
