# split-screen-motion

Skill สำหรับ [Claude Code](https://claude.com/claude-code) ที่ทำ **โมชั่นกราฟิกครึ่งบน** ของคลิปจอแยก (Reels / TikTok / Shorts) ให้ตรงกับคำพูดทีละคำ: ด้านล่างเป็นคลิปคุณพูด ด้านบนเป็นภาพอธิบายที่ขยับตามเสียง

*A Claude Code skill that builds the top-half motion graphics for split-screen shorts, with every element landing on the word you speak. Made for Thai; works with any language Whisper supports.*

![demo](docs/demo.gif)

## ทำอะไรได้
- ส่งคลิปที่ตัดเสร็จแล้ว (และไฟล์ซับ `.srt` ถ้ามี) ให้ Claude แล้วพิมพ์ว่า "ทำโมชั่นจอแยกให้คลิปนี้"
- Claude ถอดเสียงหาเวลาของทุกคำ วางเฟรมทีละประโยค แล้วเรนเดอร์ออกมาเป็น:
  - `top.mp4` ภาพครึ่งบน 1080×960 สำหรับเอาไปวางในโปรแกรมตัดต่อ
  - `preview.mp4` ภาพเต็ม 1080×1920 ซ้อนกับคลิปของคุณ พร้อมเสียง
- หัวข้อบนจอใช้คำเดียวกับซับ ไอคอนและภาพจะเด้งขึ้นตรงคำที่พูด
- ถ้าเวลาในไฟล์ `.srt` ไม่ตรงกับคลิป (เช่น ได้มาจากสคริปต์) ระบบจะเทียบกับเสียงจริงแล้วทำไฟล์ `aligned.srt` ที่เวลาถูกต้องให้ด้วย
- ใช้ธีมสีน้ำเงิน ไอคอนเส้นจาก Lucide กว่า 2,100 แบบ และไม่ใช้อีโมจิ

## ต้องมีอะไรในเครื่อง
| โปรแกรม | ใช้ทำอะไร |
|---|---|
| [Claude Code](https://claude.com/claude-code) | ตัวสั่งงาน |
| [Node.js](https://nodejs.org) 18 ขึ้นไป | เรนเดอร์ |
| [ffmpeg](https://ffmpeg.org/download.html) (ต้องเรียกจาก PATH ได้) | ทำวิดีโอ |
| Google Chrome หรือ Microsoft Edge | วาดภาพแต่ละเฟรม (ถ้าอยู่ที่อื่นให้ตั้ง `CHROME_PATH`) |
| Python 3.9+ และ `pip install faster-whisper numpy` | ถอดเสียงหาเวลาของคำ (ถ้ามีการ์ดจอ NVIDIA จะเร็วขึ้น แต่ไม่มีก็ใช้ได้) |

ตอนเปิดหน้าเรนเดอร์ต้องต่ออินเทอร์เน็ตด้วย เพราะต้องโหลดฟอนต์ Prompt จาก Google Fonts

## ติดตั้ง
**Claude Code** (แนะนำ) ให้พิมพ์ในหน้าต่าง Claude Code:
```
/plugin marketplace add coachname303-rgb/split-screen-motion
/plugin install split-screen-motion@split-screen-motion
```
ตอนใช้ครั้งแรก Claude จะติดตั้ง `puppeteer-core` ให้เอง (ขนาดเล็ก ไม่ได้โหลด Chrome มาใหม่)

**ติดตั้งเอง:** คัดลอกโฟลเดอร์ `skills/split-screen-motion` ไปไว้ที่ `~/.claude/skills/` แล้วรันคำสั่งนี้ในโฟลเดอร์นั้น:
```bash
PUPPETEER_SKIP_DOWNLOAD=1 npm install
```

**claude.ai:** ดาวน์โหลดไฟล์ zip จากหน้า [Releases](../../releases) แล้วอัปโหลดในหน้า Skills ข้อจำกัดคือบนเว็บ Claude ทำได้แค่วางแผนเฟรม ยังเรนเดอร์วิดีโอไม่ได้ ต้องไปเรนเดอร์ใน Claude Code

## วิธีใช้
```
ทำโมชั่นจอแยกให้คลิปนี้ "D:\clips\ep12.mp4" "D:\clips\ep12.srt"
```
ใช้ชื่อ skill เรียกตรงๆ ก็ได้ เช่น `split-screen-motion` หรือ "การตัดต่อแบบแบ่งหน้าจอ 1"

ถ้าอยากให้ได้ผลแม่นที่สุด:
1. ส่งคลิปที่ตัดเสร็จแล้วจริงๆ ถ้าตัดคลิปเพิ่มทีหลัง เวลาจะคลาดหมด
2. ใส่ไฟล์ `.srt` ที่ข้อความถูกต้องมาด้วย เวลาในไฟล์ไม่ต้องเป๊ะ ระบบจะเทียบกับเสียงให้
3. ถ้าในคลิปมีซับฝังอยู่แล้ว Claude จะอ่านจากภาพและใช้คำตามซับนั้น

คลิปยาว 30 วินาทีใช้เวลาเรนเดอร์ประมาณ 1.5 นาที

## ในโฟลเดอร์มีอะไร
```
skills/split-screen-motion/
├── SKILL.md            ขั้นตอนและกฎที่ Claude ทำตาม
├── engine.html         ตัวเล่นอนิเมชันและชุดสไตล์ (ธีม blue / sky)
├── lucide.js           ไอคอน
├── scripts/
│   ├── transcribe.py   ถอดเสียงพร้อมเวลาของแต่ละคำ (faster-whisper)
│   ├── word-times.mjs  หาเวลาของคำที่ต้องการ
│   ├── align-srt.py    แก้เวลาใน .srt ให้ตรงกับเสียง
│   └── render.mjs      เรนเดอร์ top.mp4 / preview.mp4 / ภาพนิ่ง
└── examples/           ตัวอย่าง frames.js จากคลิปจริง 2 คลิป
```

## สัญญาอนุญาต
- โค้ดใช้สัญญาอนุญาต [MIT](LICENSE)
- ไอคอนมาจาก [Lucide](https://lucide.dev) ใช้สัญญาอนุญาต ISC
- ฟอนต์ Prompt ใช้สัญญาอนุญาต SIL OFL และโหลดจาก Google Fonts ตอนเรนเดอร์
