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
- [ ] **OG/Twitter images = raw thumbnails** — `app/projects/[slug]/page.tsx:37,43,76`. Now point to 1200w WebP (lighter), but still declared 1200×630 while actual is ~1.26:1 portrait → previews crop. Ideal: dedicated 1200×630 OG (next/og) per project.
- [ ] **Homepage has no OG image** — `app/layout.tsx:37-43`. `twitter.card=summary_large_image` but no image → blank card sharing reza.dev. Add `app/opengraph-image.tsx`.
- [ ] **Consider downscaling detail-image source** — currently full-res (~2970px, up to ~1MB each) so the full-size click-through stays sharp. If that view isn't important, capping at ~2000px would roughly halve repo size again with no on-page impact.

---

## ♿ Accessibility

- [x] **No `prefers-reduced-motion` anywhere** (HIGH) — now handled: global CSS net in `globals.css` (neutralizes CSS animation/transition/smooth-scroll); `SmoothScroll.tsx` disables Lenis under reduce; `ParticleBackground` renders nothing under reduce; `Preloader` hides instantly under reduce; GSAP timelines in Banner/AboutMe/Skills/Experiences/Passions/ProjectList/ProjectDetails/ArrowAnimation wrapped in `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, with visible fallbacks where markup hides content (ProjectDetails title). Verified live: Lenis off, 0 particles, preloader hidden, all content visible.
  - *Remaining (lower priority):* three.js `Laptop` auto-rotation, `MatrixRain` (Konami, opt-in), `SnakeGame` (404, user-initiated) not yet motion-gated.
- [x] **Button removes focus outline, no replacement** (HIGH) — `components/Button.tsx`: added `focus-visible:ring-2 ring-primary ring-offset-2` + fill sweep now triggers on `group-focus-visible`. Verified: "Hire Me" shows green focus ring on keyboard focus.
- [ ] **Global `cursor:none` unconditional** (MED) — `app/globals.css:133-135`. Narrow-window/hybrid/keyboard users lose pointer. Scope behind `@media (min-width:768px) and (pointer:fine)`.
- [ ] **Navbar items are `<button>`+`router.push`** (MED) — `components/Navbar.tsx:119-139`. Lose href/new-tab/middle-click/copy semantics (WCAG 4.1.2/1.3.1). Use `TransitionLink`/`next/link`.
- [ ] **Overlay menu: no focus management** (MED) — `components/Navbar.tsx:39-149`. No focus trap, no Escape, no restore; closed panel stays tabbable (translate-only). Add focus trap + Escape + `role="dialog"`/`aria-modal` + `inert` when closed.
- [ ] **Lenis hijacks scroll, no opt-out** (MED) — `app/layout.tsx:57-63`. Covered by reduced-motion fix (`smoothWheel:false` under reduce).
- [ ] **About section heading is a `<p>`** (LOW) — `app/_components/AboutMe.tsx:62-64`. "Hi, I'm Reza" has no heading semantics; only major section without `<h2>`.
- [ ] **Custom cursor can't represent focus / starts invisible** (LOW) — `components/CustomCursor.tsx:14-46`. Mark SVG `aria-hidden`, reveal on `focusin`. (Mostly resolved by cursor:none scope fix.)
- [ ] **ScrollProgressIndicator not hidden from AT** (LOW) — `components/ScrollProgressIndicator.tsx:25-29`. Add `aria-hidden="true"`.
- [ ] **MatrixRain (Konami) overlay no discoverable exit / ignores reduced-motion** (LOW) — `components/MatrixRain.tsx:34-35,114-121`. Add focusable labelled Close button.
- [ ] **SnakeGame (404) hijacks arrow keys + no reduced-motion / AT status** (LOW) — `components/SnakeGame.tsx:202-219,236-238`. Scope `preventDefault` to after start, expose score via `aria-live`.

---

## 🐛 Bugs (latent / low)

- [ ] **NaN transform on non-scrollable pages** — `components/ScrollProgressIndicator.tsx:11-15`. `scrollY/0*100=NaN`. Guard `scrollableHeight > 0 ? ... : 0`.
- [ ] **Button crashes when `target=_blank` + href undefined** — `components/Button.tsx:62,72`. `props.href.toString()` throws before fallback. Use `props.href?.toString() || "#"`.
- [ ] **TransitionLink silently drops `onClick` when href present** — `components/TransitionLink.tsx:13-27`. Dead `else if` branch. Call `onClick?.(e)` near top.
- [ ] **Laptop scene crashes in cleanup if 2D context null** — `app/_components/Laptop.tsx:100,166,183,510-514`. `createMarbleMaterial()` returns undefined → cleanup throws. Return fallback material + null-guard. (Very low prob.)
- [ ] **Footer social links missing `rel="noopener noreferrer"`** — `components/Footer.tsx:17-26`. Consistency/defense-in-depth.

---

## 🎨 UX / Content

- [ ] **Preloader blocks content ~2s every full load** (MED) — `components/Preloader.tsx:11-41`. No skip, no reduced-motion bypass. Show once/session (sessionStorage) + click/keypress dismiss + skip under reduced-motion.
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

- [ ] **No canonical URLs** — `app/layout.tsx`, `app/page.tsx`, `app/projects/[slug]/page.tsx`. Add `alternates.canonical`.
- [ ] **Homepage title/description generic** — `app/layout.tsx:33-39`. 36-char desc, no keywords. Write 140-160 char keyword-rich desc + title "Reza Rahemtola - Full Stack Developer".
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
