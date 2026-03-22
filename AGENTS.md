# Development Workflow & Patterns

This document captures patterns, decisions, and lessons learned during development of the Zine Component Library.

## Build After Significant Changes

Always run the build after making significant changes to `src/styles.css` or `tailwind.config.js`:

```bash
npm run build
```

This compiles `src/styles.css` → `dist/styles.css`. The demo page loads from `dist/`, so changes won't appear until the
build runs. Use `npm run watch` during active development to rebuild automatically on save.

## Run Prettier Regularly

Run Prettier periodically during development and always before finishing a session:

```bash
npx prettier --write .
```

This formats all CSS, HTML, JS, and Markdown files consistently per `.prettierrc.yaml` (120-char line width, prose wrap
for Markdown).

## Important Lessons: Common Mistakes & Corrections

### 1. Don't Use @apply in Inline <style> Tags

**The Mistake:** In Tailwind v4, `@apply` doesn't work at all. I attempted to use it in inline `<style>` tags for the
demo page:

```css
/* ❌ This won't work */
<style>
  body {
    @apply bg-black text-gray-900;
  }
</style>
```

**Why It Failed:** Tailwind v4 removed the `@apply` directive entirely. Inline styles are processed as plain CSS, not
Tailwind directives.

**The Fix:** Use plain CSS properties instead:

```css
/* ✅ Correct */
<style>
  body {
    background-color: black;
    color: #111827;
  }
</style>
```

**Takeaway:** In Tailwind v4, never use `@apply` anywhere. Use CSS variables (`var()`) or plain CSS properties. This is
especially important for inline styles that won't go through Tailwind's processing.

### 2. Always Import New Google Fonts Explicitly

**The Mistake:** I added two new fonts to `tailwind.config.js` (Erica One, Climate Crisis) for the music-bold article
style, but forgot to add them to the Google Fonts import URL in `src/styles.css`. Result: The fonts never rendered—
browsers fell back to system fonts.

**Why It Happened:** There are two separate configurations:

1. `tailwind.config.js` - Defines font names for Tailwind utility generation
2. `src/styles.css` - Imports the actual font files from Google Fonts

I only updated one of them.

**The Fix:** When adding new fonts, update BOTH places:

```javascript
// 1. Add to tailwind.config.js
fontFamily: {
  ericaOne: ["Erica One", "sans-serif"],
  climateCrisis: ["Climate Crisis", "sans-serif"],
}
```

```css
/* 2. Add to src/styles.css import URL */
@import url("https://fonts.googleapis.com/css2?family=...&family=Erica+One&family=Climate+Crisis&display=swap");
```

**Takeaway:** Font configuration lives in two places. Always update both. This is easy to miss!

### 3. Prefer Tailwind Utility Classes Over Inline Styles

**The Rule:** If Tailwind has a utility class for what you need, use it. Never use `style=""` attributes when a Tailwind
class covers the same ground.

**Why It Matters:**

- Inline styles can't use Tailwind variants (`hover:`, `lg:`, `dark:`, etc.)
- They're harder to scan and maintain
- They bypass the design token system
- They're easy to lose during edits (see lesson above)

**Examples:**

```html
<!-- ❌ Avoid inline styles when Tailwind has the utility -->
<div style="padding-top: 2rem; padding-bottom: 2rem">...</div>
<img style="width: 100%; height: auto; display: block" />
<div style="letter-spacing: -0.05em">...</div>

<!-- ✅ Use Tailwind utility classes -->
<div class="py-8">...</div>
<img class="w-full h-auto block" />
<div class="tracking-[-0.05em]">...</div>
```

**When inline styles are acceptable:**

- One-off values with no Tailwind equivalent and no reuse potential
- Dynamic values set via JavaScript

**Takeaway:** Default to Tailwind. Reach for `style=""` only when Tailwind genuinely can't do it.

### 4. Color Contrast Requires Testing

**The Mistake:** The magenta article's byline was colored `#ff00ff` on a `#ff00ff` magenta background—completely
invisible!

**Why It Happened:** I didn't visually verify all color combinations when updating the byline. Magenta on magenta seemed
like it should be fine in theory.

**The Fix:** Always test color contrast, especially with expressive colors:

```css
/* ❌ Bad: Same color as background */
.article-style-magenta-exp__byline {
  color: #ff00ff; /* Same as background */
}

/* ✅ Good: High contrast */
.article-style-magenta-exp__byline {
  color: var(--color-white); /* Clear against magenta */
}
```

Use tools like WebAIM Contrast Checker for WCAG compliance.

