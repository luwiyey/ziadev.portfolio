import { readdir, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const publicDir = path.resolve('public');
const output = path.join(publicDir, 'previews');
await mkdir(output, { recursive: true });

function makePreview(source, name, width) {
  execFileSync(process.env.FFMPEG_PATH || 'ffmpeg', [
    '-y', '-i', source, '-frames:v', '1',
    '-vf', "scale='min(" + width + ",iw)':-2", '-c:v', 'libwebp', '-quality', '82',
    path.join(output, name + '.webp'),
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}

for (const file of await readdir(path.join(publicDir, 'artifacts/images'))) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  makePreview(path.join(publicDir, 'artifacts/images', file), path.parse(file).name, 1000);
}
makePreview(path.join(publicDir, 'profile/profile.jpg'), 'profile', 640);
makePreview(path.join(publicDir, 'certificates/tesda.png'), 'tesda', 1000);

for (let number = 1; number <= 10; number++) {
  const id = 'video-' + String(number).padStart(2, '0');
  execFileSync(process.env.FFMPEG_PATH || 'ffmpeg', [
    '-y', '-ss', number >= 9 ? '4' : '2',
    '-i', path.join(publicDir, 'artifacts/videos', id + '.mp4'),
    '-frames:v', '1', '-vf', 'scale=960:-2', '-c:v', 'libwebp', '-quality', '82',
    path.join(output, id + '.webp'),
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}
console.log('Created optimized image previews and video posters.');
