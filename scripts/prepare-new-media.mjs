import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

await mkdir('public/design-work', {recursive:true});
const boards = [
  ['infographics', 'C:/Users/hwawei/Downloads/ChatGPT Image Oct 26, 2026, 10_54_48 PM-1.png'],
  ['posters', 'C:/Users/hwawei/Downloads/ChatGPT Image Oct 26, 2026, 10_54_50 PM-2.png'],
];
for (const [name, source] of boards) {
  execFileSync('ffmpeg',['-y','-i',source,'-frames:v','1','-c:v','libwebp','-quality','90',`public/design-work/${name}.webp`],{stdio:'ignore'});
  execFileSync('ffmpeg',['-y','-i',source,'-vf','scale=960:-1','-frames:v','1','-c:v','libwebp','-quality','84',`public/design-work/${name}-cover.webp`],{stdio:'ignore'});
}
await writeFile('public/design-work/canva-notebook.svg',`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><rect width="1200" height="750" fill="#e6e5dc"/><g stroke="#242e38" fill="none"><rect x="90" y="80" width="1020" height="590"/><path d="M90 175h1020M765 175v495"/></g><g font-family="sans-serif" fill="#242e38"><text x="130" y="140" font-size="18" letter-spacing="3">DESIGN FILES / CANVA</text><text x="130" y="310" font-size="72" font-weight="700">Ideas, on</text><text x="130" y="395" font-size="72" font-weight="700">the canvas.</text><text x="130" y="590" font-size="22">Websites · invitation · shared design files</text><text x="830" y="280" font-size="95">Aa</text><text x="830" y="380" font-size="95">Bb</text><text x="830" y="480" font-size="95">Cc</text></g></svg>`);
const photos = [
  ['market', 'photo-1542838132-92c53300491e'],
  ['dog', 'photo-1552053831-71594a27632d'],
  ['basketball', 'photo-1546519638-68e109498ffc'],
  ['tomatoes', 'photo-1546094096-0df4bcaaa337'],
  ['greens', 'photo-1540420773420-3366772f4999'],
  ['oranges', 'photo-1547514701-42782101795e'],
  ['mountain', 'photo-1464822759023-fed622ff2c3b'],
];
for (const [name,id] of photos) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${name==='market'||name==='basketball'?1600:1000}&q=82`;
  const response = await fetch(url);
  if(!response.ok) throw new Error(name+': '+response.status);
  const file = `design/preview-sources/${name}-reference.jpg`;
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
  execFileSync('ffmpeg',['-y','-i',file,'-frames:v','1','-c:v','libwebp','-quality','84',`public/concepts/${name}.webp`],{stdio:'ignore'});
  console.log(name+': '+url);
}
const css = await fetch('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap').then(r=>r.text());
const fontUrl = css.match(/url\((https:[^)]+)\)/)?.[1];
if(!fontUrl) throw new Error('Font URL not found');
await writeFile('public/fonts/barlow-condensed.ttf', Buffer.from(await fetch(fontUrl).then(r=>r.arrayBuffer())));
console.log('Prepared presentation boards, reference photographs, and condensed type.');
