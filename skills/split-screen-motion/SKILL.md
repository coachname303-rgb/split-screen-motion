---
name: split-screen-motion
description: Use when the user asks for "การตัดต่อแบบแบ่งหน้าจอ 1" or split-screen-motion, or when making the top-half motion graphics for a split-screen short (Reels/TikTok/Shorts) where a talking-head video sits on the bottom half, especially Thai-language clips with an .srt or whisper transcript; also when asked for "คลิปจอแยก", "โมชั่นครึ่งบน", or split-screen explainer graphics synced to speech.
---

# การตัดต่อแบบแบ่งหน้าจอ 1 (split-screen-motion)

## Overview
Builds the **top half (1080×960)** of a split-screen clip: one UI-mockup frame per spoken line, with each element animating **on the second its word is spoken**. Output `top.mp4` goes over the user's talking video; the user adds subtitles themselves.

Core principle: **the picture shows exactly what is being said, at the moment it is said.** Words on screen come from the transcript; cue times come from `word-times.mjs`, never from guessing.

## Setup (once)
Runs in **Claude Code on the user's computer**: needs Node 18+, ffmpeg, Chrome or Edge (or `CHROME_PATH`), internet for the Prompt font, and Python + `pip install faster-whisper numpy` for word timings (NVIDIA GPU optional; CPU works, slower). In a chat without a local shell (claude.ai), only plan frames and write `frames.js`; say rendering must happen in Claude Code.
Paths below are relative to this skill's folder (`SKILL`). If `node_modules/puppeteer-core` is missing, run `npm install` (with `PUPPETEER_SKIP_DOWNLOAD=1`) in `SKILL`; if that folder is read-only, run `npm install puppeteer-core` in the project folder instead — `render.mjs` looks in both.

## Workflow
1. **Get word timings.** No transcript JSON yet → `python SKILL/scripts/transcribe.py <video> words.json [--prompt "topic"]` (faster-whisper large-v3, word timestamps). Then `node SKILL/scripts/word-times.mjs <words.json|clip.srt>` lists every line.
   - Compare the last line's end with the video length. Whisper's VAD often drops the tail: `transcribe.py <video> tail.json --from <t> --no-vad` (times already offset by `<t>`), then append its lines to the JSON.
   - A JSON from a different (longer/earlier) cut gives wrong times: compare its lines with the .srt / burned-in subtitles first.
   - **User sent an .srt:** check it is this cut's — last end time ≈ video length, uneven line durations, no `[cite: n]` leftovers. Uniform ~1.7 s lines or an end past the video = script-only timing (AI-written or another edit). Then keep its *text* and take timing from speech: `python SKILL/scripts/align-srt.py <user.srt> <whisper.json> aligned` → `aligned.srt` (give it to the user for subtitling) + `aligned.json` (use it for every `word-times.mjs` lookup; cue words are found in the script's spelling).
2. **Get the on-screen text — burned-in subtitles win.** Look at a frame (`ffmpeg -ss 5 -i v.mp4 -frames:v 1 f.png`). If the video already has subtitles, they are the user's final wording; whisper misspells (ไลฟ์สไตล์ → "รัฐสไตล์"). Read them all with a strip sheet: `ffmpeg -i v.mp4 -vf "fps=2,crop=1080:110:0:<subtitle y>,scale=640:-1,tile=3x18" -frames:v 1 subs.png` (tile i ≈ i×0.5 s), and their exact change times with `ffmpeg -i v.mp4 -vf "crop=1080:110:0:<y>,fps=30,select='gt(scene\,0.08)',showinfo" -an -f null - 2>&1 | grep -o 'pts_time:[0-9.]*'` (ignore extra hits from hands crossing the strip).
3. **Plan frames:** one frame per subtitle line (merge a lead-in like "ง่ายๆ ก็คือ เวลาคุณ" into the next line). With burned-in subtitles: frame `start` = the time that subtitle appears; a 2nd subtitle line inside the same item (e.g. "ตั้งแต่ปีแรก") is a cue inside the frame. Otherwise frame `start` = line start. `end` = next frame's start.
4. **Pick cue words** per frame (the noun shown, and the "twist" word such as ไม่ต้อง/อย่า/100%), then `node SKILL/scripts/word-times.mjs <file> คำ1 คำ2 ...` for their times.
5. **Write `frames.js`** in the user's project folder, copying patterns from `SKILL/examples/social-detox.frames.js` and `SKILL/examples/first-jobber-10-habits.frames.js` (numbered list, burned-in subtitles) (working frames: slider, bar chart, phone with switches, chat bubbles, story screen, camera, ticket, notebook+lock, bank card, sliders, battery). For numbered lists, a "นิสัยที่ n" chip + 10 progress dots at the top of each frame keeps the series together.
6. **Check stills** at 2–3 moments per frame (after the cue word lands): `node SKILL/scripts/render.mjs <frames.js> --still 1.5,6.9,...` and look at every PNG.
7. **Render:** `node SKILL/scripts/render.mjs <frames.js> --with <talking.mp4> [--crop-y N]` → `top.mp4` + `preview.mp4` (stacked, with audio). ~1.5 min per 30 s. With burned-in subtitles set `--crop-y` so they stay in the bottom half (subtitle y − ~800; e.g. 620 for subtitles at y≈1480). `--stack-only` re-stacks without re-rendering.
8. **Sync check loop** — repeat until a pass finds nothing: grab preview frames at (each subtitle change + 0.3 s) and (each twist cue + 0.3 s), tile them (`ffmpeg -ss t -i preview.mp4 -frames:v 1 -vf scale=360:-1 n.png`, then `tile=6x4`), and compare the top half with the subtitle/what is being said in the same tile. Fix, re-render, re-check.