**Takeaway:** Always visually test color combinations, especially bold/expressive colors. Don't rely on intuition.

### 5. Font Size Scaling Should Match Visual Intent

**The Original Request:** "Make the music-bold headers almost twice as large"

**The Mistake:** I increased header from 4rem to 7.5rem, but kept the font as Bebas Neue. For such large type, this font
felt underwhelming.

**The Correction:** The user suggested using Erica One instead, which is a naturally bolder, more impactful display
font.

**Why This Matters:** Font size and font choice work together. When scaling up significantly:

- Use fonts designed for large display sizes (Erica One, Abril Fatface, Climate Crisis)
- Avoid fonts designed for body text
- Test the combination visually

```css
/* ✅ Good: Bold font for bold statement */
.article-style-music-bold__header {
  font-family: "Erica One", sans-serif;
  font-size: 7.5rem;
  font-weight: 900;
}
```

**Takeaway:** Font and size should support the same visual intent. Large + weak = inconsistent design.

### 6. Use `@import "tailwindcss"` — Not the v3 `@tailwind` Directives

**The Mistake:** The stylesheet used Tailwind v3-style directives:

```css
/* ❌ v3 syntax — does not load Tailwind v4's full default theme */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This caused the entire default utility palette (gray, white, spacing, border radius, font weight, etc.) to not be
generated, even when those classes appeared in the HTML.

**The Fix:** Use Tailwind v4's native import, with `@config` for the JavaScript config file:

```css
/* ✅ v4 syntax */
@import "tailwindcss";
@config "../tailwind.config.js";
```

**Takeaway:** In Tailwind v4, always use `@import "tailwindcss"`. The old `@tailwind` directives are a v3 compatibility
shim that skips the v4 default theme.

### What `@import "tailwindcss"` Gives You For Free

The single import is shorthand for:

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

This automatically:

- Declares the **cascade order** (`theme → base → components → utilities`) so our `@layer components` and `@utility`
  directives slot in correctly
- Injects **Preflight** (a CSS reset) which among other things makes `<img>` tags `display: block` and
  `max-width: 100%; height: auto` by default
- Exposes all **theme CSS variables** (`--color-*`, `--spacing-*`, etc.)

You only need to write the expanded form if you want to disable specific parts (e.g., no preflight when integrating into
an existing site). See `TAILWIND_V4_GUIDE.md` for full details.

## CSS Layer Conventions

### The Rule

Follow Tailwind's layer system for all custom CSS in `src/styles.css`:

| What you're writing                                          | Where it goes           |
| ------------------------------------------------------------ | ----------------------- |
| Multi-property component class (article styles, pull quotes) | `@layer components { }` |
| Single-purpose utility helper                                | `@utility name { }`     |
| Page/element defaults                                        | `@layer base { }`       |

### `@layer components` — Article & Component Classes

All `.article-style-*`, `.pullquote-*`, and any other multi-property component classes belong inside
`@layer components`. This is critical: it means Tailwind utility classes **always win**, so you can override any
component property directly in HTML.

```css
/* ✅ Correct */
@layer components {
  .article-style-geometric {
    background-color: var(--color-red-600);
    color: var(--color-white);
    padding: 3rem;
  }
  .article-style-geometric__header {
    font-family: "Bebas Neue", sans-serif;
    font-size: 3.75rem;
  }
}
```

Now utility overrides work:

```html
<!-- rounded-lg overrides the component's default shape -->
<div class="article-style-pentagram rounded-lg">...</div>
```

### `@utility` — Custom Utility Classes

Single-purpose helpers that behave like Tailwind utilities (respond to variants, don't need component-level specificity)
use the `@utility` directive (Tailwind v4 syntax):

```css
/* ✅ Correct — single-purpose helpers */
@utility zine-article {
  margin-bottom: 0;
}

