# Zine Component Library 🎨📰

A retro-inspired HTML/CSS component library for creating expressive digital zines. Built with Tailwind CSS v4 and Google
Fonts, featuring 14 distinct article styles and atomic components inspired by 70s-90s magazine design.

## Features

✨ **22 Article Styles** - Geometric Bold, Typographic Study, Editorial Collage, Minimal Dark, Acid Bright, Magenta
Experimental, Swiss Minimal, Sunset Warm, European Editorial, Split Editorial, Designer Brief (Yellow/Barbie/Ocean),
Wilde Plakken, Music Bold, Trademarks, Pentagram (Standard/Inverted), Thirty Centuries, Programme, Liberation, Studio
Culture

🎨 **Expressive Color** - Custom retro-inspired color palettes (sunset, acid, magenta, peacock, burnished, editorial,
music)

📝 **Rich Typography** - 14 Google Fonts (Bebas Neue, EB Garamond, Playfair, Space Mono, Bodoni Moda, Righteous, Crimson
Text, Erica One, Climate Crisis, and more)

🧩 **Atomic Components** - Headers, pull quotes, emphasis blocks, layouts, and more

🔧 **Tailwind CSS v4** - Latest tooling, minimal custom CSS, maximum flexibility

## Quick Start

### Install

```bash
npm install
```

### Development

```bash
npm run build    # One-time build
npm run watch    # Watch mode during development
```

### View the Demo

Open `demo/index.html` in your browser to see all components and article styles in action.

## Usage

### Basic Article Template

```html
<article class="zine-geometric">
  <header>
    <h1>Your Headline</h1>
    <h2>Subtitle or tagline</h2>
  </header>
  <div class="content">
    <div class="text">
      <p>Your article content here...</p>
    </div>
    <div class="image-box">IMAGE</div>
  </div>
</article>
```

### Pull Quotes

```html
<div class="pullquote pullquote-classic">
  <div class="italic font-serif font-semibold text-xl">Your memorable quote here</div>
  <div class="text-sm text-gray-600 mt-3 font-normal not-italic">— Attribution</div>
</div>
```

### All 22 Article Styles

- `zine-geometric` - Red + white, stark contrast
- `zine-typographic` - Yellow, experimental type
- `zine-collage` - Green gradient, asymmetrical
- `zine-minimal-dark` - Black, elegant serif
- `zine-acid-bright` - Neon yellow, high contrast
- `zine-magenta-exp` - Magenta, playful
- `zine-swiss-minimal` - Stone + teal, structured editorial
- `zine-sunset` - Warm orange + cream, vintage
- `zine-european-editorial` - Zinc-800 + cream, two-column
- `zine-split-editorial` - Zinc-700/white split, clip-path header
- `zine-designer-brief` - Yellow with red tag, image-heavy
- `zine-designer-brief-barbie` - Hot pink + seafoam, playful
- `zine-designer-brief-ocean` - Cyan + lime green, vibrant
- `zine-wilde-plakken` - Mixed layout grid, electric blue on black
- `zine-music-bold` - Deep blue with red accents, minimal text, image showcase
- `zine-trademarks` - Deep purple, album art grid, Monoton + Audiowide
- `zine-pentagram` - Black + yellow color-block grid
- `zine-pentagram-inverted` - Yellow + black inversion
- `zine-thirty-centuries` - White editorial, drop cap, full typographic hierarchy
- `zine-programme` - Zinc-800 header, Anton title, float image prose
- `zine-liberation` - Yellow/pink/white section system, feminist editorial
- `zine-studio-culture` - Deep navy, DM Sans, three section variants

All styles use `zine-NAME` on an `<article>` tag, with short nested class names scoped by CSS nesting.

## Structure

```
src/
├── styles.css          # Main stylesheet (2265 lines)
├── components/
│   ├── headers.html    # Header examples
│   ├── pullquotes.html # Pull quotes & emphasis
│   └── layouts.html    # Layout components
demo/
└── index.html          # Full showcase page

dist/
└── styles.css          # Compiled output (~74KB)

tailwind.config.js      # Tailwind v4 config
package.json            # Dependencies
```

## Fonts Available

- **Playfair Display** - Elegant serif
- **Bebas Neue** - Bold geometric sans-serif
- **EB Garamond** - Classic serif
- **Abril Fatface** - Display serif
- **Space Mono** - Technical monospace
- **Crimson Text** - Reading serif
- **Bodoni Moda** - Editorial serif
- **Raleway** - Modern sans-serif
- **Righteous** - Bold geometric
- **Fredoka** - Friendly sans-serif
- **Courier Prime** - Code/typewriter
- **IBM Plex Serif** - Professional serif
- **Erica One** - Bold display font
- **Climate Crisis** - Bold display font

## Color Palettes

**Vibrant Magazine Colors:**

- Vibrant Blue: #007acc
- Vibrant Pink: #d5006d
- Vibrant Orange: #ff6200
- Vibrant Green: #32cd32
- Vibrant Yellow: #ffeb3b

**Extended Retro Palettes:**

- **Sunset** - Burnt orange + cream (50/500/900)
- **Acid** - Neon yellow tones (50/500/900)
- **Magenta** - Bold magenta (50/500/900)
- **Peacock** - Electric blue (50/500/900)
- **Burnished** - Dark warm browns (50/900)
- **Editorial** - Teal + coral accents
- **Music** - Deep blue + red accents
- **Zinc** - Neutral grays (zinc-800, zinc-900 from Tailwind)