## frames.js shape
```js
window.SPLIT = {
  theme: 'blue',            // 'blue' (default, channel colour) or 'sky'; override any colour with colors: { accent: '#...' }
  duration: 37.08,          // video length
  frames: [
    // "ไปยิม ไม่ต้องโพสต์สตอรี่"  ไปยิม @13.76, โพสตอรี่ @14.80
    { start: 12.06, end: 15.62, row: true, html: `
      <div class="phone" data-a="pop" data-t="+0.1">...${I('dumbbell', 210, '#fff', 1.6)}...</div>
      <div class="h left" data-a="rise" data-t="13.76">ไปยิม</div>
      <div class="ban" data-a="stamp" data-t="14.8">${I('x', 60, '#fff', 3.5)}</div>` },
  ],
};
```
- `I(name, size, color, strokeWidth)` = lucide line icon (2,100+ names, e.g. lock, eye-off, wallet, plane, salad, dumbbell, footprints, brain, heart, clock, map-pin-off). Unknown name throws.
- `data-t`: absolute seconds, or `+0.3` = after frame start. `data-d`: duration override. `data-idle="bob|pulse|tilt"`: gentle loop after it lands.
- `row: true` = side-by-side layout (phone left, text right).

## Animations (`data-a`)
| effect | use for |
|---|---|
| `rise` | headlines (on the spoken word) |
| `pop` | cards, phones, icons appearing |
| `stamp` | ✕ bans, locks, "ส่วนตัว" chips — the twist word |
| `grow` | bars/progress filling (left→right) |
| `toggle` | `.tg` switch turning off |
| `count` | numbers: `data-to`, `data-from`, `data-pre`, `data-suf` |
| `swap` | `.swap` with 2 children: first → second (e.g. ฿125,400 → ฿••••••) |
| `slide`, `fade`, `wipe` | secondary motion |

The element's own inline `transform` is kept; the animation is added after it.

## CSS kit
`.h` headline (74px, `.sm` 62px, `.left`), `.hl` accent word, `.ok` positive word, `.k` small lead-in, `.card`, `.chip` (`.good` `.accent` `.dark`), `.phone > .screen(.dark) > .notch`, `.tg`, `.ban`, `.badge`, `.bar > i`, `.row-c`, `.side`, `.muted`. Colours as `var(--accent|good|ink|muted|panel|line|off|dark|red|grad-a|grad-b)`.

## Rules
- **Headline text = the transcript's words** (shortened, never reworded). Check each against the line before rendering.
- **No emoji.** Use lucide icons and UI mockups (phones, cards, switches, chips).
- Keep the bottom 110px empty (subtitles go there). Inside `.phone`, a row has ~320px: long labels at 27px, give icon tiles `flex:none`.
- **Headline appears together with its subtitle** (frame start, or the 2nd subtitle's time) — never later, never word-by-word while the subtitle already shows the whole line. Pictures, stamps, toggles, counts land on the spoken word.
- Colours only through the theme variables, so a palette change is one line.

## Common mistakes
| Mistake | Fix |
|---|---|
| Frame text paraphrased or misread from the .srt (e.g. ชีวิต for จิตใจ) | Copy the words from `word-times.mjs` output |
| Cue times typed by feel | Run `word-times.mjs` for every cue word |
| Using a transcript JSON from a different cut | Compare its line list with the .srt first |
| Headline shows up 0.5 s after the subtitle, or half a sentence while the subtitle shows all of it | Headline `data-t` = subtitle appear time |
| Whisper text used although the video has subtitles | Read the burned-in subtitles and copy them |
| Trusting a user .srt whose times are not this cut's | Check the end time vs video length; realign with `align-srt.py` |
| Two subtitle lines' worth of headline shown at the first line | Split the headline into spans, each `rise` at its own line's start |
| A highlighted word animates in after the rest of its sentence (hole in the headline) | Keep the word visible with the headline; put emphasis on a picture instead |
| Last items missing (whisper stopped early) | Re-transcribe the tail without VAD and merge |
| Preview hides the subtitles | `--crop-y` so the subtitle line is inside the bottom 960px |
| A still looks empty | It was taken before the cue; pick a time after the last `data-t` in that frame |
| Element jumps instead of animating | `data-a` missing or effect name misspelled (render prints `page error`) |
| `data-t outside` warning | Cue belongs to another frame; fix the time or the frame boundaries |
