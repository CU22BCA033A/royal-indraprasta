# Research findings

All sources retrieved on 25 October 2026 unless noted. Confidence labels:

- **Verified**: 2 or more independent sources agree.
- **Single source**: one source only.
- **Conflicting**: sources disagree.

Aggregator listings are often scraped from each other and from Google, so "verified" here means "consistent across public listings", not "confirmed by the owner". Everything published on the site still needs owner sign-off (see `VERIFY-WITH-OWNER.md`).

## Sources consulted

| ID  | Source                         | URL                                                                                                        | Fetched                                                                      |
| --- | ------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| S1  | Yappe listing                  | https://yappe.in/karnataka/bengaluru/royal-indraprastha-rr-nagar/2121520                                   | Yes                                                                          |
| S2  | magicpin store page            | https://magicpin.in/Bangalore/Rajarajeshwari-Nagar/Restaurant/Royal-Indraprastha/store/375cc1/menu/        | Yes                                                                          |
| S3  | District (dining)              | https://www.district.in/dining/bangalore/royal-indraprastha-rajarajeshwari-nagar-bangalore                 | Yes                                                                          |
| S4  | Venuebookingz banquet listing  | https://www.venuebookingz.com/bangalore/rajarajeshwari-nagar/banquet-hall/royal-indraprasta-hotel/22154    | Yes                                                                          |
| S5  | Travelocity hotel page         | https://www.travelocity.com/es/Bengaluru-Hoteles-Royal-Indraprastha-The-Hotel.h124496770.Informacion-Hotel | Yes                                                                          |
| S6  | HRS hotel page                 | https://www.hrs.com/en/hotel/1207046                                                                       | Yes                                                                          |
| S7  | Zomato listing                 | https://www.zomato.com/bangalore/royal-indraprastha-rajarajeshwari-nagar-bangalore                         | Search result only (robots disallowed)                                       |
| S8  | Instagram @royal_indraprastha_ | https://www.instagram.com/royal_indraprastha_/                                                             | Search result only (robots disallowed)                                       |
| S9  | Hogr                           | https://hogr.app/bengaluru/royal-indraprastha-rr-nagar/rajarajeshwari-nagar                                | Yes, rejected as unreliable (lists a chicken dish for a pure veg restaurant) |
| S10 | Wanderboat                     | https://wanderboat.ai/restaurants/india/bengaluru/royal-indraprastha-rr-nagar/ZoUtpu_tS8KbL67iMYoS7Q       | Search result only (fetch failed)                                            |

## 1. Royal Indraprastha (restaurant)

| Fact                   | Value                                                                                                     | Sources                       | Confidence                                     | Used on site                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| Trading name           | Royal Indraprastha                                                                                        | S1, S2, S3, S7                | Verified                                       | Yes                                                   |
| Pure vegetarian        | Pure veg / vegetarian restaurant                                                                          | S1, S2, S4                    | Verified                                       | Yes                                                   |
| Cuisine                | South Indian, North Indian                                                                                | S1, S2, S3 (North Indian), S7 | Verified                                       | Yes                                                   |
| Cuisine                | Chinese / Indo-Chinese                                                                                    | S2, S3                        | Verified by listings, not mentioned in reviews | No (owner to confirm)                                 |
| Street address         | Field Marshal Cariappa Rd, 4th Stage, Rajarajeshwari Nagar, Bengaluru 560098                              | S1, S4, S10                   | Verified                                       | Yes                                                   |
| Door number and layout | 202, BEML Layout, 4th Stage, Opposite Cariappa Park                                                       | S3                            | Single source                                  | No                                                    |
| Phone                  | +91 97439 32821                                                                                           | S1, S2, S3, S4                | Verified                                       | Yes                                                   |
| Coordinates            | 12.9122877, 77.5210246                                                                                    | S2                            | Single source                                  | No (geo omitted from JSON-LD)                         |
| Opening time           | 6:00 AM (S3), 6:30 AM (S1, data dated 25 Jan 2024), 8:00 AM (S2)                                          | S1, S2, S3                    | Conflicting                                    | No                                                    |
| Closing time           | 10:30 PM                                                                                                  | S1, S2, S3                    | Verified                                       | Yes, as "Closes 10:30 PM" with a call-to-confirm note |
| Days open              | 7 days                                                                                                    | S1                            | Single source                                  | No                                                    |
| Wheelchair access      | Accessible entrance and washroom (S2); a reviewer says not accessible (S1); step-free entry (S3)          | S1, S2, S3                    | Conflicting                                    | No                                                    |
| Parking                | Standard parking (S3); limited parking, four-wheeler parking opposite RR Nagar police station (S1 review) | S1, S3                        | Conflicting detail                             | No                                                    |
| Takeaway               | Yes                                                                                                       | S2                            | Single source                                  | No                                                    |
| Delivery               | Via aggregators                                                                                           | S2, S7                        | Verified                                       | No (no ordering on this site)                         |
| Wi-Fi                  | Yes                                                                                                       | S2                            | Single source                                  | No                                                    |
| Cost for two           | Rs 900                                                                                                    | S2, S3                        | Verified (aggregator figure)                   | No                                                    |
| Ratings                | 3.4 (S3, 120 ratings), 3.9 (S1, 6,609 reviews)                                                            | S1, S3                        | Conflicting                                    | No, by rule                                           |
| Instagram              | @royal_indraprastha_                                                                                      | S8                            | Unconfirmed ownership                          | No                                                    |
| Official website       | None found                                                                                                |                               |                                                |                                                       |
| Nearest metro          | Rajarajeshwari Nagar station, about 1.7 km                                                                | S1                            | Single source                                  | No                                                    |

