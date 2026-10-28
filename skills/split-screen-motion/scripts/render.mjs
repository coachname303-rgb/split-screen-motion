// Render a frames.js into the top-half motion video (1080x960, no audio).
//   node render.mjs <frames.js> --still 2,8.5            check frames as PNG (still_<t>.png next to frames.js)
//   node render.mjs <frames.js>                          -> top.mp4 next to frames.js
//   node render.mjs <frames.js> --with talk.mp4 [--crop-y 300]
//        -> also preview.mp4: motion on top + talking video below (1080x1920, with its audio)
//   node render.mjs <frames.js> --with talk.mp4 --crop-y 620 --stack-only   re-stack an existing top.mp4
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// puppeteer-core from the skill folder, or else from the current project folder
// (an installed skill folder can be read-only, so the project is the fallback place to npm install it)
async function loadPuppeteer() {
  try { return (await import('puppeteer-core')).default; } catch {}
  try {
    const req = createRequire(path.join(process.cwd(), 'package.json'));
    return (await import(pathToFileURL(req.resolve('puppeteer-core')).href)).default;
  } catch {}
  console.error('puppeteer-core not found. Run once (PUPPETEER_SKIP_DOWNLOAD=1): npm install puppeteer-core\n'
    + '  in the skill folder, or in your project folder if the skill folder is read-only.');
  process.exit(1);
}
const puppeteer = await loadPuppeteer();

const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const opt = name => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const framesPath = path.resolve(argv[0] || '');
if (!argv[0] || !fs.existsSync(framesPath)) {
  console.error('usage: node render.mjs <frames.js> [--still t1,t2] [--with video.mp4] [--crop-y px] [--fps 30]');
  process.exit(1);
}
const outDir = path.dirname(framesPath);
const fps = +(opt('--fps') || 30);

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find(p => p && fs.existsSync(p));
if (!CHROME) { console.error('Chrome/Edge not found; set CHROME_PATH'); process.exit(1); }

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit' });
    p.on('close', c => c === 0 ? resolve() : reject(new Error(`${cmd} exited ${c}`)));
  });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  const warnings = [];
  page.on('console', m => m.type() === 'warn' && warnings.push(m.text()));
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.setViewport({ width: 1080, height: 960, deviceScaleFactor: 1 });
  const url = pathToFileURL(path.join(SKILL, 'engine.html')).href + '?render=1&frames=' + encodeURIComponent(pathToFileURL(framesPath).href);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.ready);
  warnings.forEach(w => console.warn('warning:', w));
  const duration = await page.evaluate(() => window.DURATION);

  if (opt('--still')) {
    for (const raw of opt('--still').split(',')) {
      await page.evaluate(t => window.seek(t), Number(raw));
      const file = path.join(outDir, `still_${raw.trim()}.png`);  // named as typed ("34.0", not "34")
      await page.screenshot({ path: file });
      console.log('wrote', file);
    }
  } else {
    const out = path.join(outDir, 'top.mp4');
    if (!(argv.includes('--stack-only') && fs.existsSync(out))) await renderTop(out);
    const talk = opt('--with');
    if (talk) {
      // bottom half = a 960px-tall slice of the talking video; move it with --crop-y so burned-in subtitles stay in view
      const cropY = opt('--crop-y') ?? '(ih-960)/2';
      const preview = path.join(outDir, 'preview.mp4');
      await run('ffmpeg', ['-y', '-v', 'error', '-i', out, '-i', path.resolve(talk), '-filter_complex',
        `[1:v]scale=1080:-2,crop=1080:960:0:${cropY},setsar=1[b];[0:v]setsar=1[t];[t][b]vstack=shortest=1,format=yuv420p[v]`,
        '-map', '[v]', '-map', '1:a?', '-c:v', 'libx264', '-crf', '18', '-c:a', 'aac', '-shortest', preview]);
      console.log('wrote', preview);
    }
  }

  async function renderTop(out) {
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'medium', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise(r => ff.on('close', r));
    const n = Math.ceil(duration * fps);
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.seek(t), i / fps);
      const buf = await page.screenshot({ type: 'png', optimizeForSpeed: true });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % (fps * 5) === 0) console.log(`rendering ${Math.round(i / fps)}s / ${Math.round(duration)}s`);
    }
    ff.stdin.end();
    await done;
    console.log('wrote', out);
  }
} finally {
  await browser.close();
}
