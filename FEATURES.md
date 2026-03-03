# Advanced Features Overview

This document enumerates the **premium, interactive, and responsive features** that have been implemented in the `index.html` invitation page located in the `invite` folder.

---

## 1. Visual Design Foundations

- **CSS Custom Properties (Variables)** – Central colour palette (`--primary`, `--secondary`, `--accent`, `--text`, `--glass`, `--border`).
- **Glassmorphism Card** – The main card uses a semi‑transparent background (`var(--glass)`) with `backdrop-filter: blur(20px)` for a frosted‑glass effect.
- **Gradient Shimmer Text** – `.shimmer‑text` applies a moving linear‑gradient background that animates via `@keyframes shine` to create a radiant text effect.
- **Dynamic Highlight** – `.highlight::after` adds a subtle coloured underline that follows the highlighted text.
- **Responsive Typography** – Font sizes scale down for screens ≤ 600 px (e.g., `.shimmer‑text` from 4 rem to 2.5 rem).

---

## 2. Interactive & Animated Effects

| Feature | Description | Implementation Highlights |
|---|---|---|
| **Parallax Background** | Background image moves slightly with mouse / touch, creating depth. | `updateParallax()` calculates offsets and applies `transform: scale(1.1) translate(...)` to `#parallaxBg`. Touch support via `touchmove`. |
| **Card Tilt on Desktop** | The invitation card tilts in 3‑D when the cursor moves, but only on screens wider than 768 px. | Conditional check `window.innerWidth > 768` inside `updateParallax()`. |
| **Confetti Cannon** | Randomly generated coloured confetti pieces fall from the top. | `createConfetti()` creates 50 `<div class="confetti">` elements with random size, colour, animation `fall`. Interval every 4 s, plus an initial burst. |
| **Floating Emojis** | Emoji icons drift upward and rotate, adding a playful vibe. | `spawnEmoji()` creates `<div class="floating-emoji">` with random left position and animation duration. Runs every 1.5 s. |
| **Fireworks Canvas** | Subtle particle‑based fireworks rendered on a full‑screen `<canvas>`. | Canvas context draws `Particle` objects (position, velocity, colour, alpha). Particle count limited to 15 on mobile for performance. |
| **Card Entrance Animation** | The card fades and slides into view on page load. | `@keyframes fadeInCard` animates `opacity` and `transform` from `translateY(50px) rotateX(-5deg)`. |
| **Text Slide‑In** | Sub‑titles slide from the left with a delay. | `@keyframes slideLeft` applied to `h2.subtitle` with `animation-delay: 0.8s`. |
| **Paragraph Fade‑In** | Each paragraph fades upward sequentially. | `.letter‑paragraph` uses `@keyframes fadeInUp` with staggered `animation-delay` (1.2 s, 1.5 s, …). |
| **Joke Container Hover** | Slight scaling and shadow boost on hover. | `.joke-container:hover` applies `transform: scale(1.03) rotateZ(-1deg)` and a stronger box‑shadow. |
| **Bounce Animation for Final Wish** | The final wish text bounces continuously. | `@keyframes bounce` cycles through translateY values (0 %, 20 %, 40 %, 60 %, 80 %, 100 %). |

---

## 3. Responsive Optimizations

- **Media Query (`max-width: 600px`)** adjusts paddings, font sizes, and card dimensions for mobile devices.
- **Background Filter Tweaks** – On mobile the background blur is reduced (`blur(2px) brightness(0.8)`) and the image is slightly smaller to keep content readable.
- **Particle Count Limiting** – Firework particles drop to 15 on narrow screens to preserve performance.
- **Horizontal Scroll Prevention** – `body { max-width: 100vw; overflow-x: hidden; }` stops accidental side‑scroll on mobile browsers.

---

## 4. Performance & Accessibility Considerations

- **Passive Touch Listener** – `touchmove` is registered with `{ passive: true }` to avoid scroll‑jank.
- **CSS‑Only Animations** – All visual effects rely on CSS `transform` and `opacity`, which are GPU‑accelerated.
- **Reduced Motion on Mobile** – The card tilt is disabled on screens ≤ 768 px, preventing heavy calculations on low‑power devices.

---

## 5. Asset Management

- **Background Image** – `unnamed.jpg` is used as the full‑screen parallax background.
- **Google Fonts** – `Amatic SC`, `Varela Round`, and `Rubik` are loaded via the Google Fonts API for premium typography.

---

*This documentation can serve as a reference for future enhancements, debugging, or hand‑off to other developers.*
