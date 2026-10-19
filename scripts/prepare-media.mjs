import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const root = '.codex-remote-attachments/01a154a9-32ba-7dd2-9fbc-f32ec448e32c';
const batch = `${root}/4fce234a-eecb-4a5f-95f1-ab99100d0067`;
const more = `${root}/e676680b-f5e4-45c2-8cbc-96ad4fa30520`;
await fs.mkdir('public/images', { recursive: true });
await fs.mkdir('public/frames', { recursive: true });
const images = [
  [`${batch}/1-1002514484.jpg`, 'diagnostico'],
  [`${batch}/2-1002514485.jpg`, 'oficina-ampla'],
  [`${batch}/3-1002514486.jpg`, 'oficina-elevadores'],
  [`${batch}/4-1002514487.jpg`, 'oficina-equipe'],
  [`${batch}/5-1002514488.jpg`, 'autopecas'],
  [`${more}/1-1002514492.jpg`, 'lubrificantes'],
  [`${more}/2-1002514493.jpg`, 'rodas'],
  [`${more}/4-1002514044.jpg`, 'simbolo'],
];
await Promise.all(images.map(([source, name]) => sharp(source).rotate().resize({ width: name === 'simbolo' ? 180 : 1100, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/images/${name}.webp`)));

const video = `${root}/eacda3cb-d257-4b46-83e8-196f7e33bda9/2-VID_20261019114128.mp4`;
// Bound decoded frame memory on phones (about 96 MB for the whole sequence).
for (const file of await fs.readdir('public/frames')) {
  if (/^\d{3}\.webp$/.test(file)) await fs.unlink(path.join('public/frames', file));
}
execFileSync(ffmpeg, ['-y', '-i', video, '-vf', 'fps=12.2,scale=432:768', '-frames:v', '72', '-start_number', '0', '-c:v', 'libwebp', '-quality', '76', '-threads', '2', 'public/frames/%03d.webp'], { stdio: 'pipe' });
const count = (await fs.readdir('public/frames')).filter(name => name.endsWith('.webp')).length;
await fs.writeFile('public/frames/manifest.json', JSON.stringify({ count, width: 432, height: 768 }));
await fs.copyFile('public/frames/000.webp', 'public/images/hero-inicio.webp');
execFileSync(ffmpeg, ['-y', '-sseof', '-0.08', '-i', video, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '88', 'public/images/hero-final.webp'], { stdio: 'pipe' });
await sharp(`${batch}/1-1002514484.jpg`).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 86 }).toFile('public/images/social.jpg');
const files = await fs.readdir('public/frames');
let size = 0;
for (const file of files) size += (await fs.stat(path.join('public/frames', file))).size;
console.log(`Prepared ${images.length} photographs and ${count} video frames (${(size / 1024 / 1024).toFixed(2)} MB).`);