### Menu items seen in listings

| Item                                | Sources                                  | Confidence    |
| ----------------------------------- | ---------------------------------------- | ------------- |
| Idli                                | S1 (review), S2                          | Verified      |
| Vada                                | S2, user's earlier research              | Verified      |
| Coffee                              | S1, S2                                   | Verified      |
| Tea, badam milk                     | S1                                       | Single source |
| Rice bath                           | S2                                       | Single source |
| Masala puri (chaat)                 | S1                                       | Single source |
| Butter kulcha, paneer butter masala | S1                                       | Single source |
| Juices, milkshakes                  | S1                                       | Single source |
| Dosa varieties                      | User's earlier research, S9 (unreliable) | Single source |

Prices: S2 shows five prices (coffee 30, idli 55, vada 55, watermelon juice 65, rice bath 90), date unknown. **Not published.** Full menus on S2 and S3 are images only and were not transcribed.

Decision: the menu page lists only categories plus items seen in two or more sources, labelled as a partial list, with no prices. Every item carries a `source` note in `src/config/menu.ts`.

## 2. Royal Indraprasta Hotel (banquet)

| Fact          | Value                                                       | Sources | Confidence               | Used                                      |
| ------------- | ----------------------------------------------------------- | ------- | ------------------------ | ----------------------------------------- |
| Name          | Royal Indraprasta Hotel, hall named "Anugraha Banquet Hall" | S4      | Single source            | No                                        |
| Address       | Same as restaurant (Field Marshal Cariappa Rd, 4th Stage)   | S4      | Verified as same address | Yes, banquet is at the restaurant address |
| Contact       | Venue manager number 9743932821, same as the restaurant     | S4      | Supports same business   | Yes, phone only                           |
| Capacity      | 150 seated, 250 floating                                    | S4      | Single source            | No                                        |
| Food          | Pure veg, in-house catering only, no outside catering       | S4      | Single source            | No                                        |
| Alcohol       | Not available, not allowed                                  | S4      | Single source            | No                                        |
| Parking       | 25 vehicles                                                 | S4      | Single source            | No                                        |
| Price         | Rs 400 per plate, excl. taxes                               | S4      | Marketplace data         | Never published                           |
| Booking terms | 50% advance to confirm                                      | S4      | Single source            | No (refund page uses neutral text)        |

Decision: the banquet page describes that the restaurant hosts events at its address and takes enquiries, with no capacity, inclusions or prices until the owner confirms.

## 3. Royal Indraprastha The Hotel (stay)

| Fact        | Value                                                                                        | Sources | Confidence    |
| ----------- | -------------------------------------------------------------------------------------------- | ------- | ------------- |
| Address     | 1221, SN Plaza, B Block, Channasandra, Uttarahalli Hobli, RR Nagar 560098 (2nd floor per S5) | S5, S6  | Verified      |
| Coordinates | 12.90392, 77.51173                                                                           | S5      | Single source |
| Rooms       | 32                                                                                           | S5      | Single source |
| Bar         | Yes                                                                                          | S5, S6  | Verified      |
| Restaurant  | 2 on site (S5); S6 contradicts itself and mentions seafood                                   | S5, S6  | Conflicting   |
| Operator    | "Managed by a real estate professional"                                                      | S5      | Single source |

Decision: the hotel is about 1.4 km in a straight line from the restaurant (by coordinates), has a bar and is reported to serve seafood. That does not fit a pure vegetarian restaurant brand. **The stay module is disabled** and the page is excluded from navigation, sitemap and search until the owner confirms common ownership.

## 4. Not this brand

- Indraprastha Restaurant, Vijayanagar: excluded.
- RR Vatika, RR Nagar and Jayanagar: excluded.
- Royal IndraPrasth (Uttar Pradesh, explurger.com/pd/38p0dtsoawxk797cr): unrelated.
- Hotel Royal Indraprastha (Kerala, keralatourism.org): unrelated.
- Royal Indraprastha Builders (squareyards.com): unrelated real-estate developer.

## 5. Other branches

Searched for Kengeri, Uttarahalli, Nagarbhavi, Banashankari, Mysore Road and other cities. Hogr labels the listing "Rr Nagar branch", which hints at other branches, but no other branch was found. **No branches listed.**

## 6. Peer sites (pure veg restaurants with event space, RR Nagar and nearby)

Honest finding: the nearby peers found in this search (Anantha Pure Veg, RR Vatika, kalyana mantapas on weddingz.in, venues on venuebookingz/venuelook) have **no official website** that search surfaced. Their public presence is aggregator pages. Observed weaknesses across those pages:

1. Facts conflict between platforms (hours, accessibility, veg status: EazyDiner's FAQ says Anantha Pure Veg serves non-veg).
2. Menus are photos of printed cards, unreadable on phones and invisible to search.
3. No Kannada.
4. Pages are heavy with ads, pop-ups and app prompts.
5. Phone numbers on venue marketplaces route to the marketplace, not the venue.
6. No privacy policy that covers the venue itself, and enquiry forms owned by third parties.

So the bar this site has to clear is: one fast page with correct facts, a readable text menu, Kannada, and a direct phone line.

## 7. Technical references

- Astro 7.4.2 is current on npm (checked 25 Oct 2026). Static output deploys to Cloudflare Pages with `functions/` handled by Pages.
- Pagefind 1.5.2: run `pagefind --site dist` after build; pages opt in with `data-pagefind-body`.
- `@fontsource/*` 5.3.0 packages ship WOFF2 with unicode-range subsets per script.
- Playwright 1.64.1 and `@axe-core/playwright` 4.14.0.
- Legal references are summarised in `LEGAL-NOTES.md`.
