import { mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const output = path.resolve('public/fonts');
await mkdir(output, { recursive: true });
const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const fonts = [
  { family: 'DM+Sans:wght@100..900', file: 'dm-sans.woff2', license: 'dmsans' },
  { family: 'Bricolage+Grotesque:wght@200..800', file: 'bricolage.woff2', license: 'bricolagegrotesque' },
  { family: 'Instrument+Serif:ital@1', file: 'instrument-serif-italic.woff2', license: 'instrumentserif' },
  { family: 'Space+Grotesk:wght@300..700', file: 'space-grotesk.woff2', license: 'spacegrotesk' },
];
for (const font of fonts) {
  const css = execFileSync('curl.exe', ['-fsSL', '--max-time', '30',
    'https://fonts.googleapis.com/css2?family=' + font.family + '&display=swap',
    '-H', 'User-Agent: ' + agent], { encoding: 'utf8' });
  const matches = [...css.matchAll(/url\((https:[^)]+\.woff2)\)/g)];
  if (!matches.length) throw new Error('No WOFF2 font returned for ' + font.family);
  execFileSync('curl.exe', ['-fsSL', '--max-time', '30', matches.at(-1)[1], '-o', path.join(output, font.file)]);
  execFileSync('curl.exe', ['-fsSL', '--max-time', '30',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/' + font.license + '/OFL.txt',
    '-o', path.join(output, font.license + '-LICENSE.txt')]);
}
console.log('Downloaded local fonts and their OFL licenses.');
