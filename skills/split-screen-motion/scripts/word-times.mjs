// Find when words are spoken, to put animation cues on the exact word.
//   node word-times.mjs <raw.json|clip.srt>                 list every line with start/end
//   node word-times.mjs <raw.json|clip.srt> ไปยิม "ไม่ต้องโพสต์"   time of each occurrence
// raw.json = faster-whisper output with word timestamps: [{start,end,text,words:[{w,s,e}]}]
// (Thai comes back as character pieces; they are joined so any substring can be found.)
// With an .srt only, times are estimated from the character position inside the line (marked ~).
import fs from 'node:fs';

const [file, ...keys] = process.argv.slice(2);
if (!file) { console.error('usage: node word-times.mjs <raw.json|clip.srt> [keyword ...]'); process.exit(1); }
const norm = s => s.replace(/\s+/g, '');
const fmt = t => t.toFixed(2).padStart(6);

// segments: { start, end, text, at(i) -> time of character i of norm(text), exact }
let segs;
if (file.endsWith('.json')) {
  segs = JSON.parse(fs.readFileSync(file, 'utf8')).map(s => {
    const times = [];
    for (const w of s.words || []) for (const _ of norm(w.w)) times.push(w.s);
    return { start: s.start, end: s.end, text: s.text, at: i => times[i] ?? s.start, exact: (s.words || []).length > 0 };
  });
} else {
  const toSec = x => { const [h, m, r] = x.trim().split(':'); return +h * 3600 + +m * 60 + parseFloat(r.replace(',', '.')); };
  segs = fs.readFileSync(file, 'utf8').trim().split(/\r?\n\r?\n/).map(b => {
    const lines = b.split(/\r?\n/);
    const [a, z] = lines[1].split('-->').map(toSec);
    const text = lines.slice(2).join(' ');
    const n = norm(text).length || 1;
    return { start: a, end: z, text, at: i => a + (z - a) * i / n, exact: false };
  });
}

if (!keys.length) {
  for (const s of segs) console.log(`${fmt(s.start)} - ${fmt(s.end)}  ${s.text}`);
} else {
  for (const k of keys) {
    const nk = norm(k);
    let found = 0;
    for (const s of segs) {
      const nt = norm(s.text);
      for (let i = nt.indexOf(nk); i >= 0; i = nt.indexOf(nk, i + 1)) {
        console.log(`${k}: ${s.exact ? ' ' : '~'}${fmt(s.at(i))}   (line ${fmt(s.start)}: ${s.text})`);
        found++;
      }
    }
    if (!found) console.log(`${k}: not found`);
  }
}
