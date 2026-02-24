# Specification

## Summary
**Goal:** Retheme the Mystic Moon with Ishita website to match the logo's blue-crystal-moon color palette and display polished service banner images (using the uploaded service card illustrations) in the Services section.

**Planned changes:**
- Update all CSS custom properties and Tailwind color tokens to use the logo's steel blue (#2b7ab5), cream/off-white background (#f5f0ea), peach-rose accent, and deep navy text — replacing any legacy purple or dark theme colors
- Apply the updated color theme consistently across all section components: Header, Hero, Services, About, Footer, ProductCatalog, Reviews, and ServicesGallery
- Generate five service card banner images (one per category: Mini Readings, Love & Relationship, Career/Money/Life, Deep & Detailed, Premium/Exclusive) combining the uploaded pentacle-hand illustration style with blue crescent moon and crystal decorative overlays from the logo
- Save generated banner images to `frontend/public/assets/generated/`
- Update the Services section to display each service card's corresponding banner image as the visual header
- Update ServicesGallery component and `serviceGalleryImages` data to reference the new generated images with correct category labels

**User-visible outcome:** The entire website uses the blue-crystal-moon color scheme from the logo, and each service category card in the Services section displays a beautifully styled banner image featuring the pentacle hand motif with blue moon and crystal decorative overlays.
