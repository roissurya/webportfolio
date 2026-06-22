---
name: Noir Editorial
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 1px
  margin-mobile: 24px
  margin-desktop: 64px
  column-gap: 32px
  section-padding: 128px
---

## Brand & Style

This design system is built upon a high-contrast, "Noir" editorial aesthetic. It targets creative professionals, architects, and high-end fashion portfolios where the content must command absolute attention. The brand personality is authoritative, sophisticated, and intentionally stark.

The style fuses **Minimalism** with **Brutalism**. It relies on raw structural elements, such as thin grid lines and expansive whitespace, to create a sense of architectural permanence. The emotional response is one of serious, curated luxury—eschewing decorative fluff for functional elegance and bold typographic hierarchy.

## Colors

The palette is strictly monochromatic to maintain an editorial "Noir" feel. 

- **Primary (#FFFFFF):** Used for all primary headings, body text, and critical UI actions to ensure maximum legibility against the dark void.
- **Background (#0D0D0D):** A deep "Pitch Black" that provides a limitless sense of depth.
- **Accents (#888888):** A neutral gray used for secondary information, metadata, and disabled states to prevent visual clutter.
- **Structural Lines:** Pure white at 8% opacity is used for the underlying grid and component borders, providing a subtle skeletal structure without breaking the high-contrast immersion.

## Typography

The typographic strategy is the core of the design system. It uses **Syne** for its brutalist, heavy-weight characteristics in headlines, creating a rhythmic "thumping" visual effect. **Inter** provides a utilitarian counter-balance for long-form reading and functional labels.

- **Scale:** Use dramatic size shifts between display and body text to reinforce hierarchy.
- **Spacing:** Display type should be set with tight tracking to emphasize its mass.
- **Labels:** Use the `label-caps` style for metadata and navigation to mimic the look of architectural blueprints or gallery placards.

## Layout & Spacing

The layout follows a **Fixed Grid** model based on a 12-column system for desktop and a 4-column system for mobile. 

- **The Grid:** Use 1px white lines (`rgba(255, 255, 255, 0.08)`) to visually define the columns and rows. This "blueprinting" effect is central to the aesthetic.
- **Rhythm:** Spacing is generous. Sections should be separated by large vertical gaps (`section-padding`) to allow the photography or portfolio content to breathe.
- **Alignment:** All content must snap strictly to the grid lines. Text should be left-aligned or justified to reinforce the rigid, editorial structure.

## Elevation & Depth

This design system rejects shadows and blurs. Depth is conveyed exclusively through **Tonal Layers** and **Bold Outlines**.

- **Surface Levels:** The base is `#0D0D0D`. Elements that need to appear "raised" do not use shadows; instead, they use a subtle fill of `#1A1A1A` or are simply encased in a 1px white border.
- **Interactions:** Hover states should be binary. A button or card doesn't lift; it either fills with white (inverting the text to black) or the border thickness increases.
- **Transparency:** Avoid glassmorphism. Use solid fills or 100% transparent containers with 1px borders to maintain the raw, structural integrity.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every UI element—buttons, input fields, images, and cards—must have square corners. This reinforces the architectural and brutalist nature of the design. Rounding is viewed as too "soft" for this specific editorial narrative.

## Components

### Buttons
Primary buttons are solid white with black text (`#0D0D0D`). Secondary buttons are transparent with a 1px white border. All buttons use the `label-caps` typography and have 0px border radius. Hovering a primary button should invert it or create a slight offset stroke.

### Cards & Grid Items
Portfolio items are housed in containers defined by 1px grid lines. Images should be high-contrast (black and white photography is preferred). Captions sit directly below the image, snapped to the left grid line, using `body-md` for descriptions and `label-caps` for categories.

### Navigation
The navigation should be minimal and fixed to the top grid line. Use the 12-column structure to place the logo on the far left and navigation links on the far right. No background blur; use a solid `#0D0D0D` fill if transparency causes legibility issues during scroll.

### Inputs
Input fields are simple underlines (1px white at 0.2 opacity) that brighten to 1.0 opacity on focus. Labels sit above the input in `label-caps`. 

### List Items
Lists should be separated by full-width 1px horizontal lines. Each item should feel like a row in an index, with a large "Syne" font number (e.g., 01, 02) to the left of the title.