@utility zine-section-divider {
  margin: 4rem 0;
  height: 0.25rem;
  background: linear-gradient(to right, transparent, var(--color-gray-400), transparent);
}
```

**Takeaway:** `@layer components` for rich component classes. `@utility` for single-purpose helpers. Never leave custom
classes as unscoped globals — they'll lose to Tailwind utility specificity battles unpredictably.

### The Issue

Initially, we used Tailwind v4's CSS variable system by referencing variables like `var(--color-purple-900)` directly in
custom CSS classes. However, these variables were not available at runtime—browsers complained they weren't defined.

### Why It Happened

Tailwind v4 generates CSS variables dynamically, but **it does not output a `:root` block by default**. It only
generates variables for utilities that are actually used in HTML. Since our custom CSS references variables that never
appear as Tailwind utility classes, Tailwind never generates them.

### The Solution

Add an explicit `:root` block in `src/styles.css` that defines all colors used by the library:

```css
:root {
  --color-black: #000;
  --color-purple-900: #7e22ce;
  --color-sunset-500: #ff6b35;
  /* ... all custom and utility colors */
}
```

This ensures variables are always available, regardless of what utilities Tailwind generates.

**Takeaway:** When using Tailwind v4 CSS variables in custom CSS, explicitly define them in `:root`. Don't rely on
Tailwind to generate them.

## Prettier Configuration

### The Decision

We use Prettier with a YAML configuration (`.prettierrc.yaml`) instead of JSON to leverage the `overrides` feature.

### Configuration

```yaml
printWidth: 120
tabWidth: 2
semi: true
singleQuote: true
trailingComma: es5

overrides:
  - files: "*.md"
    options:
      proseWrap: always
```

This allows:

- 120-character line width for all files
- Markdown files specifically use `proseWrap: always` for better readability
- All other file types don't specify prose wrapping

**Takeaway:** YAML config is cleaner for complex Prettier setups with overrides.

## Built-in Tailwind Palette vs Custom Colors

### The Mistake

We initially added a custom `purple` color palette to Tailwind:

```javascript
colors: {
  purple: { 900: "#7e22ce" }
}
```

This was unnecessary because Tailwind ships with a comprehensive purple palette (50-900) built-in.

### The Pattern

Use Tailwind's `extend` mode in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      sunset: { /* custom */ },
      acid: { /* custom */ }
      /* Don't duplicate built-in colors */
    }
  }
}
```

This preserves all built-in colors and adds custom ones, avoiding duplication and confusion.

**Takeaway:** Check Tailwind's default palette before adding custom colors. Most common colors are already there.

## Article Style Architecture

### BEM Naming

All components use Block-Element naming to prevent CSS conflicts:

```css
.article-style-geometric {
  /* Block */
}
.article-style-geometric__header {
  /* Element */
}
.article-style-geometric__content {
  /* Element */
}
```

This allows 8 distinct styles to coexist on the same page without conflicts. Each article is completely isolated.

**Takeaway:** BEM naming is essential for multi-style component libraries. It scales better than utility-only approach.

## Placeholder Images

### Using placehold.co

Instead of `<div>IMAGE</div>` placeholders, use actual image tags:

```html
<img src="https://placehold.co/400x400/hex/hex?text=Description" alt="Description" />
```

This better simulates the final product and is easier to replace with real images later.

## Build Performance

The library builds in **50-63ms** with:

- 8 distinct article styles
- 12 Google Fonts
- 5 custom color palettes
- 500+ line output CSS (15KB optimized)

This speed is thanks to Tailwind v4's optimized compiler.

## Future Improvements

### Consider These If Extending

1. **Responsive breakpoints** - Currently designs assume desktop. Mobile variants would need significant work.
2. **Page-turning animations** - CSS `@keyframes` could simulate magazine page turns.
3. **Theme presets** - Create configurable theme mode (dark/light mode toggles per article).
4. **Print CSS** - Add `@media print` styles for PDF export workflows.
5. **Static site generator templates** - Create wrappers for MkDocs, Hugo, 11ty, Jekyll.

---

## Session 2: Music Bold & Final Polish

### What Was Added

- **Article 14: Music Bold** - High-contrast image-heavy style for music/media content
  - Deep blue background (#0052cc) with red (#ff2d2d) accents
  - Extra-large headers (7.5rem) in Erica One font for maximum impact
  - Minimal text with italic serif tagline
  - Featured image section with red border
  - Link button grid for destination platforms (Spotify, Apple Music, etc.)
  - Full-viewport height for immersive presentation

### Additional Refinements

1. **Color Updates**
   - Changed European Editorial dark side to Tailwind's `zinc-800` instead of custom `zinc-900`
   - Fixed magenta article byline from invisible magenta to white for contrast
   - Added `--color-music-blue` and `--color-music-red` to CSS variables

2. **Typography Additions**
   - Added Erica One and Climate Crisis fonts to both `tailwind.config.js` and Google Fonts import
   - Both fonts specifically chosen for bold display work

3. **Demo Page Styling**
   - Restored max-width 1200px container with black body background and white center
   - Fixed inline styles to use plain CSS (removed non-functional `@apply`)

### Build Performance

- 14 article styles compile in 60-90ms
- Final CSS output: ~16KB optimized
- All fonts loading correctly via Google Fonts

---

**Note:** This file captures the development story. Use it as reference when maintaining or extending the library.
