# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Copilot, Cursor, Codex, and others) when working with code in this repository.

> **CRITICAL INSTRUCTION:** Prioritize the "Best Practices & Standards" listed below for all new development and refactoring. If existing code does not conform to these standards, you should align any modified code with them.

## Project Overview

A personal portfolio website showcasing projects and utilized technologies, featuring smooth scrolling, interactive animations, and a 2D physics engine. The application serves as an interactive experience built with modern frontend frameworks and libraries.

## Core Commands

| Task                     | Command                                                                      |
| ------------------------ | ---------------------------------------------------------------------------- |
| Install deps             | `npm install`                                                                |
| Start dev server         | `npm run dev`                                                                |
| Type-check               | `npx tsc --noEmit` (or `npx tsc -b`)                                         |
| Lint                     | `npm run lint`                                                               |
| Auto-fix lint            | `npx eslint . --fix`                                                         |
| Build                    | `npm run build`                                                              |
| Preview production build | `npm run preview`                                                            |
| Test                     | _No test runner configured in this repository (Vitest recommended if added)_ |

Always run type-check (`npx tsc --noEmit`) + lint (`npm run lint`) before considering a task done.

## Tech Stack

- **Framework:** React 18.3.1 (Functional components + hooks only)
- **Language:** TypeScript 5.6.2 (strict mode — do not use `any` to bypass errors)
- **Build tool:** Vite 6.0.3 (using SWC plugin `@vitejs/plugin-react-swc`)
- **Styling:** Tailwind CSS 3.4.17 + PostCSS + Autoprefixer
- **Animation:** GSAP 3.12.5 + `@gsap/react` 2.1.1 (scroll triggers, timelines, text effects)
- **Physics:** Matter.js 0.20.0 (2D physics simulation with custom sprites)
- **Smooth scroll:** Lenis 1.1.18

## Project Structure

```text
src/
  components/         # Reusable UI components
    About.tsx         # About section containing the Matter canvas and horizontal scrolling
    Contact.tsx       # Contact section with interactive elements and TextPlugin animations
    Cursor.tsx        # Custom cursor follower with hover states and image preview effects
    Header.tsx        # Navigation header
    Hero.tsx          # Hero section with large typography and intro animations
    Loading.tsx       # Initial screen load transition overlay
    Matter.tsx        # Matter.js canvas rendering interactive/falling physics pills
    Technologies.tsx  # Technologies grid/skills layout with ScrollTrigger transitions
    Works.tsx         # Selected works slider and preview list
  Context.tsx         # React context definition for managing global app/animation state
  ContextProvider.tsx # React context provider initializing Lenis and global window resize checks
  useMyContext.ts     # Hook to access shared context state (Lenis instance, hover states, mobile flags)
  App.tsx             # Main page layout wrapper, coordinates Cursor, Loading, and page sections
  main.tsx            # React application entry point (binds to #root)
  index.css           # Global stylesheet containing Tailwind directives and base styles
public/               # Static assets (contains pill sprites under /pills/)
```

---

## Best Practices & Standards

### 1. Code Style & Architecture

- **Component Pattern:** Function components + hooks only, no class components.
- **Exports:** Prefer named exports (`export const Component = ...`) rather than default exports for better IDE tooling, import refactoring, and auto-completion.
- **File Organization:** One component per file. For styling, use Tailwind CSS utility classes directly.
- **Linting & Formatting:** Governed by `eslint.config.js`. Do not disable lint rules or use `@ts-ignore` / `any` unless absolutely unavoidable.
- **Path Aliases (Vite/TS):** The project uses the `@/` path alias to map to the `src/` directory (e.g., `import { ... } from '@/components/...'`). **Always use this alias** for all imports originating within `src/` to ensure clean, maintainable, and robust paths. Do not use relative paths (e.g., `../..`) unless importing files outside of `src/`.

### 2. GSAP Conventions

- **Centralized Plugin Registration:**
  - _Standard:_ All GSAP plugins (like `ScrollTrigger`, `TextPlugin`, `SplitText`) are registered centrally in `src/gsap-setup.ts`, which is imported in `src/main.tsx`. Do NOT register plugins in individual component files.
