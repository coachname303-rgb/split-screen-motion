# Word timings for a clip with faster-whisper (large-v3; GPU if available, else CPU).
#   python transcribe.py <video> <out.json> [--lang th] [--prompt "topic hint"] [--no-vad] [--from 19.0]
#   --from t : transcribe only from t seconds and add t to every time (fills a tail whisper dropped)
# Output: [{start, end, text, words: [{w, s, e}]}] -> input for word-times.mjs and align-srt.py
import argparse, glob, json, os, site, subprocess

import numpy as np

# Windows + pip-installed CUDA wheels: put their DLLs on the search path
for sp in site.getsitepackages():
    for d in glob.glob(os.path.join(sp, "nvidia", "*", "bin")):
        os.add_dll_directory(d)
        os.environ["PATH"] = d + os.pathsep + os.environ["PATH"]
from faster_whisper import WhisperModel

ap = argparse.ArgumentParser()
ap.add_argument("video")
ap.add_argument("out")
ap.add_argument("--lang", default="th")
ap.add_argument("--prompt", default="")
ap.add_argument("--no-vad", action="store_true")
ap.add_argument("--from", dest="start", type=float, default=0.0)
a = ap.parse_args()

try:
    model = WhisperModel("large-v3", device="cuda", compute_type="float16")
except Exception as e:
    print("GPU unavailable, using CPU (slower):", e)
    model = WhisperModel("large-v3", device="cpu", compute_type="int8")

raw = subprocess.run(
    ["ffmpeg", "-v", "error", "-ss", str(a.start), "-i", a.video, "-vn", "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
    capture_output=True, check=True).stdout
audio = np.frombuffer(raw, np.int16).astype(np.float32) / 32768.0

segs, _ = model.transcribe(
    audio, language=a.lang, word_timestamps=True, initial_prompt=a.prompt or None,
    vad_filter=not a.no_vad, vad_parameters=dict(min_silence_duration_ms=300),
)
o = a.start
data = []
for s in segs:
    data.append({
        "start": s.start + o, "end": s.end + o, "text": s.text.strip(),
        "words": [{"w": w.word, "s": w.start + o, "e": w.end + o} for w in (s.words or [])],
    })
    print(f"[{s.start + o:6.2f}-{s.end + o:6.2f}] {s.text.strip()}")
json.dump(data, open(a.out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
