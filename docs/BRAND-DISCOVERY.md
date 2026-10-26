# Brand discovery

Researched 26 October 2026. Confidence: **confirmed** = two or more independent sources (or the owner); **single** = one source; **conflicting** = sources disagree. Earlier sources are listed in `RESEARCH.md` (S1 to S10).

## New sources

| ID  | Source                                                                                                                                                                  | URL                                                                                                                   | Read?                                                                  |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| S11 | Swiggy, "Royal Indraprastha-Channasandra"                                                                                                                               | https://www.swiggy.com/restaurants/royal-indraprastha-channasandra-channasandra-rajarajeshwari-nagar-bangalore-368021 | Yes                                                                    |
| S12 | Wanderlog, "Royal Indraprastha The Hotel"                                                                                                                               | https://wanderlog.com/place/details/9946898/royal-indraprastha-the-hotel                                              | Yes                                                                    |
| S13 | indiabangalorehotels.com hotel page                                                                                                                                     | https://royal-indraprastha-the.indiabangalorehotels.com/en/                                                           | Yes                                                                    |
| S14 | Booking.com hotel page                                                                                                                                                  | https://www.booking.com/hotel/in/royal-indraprastha-the.en-gb.html                                                    | Yes                                                                    |
| S15 | Planet of Hotels                                                                                                                                                        | https://en.planetofhotels.com/india/bangalore/royal-indraprastha-hotel                                                | Yes                                                                    |
| S16 | Brand domain `royalindraprasthathehotel.in` (title "Royal Indraprastha the Hotel - the luxury and comfort.") and `royalindraprasthathehotel.com` (title "Indraprastha") | search results only                                                                                                   | **No.** Both sites block automated readers (robots.txt). Not bypassed. |
| S17 | The News Minute on MTR and Bengaluru tiffin rooms                                                                                                                       | https://www.thenewsminute.com/features/mtrs-soul-food-delighting-bengaluru-nine-decades-34632                         | Yes (category context only)                                            |

## Outlets

| Outlet                                 | Address                                                                                                                                      | Status                                           | Evidence                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **Cariappa Road** (RR Nagar)           | Field Marshal Cariappa Road, 4th Stage, Rajarajeshwari Nagar, Bengaluru 560098. One listing adds "202, BEML Layout, opposite Cariappa Park". | **Confirmed**                                    | S1, S2, S3, S4, S10                                                                             |
| **Channasandra**                       | 1221, SN Plaza, B Block, Channasandra (Vishnuvardhan Road), Uttarahalli Hobli, Rajarajeshwari Nagar, Bengaluru 560098. Plus Code WG36+5JG.   | **Confirmed** as a Royal Indraprastha restaurant | S11 (restaurant listing), S12 (vegetarian restaurant with hotel), S5, S6, S13, S14, S15 (hotel) |
| Third Bengaluru outlet (Zomato says 3) | Unknown                                                                                                                                      | **Not identified**                               | Zomato's outlet page cannot be read here. Not rendered.                                         |
| Other cities                           | None found                                                                                                                                   | Not rendered                                     |                                                                                                 |

About 1.4 km separate the two confirmed outlets (by the listed coordinates).

### Cariappa Road

- Phone +91 97439 32821: confirmed (S1, S2, S3, S4).
- Closes 10:30 PM: confirmed (S1, S2, S3). Opening time conflicting (6:00, 6:30, 8:00 AM).
- Services: dine-in (confirmed), takeaway (single), banquet hall at the same address with the same phone (S4, single; capacity 150 seated, 250 standing, single).

### Channasandra

- Phone +91 80 4991 0128: single (S12). Not shown until confirmed.
- Hours: conflicting (opens 7:30 AM on S11; a listing quoted in the brief says 7 AM to 10 PM). Not shown.
- Rooms: confirmed (S5, S6, S13, S14, S15), 14 to 32 rooms depending on the listing.
- **Bar and non-vegetarian food**: S13, S14 and S15 mention a bar, a restaurant called "Shetty Lunch Home" serving seafood, and a review mentions tandoori chicken. S11 and S12 present Royal Indraprastha there as vegetarian. This is either a separate business in the same building or a booking-site error. **Not published.** Logged in `VERIFY-WITH-OWNER.md`.

## Visual identity

- No logo, signboard photo or menu card could be viewed: the brand sites, Instagram and Zomato block automated access, and the brief rules out copying platform photos.
- The name itself is the strongest brand asset. Locals find the place by its board on Cariappa Road ("opposite Cariappa Park").
- The rebuild therefore uses an original **signboard** treatment: a deep maroon panel, cream display lettering, brass rules. If the owner's board turns out to use other colours, the palette is a token swap (`src/styles/tokens.css`).

## Menu evidence

| Dish                                | Sources                  | Status                |
| ----------------------------------- | ------------------------ | --------------------- |
| Idli, vada, coffee                  | S0, S1, S2               | Confirmed             |
| Masala dosa                         | S0 (dosa varieties), S11 | Confirmed             |
| Rava idli                           | S11                      | Single                |
| Butter masala dosa, onion dosa      | S0                       | Single                |
| Rice bath                           | S2                       | Single                |
| Paneer butter masala, butter kulcha | S1                       | Single                |
| Masala puri (evening chaat)         | S0, S1                   | Confirmed             |
| Tea, badam milk, juices, milkshakes | S0, S1                   | Confirmed             |
| Mushroom grill sandwich, lime juice | S11                      | Single (Channasandra) |

No brand-published prices were found. Platform prices are not used.

## What guests value and complain about (themes only)

From review summaries on S1, S12, S14, S15:

- Valued: the range of dosas, affordable prices, quick tiffin, friendly staff, vegetarian food served late, main-road location with easy autos and cabs.
- Complaints: congested service hall at busy times, limited parking, slow service early in the morning, dust at outdoor self-service seating (Channasandra), uneven food quality on some days. Hotel guests mention hot water, AC and billing.
- What the site should answer: where exactly each branch is, which one has rooms and which has the hall, what is on the menu, how to call, how to book the hall.

## Brand brief (one page)

**Who they serve:** RR Nagar families and office-goers for breakfast and dinner; people hosting a function for 100 to 250 guests; travellers needing an inexpensive room in the south-west of the city.

**What makes them different:** two kitchens 1.4 km apart under one name, a hall at one and rooms at the other, all pure vegetarian, open from morning tiffin to 10:30 at night on Cariappa Road.

**Tone:** a neighbourhood signboard. Plain, specific and confident. Name the road, the park, the dish. Never "experience" or "journey".

**The site must make a visitor:** (1) call the right branch, (2) get directions to the right branch, (3) send a hall enquiry. Everything else supports those three.

**Avoid:** palace imagery, crowns, gold gradients, stock thalis, invented history, review scores, and anything implying alcohol or non-vegetarian food.