## Architecture & Best Practices

### CSS Layer Conventions

All custom CSS follows Tailwind's layer system:

| Class type                                              | Location                |
| ------------------------------------------------------- | ----------------------- |
| Article styles, pull quotes (multi-property components) | `@layer components { }` |
| Single-purpose helpers (`.zine-*`)                      | `@utility name { }`     |

Placing component classes in `@layer components` means Tailwind utility classes always override them — so you can
customize any component directly in HTML:

```html
<!-- rounded-lg overrides the component's default corners -->
<article class="zine-pentagram rounded-lg">...</article>
```

### Tailwind Utilities Over Inline Styles

When Tailwind has a utility for what you need, use it. Never reach for `style=""` when a class exists:

```html
<!-- ❌ Avoid inline styles -->
<img style="width: 100%; height: auto; display: block" />

<!-- ✅ Use Tailwind utilities -->
<img class="w-full h-auto block" />
```

### Tailwind v4 CSS Variables

This library uses Tailwind v4's CSS variables via `var()` for all design tokens instead of hardcoding values. This
means:

✓ **Maintainability** - Change colors/spacing in `tailwind.config.js`, they automatically update everywhere ✓
**Consistency** - All values reference the same design system ✓ **Modern** - Leverages Tailwind v4's native architecture

**Important:** The library includes an explicit `:root` block in `src/styles.css` that defines all color variables used
by the components. This ensures they're available at runtime regardless of how Tailwind processes utilities. This block
includes:

- All custom magazine palettes (sunset, acid, magenta, peacock, burnished)
- Neutral colors (black, white, grays 50-900)
- Utility colors (pink, purple)

Example:

```css
article.zine-geometric {
  background-color: var(--color-red-600); /* Uses Tailwind's color system */
  color: var(--color-white);
  padding: 3rem;
}
```

Available Tailwind v4 variables:

- `--color-*` - All colors from your palette (defined in `:root`)
- `--font-*` - Typography scales
- `--spacing-*` - Spacing/sizing
- `--radius-*` - Border radius tokens
- `--shadow-*` - Box shadow values

### Naming Convention

All component classes use `zine-NAME` on an `<article>` tag. Child elements use short class names scoped via CSS nesting
— no long prefixes needed:

```html
<article class="zine-geometric">
  <header>
    <h1>Headline</h1>
    <h2>Subtitle</h2>
  </header>
  <section class="alt">
    <h1>Section Title</h1>
    <div class="body">...</div>
  </section>
</article>
```

```css
article.zine-geometric {
  > header {
    > h1 { ... }
    > h2 { ... }
  }
  > section {
    &.alt { ... }
    > h1 { ... }
    > .body { ... }
  }
}
```

The `article` tag is the namespace, semantic heading tags (`h1`–`h4`) replace class-named divs for heading roles, and
short classes handle everything else. Edit `tailwind.config.js` to change the color palette:

```javascript
colors: {
  myCustom: {
    50: '#f0f0f0',
    500: '#ff0000',
    900: '#660000',
  }
}
```

### Add Fonts

Add Google Fonts to `src/styles.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Your+Font&display=swap");
```

Then add to `tailwind.config.js`:

```javascript
fontFamily: {
  yourFont: ['Your Font', 'fallback'],
}
```

### Create New Article Styles

Add to `src/styles.css` inside the existing `@layer components` block:

```css
@layer components {
  article.zine-custom {
    background-color: var(--color-red-600);
    padding: 3rem;

    > header {
      > h1 {
        font-family: "Your Font", serif;
        font-size: 3.75rem;
      }
      > h2 { ... }
    }

    > section {
      padding: 2rem;
      > h1 { ... }
      > .body { ... }
    }
  }
}
```

HTML for the above:

```html
<article class="zine-custom">
  <header>
    <h1>Your Headline</h1>
    <h2>Your subtitle</h2>
  </header>
  <section>
    <h1>Section Title</h1>
    <div class="body"><p>Content...</p></div>
  </section>
</article>
```

### Styling in HTML: Tailwind Utilities First

If Tailwind has a utility class for what you need, use it — never use `style=""` attributes:

```html
<!-- ❌ Avoid -->
<img style="width: 100%; height: auto; display: block" />
<div style="padding-top: 2rem">...</div>

<!-- ✅ Use Tailwind utilities -->
<img class="w-full h-auto block" />
<div class="pt-8">...</div>
```

Utility classes work with variants (`hover:`, `lg:`, `dark:`). Inline styles don't.

## Use Cases

- **Digital Zines** - Create multi-article issues on one page
- **Magazine Websites** - Recreate retro print aesthetics digitally
- **Long-form Content** - Add visual interest with varied article styles
- **Portfolio Sites** - Showcase work with bold editorial layouts
- **Static Site Generators** - Integrate with MkDocs, Hugo, 11ty, Jekyll

## Production Build

```bash
npm run build
```

This generates `dist/styles.css` containing all Tailwind utilities + custom article styles.

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge). CSS Grid and flexbox required.

## License

MIT

## Future Enhancements

- Page-turning CSS animations
- Static site generator templates (MkDocs, Hugo, 11ty)
- Print CSS for PDF export
- Responsive design refinements
- Theme customization system

---

**Made for friends creating together.** Build bold, expressive digital magazines. 🎨📰
