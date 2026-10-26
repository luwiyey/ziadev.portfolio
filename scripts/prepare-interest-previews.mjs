import { execFileSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const folder = path.resolve('public/interests');
for (const file of await readdir(folder)) {
  if (!file.endsWith('.png')) continue;
  execFileSync(process.env.FFMPEG_PATH || 'ffmpeg', [
    '-y', '-i', path.join(folder, file), '-c:v', 'libwebp',
    '-quality', '86', '-compression_level', '6',
    path.join(folder, file.replace('.png', '.webp')),
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}
console.log('Optimized Blender renders for the website.');
