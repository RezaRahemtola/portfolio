# Portfolio Audit & Optimization Backlog

Source: multi-dimension static audit workflow (52 agents, all findings adversarially verified → 40 confirmed) + live Playwright testing (desktop/mobile, home, project pages, 404). Dev server: 0 runtime console errors.

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## 🔴 High-impact

### Images
- [x] **Oversized source images** — converted all project images/thumbnails PNG/JPG → **WebP q95, full resolution kept** (full-size click-through stays sharp); thumbnails capped at 1200w (q92) for OG. Resized `gcloud.png`/`python.png` to 256px (rendered 40px). `public/projects` **~22MB → 4.5MB**. Removed orphan `polymarket-trading-bot.png`. *(commit pending)*
- [x] **`next/image` config** — `next.config.ts` now sets `formats: ['image/avif','image/webp']` (AVIF on) + `qualities: [75, 90]`.
- [x] **Delivery quality** — project `<Image>` now `quality={90}` (was next default 75), the main on-page quality lever. Source q95 + delivery q90 = visually lossless, verified live.
- [x] **Image aspect-ratio warnings** (project thumbnails) — `app/_components/Project.tsx`: added `h-auto` + matched intrinsic height (400×267 = 3:2). All 4 thumbnail warnings gone.
- [x] **Aspect-ratio warning: About photos** — `app/_components/AboutMe.tsx`. Declared intrinsic dims (500×500, 1170×610) + `w-[...] h-auto` so the ratio matches the file exactly. Homepage now 0 console warnings.
- [x] **OG/Twitter images** — homepage uses the full-bleed photo `/about/reza_full.jpeg` (1170×610 ≈ 1.91:1) set in `app/layout.tsx`; project pages use their own thumbnail (`app/projects/[slug]/page.tsx`, no fake dimensions this time). Verified via prod SSR: home → reza_full.jpeg, projects → thumbnail webp, both with `summary_large_image`.
  - *Note:* some thumbnails are portrait/square (e.g. creaitors 1200×1500, solva 776×868) and will be cropped/letterboxed in the 1.91:1 social slot. Acceptable per preference to "use the thumbnail"; revisit if a uniform crop is wanted.
- [ ] **Consider downscaling detail-image source** — currently full-res (~2970px, up to ~1MB each) so the full-size click-through stays sharp. If that view isn't important, capping at ~2000px would roughly halve repo size again with no on-page impact.

---

## ♿ Accessibility

- [x] **No `prefers-reduced-motion` anywhere** (HIGH) — now handled: global CSS net in `globals.css` (neutralizes CSS animation/transition/smooth-scroll); `SmoothScroll.tsx` disables Lenis under reduce; `ParticleBackground` renders nothing under reduce; `Preloader` hides instantly under reduce; GSAP timelines in Banner/AboutMe/Skills/Experiences/Passions/ProjectList/ProjectDetails/ArrowAnimation wrapped in `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, with visible fallbacks where markup hides content (ProjectDetails title). Verified live: Lenis off, 0 particles, preloader hidden, all content visible.
  - *Remaining (lower priority):* three.js `Laptop` auto-rotation, `MatrixRain` (Konami, opt-in), `SnakeGame` (404, user-initiated) not yet motion-gated.
- [x] **Button removes focus outline, no replacement** (HIGH) — `components/Button.tsx`: added `focus-visible:ring-2 ring-primary ring-offset-2` + fill sweep now triggers on `group-focus-visible`. Verified: "Hire Me" shows green focus ring on keyboard focus.
- [ ] **Global `cursor:none` unconditional** (MED) — `app/globals.css:133-135`. Narrow-window/hybrid/keyboard users lose pointer. Scope behind `@media (min-width:768px) and (pointer:fine)`.
- [x] **Navbar items are `<button>`+`router.push`** (MED) — `components/Navbar.tsx`. Menu items are now `next/link` `<a href>` (real link semantics) that close the menu on click. Verified: 8 anchors, "Projects" navigates to `/#projects-showcase`.
- [x] **Overlay menu: no focus management** (MED) — `components/Navbar.tsx`. Added `inert` when closed (closed panel no longer tabbable), focus moves into panel on open + Tab trap, Escape closes and restores focus to the toggle, plus `role="dialog"`/`aria-modal`/`aria-label` and `aria-controls` on the toggle. Verified via Playwright (closed=inert+focus blocked, open=focus inside, Escape=closed+focus on toggle).
- [ ] **Lenis hijacks scroll, no opt-out** (MED) — `app/layout.tsx:57-63`. Covered by reduced-motion fix (`smoothWheel:false` under reduce).
- [ ] **About section heading is a `<p>`** (LOW) — `app/_components/AboutMe.tsx:62-64`. "Hi, I'm Reza" has no heading semantics; only major section without `<h2>`.
- [ ] **Custom cursor can't represent focus / starts invisible** (LOW) — `components/CustomCursor.tsx:14-46`. Mark SVG `aria-hidden`, reveal on `focusin`. (Mostly resolved by cursor:none scope fix.)
- [ ] **ScrollProgressIndicator not hidden from AT** (LOW) — `components/ScrollProgressIndicator.tsx:25-29`. Add `aria-hidden="true"`.
- [ ] **MatrixRain (Konami) overlay no discoverable exit / ignores reduced-motion** (LOW) — `components/MatrixRain.tsx:34-35,114-121`. Add focusable labelled Close button.
- [ ] **SnakeGame (404) hijacks arrow keys + no reduced-motion / AT status** (LOW) — `components/SnakeGame.tsx:202-219,236-238`. Scope `preventDefault` to after start, expose score via `aria-live`.

