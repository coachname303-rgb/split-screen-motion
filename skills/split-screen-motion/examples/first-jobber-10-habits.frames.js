// 132-2 "10 นิสัยที่จะทำให้ First Jobber ต้องทำงานไปทั้งชีวิต" (25.7s)
// Text follows the burned-in subtitles. Frame changes = when the burned-in subtitle changes (ffmpeg scene detect on
// the subtitle strip); in-frame cues = spoken word times from word-times.mjs on words_all.json.
// Render: node ~/.claude/skills/split-screen-motion/scripts/render.mjs frames.js --with talk.mp4 --crop-y 620

// progress dots "นิสัยที่ n / 10", current dot pops on the spoken number
const steps = (n, t) => `
  <div class="row-c" style="gap:22px">
    <div class="chip accent" data-a="pop" data-t="${t}">นิสัยที่ ${n}</div>
    <div class="row-c" style="gap:10px">${Array.from({ length: 10 }, (_, i) => `<div ${i === n - 1 ? `data-a="stamp" data-t="${t}"` : ''}
      style="width:${i === n - 1 ? 30 : 18}px;height:18px;border-radius:9px;background:${i < n ? 'var(--accent)' : 'var(--off)'}"></div>`).join('')}</div>
  </div>`;
const row = (icon, label, extra = '', attrs = '') => `
  <div class="row-c" ${attrs} style="gap:20px;padding:18px 0;border-bottom:2px solid var(--panel)">
    <div style="width:72px;height:72px;flex:none;border-radius:20px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">${I(icon, 40, 'var(--accent)')}</div>
    <div style="font-size:34px;font-weight:600">${label}</div>${extra}
  </div>`;

