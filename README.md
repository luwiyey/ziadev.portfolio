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

All 20 media projects are available through category filters, project search,
and the full gallery. Videos load only after Play is pressed in the project
viewer. Original images and videos are retained in public/artifacts.

Optimized images and video posters are committed in public/previews. Run
npm run previews after changing source media (requires FFmpeg on PATH, or
FFMPEG_PATH set to its executable).

Fonts are served locally from public/fonts, with their OFL licenses included.
npm run fonts refreshes the font files on Windows using curl.exe.

Email links use luwiyeyz@gmail.com. The resume remains at
public/resume/BigDataMARIANO_RESUME.pdf. No public GitHub profile link is shown.
