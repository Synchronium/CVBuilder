Create a new CV template for the CVBuilder project.

If the user has not provided a style description in $ARGUMENTS, ask them to describe the visual style they want before proceeding. Examples: "sleek and typographic, lots of whitespace", "bold and colourful, shows personality", "minimal and recruiter-safe, no colour". Get a clear description before writing any code.

Once you have a description, implement the template:

## How templates work

- Each template lives in `src/templates/<name>/` with two files: `<Name>Template.tsx` and `<name>.css`
- Templates are registered in `src/templates/registry.ts`
- All templates receive `TemplateProps` from `src/templates/types.ts` — read this file
- The resolved view model is in `src/data/resolveCv.ts` — read this to understand available data
- Use the `BulletList` component from `src/components/BulletList.tsx` for experience bullets
- Use `className="web-only"` on anything that should be hidden in print (e.g. LinkedIn link)
- Roles with `role.condensed === true` are older/less important — show less detail for these in print
- Read an existing template (e.g. `src/templates/divided/DividedTemplate.tsx` and `divided.css`) as a reference for structure and patterns — do not copy the design, only the patterns

## CSS requirements

- Import Google Fonts at the top of the CSS file if using custom typography
- Scope all styles under `.template-<name>` to avoid leaking into other templates
- Include a `@media print` section that:
  - Sets `font-size: 9.5pt` as the base
  - Tightens spacing (margins, padding, gaps) to aim for **two A4 pages** of content
  - Hides `.web-only` elements (this is handled globally in base.css, but you can add template-specific print overrides)
  - Suppresses detail for `.role--condensed` roles (e.g. hide company description and tech stack)
  - Sets `@page { size: A4; margin: 15mm 18mm }` if not already in base styles

## After implementing

1. Register the new template in `src/templates/registry.ts`
2. Start the dev server with `npm run dev` (background), then take screenshots using the project script:
   ```
   node scripts/screenshot.js <name> /tmp/cv-screen.png
   node scripts/screenshot.js <name> /tmp/cv-print.png --print
   ```
3. Report what you built and show both screenshots
