# Article Styles

Each article style in this library is a self-contained visual language — a combination of color, typography, and layout
that evokes a specific era, medium, or design tradition. They are meant to be mixed across a single zine issue, creating
contrast and rhythm as the reader moves through pages.

Many of these styles were directly inspired by books sourced from [The Print Arkive](https://www.theprintarkive.co.uk/)
— a curated shop of used graphic design, typography, and visual culture books. It's an excellent starting point for
finding design inspiration grounded in print history.

---

## 1. Geometric (`article-style-geometric`)

**Inspiration:** The cover of _The Fundamentals of Creative Design_ (2003, AVA Publishing) by Gavin Ambrose and Paul
Harris — a design textbook with a boldly structured cover that practices what it preaches: flat color field, clean
geometry, high contrast. The red/white/black palette and strict two-column grid are the visual vocabulary of a book that
teaches design by demonstrating it.

**Visual character:** A saturated red field holds white type with confident weight. The layout splits cleanly into two
columns — text on one side, a framed image box on the other — emphasizing structure over decoration. Nothing is
ornamental here.

**Typography:** Bebas Neue carries the header in all-caps. Body text falls back to a neutral serif for readability
against the intense background.

**Colors:** `red-600` background, white text, `gray-900` image placeholder.

**Best used for:** Lead articles, manifestos, cultural criticism, anything that needs to announce itself without
ambiguity.

---

## 2. Typographic (`article-style-typographic`)

**Inspiration:** _The Fundamentals of Creative Design_ (2003, AVA Publishing) combined with the _Penrose Annual_ (1962,
Lund Humphries), edited by R. Herbert Spencer — an annual survey of graphic arts with articles by Hermann Zapf on
printing types, "Variations on the typographer," and "A decade of type design," illustrated throughout with printed
tip-in samples. The Penrose Annual treated typography as both craft and cultural record. The yellow background grid of
monospace specimens is a direct nod to the annual format: type as the subject, the page as the specimen sheet.

**Visual character:** A grid of monospace blocks creates a visual score across the top of the article before giving way
to body content. The yellow background hums with energy. Letterform exploration is the point.

**Typography:** Abril Fatface for the main header (operatic, high contrast), Bebas Neue for section titles, monospace
for the specimen grid.

**Colors:** `yellow-300` background, `gray-900` text, white grid items, `purple-900` accent.

**Best used for:** Typography features, font spotlights, design history pieces, experimental writing where structure
mirrors content.

---

## 3. Collage (`article-style-collage`)

**Inspiration:** _The Fundamentals of Creative Design_ (2003, AVA Publishing) combined with the _Penrose Annual_ (1962,
Lund Humphries) — the latter being an annual whose 31 articles span "the long frontiers where questions of printing and
graphic design interact with those of wider cultural significance," covering corporate image, children's book
illustration, photography, and lithography in the same volume. The collage style mirrors that editorial promiscuity:
asymmetric grid, multiple voices, competing hierarchies, the sidebar as a counterweight to the main argument.

**Visual character:** A green gradient grounds the page in something organic. The main grid is deliberately asymmetric
(2fr / 1fr), giving images room to breathe while a sidebar column offers a counterpoint voice. A pullquote box
interrupts the flow intentionally.

**Typography:** Playfair Display at large scale for the header (editorial prestige), a 300-weight italic byline, and
Bebas Neue in the sidebar for contrast.

**Colors:** `green-100` to `green-50` gradient, `green-900` header and borders, `gray-600` body.

**Best used for:** Art criticism, long-form features, photography essays, anything with multiple content registers
running simultaneously.

---

## 4. Minimal Dark (`article-style-minimal-dark`)

**Inspiration:** _The Fundamentals of Creative Design_ (2003, AVA Publishing) by Gavin Ambrose and Paul Harris — the
same source as Acid Bright, but from the opposite end. Where that style breaks every rule about colour restraint,
Minimal Dark demonstrates the "successful use of basic grid structures" the book describes as the foundation. Black,
white, one accent, a clean grid. Every element justified by function.

**Visual character:** Black field, white type, generous white space. A sidebar column holds supplementary material
separated by a thin border. The image sits below in a 16:9 cinematic crop. Nothing competes for attention.

**Typography:** EB Garamond for the header (scholarly weight), Space Mono for the subtitle (technical precision), a
clean serif for body text.

**Colors:** Black background, white text, `gray-300` sidebar, `gray-700` divider border.

**Best used for:** Film and music reviews, literary essays, interviews, any article where the writing should feel
considered and the design should not distract.

---

## 5. Acid Bright (`article-style-acid-bright`)

**Inspiration:** _The Fundamentals of Creative Design_ (2003, AVA Publishing) by Gavin Ambrose and Paul Harris — a
design textbook that covers layout, typography, colour usage, and image through "examples that challenge and break these
foundations." Acid Bright is the challenging end of that axis: maximum colour saturation as a design argument in itself.
If the book teaches that colour has rules, this style asks what happens when you push those rules to their fluorescent
limit.

**Visual character:** Neon yellow so bright it hums. Purple headers that shouldn't work but do. A thick border frames
the content like a TV screen from another dimension. Highlight boxes demand you stop and read.

**Typography:** Righteous for the header (bold, playful, slightly retro-futurist), Bebas Neue for secondary type,
standard serif for body text.

**Colors:** `acid-50` (`#f0ff00`) background, `purple-900` header, `acid-500` borders, black highlight blocks.

**Best used for:** Club nights, music releases, countercultural criticism, anything with energy to spare.

---

## 6. Magenta Experimental (`article-style-magenta-exp`)

**Inspiration:** Experimental design publications of the 1990s — Emigre, Ray Gun — where the page was a site of graphic
investigation rather than a neutral delivery mechanism.

**Visual character:** A full-bleed magenta band announces the article before white space takes over. Images stack in a
flexible column rather than a rigid grid. Accent blocks with left-border emphasis create secondary reading paths.

**Typography:** Abril Fatface for the header (lush, high-contrast), Space Mono for the byline, Bebas Neue for accent
titles.

**Colors:** `magenta-500` header band, white content area, `magenta-50` accent blocks with `magenta-500` borders.

**Best used for:** Fashion features, cultural criticism, artist profiles, anything where personality outweighs
formality.

---

## 7. Swiss Minimal (`article-style-swiss-minimal`)

**Inspiration:** _Unit Design: Ronald Clyne_ (2010, Unit Editions, London) — U:D/R01, the first in Unit Editions' series
of papers devoted to graphic design and visual culture, edited by Tony Brook and Adrian Shaughnessy and designed by
Spin. An anthology of Folkways Records album cover art featuring the work of Ronald Clyne (1925–2006). Clyne's guiding
principle: "A record cover should be seen at a glance. You shouldn't have to study different sections of it. You should
see the total instantly." The style takes that directive seriously — a structured progression of stone, grid, and teal
that resolves into a single, immediate impression.

**Visual character:** A stone-toned header area transitions into a three-column principles grid, then opens into a
full-width teal section for the body copy. The color progression feels like walking through rooms in a well-designed
building.

**Typography:** Bebas Neue for headers and grid titles, IBM Plex Serif for tagline and body (professional, slightly
cold, reliable).

**Colors:** `stone-100` header area, `editorial-teal` (`#20b2aa`) body section, white grid items, black text.

**Best used for:** Longform editorial, "best of" lists, craft features, design or architecture coverage.

---

## 8. Sunset Warm (`article-style-sunset`)

**Inspiration:** American editorial photography books and West Coast design publications from the 1970s — warm, tactile,
with a sense that the designer handled the materials themselves.

**Visual character:** A cream background the color of old paper. A burnt orange header box sits at a slight rotation
(-1deg), as if placed by hand. Callout blocks with left borders feel like margin annotations. The whole page feels like
it might smell of ink.

**Typography:** Bodoni Moda for headers and section titles (elegant but not precious), Fredoka for the subtitle (warmth,
approachability), Crimson Text for body (legible, literary).

**Colors:** `burnished-50` background, `sunset-500` header box, `sunset-900` text, `sunset-100` subtitle accent.

**Best used for:** Food, travel, culture, memoir-style personal essays, anything with warmth and craft as subtext.

---

## 9. European Editorial (`article-style-european-editorial`)

**Inspiration:** A spread from _Back Cover_ (2010, Éditions B42, Paris), edited by Alexandre Dimos — an independent
French magazine on graphic design, typography, critical essays, and experimental texts. Contributors include Richard
Hollis, Robin Kinross on Anthony Froshaug's typographic standards, and Metahaven. The specific interior spread that
inspired this style demonstrates Éditions B42's characteristic editorial discipline: a dark column and a light column
held in exact tension, neither subordinate, the typography doing all the relational work that color and image might do
elsewhere.

**Visual character:** The page divides cleanly in half. The dark left column (zinc-800, teal text) serves as a visual
counterweight to the lighter content on the right. Neither side is subordinate to the other. An image grid on the light
side creates a secondary rhythm.

**Typography:** EB Garamond for the dark header (classical authority), Bebas Neue for the light title (modernity), IBM
Plex Serif for body text (neutral, readable).

**Colors:** `zinc-800` dark side, `editorial-teal` accent, `stone-50` light side, `neutral-200` divider border.

**Best used for:** Critical essays, gallery features, architecture and design coverage, any article that benefits from
holding two ideas in tension.

---

## 10. Split Editorial (`article-style-split-editorial`)

**Inspiration:** _Designing Names & Companies_ (1994, Danish Design Centre) — a guide to corporate naming by Jens
Bernsen, with a preface by Wally Olins. The book's interior spreads are structurally rigorous typographic layouts where
the grid itself carries meaning, and the relationship between dark and light fields is not decorative but argumentative.
The subject matter — naming as a design problem, identity as something rational yet emotionally charged — is baked into
the style's DNA.

**Visual character:** Two columns with completely inverted color relationships: zinc-700 on the left (white text), white
on the right (zinc-700 text). The spanning header uses a clip-path technique to appear white over the dark column and
red over the light column simultaneously — a single word that means two different things depending on where you're
standing.

**Typography:** Raleway 900 for the display header (condensed, forceful), Raleway 700 for section headers, Crimson Text
for body copy (literary, warm).

**Colors:** `zinc-700` left background, white right background, `red-600` right section headers and accent.

**Best used for:** Analytical features, essays that hold two perspectives, design and branding criticism, long-form
journalism with clear structural divisions.

---

## 11–13. Designer Brief (`article-style-designer-brief` / `-barbie` / `-ocean`)

**Inspiration:** _No Brief: Graphic Designers' Personal Projects_ (2002, RotoVision) edited by John O'Reilly — a survey
of work designers undertake when creating their own brief, "either for self-promotion or to explore an interesting form
or style." The book's premise is the style's premise: what does a designer make when there is no client, no constraint,
no approval chain? The answer is always revealing. The vertical spine, the tag label, the oversized header — these are
the marks of something made for its own sake.

**Visual character:** A narrow vertical spine on the left edge carries the section title in rotated text (writing-mode:
vertical-rl), mimicking a book's spine. The content sits offset to the right, centered within the field. A small tag
label above the header identifies the content type.

**Typography:** Abril Fatface for the header (large, confident, exhibition-weight), IBM Plex Serif for the subheader
(structured, technical), Roboto for body text (clean, neutral).

**Variants:**

- **Yellow** (`designer-brief`): `brief-yellow` (`#ffff00`), `brief-red` tag. The classic. Maximum visibility.
- **Barbie** (`designer-brief-barbie`): `brief-pink` (`#ff69b4`), `brief-seafoam` tag. Playful, fashion-forward.
- **Ocean** (`designer-brief-ocean`): `brief-cyan` (`#00bfff`), `brief-lime` tag. Digital, futurist, energetic.

**Best used for:** Short features, product showcases, profile pieces, anything that benefits from a strong single-voice
presentation. The spine structure works particularly well for regular columns or branded recurring sections.

---

## 14. Wilde Plakken (`article-style-wilde-plakken`)

**Inspiration:** _Wild Plakken_ (1993, De Balie, Amsterdam) — the retrospective catalog for a major exhibition of the
groundbreaking Amsterdam graphic design collective of the same name, founded in 1977 by Lies Ros, Frank Beekers, and Rob
Schröder. "Wild plakken" means wild pasting — guerrilla-style street poster placement, affordable and reproducible
designs made for left-leaning causes and political activism. The collective bridged analog craftsmanship and digital
experimentation, and treated graphic design as a form of visual activism. Their work wasn't made for galleries; it was
made for walls.

**Visual character:** A black header section leads with a strong image and blue-on-black typography. Below, a CSS Grid
dense-layout auto-places prose and images together, creating a flowing collage effect. No strict rhythm — the grid finds
its own order.

**Typography:** Bebas Neue for the header (maximum weight), Fredoka for the subheader (humanist contrast), IBM Plex
Serif for prose (functional, document-like).

**Colors:** Black header, `wilde-blue` (`#0066ff`) header text, white content, `wilde-charcoal` prose text, `gray-200`
image placeholders.

**Best used for:** Photography features, art exhibition coverage, cultural events, anything where images and text should
feel like equals in a non-hierarchical conversation.

---

## 15. Music Bold (`article-style-music-bold`)

**Inspiration:** The cover of _Puzzlegrams_ (1990, Barrie & Jenkins) — a collection of classic puzzles revisualized and
redesigned by Pentagram, edited by David Hillman. A companion to _Pentagames_ (the Pentagram style's source), published
the same year by the same press. Where Pentagames became a system of color-block grids, the Puzzlegrams cover distills
Pentagram's visual language to its most commanding register: a single dominant field, bold display type that commands
the full width, and a red accent that functions as punctuation. Music Bold takes that cover logic and stretches it to
full height.

**Visual character:** Deep blue field, full-height. The header in Limelight takes up enormous real estate — the text is
almost structural. A centered square image dominates the middle third. Link buttons at the bottom convert the article
into a navigation interface. A red accent bar at the base closes the composition.

**Typography:** Limelight for header and subheader (theatrical, retrofuturist), IBM Plex Serif italic for the tagline,
Space Mono for links (catalog, functional).

**Colors:** `music-blue` (`#0052cc`) background, white text, `music-red` (`#ff2d2d`) accents and hover states.

**Best used for:** Album features, playlist curation, music discovery, any piece meant to feel like a listening event
rather than an article. Intentionally light on prose.

---

## 16. Trademarks (`article-style-trademarks`)

**Inspiration:** _TM: Trademarks Designed by Chermayeff & Geismar_ (2000, Lars Müller Publishers) — a 288-page monograph
collecting over 200 trademarks from the 40-year history of Chermayeff & Geismar Inc., the firm responsible for the NBC
peacock, the Chase Bank octagon, the MoMA logotype, and hundreds of other instantly recognizable marks. The book's deep
purple cover, bold symbolic mark, and use of yellow and rose-red accents directly inform the style's palette.

**Visual character:** A purple-950 ground (near-black purple) sets the stage. A large decorative "TM" mark in Monoton
anchors the header beside the section title in Audiowide — two display fonts that feel both retro and alien. Below, an
auto-fill grid of album art cards acts as both catalog and discovery interface. Each card is a button: image, album name
in yellow, artist name in off-white.

**Typography:** Monoton for the TM mark (ornate, decorative, slightly eerie), Audiowide for the section title
(technical, futurist), Space Mono for item metadata (catalog precision).

**Colors:** `purple-950` background, `violet-800` cards, `rose-900` accent bar and card borders, `yellow-400` title and
item names, `stone-100` body text.

**Best used for:** Music discovery, album curation, art recommendations, any context where the goal is to present a
collection of things worth seeking out. Intentionally minimal prose.

---

## 17–18. Pentagram (`article-style-pentagram` / `-inverted`)

**Inspiration:** _Pentagames_ (1990, Barrie & Jenkins), a collection of games designed by Pentagram and edited by David
Hillman. Its preface reads: _"The art of winning is thinking. It doesn't matter where you are: you can think, or you can
play games. These games you do both. With the right skill and wit, you win."_ The book treats games as a design problem
— rule systems made physical and visual — which is exactly what the style does with color and layout.

**Visual character:** A column of rotated headers (Zilla Slab Highlight, 45-degree angle) establishes playful
disorientation as the entry point. Below, a two-column grid of color-block cards alternates between yellow/black,
black/yellow, white/black, and black/white — every combination of the same three colors in every possible relationship.
The design argues that contrast is a game with rules, and the rules are the point.

**Typography:** Zilla Slab Highlight for headers (slab serif with inline cutout, structurally bold), IBM Plex Serif for
block text (contrast via typeface rationality).

**Variants:**

- **Standard** (`pentagram`): Black background. Yellow headers rotate against darkness.
- **Inverted** (`pentagram-inverted`): `yellow-400` background. The same design from the other side.

**Colors:** Black / `yellow-400` / white in every combination.

**Best used for:** Design criticism, visual essays, anything that wants to argue for the power of restriction. The
color-block format works well for listicles or multi-part features.

---

## 19. Thirty Centuries (`article-style-thirty-centuries`)

**Inspiration:** _Thirty Centuries of Graphic Design_ (1987, Watson Guptill, New York) by James Craig and Bruce Barton —
the first book to survey graphic design in the full context of human history, from prehistoric pictographs to
computer-generated imagery. Its preface describes it as "a story of endless fascination — one that both anticipates and
mirrors the history of civilisation." The style mirrors the book's own ambition: a design that deploys every typographic
register (eyebrow, drop cap, pullquote, column split, footer) as an argument for typography as a discipline worth taking
seriously. The yellow byline box references the book's own authorship — James Craig and Bruce Barton, whose names appear
below a yellow box in the cover design.

**Visual character:** The most typographically complex style in the library. White page, maximum white space. The
headline in Playfair Display uses a red drop cap on its first letter. Blue underlines separate the headline and
subheadline from the body. A pullquote in Playfair italic interrupts the prose. Column splits, byline, and footer all
use distinct type treatments. A yellow byline box sits flush to the top-right corner, outside the padding, in the manner
of a book colophon.

**Typography:** Playfair Display for headline and pullquote (prestige, editorial), Raleway 700 for the subheadline
(modern, contrasting), EB Garamond for intro and body (scholarly, warm), Space Mono for eyebrow and footer (catalog,
metadata).

**Colors:** White background, black headline, `music-blue` (`#0052cc`) border accents, `brief-red` drop cap,
`yellow-400` byline box, various grays for hierarchy.

**Best used for:** Long-form writing that wants to be taken seriously. Literary criticism, design history, personal
essays with formal ambitions. The most prose-dense style in the library — it earns every element through content weight.

---

## Combining Styles

A zine is most interesting when styles create contrast with each other. Some productive pairings:

- **Geometric → Minimal Dark**: Hard red announcement, then quiet reflection.
- **Acid Bright → Thirty Centuries**: Maximum energy, then maximum refinement.
- **Trademarks → Split Editorial**: Visual catalog, then analytical deep-dive.
- **Designer Brief → Wilde Plakken**: Branded single-voice, then image-forward sprawl.
- **Pentagram → European Editorial**: Geometric argument, then two-sided conversation.

There are no rules about sequencing. The point is that each style should feel like a distinct room — different
temperature, different light, different expectation of the reader.