- **React Lifecycle Integration:**
  - Always use the `useGSAP()` hook from `@gsap/react` instead of raw `useEffect` for all GSAP code in components; it automatically handles context scoping, cleanup, and prevents memory/animation leaks.
  - Always pass a `scope` (ref to container element) in the `useGSAP` config to ensure selectors are scoped locally and do not leak to/interfere with other components.
  - Sequenced animations should prefer timelines (`gsap.timeline()`) rather than chained tweens.
  - Explicitly kill/revert ScrollTrigger instances on unmount if they are created dynamically outside a `useGSAP` scope.

### 3. Matter.js Conventions

- **Separation of Concerns (Best Practice):**
  - _Standard:_ Keep physical body creation and complex engine updates outside of React component rendering. Use factory utilities or helper files (e.g. `src/utils/physics.ts` or custom hooks) to construct bodies rather than defining inline object properties in components.
- **Cleanup & Memory Management:**
  - Matter.js does not garbage-collect its own rendering and update loops.
  - On component unmount, **always** clean up all Matter.js constructs: call `Runner.stop(runner)`, `Render.stop(render)`, `Engine.clear(engine)`, and remove all bodies/constraints from the `Composite`.
- **Performance & Asset Loading:**
  - Use `AbortController` signals to cancel asynchronous asset loads (like loading and decoding image sprites for pills) if the component unmounts mid-load.
  - Run the update loop using Matter's standard `Runner` rather than custom `setInterval` loops.
- **Interaction Rules:**
  - If Matter.js and GSAP are both managing aspects of the same visual element, clearly define which technology controls which properties (e.g. GSAP handles canvas container position; Matter.js handles the canvas elements' physics inside it). Do not let both drive positions of the same DOM node simultaneously.

### 4. Lenis (Smooth Scroll) Conventions

- **VSync & Frame Synchronization (Best Practice):**
  - _Standard:_ To avoid frame fighting, stuttering, and scroll lag, **sync Lenis with GSAP's ScrollTrigger**.
  - Instead of running a separate `requestAnimationFrame` loop, use GSAP's ticker to drive Lenis updates.
  - Add `lenis.on('scroll', ScrollTrigger.update)` to update GSAP ScrollTrigger whenever Lenis scrolls.
  - Connect Lenis to the GSAP ticker:

    ```javascript
    gsap.ticker.add(time => {
      lenis.raf(time * 1000); // Convert seconds to milliseconds
    });
    // Disable GSAP lag smoothing to keep scrolling perfectly responsive
    gsap.ticker.lagSmoothing(0);
    ```

- **Lifecycle & Lifecycle Cleanups:**
  - Initialize Lenis once globally in the layout provider (`src/ContextProvider.tsx`) rather than per-page.
  - Always call `lenis.destroy()` on unmount to prevent duplicate scroll listeners and memory leaks.

### 5. Tailwind CSS & Styling Conventions

- **Design Tokens:**
  - Custom design tokens (colors, spacing, typography, fonts) must be declared in `tailwind.config.js`. Do not use arbitrary values like `w-[330px]` or `bg-[#f8f8ff]` if they correspond to system design tokens (like `bg-light`).
  - **Always prefer `rem` or relative units** for all spacing, padding, margin, and typography. Avoid fixed pixel values (e.g., `px`) to ensure dynamic, responsive formatting.
- **Inline Styling Preference:**
  - Always apply Tailwind utility classes directly to elements in JSX.
  - Avoid creating or modifying CSS files (`index.css`) for component-specific styling.
  - Only use `@apply` in `index.css` for absolute base/global styles, never for component-level styling.
  - Prioritize responsive layouts via Tailwind's standard modifiers (`sm:`, `md:`, `lg:`).

---

## Boundaries — What agents should NOT do

- **No Secrets:** Never commit `.env` files, API keys, credentials, or secrets.
- **No Routine Production Builds:** Do not run `npm run build` repeatedly during iterative development. Use `npx tsc --noEmit` and `npm run lint` for validation, reserving `build` only for final deployment verification.
- **No Unvetted Dependencies:** Do not add new CSS packages, animation libraries, physics packages, or state managers without explicit explanation and permission. The current stack (GSAP + Matter.js + Lenis) is fully sufficient.
- **Configuration Constraints:** Do not modify key configs (`vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `eslint.config.js`) unless doing so to configure best practices (like path aliases or registering ESLint plugins) and with detailed explanation.

