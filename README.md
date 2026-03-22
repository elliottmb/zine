# Zine Component Library 🎨📰

A retro-inspired HTML/CSS component library for creating expressive digital zines. Built with Tailwind CSS v4 and Google
Fonts, featuring 8 distinct article styles and atomic components inspired by 70s-90s magazine design.

## Features

✨ **8 Article Styles** - Geometric Bold, Typographic Study, Editorial Collage, Minimal Dark, Acid Bright, Magenta
Experimental, Peacock Blue, Sunset Warm

🎨 **Expressive Color** - Custom retro-inspired color palettes (sunset, acid, magenta, peacock, burnished)

📝 **Rich Typography** - 12 Google Fonts (Bebas Neue, EB Garamond, Playfair, Space Mono, Bodoni Moda, Righteous, Crimson
Text, and more)

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
<div class="article-style-geometric">
  <div class="article-style-geometric__header">Your Headline</div>
  <div class="article-style-geometric__subheader">Subtitle or tagline</div>
  <div class="article-style-geometric__content">
    <div class="article-style-geometric__text">
      <p>Your article content here...</p>
    </div>
    <div class="article-style-geometric__image-box">IMAGE</div>
  </div>
</div>
```

### Pull Quotes

```html
<div class="pullquote pullquote-classic">
  <div class="italic font-serif font-semibold text-xl">Your memorable quote here</div>
  <div class="text-sm text-gray-600 mt-3 font-normal not-italic">— Attribution</div>
</div>
```

### All 8 Article Styles

- `article-style-geometric` - Red + white, stark contrast
- `article-style-typographic` - Yellow, experimental type
- `article-style-collage` - Green gradient, asymmetrical
- `article-style-minimal-dark` - Black, elegant serif
- `article-style-acid-bright` - Neon yellow, high contrast
- `article-style-magenta-exp` - Magenta, playful
- `article-style-peacock` - Blue gradient, editorial
- `article-style-sunset` - Warm orange + cream, vintage

All styles use BEM naming (`article-style-NAME__element`) for clear composition.

## Structure

```
src/
├── styles.css          # Main stylesheet (632 lines)
├── components/
│   ├── headers.html    # Header examples
│   ├── pullquotes.html # Pull quotes & emphasis
│   └── layouts.html    # Layout components
demo/
└── index.html          # Full showcase page

dist/
└── styles.css          # Compiled output (14KB)

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

## Architecture & Best Practices

### Tailwind v4 CSS Variables

This library uses Tailwind v4's CSS variables via `var()` for all design tokens instead of hardcoding values. This
means:

✓ **Maintainability** - Change colors/spacing in `tailwind.config.js`, they automatically update everywhere ✓
**Consistency** - All values reference the same design system ✓ **Modern** - Leverages Tailwind v4's native architecture

Example:

```css
.article-style-geometric {
  background-color: var(--color-red-600); /* Uses Tailwind's color system */
  color: var(--color-white);
  padding: 3rem;
}
```

Available Tailwind v4 variables:

- `--color-*` - All colors from your palette
- `--font-*` - Typography scales
- `--spacing-*` - Spacing/sizing
- `--radius-*` - Border radius tokens
- `--shadow-*` - Box shadow values

### BEM Naming Convention

All component classes follow BEM (Block, Element, Modifier):

```
.article-style-geometric           /* Block */
.article-style-geometric__header   /* Element */
.article-style-geometric__header--alt /* Modifier (if needed) */
```

This makes components easy to customize and compose. Edit `tailwind.config.js` to change the color palette:

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

Add to `src/styles.css`:

```css
.article-style-custom {
  background-color: #yourcolor;
  padding: 3rem;
}

.article-style-custom__header {
  font-family: "Your Font", serif;
  font-size: 3.75rem;
  /* ... */
}
```

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
