import { writeFile } from 'node:fs/promises';

const covers = [
  ['budget', 'Ledger / Monthly Money', 'Every entry. A clearer picture.', '#101f27', '#d5e97a', 'CASH FLOW / INTERACTIVE WEB APP'],
  ['material', 'Orbit Material Lab', 'Form. Color. Perspective.', '#ded7cd', '#813146', 'A LIGHTWEIGHT CSS 3D STUDY'],
  ['motion', 'Motion Timing Studio', 'The same move. A different feeling.', '#efe6d5', '#90334a', 'TRY THE KEYFRAMES'],
  ['design', 'Palette & Type Studio', 'Make it feel like you.', '#f5e8cf', '#681c30', 'COLOR / TYPE / CONTRAST'],
  ['board', 'Focusboard', 'Less juggling. More doing.', '#e5e9df', '#495f40', 'AN INTERACTIVE TASK BOARD'],
];
for (const [id, title, subtitle, background, color, eyebrow] of covers) {
  const shapes = id === 'target' ? `<g fill="none" stroke="${color}"><circle cx="900" cy="340" r="130"/><circle cx="900" cy="340" r="95"/><path d="M900 175v330m-165-165h330"/></g>`
    : id === 'material' ? `<g stroke="${color}" stroke-width="2"><path d="M880 170l155 85v180l-155 85-155-85V255Z" fill="${color}" opacity=".2"/><path d="M880 170v180l155 85M880 350l-155 85M725 255l155 95 155-95" fill="none"/></g>`
    : `<g fill="${color}" opacity=".15"><rect x="780" y="155" width="250" height="370" rx="${id === 'planner' ? 35 : 8}"/><rect x="820" y="220" width="170" height="45" rx="6"/><rect x="820" y="290" width="170" height="45" rx="6"/><rect x="820" y="360" width="170" height="45" rx="6"/></g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><rect width="1200" height="750" fill="${background}"/><path d="M65 90H1135M65 640H1135" stroke="${color}" opacity=".25"/>${shapes}<g fill="${color}"><text x="70" y="155" font-family="sans-serif" font-size="16" letter-spacing="3">${eyebrow.replaceAll('&','&amp;')}</text><text x="70" y="330" font-family="Georgia,serif" font-size="48">${title.replaceAll('&','&amp;')}</text><text x="70" y="390" font-family="sans-serif" font-size="23">${subtitle}</text><rect x="70" y="470" width="215" height="50" rx="25" fill="none" stroke="${color}"/><text x="177" y="501" text-anchor="middle" font-family="sans-serif" font-size="16">PLAY IN PORTFOLIO +</text><text x="70" y="690" font-family="sans-serif" font-size="14" letter-spacing="2">ZIA MARIANO / INTERACTIVE CONCEPT</text></g></svg>`;
  await writeFile(new URL('../public/previews/lab-' + id + '.svg', import.meta.url), svg);
}
console.log('Prepared five original interactive-demo covers.');
