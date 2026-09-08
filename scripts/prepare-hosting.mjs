import { mkdir, cp, readFile, writeFile, readdir } from 'node:fs/promises';
// Keep root pages portable; the private Sites preview uses the existing public MP4s.
const mediaOrigin = 'https://rotfflores.github.io/blackpink/';
await mkdir('dist', { recursive: true });
for (const folder of ['css', 'js', 'img', 'assets']) await cp(folder, `dist/${folder}`, { recursive: true });
for (const file of (await readdir('.')).filter(name => name.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  await writeFile(`dist/${file}`, html.replaceAll('src="videos/', `src="${mediaOrigin}videos/`));
}
console.log('Sites assets prepared; video backgrounds use the originals on GitHub Pages.');
