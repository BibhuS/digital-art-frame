Current state: the portfolio has a strong hero, command palette, theme toggle, blog, and project detail pages. The next layer of polish is around navigation, motion, discoverability, and SEO.

Planned improvements:

1. Scroll-reveal animations
   - Wrap each major section in a reusable `<Reveal>` component that fades/slides up as it enters the viewport.
   - Use Intersection Observer with `prefers-reduced-motion` respect.

2. Animated stat counters in the hero
   - Turn "13+", "9+", "6", "4" into counting-up numbers on first view.
   - Keep the current stat strip layout; only add motion.

3. Back-to-top button
   - Appears after scrolling past the hero.
   - Smooth-scrolls to `#top`.

4. Mobile navigation drawer
   - Replace the hidden desktop-only nav on small screens with a hamburger menu + slide-out drawer.
   - Include all nav links + the ⌘K trigger and theme toggle.

5. SEO `head()` for blog and project routes
   - Add unique titles, descriptions, Open Graph tags, and canonical paths to `/blog`, `/blog/:slug`, and `/projects/:slug`.
   - Blog posts use the post title + excerpt; projects use title + body.

6. Site footer
   - Add a footer with sitemap links, social links, copyright, and a "built with" credit.
   - Keeps the single-page feel while improving crawlability and professionalism.

7. Theme-toggle attribute fix
   - Add `data-theme-toggle` so the toggle is programmatically detectable and consistent with other interactive elements.

8. Visible command-palette trigger on mobile
   - Show a search icon in the mobile header that opens the palette.

No new dependencies are required. All changes stay within existing components and routes.