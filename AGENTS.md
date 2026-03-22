# Development Workflow & Patterns

This document captures patterns, decisions, and lessons learned during development of the Zine Component Library.

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

**Note:** This file captures the development story. Use it as reference when maintaining or extending the library.
