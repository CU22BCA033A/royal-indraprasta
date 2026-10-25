# Legal notes (drafting aid, not legal advice)

These notes informed the policy drafts. A lawyer must review the final policies before launch. Retrieved 25 October 2026.

## Digital Personal Data Protection Act 2023 and DPDP Rules 2025

Source: Storyboard18 report on the notified rules, https://www.storyboard18.com/amp/digital/breaking-govt-notifies-final-dpdp-rules-sets-staggered-rollout-with-key-obligations-for-data-fiduciaries-84201.htm ; PIB document https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf (search result only).

- Rules notified in November 2025 with a staggered rollout: governance rules immediately, Consent Manager registration at 12 months, and the core obligations on data fiduciaries (notice, security, breach reporting, retention, rights, grievance) at 18 months, which falls around May 2027. Building to the full standard now avoids rework.
- Notice (Rule 3): standalone, plain language, itemised data and purposes, with links to withdraw consent, exercise rights and complain to the Data Protection Board. The site's forms carry a short purpose line plus a link to the privacy policy, which itemises data per form.
- Breach notification (Rule 7): inform affected people promptly and the Board, with a detailed report within 72 hours. Noted in the privacy policy as a commitment.
- Grievance redressal (Rule 14): publish how to exercise rights and respond within 90 days at most. The Data Request page and privacy policy promise a response "as soon as we can, and within the time the law allows (currently 90 days at most)". Owner may set a shorter target.
- Children (Rule 10): verifiable parental consent is needed to process a child's data. The site avoids this by stating that forms are for people 18 and over and collecting no age.
- Retention (Rule 8): erase when the purpose is served. Site functions keep nothing; email copies sit in the owner's inbox and the policy says they are deleted once the enquiry or booking is finished. Owner to confirm a concrete period with the lawyer.

## Information Technology Act 2000 and Intermediary Rules 2021

The site is a business's own site, not an intermediary hosting user content. No user-generated content is published, so intermediary due diligence obligations are not expected to apply. A grievance contact is published anyway under the DPDP Act.

## FSSAI

FSSAI orders require food businesses to display their licence or registration number at premises and on bills; e-commerce food business operators must display it on their platforms. The site footer shows the licence number once supplied, and `audit:placeholders` blocks a production build without it.

## Consumer Protection (E-Commerce) Rules 2020

Apply only if the site starts taking orders or payments. The site takes neither. If ordering is added: seller details, grievance officer, refund and return terms, total price with taxes and no pre-ticked consent are required.

## What the site does as a result

- No cookies. Two `localStorage` keys (theme, language) and one for the notice; one `sessionStorage` key for UTM values. All listed in the Cookie Policy.
- No third-party scripts, analytics off.
- Consent checkbox unticked, required, with a privacy link.
- Data Request page with access, correction and deletion.
