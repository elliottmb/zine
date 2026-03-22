# Tailwind v4 CSS Variables Guide

This project uses **Tailwind v4's native CSS variables** to reference design tokens instead of hardcoding values.

## CSS Layer & Utility Conventions

### Placing Custom Classes in the Right Layer

All custom CSS in this project follows Tailwind's layer system so specificity is predictable:

**`@layer components`** — for multi-property component classes (article styles, pull quotes):

```css
@layer components {
  .article-style-geometric {
    background-color: var(--color-red-600);
    color: var(--color-white);
    padding: 3rem;
  }
}
```

This ensures Tailwind utility classes always override component defaults:

```html
<!-- bg-blue-600 wins over the component's background — works because of @layer components -->
<div class="article-style-geometric bg-blue-600">...</div>
```

**`@utility`** — for single-purpose helpers (Tailwind v4 syntax):

```css
@utility zine-section-divider {
  margin: 4rem 0;
  height: 0.25rem;
  background: linear-gradient(to right, transparent, var(--color-gray-400), transparent);
}
```

Custom utilities defined with `@utility` automatically support variants (`hover:`, `lg:`, etc.) and are inserted into
the utilities layer.

### Prefer Tailwind Utility Classes in HTML

When a Tailwind utility covers what you need, use it directly in HTML rather than a `style=""` attribute:

```html
<!-- ❌ Don't use inline styles when Tailwind has the class -->
<img style="width: 100%; height: auto; display: block" />
<div style="letter-spacing: -0.05em">...</div>

<!-- ✅ Use Tailwind utilities — they support variants and are scannable -->
<img class="w-full h-auto block" />
<div class="tracking-[-0.05em]">...</div>
```

## Why This Matters

In Tailwind v4, all design tokens are automatically exposed as CSS variables. Our custom components leverage this system
for:

- **Single source of truth** - Change colors in `tailwind.config.js`, they update everywhere
- **Easy theming** - Swap color values without touching CSS classes
- **Better maintainability** - No duplicate color definitions
- **Modern architecture** - Using Tailwind v4 as intended

## CSS Variables Available

Tailwind v4 automatically generates these from your config:

### Colors

```css
--color-black
--color-white
--color-gray-50, --color-gray-100, ... --color-gray-900
--color-red-50, --color-red-600, --color-red-900
--color-yellow-300
--color-green-50, --color-green-100, ... --color-green-900
--color-pink-50, --color-pink-600
--color-blue-50, --color-blue-900
/* ... all 100+ colors from your palette ... */
```

### Custom Colors (from config)

```css
--color-sunset-50, --color-sunset-500, --color-sunset-900
--color-acid-50, --color-acid-500, --color-acid-900
--color-magenta-50, --color-magenta-500, --color-magenta-900
--color-peacock-50, --color-peacock-500, --color-peacock-900
--color-burnished-50, --color-burnished-900
```

### Other Design Tokens

```css
--font-playfair, --font-bebas, --font-garamond, /* ... */
--spacing-1, --spacing-2, ... --spacing-96
--radius-sm, --radius-md, --radius-lg, /* ... */
--shadow-sm, --shadow-md, /* ... */
```

## How Components Use Variables

### Example 1: Pull Quote

```css
.pullquote-classic {
  border-left-color: var(--color-gray-900); /* Uses Tailwind's gray scale */
  color: var(--color-black); /* Synced to config */
  background-color: var(--color-gray-50); /* Updates on config change */
}
```

### Example 2: Article Style

```css
.article-style-geometric {
  background-color: var(--color-red-600); /* Dynamic - change in config */
  color: var(--color-white); /* Always in sync */
  padding: 3rem;
}

.article-style-geometric__header {
  color: var(--color-white); /* Inherits or reuses */
}
```

## Customizing the Library

### Change a Color

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        red: {
          600: "#ff1744", // Changed from #dc2626
        },
      },
    },
  },
};
```

**Result:** All components using `var(--color-red-600)` instantly get the new color!

### Add a New Color

```javascript
// tailwind.config.js
colors: {
  myBrand: {
    50: '#f0e0ff',
    500: '#a020f0',
    900: '#5d0099',
  }
}
```

**Now available as:**

```css
var(--color-myBrand-50)
var(--color-myBrand-500)
var(--color-myBrand-900)
```

### Create a Component Using Variables

```css
.my-new-article {
  background-color: var(--color-myBrand-50);
  border: 2px solid var(--color-myBrand-500);
}

.my-new-article__header {
  color: var(--color-myBrand-900);
  font-family: var(--font-garamond); /* Font variables too! */
  font-size: 2rem;
}
```

## CSS Custom Properties Syntax

Use the standard CSS `var()` function:

```css
/* Basic usage */
background-color: var(--color-gray-50);

/* With fallback (if variable doesn't exist) */
background-color: var(--color-gray-50, #f9fafb);

/* In gradients */
background: linear-gradient(to right, var(--color-green-100), var(--color-green-50));

/* In box-shadow, borders, etc. */
border: 2px solid var(--color-red-600);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
```

## When to Use Hardcoded vs. Variables

### Use `var(--color-*)`

- Color values that should change if the config changes
- Brand colors, accent colors, semantic colors
- Anything referenced in `tailwind.config.js`

### OK to Hardcode

- Semi-transparent overlays: `rgba(0, 0, 0, 0.1)`
- Specific visual effects not in config
- Temporary one-off values (but consider adding to config)

## Build Process

```bash
# Source (uses var())
src/styles.css
  ↓
  Tailwind v4 processes config
  ↓
# Output (variables resolved at build time)
dist/styles.css
```

The compiled CSS includes Tailwind's base `--color-*` declarations, so the variables are always defined.

## Best Practices

✓ **Always use variables for:** Colors, fonts, spacing from config  
✓ **Reference the config:** If it's in `tailwind.config.js`, use `var()`  
✓ **Minimize hardcoding:** Only use hardcoded values for visual effects  
✓ **Keep semantics:** Use meaningful variable names in styles  
✓ **Document customization:** If you change config values, update docs

## Example: Full Theme Customization

Want a completely different vibe? Easy!

```javascript
// tailwind.config.js - Change these...
colors: {
  red: { 600: '#8b2e00' },      // Warm terracotta
  yellow: { 300: '#fff9e6' },   // Soft cream
  green: { 900: '#2d5016' },    // Deep forest
}

// ... and the whole theme updates automatically!
// All components using var(--color-*) reflect the new palette
```

## Troubleshooting

**Q: Variables not updating after config change?**  
A: Run `npm run build` to recompile CSS

**Q: `var(--color-xyz)` returns undefined?**  
A: Check the variable name matches your `tailwind.config.js` color definition

**Q: Can I use variables in HTML/JS?**  
A: Yes! `getComputedStyle(el).getPropertyValue('--color-red-600')`

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS var() Function](<https://developer.mozilla.org/en-US/docs/Web/CSS/var()>)
