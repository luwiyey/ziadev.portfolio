# Zia Louise Mariano - Portfolio

A responsive portfolio for software, data, and creative design work.

## Development

- Install packages: npm install
- Start the local site: npm run dev
- Check TypeScript: npm run lint
- Build static pages: npm run build
- Preview the build: npm run preview

## Pages

- index.html: the redesigned portfolio, on desktop and mobile.
- mobile.html: the same responsive portfolio, preserving existing mobile links.
- company.html: compatibility entry for previously shared links.
- original.html: the preserved original 3D portfolio, loaded separately.
- ?mode=full also opens the original experience.

## Content and media

Project titles, descriptions, skills, highlights, and credentials live in
src/portfolio-content.ts. The main layout is src/Portfolio.tsx and its styles
are src/portfolio.css. The original experience remains in src/FullPortfolio.tsx.

Original media projects, current live applications, and independent interactive
concepts are available through category filters, search, and the full gallery.
Videos load only after Play is pressed in the project
viewer. Original images and videos are retained in public/artifacts.

Optimized images and video posters are committed in public/previews. Run
npm run previews after changing source media (requires FFmpeg on PATH, or
FFMPEG_PATH set to its executable).

Fonts are served locally from public/fonts, with their OFL licenses included.
npm run fonts refreshes the font files on Windows using curl.exe.

Email links use luwiyeyz@gmail.com. The resume remains at
public/resume/BigDataMARIANO_RESUME.pdf. No public GitHub profile link is shown.

## Personal 3D artwork

The deep-red design uses original Blender renders for the personal interest
icons. Editable models, studio lights, materials, and a contact sheet are in
design/blender/zia-interest-icons.blend. See design/blender/README.md for editing
and rendering instructions. Website images in public/interests are lightweight
WebP exports, so no live 3D engine is needed for the new design.

The renders use transform-only floating animations, pause offscreen, and have
a visible Pause control. System reduced-motion preferences disable animation.

## Interactive concepts and navigation

Five business websites are available at /?concept=fold, northline, good-dog,
still, and forma. Each concept can be tried in the project dialog without
leaving the portfolio, or opened separately. Their back links return to Work.
Six lightweight browser experiments are in the interactive gallery. They are
not represented as additional native Android apps or commissioned projects.

Certificate previews have Close, Back to portfolio, zoom, download, Escape,
keyboard focus containment, and focus restoration. Original media downloads
do not replace the portfolio page with a raw file.

Client work is credited as team contributions under a supervisor. Verified
store links and provenance are documented in design/PROJECT-SOURCES.md.
The old Holistic Vybez domain is deliberately not linked.

Editable Shopify theme source is in design/shopify/forma. It is a theme concept,
not a claim of a live Shopify deployment. See design/shopify/README.md.

## Vercel

This repository connects to the separate ziadev-portfolio Vercel project.
Production follows main. Vercel builds with npm run build and serves dist.
The Library, RouteCalc, and Lingkod-Ani projects are independent deployments.
Local Vercel metadata and environment credentials are ignored by Git.
