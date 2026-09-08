import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const pages = (await readdir('.')).filter(p => p.endsWith('.html'));
let links = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page}: one main heading`);
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<main id="main">/);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^https?:/.test(url)) continue;
    const [file, hash] = url.split('#');
    const destination = file || page;
    const dir = destination.includes('/') ? destination.slice(0, destination.lastIndexOf('/')) : '.';
    assert.ok((await readdir(dir)).includes(destination.split('/').pop()), `${page}: exact-case path ${url}`);
    if (hash) assert.ok((await readFile(destination,'utf8')).includes(`id="${hash}"`), `${page}: missing anchor ${url}`);
    links++;
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) assert.match(tag, /alt="[^"]*"/);
  for (const [tag] of html.matchAll(/<iframe\b[^>]*>/g)) assert.match(tag, /title="[^"]+"/);
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(tag, /rel="noopener noreferrer"/);
}
const changedVideos = execFileSync('git',['diff','--name-only','HEAD','--','videos'],{encoding:'utf8'}).trim();
assert.equal(changedVideos, '', 'Original video files must remain unchanged');
console.log(`OK: ${pages.length} pages, ${links} local links/assets, accessible labels, original videos unchanged.`);
