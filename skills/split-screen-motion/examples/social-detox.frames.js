// Example: 37s clip "ออกจาก Social Media". One frame per subtitle line; data-t = the second the cue word is spoken
// (from scripts/word-times.mjs). Render: node ../scripts/render.mjs social-detox.frames.js --still 2,14.9
const APPS = [['Instagram', 'linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)'], ['TikTok', '#111'], ['Facebook', '#1877F2'], ['YouTube', '#FF0000']];

window.SPLIT = {
  theme: 'blue',
  duration: 37.08,
  frames: [
    // "ถ้าคุณอายุ 18-25 ปี คุณต้องลองทำสิ่งนี้จริงๆ"   18-25 @0.64, ลองทำ @2.50
    { start: 0, end: 3.58, html: `
      <div class="h" data-a="rise" data-t="0.64">อายุ <span class="hl">18–25</span> ปี</div>
      <div class="card" data-a="pop" data-t="0.3" style="width:880px;padding:70px 60px 50px">
        <div style="position:relative;height:120px">
          <div style="position:absolute;left:0;right:0;top:70px;height:16px;border-radius:8px;background:var(--line)"></div>
          <div data-a="grow" data-t="0.64" style="position:absolute;left:30%;width:11.7%;top:70px;height:16px;background:var(--accent);border-radius:8px"></div>
          ${[30, 41.7].map((p, i) => `
            <div data-a="pop" data-t="${0.64 + i * .15}" style="position:absolute;left:calc(${p}% - 26px);top:52px;width:52px;height:52px;border-radius:50%;background:#fff;border:7px solid var(--accent)"></div>
            <div data-a="pop" data-t="${0.74 + i * .15}" style="position:absolute;left:calc(${p}% - 50px);top:-14px;width:100px;text-align:center;font-size:42px;font-weight:800;color:var(--accent)">${i ? 25 : 18}</div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:30px;color:var(--muted);font-weight:500"><span>0</span><span>อายุ</span><span>60</span></div>
      </div>
      <div class="chip dark" data-a="pop" data-t="2.5">${I('arrow-down', 34, '#fff', 2.5)} ต้องลองทำสิ่งนี้จริงๆ</div>` },

    // "ซึ่งมันจะช่วยให้คุณเข้าใจ และมีเวลาอยู่กับตัวเองได้มากขึ้น"   เข้าใจ @4.78, ตัวเอง @6.50
    { start: 3.58, end: 7.43, html: `
      <div class="h" data-a="rise" data-t="4.78">มีเวลาอยู่กับ<span class="hl">ตัวเอง</span><br>มากขึ้น</div>
      <div class="card" data-a="pop" data-t="+0.1" style="width:860px;padding:48px 56px;display:flex;flex-direction:column;gap:34px">
        <div class="row-c" style="font-size:36px;font-weight:700">${I('clock', 44, 'var(--ink)')} เวลาอยู่กับตัวเอง</div>
        <div class="row-c" style="gap:24px"><div style="width:90px;font-size:34px;font-weight:600" class="muted">ก่อน</div>
          <div class="bar" style="flex:1"><i data-a="grow" data-t="4.78" style="width:22%;background:var(--off)"></i></div></div>
        <div class="row-c" style="gap:24px"><div style="width:90px;font-size:34px;font-weight:600" class="muted">หลัง</div>
          <div class="bar" style="flex:1"><i data-a="grow" data-t="6.5" data-d="1" style="width:88%"></i></div></div>
      </div>` },

    // "สิ่งนั้นก็คือ การออกจาก Social Media"   การออก @8.40, Social @9.36
    { start: 7.43, end: 10.15, row: true, html: `
      <div class="phone" data-a="pop" data-t="+0.05"><div class="screen"><div class="notch"></div>
        <div style="padding:90px 24px 0;display:flex;flex-direction:column;gap:14px">
          <div style="font-size:34px;font-weight:700;margin-bottom:18px">การแจ้งเตือน</div>
          ${APPS.map(([n, c], i) => `
            <div class="row-c" style="padding:18px 0;border-bottom:2px solid var(--panel)">
              <div style="width:62px;height:62px;flex:none;border-radius:18px;background:${c}"></div>
              <div style="font-size:27px;font-weight:600">${n}</div>
              <div class="tg" data-a="toggle" data-t="${8.4 + i * .25}" style="margin-left:auto"></div>
            </div>`).join('')}
        </div></div></div>
      <div class="side">
        <div class="k" data-a="rise" data-t="+0.1">สิ่งนั้นก็คือ</div>
        <div class="h left" data-a="rise" data-t="8.4">การออกจาก</div>
        <div class="h left hl" data-a="pop" data-t="9.36">Social Media</div>
      </div>` },

    // "คำถามคือ ทำยังไงล่ะ"   ทำยังไง @10.82
    { start: 10.15, end: 12.06, html: `
      <div style="display:flex;flex-direction:column;gap:28px;width:820px">
        <div class="card" data-a="pop" data-t="10.6" style="align-self:flex-start;padding:34px 46px;border-radius:40px 40px 40px 10px;font-size:64px;font-weight:800">ทำ<span class="hl">ยังไง</span>ล่ะ?</div>
        <div data-a="pop" data-t="11.2" style="align-self:flex-end;background:var(--accent);border-radius:40px 40px 10px 40px;padding:34px 46px;display:flex;gap:16px">
          ${[0, 1, 2].map(i => `<div data-a="pop" data-t="${11.35 + i * .12}" data-idle="bob" style="width:26px;height:26px;border-radius:50%;background:#fff"></div>`).join('')}
        </div>
      </div>` },

    // "ง่ายๆ แหละก็คือ เวลาคุณ / ไปยิม ไม่ต้องโพสต์สตอรี่"   ไปยิม @13.76, โพสตอรี่ @14.80
    { start: 12.06, end: 15.62, row: true, html: `
      <div class="phone" data-a="pop" data-t="+0.1"><div class="screen dark"><div class="notch"></div>
        <div style="position:absolute;top:60px;left:24px;right:24px;display:flex;gap:8px">
          <div style="flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.35)"><div data-a="grow" data-t="13.76" data-d="1.8" style="height:100%;border-radius:3px;background:#fff"></div></div>
          <div style="flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.35)"></div><div style="flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.35)"></div></div>
        <div data-a="pop" data-t="13.76" data-idle="tilt" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">${I('dumbbell', 210, '#fff', 1.6)}</div>
        <div style="position:absolute;left:28px;right:28px;bottom:40px;height:84px;border-radius:42px;background:#fff;display:flex;align-items:center;justify-content:center;gap:14px;font-size:30px;font-weight:700;opacity:.5">${I('circle-plus', 38, 'var(--ink)')} Your story</div>
      </div>
      <div class="ban" data-a="stamp" data-t="14.8" style="right:-34px;bottom:44px">${I('x', 60, '#fff', 3.5)}</div></div>
      <div class="side">
        <div class="h left" data-a="rise" data-t="13.76">ไปยิม</div>
        <div class="h left sm" data-a="rise" data-t="14.6">ไม่ต้อง<br><span class="hl">โพสต์สตอรี่</span></div>
      </div>` },

    // "เวลาคุณไปวิ่ง ไม่ต้องบอกใคร"   ไปวิ่ง @16.18, บอกใคร @17.18
    { start: 15.62, end: 17.76, html: `
      <div class="h" data-a="rise" data-t="16.18">ไปวิ่ง <span class="hl" data-a="fade" data-t="17.0">ไม่ต้องบอกใคร</span></div>
      <div class="card" data-a="pop" data-t="16.18" style="width:860px;padding:46px 54px;display:flex;flex-direction:column;gap:30px">
        <div class="row-c" style="gap:20px">
          <div style="width:84px;height:84px;border-radius:24px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">${I('footprints', 50, 'var(--accent)')}</div>
          <div><div style="font-size:36px;font-weight:700">วิ่งเสร็จแล้ว</div><div style="font-size:28px" class="muted">เช้านี้</div></div>
          <div class="chip good" data-a="stamp" data-t="17.4" style="margin-left:auto">${I('lock', 30, 'var(--good)', 2.5)} ส่วนตัว</div>
        </div>
        <div class="row-c" style="justify-content:space-between;padding-top:26px;border-top:2px solid var(--panel)">
          <div class="row-c" style="gap:16px;font-size:34px;font-weight:600">${I('share-2', 40, 'var(--muted)')} บอกให้ทุกคนรู้</div>
          <div class="tg" data-a="toggle" data-t="17.18"></div>
        </div>
      </div>` },

    // "เวลาคุณกินอาหารคลีน ไม่ต้องโพสต์"   อาหารคลีน @18.40, ไม่ต้องโพสต์ @19.16
    { start: 17.76, end: 20.03, html: `
      <div class="h" data-a="rise" data-t="18.4">กินคลีน <span class="hl" data-a="fade" data-t="19.0">ไม่ต้องโพสต์</span></div>
      <div data-a="pop" data-t="+0.05" style="position:relative;width:560px;height:520px">
        <div class="card" style="position:absolute;inset:0;background:var(--dark);display:flex;align-items:center;justify-content:center">
          <div data-a="pop" data-t="18.4">${I('salad', 230, '#fff', 1.5)}</div></div>
        ${['top:28px;left:28px;border-top:8px solid #fff;border-left:8px solid #fff', 'top:28px;right:28px;border-top:8px solid #fff;border-right:8px solid #fff',
           'bottom:28px;left:28px;border-bottom:8px solid #fff;border-left:8px solid #fff', 'bottom:28px;right:28px;border-bottom:8px solid #fff;border-right:8px solid #fff']
          .map(s => `<div data-idle="pulse" data-a="fade" data-t="+0" style="position:absolute;${s};width:70px;height:70px;border-radius:6px"></div>`).join('')}
        <div style="position:absolute;left:50%;bottom:-56px;transform:translateX(-50%);width:120px;height:120px;border-radius:50%;background:#fff;border:10px solid var(--off)"></div>
        <div class="ban" data-a="stamp" data-t="19.16" style="left:calc(50% + 30px);bottom:-30px;width:80px;height:80px">${I('x', 50, '#fff', 3.5)}</div>
      </div>` },

    // "ไปเที่ยว ไม่ต้องบอกใคร"   ไปเที่ยว @20.03, บอกใคร ~22.29 (srt estimate)
    { start: 20.03, end: 23.36, html: `
      <div class="h" data-a="rise" data-t="20.1">ไปเที่ยว <span class="hl" data-a="fade" data-t="21.9">ไม่ต้องบอกใคร</span></div>
      <div class="card" data-a="slide" data-t="20.3" style="width:860px;padding:46px 50px;display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:84px;font-weight:800;line-height:1">BKK</div><div style="font-size:28px" class="muted">กรุงเทพ</div></div>
        <div data-a="slide" data-t="20.6" data-idle="bob">${I('plane', 72, 'var(--accent)', 2)}</div>
        <div style="text-align:right" data-a="pop" data-t="22.29"><div style="font-size:84px;font-weight:800;line-height:1">???</div><div style="font-size:28px" class="muted">ไม่บอก</div></div>
      </div>
      <div class="chip good" data-a="stamp" data-t="22.4">${I('map-pin-off', 34, 'var(--good)', 2.5)} ปิดแชร์ตำแหน่ง</div>` },

    // "เริ่มธุรกิจ อย่าบอกใคร"   เริ่มธุรกิจ ~23.36, อย่าบอกใคร ~24.44
    { start: 23.36, end: 25.59, html: `
      <div class="h" data-a="rise" data-t="23.4">เริ่มธุรกิจ <span class="hl" data-a="fade" data-t="24.3">อย่าบอกใคร</span></div>
      <div style="position:relative;margin-top:20px">
        <div class="card" data-a="pop" data-t="23.5" style="width:640px;padding:46px 54px;display:flex;flex-direction:column;gap:26px">
          <div class="row-c" style="gap:16px;font-size:38px;font-weight:700">${I('notebook-pen', 46, 'var(--ink)')} แผนธุรกิจ</div>
          ${[92, 70, 84, 55].map((w, i) => `<div class="row-c">${I('square-check', 36, 'var(--off)', 2.2)}
            <div data-a="grow" data-t="${23.7 + i * .15}" style="height:22px;width:${w}%;border-radius:11px;background:var(--panel)"></div></div>`).join('')}
        </div>
        <div class="badge" data-a="stamp" data-t="24.44" style="position:absolute;right:-50px;top:-30px;transform:rotate(8deg)">${I('lock', 70, '#fff', 2.4)}</div>
      </div>` },

    // "และพอมีเงิน ก็อย่าบอกใคร"   มีเงิน ~26.25, อย่าบอกใคร ~27.32
    { start: 25.59, end: 28.66, html: `
      <div class="h" data-a="rise" data-t="26.0">มีเงิน <span class="hl" data-a="fade" data-t="27.2">ก็อย่าบอกใคร</span></div>
      <div data-a="rise" data-t="26.1" style="width:760px;height:440px;border-radius:40px;background:linear-gradient(135deg,var(--grad-a),var(--grad-b));padding:54px 60px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 22px 50px rgba(11,37,69,.3)">
        <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:34px;font-weight:600;opacity:.85">ยอดเงินคงเหลือ</div>${I('wallet', 52, '#fff', 2)}</div>
        <div class="row-c" style="gap:26px">
          <div class="swap" data-a="swap" data-t="27.32" style="font-size:96px;font-weight:800">
            <span>฿ <span data-a="count" data-t="26.25" data-to="125400">0</span></span>
            <span style="letter-spacing:6px">฿ ••••••</span>
          </div>
          <div data-a="stamp" data-t="27.4">${I('eye-off', 64, '#fff', 2.2)}</div>
        </div>
        <div style="font-size:30px;opacity:.7;letter-spacing:4px">•••• •••• •••• 2026</div>
      </div>` },

    // "ถ้าคุณควบคุมปากของตัวเองได้เนี่ย"   ควบคุมปาก ~29.17
    { start: 28.66, end: 31.41, html: `
      <div style="position:relative" data-a="pop" data-t="28.8">
        <div class="card" style="width:520px;height:340px;border-radius:60px;display:flex;align-items:center;justify-content:center">
          <div class="badge" data-a="stamp" data-t="29.17" data-idle="pulse" style="width:150px;height:150px;border-radius:44px">${I('lock', 84, '#fff', 2.4)}</div>
        </div>
        <div style="position:absolute;left:70px;bottom:-46px;width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-top:56px solid #fff"></div>
      </div>
      <div class="h" data-a="rise" data-t="29.17">ถ้าคุณควบคุม<span class="hl">ปาก</span>ตัวเองได้</div>` },

    // "คุณจะควบคุมจิตใจและความรู้สึกของตัวเองได้"   จิตใจ @32.56, ความรู้สึก @33.28
    { start: 31.41, end: 34.28, html: `
      <div class="h">ควบคุมได้ทั้ง <span class="hl" data-a="pop" data-t="32.56">จิตใจ</span><br><span data-a="fade" data-t="33.1">และ</span><span class="hl" data-a="pop" data-t="33.28">ความรู้สึก</span></div>
      <div class="card" data-a="pop" data-t="31.6" style="width:860px;padding:50px 60px;display:flex;flex-direction:column;gap:46px">
        ${[['จิตใจ', 'brain', 74, 32.56], ['ความรู้สึก', 'heart', 66, 33.28]].map(([l, ic, p, t]) => `
          <div class="row-c" style="gap:26px">
            ${I(ic, 48, 'var(--good)', 2.2)}<div style="width:190px;font-size:36px;font-weight:700">${l}</div>
            <div style="flex:1;position:relative;height:16px;border-radius:8px;background:var(--line)">
              <div data-a="grow" data-t="${t}" style="width:${p}%;height:100%;border-radius:8px;background:var(--good)"></div>
              <div data-a="pop" data-t="${t + .5}" style="position:absolute;left:calc(${p}% - 26px);top:-18px;width:52px;height:52px;border-radius:50%;background:#fff;border:7px solid var(--good)"></div>
            </div>
          </div>`).join('')}
      </div>` },

    // "ตอนนั้นแหละที่ความสงบของคุณจะกลับคืนมา"   ความสงบ @35.24, กลับคืนมา @36.30
    { start: 34.28, end: 37.08, html: `
      <div class="h" data-a="rise" data-t="35.0">ความสงบ<span class="ok" data-a="pop" data-t="36.3">กลับคืนมา</span></div>
      <div class="row-c" data-a="pop" data-t="34.5" style="gap:0">
        <div style="width:700px;height:300px;border-radius:56px;border:16px solid var(--ink);padding:18px;background:#fff">
          <div data-a="grow" data-t="35.24" data-d="1.06" style="width:100%;height:100%;border-radius:34px;background:var(--good);display:flex;align-items:center;justify-content:center;gap:16px;color:#fff;font-size:96px;font-weight:800">
            ${I('zap', 88, '#fff', 2.4)}<span data-a="count" data-t="35.24" data-d="1.06" data-to="100" data-suf="%">0</span></div>
        </div>
        <div style="width:34px;height:110px;border-radius:0 18px 18px 0;background:var(--ink)"></div>
      </div>` },
  ],
};
