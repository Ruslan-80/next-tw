# Design Manifest: SOVEREIGN INDUSTRIAL (Industrial Aesthetic for ElectroShitPro)

This is the central source of truth for the visual token layer, geometric specifications, and typography behavior. All UI and frontend layout updates must match this documentation precisely.

---

## 🎨 1. Color Palette (Tailwind CSS v4 Spec)

- **Background Layers:**
  - Deep Base Page Background: `#0d121d` (utility class syntax: `bg-[#0d121d]`)
  - Content Cards / Industrial Functional Blocks: `#131a26` (utility class syntax: `bg-[#131a26]`)
  - Elevated Popovers / Dropdowns / Context Menus: `#1b2332` (utility class syntax: `bg-[#1b2332]`)
  - Input Fields / Data Entry Surfaces: `#1b2332` (utility class syntax: `bg-[#1b2332]`)

- **Border Treatments (Precision Machined Lines):**
  - Neutral Static State Boundary: `rgba(255, 255, 255, 0.08)` (utility class syntax: `border-[rgba(255,255,255,0.08)]`)
  - Active Interactive Hover State / Focused Grid: `#2a3342` (utility class syntax: `border-[#2a3342]`)
  - Interactive Focus / High Accent Indicators: `#d4af37` (Gold token)

- **Core Accents & Heavy Brass Gradients:**
  - Base Gold Accent: `#d4af37` (utility class syntax: `text-[#d4af37]`)
  - Light Gold Highlights: `#f3d489`
  - Dark Gold Underlay: `#aa842c`
  - Primary CTA Contained Gradient: `bg-gradient-to-r from-[#f3d489] via-[#d4af37] to-[#aa842c]`
  - Hover CTA Gradient Interpolation: `hover:from-[#ffe3a3] hover:via-[#e5c14f] hover:to-[#bc9539]`
  - Outlined Accent Border: `border-[#d4af37] text-[#f3d489] hover:bg-[#d4af37]/10`

- **Typography Tone & Contrast:**
  - High Contrast Main Content / Headers: `#ffffff`
  - Secondary Content / Subtitles / Descriptive text: `#94a3b8` (Slate 400)
  - Muted Captions / Peripheral Metadata: `#57657a`

---

## 📐 2. Geometry, Padding, & Spacing Grid (8px Base System)

- **Control Sizing Specifications:**
  - Primary Target / Hero Action Buttons: Maintain a rigid height of `52px` (utility class: `h-[52px]`).
  - Secondary Action Items / Filter Controls / Cards: Maintain a standard height of `44px` (utility class: `h-11`).
  - Button Typography: Must be structured as Semi-bold, Uppercase, with extended letter spacing (utility classes: `font-semibold uppercase tracking-wider text-[14px]`).
  - Inputs & Textareas: Standard height of `48px` (utility class: `h-12`).

- **Component Radii (Strict Border Radius System):**
  - Micro Items (Checkboxes, status tags, pagination arrows): `4px` (utility class: `rounded-[4px]` or `rounded-sm`).
  - Action Items (Standard Buttons, Input fields, active pagination steps): `8px` (utility class: `rounded-[8px]` or `rounded-md`).
  - Container Blocks (Product cards, functional segments, project preview frames): `12px` (utility class: `rounded-[12px]` or `rounded-lg`).
  - Major Layout Containers (Lead generation forms, modal panel sheets): `16px` (utility class: `rounded-[16px]` or `rounded-xl`).

- **Surface Shadows & Elevation Rules:**
  - **CRITICAL LOGIC:** ZERO soft box-shadows are permitted on structural content cards. Content division must occur entirely through rigid 1px solid boundaries (`border border-[rgba(255,255,255,0.08)]`) and distinct shifts in background darkness.
  - **EXCEPTION:** Active interactive blocks or focused input forms may use an industrial glow effect: `shadow-[0_0_15px_rgba(212,175,55,0.15)] border-[#d4af37]`.

- **Layout Spacing Multiples:**
  - Compact padding / Internal labels: 8px (`p-2`)
  - Component standard boundaries / Card paddings: 16px (`p-4`)
  - Section dividers / Inter-element gaps: 24px (`p-6`)

---

## 🔤 3. Typography & String Hierarchies (Roboto Stack)

- **Font Family:** Strictly use the **Roboto** font stack for all interfaces (Weights: 400, 500, 600, 700).

- **Hierarchy Layout:**
  - **H1 (Hero Headers):** `text-[32px]` on mobile / `text-[42px]` on desktop, `font-bold`, compressed letter spacing (`tracking-tight`), `leading-1.2`.
  - **H2 (Section Titles):** `text-[24px]` on mobile / `text-[32px]` on desktop, `font-semibold`, `leading-1.3`.
  - **H3 (Product Titles / Card Headers):** `text-[20px]`, `font-semibold`, `leading-1.4`.
  - **Body Primary (Text / Filters):** `text-[16px]`, `font-normal` or `font-medium`, `leading-1.5`.
  - **Micro Metadata & Status Badges:** `text-[11px]` or `text-[14px]`, uppercase transform, extended letter spacing (`tracking-widest`).

---

## ⚡ 4. Interface Performance & Transitions

- Micro-interactions, hover triggers, and color interpolations must execute with smooth but immediate crispness: strictly 250ms duration using engineered ease curves (utility classes: `transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]`).

- Avoid loose, bouncy, elastic, or slow transitional physics. The interface layouts must always resemble a heavy, meticulously calibrated piece of industrial equipment with sharp, tactile responses.
