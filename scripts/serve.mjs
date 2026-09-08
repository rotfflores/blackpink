import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = process.cwd();
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.avif':'image/avif', '.mp4':'video/mp4' };
createServer(async (req,res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root + sep) || path.split('/').some(p => p.startsWith('.')) || !types[extname(file)]) { res.writeHead(403).end(); return; }
    const info = await stat(file);
    if (!info.isFile()) { res.writeHead(404).end(); return; }
    const headers = { 'Content-Type':types[extname(file)], 'Accept-Ranges':'bytes', 'Cache-Control':'no-cache' };
    let start = 0, end = info.size - 1, code = 200;
    if (req.headers.range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if (!match) { res.writeHead(416, { 'Content-Range':`bytes */${info.size}` }).end(); return; }
      start = Number(match[1]); end = match[2] ? Math.min(Number(match[2]), end) : end;
      if (start > end || start >= info.size) { res.writeHead(416, { 'Content-Range':`bytes */${info.size}` }).end(); return; }
      headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`; code = 206;
    }
    headers['Content-Length'] = end - start + 1;
    res.writeHead(code,headers);
    if (req.method === 'HEAD') res.end();
    else createReadStream(file,{start,end}).on('error', () => res.destroy()).pipe(res);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(4173,'127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
