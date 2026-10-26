import { closeSync, openSync, readSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const directory = path.resolve('public/artifacts/videos');
let count = 0;
for (const file of readdirSync(directory).filter(file => file.endsWith('.mp4'))) {
  const source = path.join(directory, file);
  const descriptor = openSync(source, 'r');
  const header = Buffer.alloc(128);
  try { readSync(descriptor, header, 0, header.length, 0); }
  finally { closeSync(descriptor); }
  if (statSync(source).size < 1024 || header.toString('utf8').startsWith('version https://git-lfs.github.com/')) {
    throw new Error(file + ' is an unresolved Git LFS pointer, not a playable video. Enable Git LFS in the Vercel project Git settings and redeploy.');
  }
  count++;
}
if (count !== 10) throw new Error('Expected all ten original project videos.');
console.log('Verified ten actual video files; no unresolved Git LFS pointers.');
