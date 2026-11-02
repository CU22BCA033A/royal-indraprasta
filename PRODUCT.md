# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Local diners in Rajarajeshwari Nagar, Bengaluru, usually on a phone, deciding where to eat now or checking a branch's closing time, phone number or directions.
- Families planning a function (birthday, naming ceremony, engagement, small wedding reception) who want to know whether the Anugraha Banquet hall at Cariappa Road suits them and how to enquire.
- Guests looking for the Channasandra branch, which has rooms upstairs.

## Product Purpose

The website of Royal Indraprastha, a pure vegetarian restaurant brand with two confirmed branches in Rajarajeshwari Nagar. Success: a visitor finds their branch, sees what is served, and calls, gets directions or sends a banquet enquiry within a few seconds.

## Positioning

A neighbourhood pure-veg kitchen that serves South Indian tiffin, North Indian meals and evening chaat under one name, with its own banquet hall above the Cariappa Road branch. The brand presents itself as royal ("Relish. Like a King") while staying an everyday local restaurant.

## Operating Context

- Branches: Cariappa Road (4th Stage, phone +91 97439 32821, closes 10:30 PM, banquet hall) and Channasandra (1221, SN Plaza, B Block, rooms). Data in `src/data/branches.ts`.
- Bookings are confirmed by phone; the site takes no payments.
- Static Astro site on Vercel, small edge functions for three forms, English only.

## Capabilities and Constraints

- Branch selector remembered in the browser; nearest-branch finder that keeps location in the browser.
- Shared menu with per-branch items; prices not shown until supplied.
- Unconfirmed facts are `null` and hidden. No fake reviews, ratings or metrics.
- No bar, alcohol or non-vegetarian information, even though another business shares the SN Plaza building.
- WCAG 2.2 AA, Lighthouse 95+ performance and 100 elsewhere, strict CSP with no inline scripts.
- Banned in the brief: emoji, em dashes, gradients, glass, bento grids, pill radii, pure white or black, Inter, Geist, Space Grotesk, parallax, cursor effects, skeleton loaders, AI or stock imagery.

## Brand Commitments

- Name: Royal Indraprastha. Signage sets a gold script "Royal" above a cream slab-serif "Indraprastha" with a dark drop shadow; a Kannada sign sits beside it on the building, but the site is English only by the owner's choice.
- Tagline from the owner's building rendering: "Relish. Like a King".
- Logo: a magenta field with a gold paisley inside a gold cusped (lobed) frame. Only seen in the rendering; original artwork still needed.
- Building materials: cream signboards and walls, dark wood panels, red brick base, white filigree eave trim.
- Banquet hall name: Anugraha Banquet (shown on the owner's rendering).

## Evidence on Hand

- Owner-supplied images (2 November 2026): architect's rendering of the Cariappa Road building; daytime photo of the Cariappa Road front; night photo of the lit sign; night photo of the Channasandra hotel building. Processed in `public/photos/`.
- No food, interior or banquet photos yet. No reviews, ratings or awards to show, and none may be invented.
- Research and sources: `docs/RESEARCH.md`, `docs/BRAND-DISCOVERY.md`.

## Product Principles

1. The branch comes first: every page answers "which branch, is it open, how do I get there".
2. Only confirmed facts, everything else hidden or marked as to be confirmed.
3. Look like the building the guest will walk into.
4. Calling is the main action; forms are the fallback.

## Accessibility & Inclusion

WCAG 2.2 AA throughout; dark mode, reduced motion, forced colours and higher-contrast preferences supported.
