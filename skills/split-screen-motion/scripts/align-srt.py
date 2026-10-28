# Put real speech timing on a script-like .srt whose wording is right but whose times are not
# (AI-written or exported from another cut). Text comes from the .srt, timing from a whisper
# word-timestamp JSON of the actual video, matched character by character.
#   python align-srt.py <script.srt> <whisper.json> <out-basename>
#   -> <out>.srt (real line times) and <out>.json (whisper format, .srt text, per-character times
#      so word-times.mjs finds any word of the script)
import json, re, sys
from difflib import SequenceMatcher

srt_path, json_path, out = sys.argv[1:4]
norm = lambda s: re.sub(r"\s+", "", s)

# script lines (drop "[cite: n]" style leftovers)
lines = []
for block in re.split(r"\r?\n\r?\n", open(srt_path, encoding="utf-8-sig").read().strip()):
    rows = block.splitlines()
    if len(rows) >= 3:
        lines.append(re.sub(r"\[cite:[^\]]*\]", "", " ".join(rows[2:])).strip())

# whisper characters with start/end times
w_chars, w_s, w_e = [], [], []
for seg in json.load(open(json_path, encoding="utf-8")):
    for w in seg.get("words") or []:
        for ch in norm(w["w"]):
            w_chars.append(ch); w_s.append(w["s"]); w_e.append(w["e"])
w_text = "".join(w_chars)

s_text = "".join(norm(l) for l in lines)
start_of = [None] * len(s_text)
end_of = [None] * len(s_text)
exact = 0
for tag, i1, i2, j1, j2 in SequenceMatcher(None, w_text, s_text, autojunk=False).get_opcodes():
    if tag == "equal":
        exact += j2 - j1
        for k in range(j2 - j1):
            start_of[j1 + k], end_of[j1 + k] = w_s[i1 + k], w_e[i1 + k]
    elif tag == "replace":  # misheard span: spread its time over the script characters
        a, b = w_s[i1], w_e[i2 - 1]
        for k in range(j2 - j1):
            start_of[j1 + k] = a + (b - a) * k / (j2 - j1)
            end_of[j1 + k] = a + (b - a) * (k + 1) / (j2 - j1)

# fill characters whisper never heard from their neighbours
known = [i for i, t in enumerate(start_of) if t is not None]
for i in range(len(s_text)):
    if start_of[i] is None:
        prev = max([k for k in known if k < i], default=None)
        nxt = min([k for k in known if k > i], default=None)
        t = end_of[prev] if prev is not None else start_of[nxt]
        start_of[i] = end_of[i] = t

def ts(t):
    ms = round(t * 1000)
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"

segs, pos = [], 0
for line in lines:
    n = len(norm(line))
    a, b = start_of[pos], end_of[pos + n - 1]
    chars = [{"w": ch, "s": start_of[pos + k], "e": end_of[pos + k]} for k, ch in enumerate(norm(line))]
    segs.append({"start": a, "end": b, "text": line, "words": chars})
    pos += n

with open(out + ".srt", "w", encoding="utf-8") as f:
    for i, s in enumerate(segs, 1):
        f.write(f"{i}\n{ts(s['start'])} --> {ts(s['end'])}\n{s['text']}\n\n")
json.dump(segs, open(out + ".json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
# well under ~80% exact usually means the script and the speech differ (ad-libs, wrong file): read the lines
print(f"{len(segs)} lines, {exact}/{len(s_text)} script characters heard exactly by whisper")
for s in segs:
    print(f"{s['start']:6.2f} - {s['end']:6.2f}  {s['text']}")
