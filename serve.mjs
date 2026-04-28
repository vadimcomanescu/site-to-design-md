#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const ROOT = resolve(fileURLToPath(import.meta.url), '..');
const PORT = parseInt(process.env.PORT || '4173', 10);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

async function listSites() {
  const dir = join(ROOT, 'sites');
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return []; }
  const out = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const designPath = join(dir, e.name, 'DESIGN.md');
    try {
      await stat(designPath);
      const content = await readFile(designPath, 'utf8');
      const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      let name = e.name, description = '';
      if (m) {
        const fm = m[1];
        const nameM = fm.match(/^name:\s*(.+)$/m);
        const descM = fm.match(/^description:\s*(.+)$/m);
        if (nameM) name = nameM[1].trim().replace(/^["']|["']$/g, '');
        if (descM) description = descM[1].trim().replace(/^["']|["']$/g, '');
      }
      out.push({ slug: e.name, name, description, path: `sites/${e.name}/DESIGN.md` });
    } catch {}
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  try {
    if (url.pathname === '/api/sites') {
      const list = await listSites();
      res.writeHead(200, { 'content-type': MIME['.json'] });
      res.end(JSON.stringify(list));
      return;
    }
    const pathname = url.pathname === '/' ? '/viewer.html' : url.pathname;
    const filePath = resolve(ROOT, '.' + decodeURIComponent(pathname));
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
    const data = await readFile(filePath);
    res.writeHead(200, { 'content-type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});

server.listen(PORT, async () => {
  const url = `http://localhost:${PORT}/`;
  const sites = await listSites();
  console.log(`\nDESIGN.md viewer  ${url}`);
  console.log(`${sites.length} site${sites.length === 1 ? '' : 's'} indexed${sites.length ? ': ' + sites.map(s => s.slug).join(', ') : ''}\n`);
  const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  try { spawn(opener, args, { detached: true, stdio: 'ignore' }).unref(); } catch {}
});