---

## 🐛 Bugs (latent / low)

- [x] **NaN transform on non-scrollable pages** — `components/ScrollProgressIndicator.tsx`. Guarded `scrollableHeight > 0 ? … : 0`. Verified: 404/short page bar now `translateY(-100%)`, no `NaN`.
- [x] **Button crashes when `target=_blank` + href undefined** — `components/Button.tsx`. Now `props.href?.toString() || "#"`.
- [x] **TransitionLink silently drops `onClick` when href present** — `components/TransitionLink.tsx`. `onClick?.(e)` now called first, unconditionally. Verified nav + back still work.
- [x] **Footer social links missing `rel="noopener noreferrer"`** — `components/Footer.tsx`. Added.
- [ ] **Laptop scene crashes in cleanup if 2D context null** — `app/_components/Laptop.tsx:100,166,183,510-514`. `createMarbleMaterial()` returns undefined → cleanup throws. Return fallback material + null-guard. (Very low prob; left for a Laptop-focused pass.)

---

## 🎨 UX / Content

- [x] **Preloader blocks content ~2s every full load** (MED) — `components/Preloader.tsx`. Now plays once per session (sessionStorage `preloaderShown`), dismissable via click or Escape, and skipped under reduced motion. Verified: first visit plays → flag set; second load skips; Escape hides instantly.
- [ ] **Chess stat shows permanent "..." if chess.com fails** (LOW) — `app/_components/Passions.tsx:48,146`, `lib/getChessStats.ts:31-34`. (Live: API works, Elo 1342 ✓.) Add baseline/last-known fallback.
- [ ] **404 page: no visible "back home" CTA** (LOW, live) — only hamburger. Snake is arrow-key-only → unplayable on touch.
- [ ] **Project card tech stack silently truncated to 3** (LOW) — `app/_components/Project.tsx:124-131`. DocTripper has 7. Add `+{n-3} more` chip.
- [ ] **"Hire Me" mailto uses `target=_blank`** (LOW) — `app/_components/Banner.tsx:58-67`. Orphan tab; inconsistent with Footer/StickyEmail. Drop `target=_blank`, align all three.
- [ ] **Project-card external-link arrow only on hover** (LOW) — `app/_components/Project.tsx:23-71,81-83`. Touch can't discover. Reveal on `focus-visible`/persistently below md.
- [ ] **Copy: "turning ideas to realities"** (LOW) — `app/_components/Banner.tsx:55-56`. → "into reality".
- [ ] **Inconsistent date formats** (LOW) — `lib/data.ts:189-210`. "June 2024" vs "Jul 2023", mixed within "Feb 2024 - June 2024". Standardize abbreviated.

---

## ⚡ Performance (med/low)

- [ ] **three.js Laptop builds ~4,600 individual meshes** (MED) — `app/_components/Laptop.tsx:165-321,393-466`. Use `THREE.InstancedMesh` → ~6 draw calls.
- [ ] **ParticleBackground = up to 100 animated DOM nodes every route** (MED) — `app/layout.tsx:70`, `components/ParticleBackground.tsx:35,130-140`. Move to canvas / gate `useIsDesktop` / pause on `document.hidden` / limit to home.
- [ ] **Home section components are `'use client'` only for scroll anims** (LOW) — AboutMe/Skills/Experiences/Passions/ProjectList/Banner. Extract animation into thin client child, keep markup server-side.
- [ ] **ScrollProgressIndicator scroll listener unthrottled + reads layout each event** (LOW) — `components/ScrollProgressIndicator.tsx:7-23`. Coalesce with rAF, cache dims via ResizeObserver.
- [ ] **Laptop disposal disposes shared geometries/materials repeatedly** (LOW) — `app/_components/Laptop.tsx:510-514`. Collect uniques in a Set, dispose once.

---

## 🔍 SEO (low)

- [x] **No canonical URLs** — added `alternates.canonical` to homepage (`/` in `app/layout.tsx`) and project pages (`/projects/<slug>` in `app/projects/[slug]/page.tsx`). Verified via prod SSR.
- [x] **`Person` JSON-LD image** — added `image: https://reza.dev/about/reza.jpeg` to the existing homepage Person schema (`app/page.tsx`). (Person + WebSite JSON-LD were already present.)
- [~] **Homepage title/description generic** — `app/layout.tsx:33-39`. Intentionally left as-is per preference (not changing the title/description).
- [ ] **Missing BreadcrumbList structured data on project pages** — `app/projects/[slug]/page.tsx:66-77`. Add 2-level Home → project.
- [ ] **No app icons beyond favicon.ico** — add `app/icon.png` (512), `app/apple-icon.png` (180).

---

## 🧹 Maintainability (low)

- [ ] **Experiences list React key uses `item.title`** — `app/_components/Experiences.tsx:60-61`. Collision risk (two internships). Use composite `${company}-${title}` or `id`.
- [ ] **Orphan asset** — `public/projects/thumbnail/polymarket-trading-bot.png` (1MB, not referenced). Delete.

---

## ✅ Already solid

Markdown content-negotiation (`Accept: text/markdown` ✓), modern `robots.txt` Content-Signal, clean sitemap, proper h1/heading hierarchy, alt text on all images, mobile nav drawer, three.js desktop-gated, build passes, zero console errors.
</content>
</invoke>
