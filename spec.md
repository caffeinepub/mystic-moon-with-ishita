# Specification

## Summary
**Goal:** Add trust, social proof, and engagement/retention features to the Mystic Moon Crystal Shop, including reviews, related products, a customer photo gallery, daily crystal recommendation, a crystal quiz, a loyalty points system, and a newsletter signup.

**Planned changes:**
- Add customer reviews and star ratings (reviewer name, date, rating, text) to each product, sourced from an extended static reviews data file linked by product ID, with an average rating display and a placeholder when no reviews exist
- Add a "Customers Also Bought" related products section per product showing 2–3 products of the same type, with image, name, price, and a click-to-scroll behavior
- Add an "Our Happy Customers" Instagram-style photo gallery section in a grid/masonry layout using 6 placeholder unboxing images, with hover overlay (heart/sparkle icon) and a "Follow us on Instagram" link
- Add a "Crystal of the Day" section on the homepage that rotates the featured crystal daily using the current date as a seed, showing crystal image, name, short intention/description, and a "Shop Now" CTA that scrolls to the product
- Add a "Find Your Perfect Crystal" quiz with 3–5 questions (zodiac, mood, intention), recommending 1–2 matching crystals with image, name, price, a "Shop This Crystal" button, and a retake option
- Add a "Moonlight Points" loyalty points UI (header badge or floating widget) that awards points for wishlist additions, quiz completions, and page engagement, persisted in localStorage, with a message showing points needed for the next reward
- Add a newsletter signup section (banner above footer or timed pop-up after 15 seconds) with name and email fields, a success message showing discount code "MOON10", email validation, localStorage tracking to suppress repeat pop-ups, and backend storage of submitted emails

**User-visible outcome:** Visitors can read and browse product reviews, discover related products, explore a customer photo gallery, get a daily crystal recommendation, take a quiz to find their perfect crystal, track loyalty points, and sign up for a newsletter discount — all within the existing site design.