window.SPLIT = {
  theme: 'blue',
  duration: 25.73,
  frames: [
    // "10/10 นิสัย ที่จะทำให้ First Jobber เนี่ย ต้องทำงานไปทั้งชีวิต"   นิสัย @0.78, First @1.56, ทำงาน @2.60
    { start: 0, end: 3.57, html: `
      <div class="h" data-a="rise" data-t="0.05"><span class="hl" data-a="count" data-t="0.05" data-d=".5" data-to="10">0</span> นิสัย</div>
      <div class="card" data-a="pop" data-t="1.07" style="width:620px;padding:40px 50px;display:flex;align-items:center;gap:34px">
        <div style="width:150px;height:150px;flex:none;border-radius:40px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center">${I('user-round', 90, 'var(--accent)', 1.8)}</div>
        <div><div class="muted" style="font-size:30px;font-weight:500">ที่จะทำให้</div><div style="font-size:60px;font-weight:800;white-space:nowrap">First Jobber</div></div>
      </div>
      <div class="chip dark" data-a="stamp" data-t="2.47" style="font-size:40px;padding:16px 34px">${I('infinity', 44, '#fff', 2.4)} ต้องทำงานไปทั้งชีวิต</div>` },

    // "1.ใช้ก่อน ออมทีหลัง"   ใช้ก่อน @4.14, ออม @4.68
    { start: 3.57, end: 5.5, html: `
      ${steps(1, 3.62)}
      <div class="h" data-a="rise" data-t="3.62">ใช้ก่อน <span class="hl">ออมทีหลัง</span></div>
      <div class="row-c" style="gap:30px">
        <div class="card" data-a="pop" data-t="4.14" style="width:330px;padding:40px;display:flex;flex-direction:column;align-items:center;gap:18px">
          ${I('shopping-cart', 110, 'var(--red)', 1.8)}<div style="font-size:40px;font-weight:800">ใช้ก่อน</div><div class="chip" style="background:#FDE2E1;color:var(--red)">อันดับ 1</div></div>
        <div data-a="slide" data-t="4.5">${I('arrow-right', 64, 'var(--muted)', 2.5)}</div>
        <div class="card" data-a="pop" data-t="4.68" style="width:330px;padding:40px;display:flex;flex-direction:column;align-items:center;gap:18px;opacity:.6">
          ${I('piggy-bank', 110, 'var(--muted)', 1.8)}<div style="font-size:40px;font-weight:800" class="muted">ออมทีหลัง</div><div class="chip" style="background:var(--panel);color:var(--muted)">ถ้าเหลือ</div></div>
      </div>` },

    // "2.ไม่จดว่าเงินไปไหน"   ไม่จด @6.06, เงินไปไหน @6.64
    { start: 5.5, end: 7.37, html: `
      ${steps(2, 5.55)}
      <div class="h" data-a="rise" data-t="5.55">ไม่จด<span class="hl">ว่าเงินไปไหน</span></div>
      <div style="position:relative">
        <div class="card" data-a="pop" data-t="5.6" style="width:760px;padding:30px 50px">
          <div class="row-c" style="justify-content:space-between;font-size:34px;font-weight:700;padding-bottom:6px">${I('notebook-pen', 44, 'var(--ink)')}<span style="flex:1">รายจ่ายเดือนนี้</span></div>
          ${['coffee', 'shopping-bag', 'utensils'].map((ic, i) => row(ic, '???', `<div style="margin-left:auto;font-size:38px;font-weight:800;color:var(--red)" data-a="pop" data-t="${6.64 + i * .12}">฿ ???</div>`)).join('')}
        </div>
        <div class="ban" data-a="stamp" data-t="6.06" style="right:-36px;top:-36px">${I('pen-off', 52, '#fff', 2.6)}</div>
      </div>` },

    // "3.ปรับไลฟ์สไตล์ ตามเงินเดือนที่เพิ่มขึ้น"   ปรับ @7.88, เงินเดือน @8.90, เพิ่มขึ้น @9.36
    { start: 7.37, end: 9.97, html: `
      ${steps(3, 7.42)}
      <div class="h" data-a="rise" data-t="7.42">ปรับ<span class="hl">ไลฟ์สไตล์</span><br><span class="h sm" data-a="fade" data-t="8.77">ตามเงินเดือนที่เพิ่มขึ้น</span></div>
      <div class="card" data-a="pop" data-t="7.6" style="width:860px;padding:44px 54px;display:flex;flex-direction:column;gap:30px">
        <div class="row-c" style="gap:24px"><div class="row-c" style="width:240px;font-size:34px;font-weight:700;gap:12px">${I('banknote', 40, 'var(--good)')} เงินเดือน</div>
          <div class="bar" style="flex:1"><i data-a="grow" data-t="8.9" style="width:85%"></i></div></div>
        <div class="row-c" style="gap:24px"><div class="row-c" style="width:240px;font-size:34px;font-weight:700;gap:12px">${I('shopping-bag', 40, 'var(--red)')} ไลฟ์สไตล์</div>
          <div class="bar" style="flex:1"><i data-a="grow" data-t="9.36" data-d=".6" style="width:85%;background:var(--red)"></i></div></div>
      </div>` },

    // "4.ผ่อนทุกอย่างที่อยากได้"   ผ่อน @10.44, อยากได้ @11.22
    { start: 9.97, end: 11.93, html: `
      ${steps(4, 10.02)}
      <div class="h" data-a="rise" data-t="10.02">ผ่อน<span class="hl">ทุกอย่าง</span>ที่อยากได้</div>
      <div class="card" data-a="pop" data-t="10.1" style="width:760px;padding:20px 50px">
        ${[['smartphone', 'มือถือ'], ['laptop', 'โน้ตบุ๊ก'], ['car', 'รถ']].map(([ic, l], i) => row(ic, l,
          `<div class="chip" style="margin-left:auto;background:#FDE2E1;color:var(--red)">${I('credit-card', 30, 'var(--red)', 2.4)} ผ่อน</div>`,
          `data-a="slide" data-t="${10.44 + i * .3}"`)).join('')}
      </div>` },

    // "5.ผูกตัวเองกับหนี้ก้อนใหญ่ ตั้งแต่ปีแรก"   ผูกตัวเอง @12.48, หนี้ @13.24, ปีแรก @14.12
    { start: 11.93, end: 14.67, html: `
      ${steps(5, 11.98)}
      <div class="h" data-a="rise" data-t="11.98">ผูกตัวเองกับ<span class="hl">หนี้ก้อนใหญ่</span></div>
      <div class="row-c" style="gap:0">
        <div data-a="pop" data-t="12.48" style="width:190px;height:190px;border-radius:50%;background:#fff;box-shadow:0 18px 44px rgba(11,37,69,.12);display:flex;align-items:center;justify-content:center">${I('user-round', 100, 'var(--accent)', 1.8)}</div>
        <div data-a="wipe" data-t="12.7" data-d=".5" class="row-c" style="gap:0">${I('link', 70, 'var(--muted)', 2.4)}${I('link', 70, 'var(--muted)', 2.4)}${I('link', 70, 'var(--muted)', 2.4)}</div>
        <div data-a="stamp" data-t="13.24" data-d=".35" style="width:330px;height:260px;border-radius:40px;background:var(--ink);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px">
          ${I('house', 90, '#fff', 1.8)}<div style="font-size:46px;font-weight:800">หนี้ก้อนใหญ่</div></div>
      </div>
      <div class="chip dark" data-a="stamp" data-t="13.9">${I('calendar', 34, '#fff', 2.4)} ตั้งแต่ปีแรก</div>` },

    // "6.ไม่มีเงินสำรองฉุกเฉิน"   ไม่มีเงิน @15.00, ฉุกเฉิน @15.82
    { start: 14.67, end: 16.53, html: `
      ${steps(6, 14.72)}
      <div class="h" data-a="rise" data-t="14.72">ไม่มี<span class="hl">เงินสำรองฉุกเฉิน</span></div>
      <div style="position:relative">
        <div class="card" data-a="pop" data-t="14.75" style="width:720px;padding:44px 54px;display:flex;flex-direction:column;gap:24px">
          <div class="row-c" style="font-size:34px;font-weight:700">${I('shield', 44, 'var(--ink)')} เงินสำรองฉุกเฉิน</div>
          <div style="font-size:110px;font-weight:800;line-height:1;color:var(--red)" data-a="stamp" data-t="15.0">฿ 0</div>
          <div class="bar" style="height:40px"><i style="width:3%;background:var(--red)"></i></div>
        </div>
        <div class="ban" data-a="stamp" data-t="15.82" data-idle="pulse" style="right:-40px;top:-40px;width:120px;height:120px">${I('siren', 64, '#fff', 2.2)}</div>
      </div>` },

    // "7.ไม่สร้างชื่อเสียงหรือ Connection นอกบริษัท"   ชื่อเสียง @17.40, Connection @18.12, นอกบริษัท @18.54
    { start: 16.53, end: 19.4, html: `
      ${steps(7, 16.58)}
      <div class="h sm" style="line-height:1.25"><span data-a="rise" data-t="16.58">ไม่สร้าง<span class="hl">ชื่อเสียง</span></span><br><span data-a="rise" data-t="18.07">หรือ <span class="hl">Connection</span> นอกบริษัท</span></div>
      <div style="position:relative;width:860px;height:330px">
        <div data-a="pop" data-t="16.9" style="position:absolute;left:0;top:0;width:430px;height:330px;border-radius:40px;border:5px solid var(--accent);background:#fff">
          <div class="row-c" style="position:absolute;left:30px;top:22px;gap:12px;font-size:30px;font-weight:700;color:var(--accent)">${I('building-2', 36, 'var(--accent)')} บริษัท</div>
          ${[[175, 150, 'var(--accent)'], [70, 220, 'var(--accent-soft)'], [300, 220, 'var(--accent-soft)'], [90, 100, 'var(--accent-soft)'], [290, 100, 'var(--accent-soft)']].map(([x, y, c], i) => `
            <div style="position:absolute;left:${x}px;top:${y}px;width:${i ? 64 : 84}px;height:${i ? 64 : 84}px;border-radius:50%;background:${c};display:flex;align-items:center;justify-content:center">${I('user-round', i ? 34 : 46, i ? 'var(--accent)' : '#fff', 2)}</div>`).join('')}
        </div>
        <div data-a="pop" data-t="17.4" style="position:absolute;left:470px;top:20px" class="chip" >${I('star', 34, 'var(--off)', 2.2)}<span class="muted">ชื่อเสียง 0</span></div>
        ${[[520, 130], [680, 110], [600, 230], [760, 220]].map(([x, y], i) => `
          <div data-a="fade" data-t="${18.54 + i * .08}" style="position:absolute;left:${x}px;top:${y}px;width:76px;height:76px;border-radius:50%;border:4px dashed var(--off);display:flex;align-items:center;justify-content:center">${I('user-round', 36, 'var(--off)', 2)}</div>`).join('')}
        <div class="muted" data-a="fade" data-t="18.7" style="position:absolute;left:540px;top:300px;font-size:28px;font-weight:600">คนนอกบริษัท = ไม่มี</div>
      </div>` },

    // "8.ไม่ลงทุนกับทักษะของตัวเอง"   ไม่ลงทุน @19.86, ทักษะ @20.48
    { start: 19.4, end: 21.43, html: `
      ${steps(8, 19.45)}
      <div class="h" data-a="rise" data-t="19.45">ไม่ลงทุนกับ<span class="hl">ทักษะ</span>ของตัวเอง</div>
      <div style="position:relative">
        <div class="card" data-a="pop" data-t="19.95" style="width:780px;padding:40px 54px;display:flex;flex-direction:column;gap:26px">
          <div class="row-c" style="font-size:34px;font-weight:700">${I('graduation-cap', 46, 'var(--ink)')} ทักษะของตัวเอง</div>
          ${['Lv.1', 'Lv.1', 'Lv.1'].map((l, i) => `<div class="row-c" style="gap:20px"><div class="bar" style="flex:1;height:30px"><i data-a="grow" data-t="${20.48 + i * .1}" style="width:${8 + i * 3}%;background:var(--off)"></i></div><div class="muted" style="font-size:28px;font-weight:700;width:70px">${l}</div></div>`).join('')}
          <div style="align-self:flex-start;padding:16px 34px;border-radius:999px;background:var(--panel);color:var(--muted);font-size:32px;font-weight:700;opacity:.8" class="row-c">${I('circle-plus', 34, 'var(--muted)')} ลงทุนเรียนเพิ่ม</div>
        </div>
        <div class="ban" data-a="stamp" data-t="20.1" style="left:300px;bottom:-30px;width:84px;height:84px">${I('x', 50, '#fff', 3.5)}</div>
      </div>` },

    // "9.มีรายได้ทางเดียว ก็คือเงินเดือน"   รายได้ทางเดียว @22.22, เงินเดือน @23.04
    { start: 21.43, end: 23.63, html: `
      ${steps(9, 21.48)}
      <div class="h" data-a="rise" data-t="21.48">มีรายได้<span class="hl">ทางเดียว</span></div>
      <div class="card" data-a="pop" data-t="21.6" style="width:760px;padding:20px 50px">
        ${row('banknote', 'เงินเดือน', `<div class="tg" style="margin-left:auto"></div>`, `data-a="pop" data-t="23.04"`)}
        ${row('store', 'งานเสริม', `<div class="tg off" style="margin-left:auto"></div>`, `data-a="fade" data-t="21.7"`)}
        ${row('trending-up', 'ลงทุน', `<div class="tg off" style="margin-left:auto"></div>`, `data-a="fade" data-t="21.8"`)}
      </div>
      <div class="chip dark" data-a="stamp" data-t="22.77">ก็คือ<span style="color:#7CC4FF">เงินเดือน</span></div>` },

    // "10.เก็บเงินอย่างเดียวไม่หาเพิ่ม"   เก็บเงิน @24.00, ไม่หาเพิ่ม @24.86
    { start: 23.63, end: 25.73, html: `
      ${steps(10, 23.68)}
      <div class="h" data-a="rise" data-t="23.68">เก็บเงิน<span class="hl">อย่างเดียว</span><br><span class="h sm">ไม่หาเพิ่ม</span></div>
      <div class="row-c" style="gap:44px">
        <div class="card" data-a="pop" data-t="24.0" style="width:340px;height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
          <div data-a="pop" data-t="24.2" data-idle="bob">${I('coins', 60, 'var(--good)', 2)}</div>${I('piggy-bank', 130, 'var(--accent)', 1.7)}</div>
        <div style="position:relative">
          <div class="card" data-a="pop" data-t="24.4" style="width:340px;height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;opacity:.55">
            ${I('trending-up', 110, 'var(--muted)', 1.8)}<div class="muted" style="font-size:40px;font-weight:800">หาเพิ่ม</div></div>
          <div class="ban" data-a="stamp" data-t="24.86" style="right:-30px;top:-30px">${I('x', 60, '#fff', 3.5)}</div>
        </div>
      </div>` },
  ],
};
