# Development Workflow & Patterns

This document captures patterns, decisions, and lessons learned during development of the Zine Component Library.

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

### 3. Watch Out for Lost Styling When Restoring Features

**The Mistake:** After working on the music-bold style and making various edits, I accidentally lost the demo page's
styling:

- Black body background
- White .demo-container with 1200px max-width

I had to restore it completely because the inline styles were using `@apply` (which doesn't work in v4).

**Why It Happened:** Inline styles don't persist well through multiple editing passes. Small changes can accidentally
remove them.

**The Fix:** Extract commonly-used styling into the main stylesheet or ensure inline styles use plain CSS:

```css
/* Better approach: Keep it in src/styles.css */
body {
  background-color: black;
}
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
}
```

**Takeaway:** Minimize inline styling. Put reusable styles in the main stylesheet to prevent loss during edits.

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

---

## CSS Variables in Tailwind v4

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
