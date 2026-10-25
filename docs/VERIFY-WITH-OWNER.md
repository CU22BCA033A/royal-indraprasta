# Verify with owner

**Have a lawyer review all policies before launch.**

Each item below is `null` or hidden on the site until the owner confirms it. Update `src/config/site.ts`, `menu.ts` or `faq.ts`, then run `npm run audit:placeholders`.

## Identity and legal
1. Legal entity name (proprietorship, partnership or company) for the footer and policies.
2. FSSAI licence number (must be displayed).
3. GSTIN, if registered.
4. Grievance officer name and email (needed for the privacy policy under the DPDP Act).
5. Business email address for enquiries and data requests.
6. Is the Instagram account @royal_indraprastha_ yours? Any Facebook page?
7. Are there other branches? (One listing calls this the "RR Nagar branch".)
8. Do you own a logo or brand kit? The site uses a proposed wordmark.
9. Domain name to register.

## Restaurant
10. Opening time. Listings say 6:00 AM, 6:30 AM and 8:00 AM. Closing time 10:30 PM appears on three listings: confirm.
11. Open every day? Any weekly holiday or festival closures?
12. Door number and landmark. One listing says "202, BEML Layout, 4th Stage, Opposite Cariappa Park".
13. Exact map pin (Google Maps share link) for the directions and reviews link.
14. WhatsApp number (is +91 97439 32821 on WhatsApp?).
15. Wheelchair access: listings disagree. Is the entrance step-free? Is there an accessible washroom?
16. Parking: where, how many vehicles, two-wheeler and car?
17. Do you serve Chinese / Indo-Chinese? Two listings say so.
18. Full menu with categories, items and current prices (a photo of the printed menu is enough).
19. Breakfast, lunch and dinner timings if different (for example meals only from noon).
20. Takeaway, Wi-Fi, separate chaat counter: confirm each before we mention them.
21. How long has the restaurant been open, and the story you would like told (for the About page, which is hidden until then).

## Banquet hall
22. Hall name (one listing says "Anugraha Banquet Hall").
23. Capacity, seated and standing (one listing says 150 and 250).
24. What is included: catering, decor, stage, sound, AC, dressing rooms, parking.
25. Slot timings (one listing says 9:00 AM to 3:30 PM and 5:00 PM to 11:00 PM).
26. Advance amount and cancellation and refund terms (one listing says 50% advance).
27. Event types you accept.

## Hotel
28. Is "Royal Indraprastha The Hotel" (SN Plaza, Channasandra) part of the same business? It has a bar and listings mention seafood. The stay page stays off until you confirm.

## Content
29. Native Kannada review of every string marked `NEEDS-NATIVE-REVIEW`.
30. Photographs per `docs/SHOT-LIST.md`.

## Decisions taken where research could not settle a question
- Hours: only the closing time is shown, with "call to confirm today's opening time". No open or closed badge until the opening time is confirmed.
- Menu: categories and items seen on two or more listings; no prices.
- Banquet: no capacity, inclusions or prices.
- Stay: disabled.
- About page: not built into the site.
- Ratings: not shown. A Google Maps search link is used for reviews until the exact listing link is supplied.
