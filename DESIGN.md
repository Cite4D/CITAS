---
name: CITAS 2027 Academic Conference Portal
description: Simple, clean international academic conference portal (IEEE & SIBR style) for De La Salle University
colors:
  dlsu-green: "#00563F"
  dlsu-dark: "#0a4731"
  dlsu-light-bg: "#f8faf9"
  border-subtle: "#e2e8f0"
  border-strong: "#cbd5e1"
  text-heading: "#0f172a"
  text-body: "#334155"
  text-muted: "#64748b"
  highlight-red: "#b91c1c"
  highlight-amber: "#b45309"
typography:
  headings: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  body: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
rounded:
  sm: "4px"
  md: "6px"
---

# Design System: CITAS 2027 (IEEE & SIBR Academic Style)

## 1. Aesthetic Canon

Modeled after standard international academic conference websites (IEEE, SIBR, ACM):
- **Sober, Content-First Layout:** White background, clean two-column academic layout with primary content on the left and key dates / submission links in the right sidebar.
- **De La Salle University Green:** Used purposefully on the top institutional bar, section dividing headers, and active links.
- **Academic Tables & Lists:** Clear tabular formatting for registration fees and deadlines; clean multi-column bulleted lists for research tracks (no AI card-spam or flashy marketing widgets).
- **Zero Decorative Fluff:** No artificial column illustrations, no countdown timer boxes, no pulsating dots, and no SaaS-style pricing cards. Authentic, trustworthy academic publishing standard.

## 2. Structure

1. **Top Institutional Banner:** DLSU Manila branding with CITE4D and AdRIC affiliations.
2. **Conference Header Banner:** Formal conference name, acronym, dates, and venue in clean DLSU green and white.
3. **Navigation Menu:** Direct links to Call for Papers, Important Dates, Guidelines, Registration, Venue, and Admin Portal.
4. **Main Academic Column:**
   - Conference Introduction & Objectives
   - Call for Papers & Research Scope (categorized bulleted lists)
   - Paper Submission Guidelines (ACL format, blind review, templates, EasyChair link)
   - Registration Fees (formal IEEE-style academic table)
   - Venue & Travel Directions
   - Organizing Committee & Contact Secretariat
5. **Right Sidebar (Sidebar Column):**
   - Important Dates Callout Box (highlighting camera-ready deadline)
   - EasyChair Direct Submission Link
   - Template Download Links (LaTeX & Word)
   - Quick Contact Helpdesk
6. **Admin CMS:**
   - Discreet, fully accessible editor allowing conference organizers to update dates, topics, links, and guidelines live, with LocalStorage persistence and JSON export/import.
