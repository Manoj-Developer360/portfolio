# Manoj Kumar V — Portfolio (React)

This is a 1:1 React.js conversion of the original static HTML/CSS/JS portfolio.
No design, layout, animation, or content was changed — only the implementation
was moved to React (Vite + functional components + hooks).

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Assets you need to add

The original project referenced these images by relative path
(`logo.png`, `Manoj.jpg`, `certificates/*.jpg`). In this Vite project,
static assets that are referenced by a plain URL path (not `import`ed)
must live in the `public/` folder so the paths keep working unchanged.

Copy your existing files into:

```
public/logo.png
public/Manoj.jpg
public/certificates/hackathon.jpg
public/certificates/web.jpg
public/certificates/symposium.jpg
public/certificates/silambam1.jpg
public/certificates/silambam2.jpg
public/certificates/silambam3.jpg
public/certificates/silambam4.jpg
public/certificates/president.jpg
public/certificates/ssm-software.jpg
public/certificates/pinnacle-labs.jpg
public/certificates/seval-software.jpg
```

Vite/CRA serve everything in `public/` from the site root, so
`public/logo.png` is reachable at `/logo.png` — exactly what the
components reference.

## EmailJS

The contact form uses the `@emailjs/browser` npm package (instead of the
CDN `<script>` tag) — same service/template/public key as before, wired up
in `src/components/Contact.jsx`. No other setup is required beyond
`npm install`.

## Structure

```
src/
  App.jsx                     — composes all sections + global scroll behavior
  App.css                     — the original style.css, unchanged
  components/
    BackgroundLayers.jsx      — grid-bg + orb decorations
    Navbar.jsx                — sticky navbar, hamburger, mobile menu
    Hero.jsx
    About.jsx
    Skills.jsx                — animated skill bars
    Experience.jsx            — timeline
    InternshipCertificates.jsx
    Projects.jsx              — 3D mouse-tilt cards
    Education.jsx
    Certifications.jsx        — multi-image cert cards
    Contact.jsx                — EmailJS form + validation
    Footer.jsx
    ScrollTopButton.jsx
    Reveal.jsx                 — generic scroll-reveal wrapper (IntersectionObserver)
    CertLightbox.jsx           — shared certificate viewer modal
    CertLightboxContext.jsx    — shared open/close state for the lightbox
```

## Behavior parity notes

Every interaction from the original `main.js` was ported 1:1:

- Sticky navbar + active-link highlighting + scroll-to-top button visibility
  → single scroll listener in `App.jsx`.
- Scroll-reveal animations (`.reveal`, `.reveal-left`, `.reveal-right`)
  → `Reveal.jsx`, using the same `IntersectionObserver` threshold (0.12) and
  "animate once" behavior.
- Skill bar fill animation on first viewport entry → `Skills.jsx`.
- 3D tilt effect on project cards (mousemove/mouseleave) → `Projects.jsx`.
- Smooth-scroll anchor links offset by `--nav-h` → global click handler in
  `App.jsx`.
- Certificate lightbox (single-image `.ic-card`s and multi-image `.cert-card`s,
  keyboard arrow navigation, Escape to close, dot navigation, download link)
  → `CertLightbox.jsx` + `CertLightboxContext.jsx`.
- Contact form validation, inline field errors, character counter, button
  loading state, success/error banners, auto-reset after 4s →
  `Contact.jsx` (React state instead of direct DOM manipulation).
