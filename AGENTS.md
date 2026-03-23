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
article.zine-magenta-exp > header > .byline {
  color: #ff00ff; /* Same as background */
}

/* ✅ Good: High contrast */
article.zine-magenta-exp > header > .byline {
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
article.zine-music-bold > header {
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

### 7. Duplicate CSS Property Declarations

**The Mistake:** During a color update, an edit accidentally left two `color:` declarations on the same rule:

```css
/* ❌ Bad — second declaration silently overrides the first */
article.zine-liberation > section.yellow > .title {
  color: var(--color-liberation-purple);
  color: var(--color-white); /* leftover from previous value */
}
```

The second `color: white` silently won, making the yellow section's title invisible.

**The Fix:** After editing any CSS block, grep for the selector and scan for duplicate property declarations.

**Takeaway:** CSS silently discards duplicate properties without error. Always scan edited blocks for duplicates before
building.

## CSS Layer Conventions

### The Rule

Follow Tailwind's layer system for all custom CSS in `src/styles.css`:

| What you're writing                                          | Where it goes           |
| ------------------------------------------------------------ | ----------------------- |
| Multi-property component class (article styles, pull quotes) | `@layer components { }` |
| Single-purpose utility helper                                | `@utility name { }`     |
| Page/element defaults                                        | `@layer base { }`       |

### `@layer components` — Article & Component Classes

All `article.zine-*`, `.pullquote-*`, and any other multi-property component classes belong inside `@layer components`.
This is critical: it means Tailwind utility classes **always win**, so you can override any component property directly
in HTML.

```css
/* ✅ Correct */
@layer components {
  article.zine-geometric {
    background-color: var(--color-red-600);
    color: var(--color-white);
    padding: 3rem;

    > header {
      font-family: "Bebas Neue", sans-serif;
      font-size: 3.75rem;
    }
  }
}
```

Now utility overrides work:

```html
<!-- rounded-lg overrides the component's default shape -->
<article class="zine-pentagram rounded-lg">...</article>
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

## Color Conventions

### Never Hardcode Hex Values Outside `:root`

Use `var(--color-*)` everywhere in component CSS. All hex values live exclusively in the `:root` block.

### Tailwind's Default Palette Is Already Available

`@import "tailwindcss"` automatically exposes every default palette color as a CSS variable. You do **not** need to
define `var(--color-zinc-700)`, `var(--color-yellow-400)`, etc. in `:root` — they are already available.

Only add custom colors to `:root` when there is no sufficiently close Tailwind equivalent.

### Design-Critical Custom Colors — Do Not Substitute

| Variable                    | Hex       | Why it must not change                                        |
| --------------------------- | --------- | ------------------------------------------------------------- |
| `--color-brief-yellow`      | `#ffff00` | Pure yellow by design — `yellow-400` (`#facc15`) is different |
| `--color-liberation-yellow` | `#e3e446` | 40+ channels from `yellow-300` (`#fde047`)                    |
| `--color-liberation-pink`   | `#e12b96` | 40+ channels from `pink-600` (`#db2777`)                      |
| `--color-liberation-purple` | `#942c79` | 40+ channels from `fuchsia-800` (`#86198f`)                   |
| `--color-studio-blue`       | `#02169f` | Deep navy — no Tailwind equivalent at this depth              |
| `--color-studio-tan`        | `#bfb6a2` | Warm stone — midpoint between `stone-300` and `stone-400`     |

Never replace these with Tailwind shades. The distinction is intentional and design-critical.

### `--color-purple-900` Mismatch Warning

`--color-purple-900` is defined in `:root` as `#7e22ce`, which is actually Tailwind's `purple-700` value — a mismatch
from an early session. Do not rely on `var(--color-purple-900)` in new styles. Use `var(--color-violet-900)` or direct
Tailwind shade references instead.

### Gray Family Color Reference

When replacing hardcoded grays with Tailwind variables, use perceptual luminance to find the closest match:

| Hex    | Tailwind equivalent |
| ------ | ------------------- |
| `#333` | `gray-800`          |
| `#444` | `stone-700`         |
| `#555` | `gray-600`          |
| `#666` | `gray-500`          |
| `#888` | `neutral-500`       |
| `#999` | `zinc-400`          |
| `#ddd` | `zinc-200`          |
| `#eee` | `gray-200`          |

### Overlay Color Variables

Semi-transparent overlays live in `:root` as named variables rather than inline `rgba()`:

```css
--color-overlay-dark-10: rgba(0, 0, 0, 0.1);
--color-overlay-dark-15: rgba(0, 0, 0, 0.15);
--color-overlay-dark-20: rgba(0, 0, 0, 0.2);
--color-overlay-light-50: rgba(255, 255, 255, 0.5);
--color-overlay-light-60: rgba(255, 255, 255, 0.6);
--color-overlay-light-80: rgba(255, 255, 255, 0.8);
```

Use these instead of writing `rgba()` values inline.

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

### Naming & Nesting Convention

All article components use `zine-NAME` on an `<article>` tag. Child elements use short class names scoped via CSS
nesting — no long prefixes needed. The `article` tag itself acts as the namespace.

```css
article.zine-geometric {
  /* Block */
}

article.zine-geometric > header {
  /* Direct child header */
}

article.zine-geometric > section {
  /* Direct child section */
}

article.zine-geometric > section > .title {
  /* Nested element */
}

article.zine-geometric > section.alt {
  /* Section modifier */
}
```

HTML usage:

```html
<article class="zine-geometric">
  <header>Headline</header>
  <section>
    <div class="title">Section Title</div>
    <div class="body">Content...</div>
  </section>
  <section class="alt">
    <div class="title">Alt Section</div>
  </section>
</article>
```

This pattern keeps HTML readable, CSS scoped, and avoids long BEM-style prefixes. Each article is completely isolated
because selectors are qualified with both the tag type (`article`) and the unique `zine-NAME` class.

## Renaming Article Styles

When renaming a style (e.g. `zine-peacock` → `zine-swiss-minimal`), update all four of these:

1. `src/styles.css` — the class definition (`article.zine-old` → `article.zine-new`)
2. `demo/index.html` — all usages (`class="zine-old"` → `class="zine-new"`)
3. `STYLES.md` — the style entry heading and any references
4. `README.md` — the style list

The color palette name (e.g. `--color-peacock-*`) is independent of the style name — leave color variable names alone.

## Float-Based Image Layout Pattern

`zine-programme`, `zine-liberation`, and `zine-studio-culture` use CSS floats for inline images. The correct pattern:

```html
<!-- Float image left with prose wrapping right -->
<div class="image left">
  <img src="..." alt="..." />
  <div class="caption">Caption text</div>
</div>
<p>Prose flows to the right of the image...</p>
<p>More prose...</p>
<div class="clearfix"></div>
<!-- REQUIRED: resets float before the next float -->

<!-- Then float another image right -->
<div class="image right">...</div>
<p>Prose flows to the left...</p>
<div class="clearfix"></div>
```

**Common mistake:** Placing two floated images (left + right) consecutively before the prose — the paragraph wedges
between them. Always interleave: one float → prose → clearfix → next float → prose → clearfix.

## Placeholder Images

### Using placehold.co

Instead of `<div>IMAGE</div>` placeholders, use actual image tags:

```html
<img src="https://placehold.co/400x400/hex/hex?text=Description" alt="Description" />
```

This better simulates the final product and is easier to replace with real images later.

## Build Performance

The library builds in **50-90ms** with:

- 22 distinct article styles
- 15+ Google Fonts
- Custom color palettes + Tailwind defaults
- ~74KB compiled CSS output

This speed is thanks to Tailwind v4's optimized compiler.

## Future Improvements

### Consider These If Extending

1. **Responsive breakpoints** - Currently designs assume desktop. Mobile variants would need significant work.
2. **Page-turning animations** - CSS `@keyframes` could simulate magazine page turns.
3. **Theme presets** - Create configurable theme mode (dark/light mode toggles per article).
4. **Print CSS** - Add `@media print` styles for PDF export workflows.
5. **Static site generator templates** - Create wrappers for MkDocs, Hugo, 11ty, Jekyll.
