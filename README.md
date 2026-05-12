# 🚀 Harsh Shrivastava - Portfolio Website

A premium, ultra-high-performance portfolio website built with a focus on cinematic fluidity, advanced glassmorphism, and hardware-accelerated animations. Inspired by the design aesthetics of modern SaaS giants like Apple, Linear, and Vercel.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Core** | HTML5, CSS3 (Vanilla), JavaScript (ES6+) |
| **Animations** | GSAP (GreenSock), ScrollTrigger, ScrollToPlugin |
| **Interactions** | Vanilla-Tilt.js, Typewriter.js |
| **Visuals** | HTML5 Canvas (Fluid Background), FontAwesome 6 |
| **Typography** | Google Fonts (Outfit, Inter) |

---

## ✨ Key Features

### 1. 🌌 Cinematic Hero Background
- **Dynamic Fluid Ribbons**: A custom-built HTML5 Canvas engine that renders procedural, physics-based waves that react to mouse movement and scroll position.
- **Ambient Particles**: Procedurally generated "glass" particles that drift across the screen with interactive parallax depth.
- **Adaptive Performance**: Automatically scales particle density and animation complexity based on the device's capabilities (Mobile vs. Desktop).

### 2. 💎 Premium Glassmorphism UI
- **Layered Depth**: Extensive use of `backdrop-filter: blur()` and semi-transparent `rgba` surfaces to create a sense of verticality and focus.
- **Dynamic Glows**: Interactive ambient glow effects that track the cursor and highlight section transitions.
- **Optimized Rendering**: Blurs are capped at 8px to ensure high FPS even on mobile GPUs while maintaining visual fidelity.

### 3. 🖱️ 3D Interactive Components
- **Vanilla Tilt**: Project and Certificate cards feature physical tilt physics with real-time glare effects.
- **Mouse Tracking**: Parallax-aware "About" cards that shift in 3D space based on cursor proximity, optimized with `requestAnimationFrame`.

### 4. 📈 Animation System (GSAP)
- **Scroll-Triggered Reveals**: Sophisticated stagger animations for all cards and sections, ensuring content flows smoothly as the user explores.
- **Staggered Text Reveal**: Headings utilize a custom "letter-reveal" logic that animates individual characters for a premium "Apple-style" appearance.
- **Smooth Navigation**: Global inertia-based smooth scrolling for internal anchor links.

---

## 🚀 Performance Optimizations

This project was built with a **performance-first** mindset to achieve a "buttery smooth" 60+ FPS experience:

- **GPU Hardware Acceleration**: Critical elements utilize `translate3d(0,0,0)` and `will-change` to offload rendering to the dedicated graphics card.
- **Event Throttling**: Mouse and scroll listeners are optimized via `passive: true` and `requestAnimationFrame` to prevent main-thread blocking.
- **Zero Layout Thrashing**: Animations are strictly limited to `transform` and `opacity` properties, avoiding expensive browser "reflows."
- **Lifecycle Management**: An `IntersectionObserver` automatically pauses the Hero Canvas when it’s off-screen, saving system resources for active content.
- **Asset Optimization**: All images utilize `loading="lazy"` and `decoding="async"` to prioritize core content rendering.

---

## 📂 Section Breakdown

- **Hero**: Atmospheric intro with a custom Typewriter effect and interactive fluid background.
- **About**: A responsive 2x2 feature grid with a high-end glassmorphic stats bar.
- **Skills**: A filtered interactive grid allowing users to sort by Tech Stack, Tools, or Soft Skills.
- **Projects**: Detailed showcase cards with expand/collapse descriptions and hover overlays.
- **Education & Timeline**: A vertical cinematic timeline illustrating academic and professional milestones.
- **Certificates**: 3D-tilt enabled cards for professional credentials.
- **Contact**: A secure, modern glassmorphism form with interactive validation and visual feedback.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```
2. **Open index.html**
   Simply open the `index.html` file in any modern browser. No build process required!

---

## 👨‍💻 Developed By
**Harsh Shrivastava**
*Aspiring Software Engineer specialized in Web Development & SAP.*

---
*Inspired by the future of the web.*
