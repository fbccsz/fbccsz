import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const sharp = require(require.resolve('sharp', {
  paths: [root, process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES].filter(Boolean),
}));
const frames = path.join(root, '.frames');
await mkdir(frames, { recursive: true });
const W = 1280, H = 360, COUNT = 120;
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function banner(t, still = false) {
  const angle = t * Math.PI * 2;
  const pulse = still ? 0.7 : 0.45 + 0.35 * Math.sin(angle);
  const routes = [
    [[764, 153], [833, 153], [865, 121], [945, 121], [977, 153], [1186, 153]],
    [[764, 195], [871, 195], [903, 227], [1055, 227], [1087, 195], [1186, 195]],
    [[764, 237], [814, 237], [846, 269], [963, 269], [995, 237], [1186, 237]],
  ];
  const dots = routes.map((points, i) => {
    const p = ((t + i / 3) % 1) * (points.length - 1);
    const j = Math.min(points.length - 2, Math.floor(p));
    const f = p - j;
    const x = points[j][0] + (points[j + 1][0] - points[j][0]) * f;
    const y = points[j][1] + (points[j + 1][1] - points[j][1]) * f;
    return `<circle cx="${x}" cy="${y}" r="9" fill="#fff" opacity=".06"/><circle cx="${x}" cy="${y}" r="3.5" fill="#e8f0f4"/>`;
  }).join('');
  const line = 'python build.py --ideas';
  const progress = still ? 1 : (t * 2) % 1;
  const length = Math.min(line.length, Math.floor(progress * 42));
  const terminal = still ? line : line.slice(0, length);
  const caret = still || Math.floor(t * 24) % 2 === 0 ? '▌' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <title>ysh.dev — Python, automação e aplicações web</title>
    <rect width="${W}" height="${H}" fill="#080a0c"/>
    <g stroke="#24282c" stroke-width="1"><path d="M40 0v360M704 0v360M1240 0v360M0 46h1280M0 308h1280"/></g>
    <g font-family="monospace" font-size="13" letter-spacing="2" fill="#a8afb5"><text x="64" y="30">YSH / BRASIL</text><text x="1080" y="30">YSH.DEV</text></g>
    <text x="57" y="194" fill="#f6f8fa" font-family="Arial, Helvetica, sans-serif" font-size="132" font-weight="700" letter-spacing="-8">ysh<tspan fill="#080a0c" stroke="#8e959b" stroke-width="1.2">.dev</tspan></text>
    <text x="66" y="252" fill="#c4cbd1" font-family="monospace" font-size="19" letter-spacing="1">PYTHON · AUTOMAÇÃO · APLICAÇÕES WEB</text>
    <g stroke="#394047" stroke-width="1.5" fill="none">${routes.map(p => `<polyline points="${p.map(x => x.join(',')).join(' ')}"/>`).join('')}</g>
    ${dots}
    <g fill="#080a0c" stroke="#65717c" stroke-width="1.5"><circle cx="764" cy="153" r="6"/><circle cx="1186" cy="153" r="6"/><circle cx="764" cy="195" r="6"/><circle cx="1186" cy="195" r="6"/><circle cx="764" cy="237" r="6"/><circle cx="1186" cy="237" r="6"/></g>
    <g font-family="monospace" font-size="15"><text x="764" y="91" fill="#77828c">ysh@dev:~</text><text x="764" y="115" fill="#cdd6dd">&gt; ${escape(terminal)}<tspan fill="#fff">${caret}</tspan></text></g>
    <circle cx="1194" cy="87" r="3" fill="#e7eef4" opacity="${pulse.toFixed(3)}"/>
    <g font-family="monospace" font-size="12" letter-spacing="1.3" fill="#8e979f"><text x="64" y="337">IDEIAS, DADOS E PROCESSOS — CONECTADOS POR CÓDIGO.</text><text x="1074" y="337">GITHUB / YSH</text></g>
  </svg>`;
}

await writeFile(path.join(root, 'assets/ysh-banner-poster.svg'), banner(0.25, true));
for (let i = 0; i < COUNT; i++) {
  await sharp(Buffer.from(banner(i / COUNT))).png().toFile(path.join(frames, String(i).padStart(3, '0') + '.png'));
}
console.log(`Rendered ${COUNT} banner frames at ${W} × ${H}.`);
