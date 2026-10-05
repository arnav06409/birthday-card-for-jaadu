/* =====================================================================
   EDIT HERE — names, date, texts, music, speed
   ===================================================================== */
const CONFIG = {
  name:   "Jaadu",          // her nickname      -> replaces every "{name}" and [data-name] in the page
  sender: "Arnav Singh",    // your name         -> replaces every "{sender}" and [data-sender]
  date:   "29 October ✨",  // birthday date shown in Scene 1
  speed:  1,                // ANIMATION SPEED: 1 = normal, 1.5 = faster, 0.7 = slower
  typeMs: 40,               // typewriter speed per character in the letter (smaller = faster)
  music:  "assets/music.mp3", // Replace assets/music.mp3 with your own birthday song.
  volume: 0.8,              // music volume 0 – 1

  // ============================================================
  // BIRTHDAY TARGET DATE  (the ONLY place the unlock time is set)
  // 29 October 2026, 12:00 AM IST  (+05:30 = Asia/Kolkata)
  // Format: "YYYY-MM-DDTHH:MM:SS+05:30". The +05:30 makes it independent of the viewer's timezone.
  // Before this moment: countdown screen. From this moment on: the birthday card.
  // ============================================================
  unlockAt: "2026-10-29T00:00:00+05:30"
};
// Replace assets/music.mp3 with your own birthday song.
// (If the file is missing or empty, a soft built-in music-box melody plays instead.)

// Letter (Scene 4). One string per line. "" = a pause / blank gap between paragraphs.
const LETTER = [
"Hi {name} ❤️","",
"Happy Birthday! 🎂","",
"I’m genuinely so happy for you, and I wish you nothing but happiness, success and beautiful moments in your life.","",
"I know my English isn't perfect, but I wanted to write this myself because these words are truly from my heart.","",
"I still remember how we met and all those little moments we shared.","",
"Honestly, those memories are some of my favourite ones, and lately, I’ve been missing those days a lot.","",
"I miss talking to you,","listening to your talks,","and simply spending time with you.","",
"I know things didn't turn out the way we wanted, and maybe I made some mistakes too.","",
"But we can't change the past. We can only keep the good memories and move forward.","",
"And who knows...","",
"Maybe if two people are meant to meet again, life will find a way. ✨","",
"For now, I just want you to work hard, study well, chase your dreams, and build the beautiful future you deserve.","",
"I don't know if you miss those days or not...","",
"But I do know that you are still one of my favourite people. ❤️","",
"So keep smiling, keep shining, and please be happy.","",
"Happy Birthday once again, {name}. 🎂❤️"
];

// Shayari (Scene 6). One string per line, "" = short pause.
const SHAYARI = [
"Kabhi rona mat...","",
"Tumhari aankhon mein aansu acche nahi lagte.","",
"Tumhari woh pyaari si hansi zyada acchi lagti hai.","",
"Isliye hamesha muskurati rehna,",
"kyunki tumhari smile kisi bhi udaas din ko khoobsurat bana sakti hai. ❤️"
];

// Answer shown if she clicks "No" in Scene 5 (HTML allowed)
const NO_ANSWER = "That's okay.<br>Thank you for being honest. 🙂";
// Answer shown if she clicks "Yes" in Scene 5 (HTML allowed)
const YES_ANSWER = "I miss you too...<br><br>So, so, so much. ❤️";

// Final card (Scene 7). HTML allowed. <span class='big'> = big gold italic line.
const FINAL = [
"If you liked this little surprise,<br>thank you for giving it a place in your heart. ❤️",
"And if you didn't...",
"you can simply delete this little card<br>and pretend I never made it. 😄",
"Either way...",
"<span class='big'>Happy Birthday once again, {name}. 🎂❤️</span>",
"Keep smiling.<br>Keep growing.<br>Keep shining.",
"And please...",
"<span class='big'>Be happy. Always. ✨</span>"
];
const FINAL_SIGN = "— {sender}";            // signature line (a 🙂 pops in after it)
const FINAL_LAST = "Be happy always. ❤️";   // very last line

// Party-popper / confetti colours (change to re-colour the confetti)
const CONFETTI_COLORS = ['#e9c98a', '#e8607a', '#f6e9e0', '#c81e3f', '#ffd27a', '#ff9bb0'];
/* ===================== END OF EDIT AREA ===================== */


/* ---------- helpers ---------- */
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.style.setProperty('--k', String(1 / CONFIG.speed));
const T    = ms => ms / CONFIG.speed;
const wait = ms => new Promise(r => setTimeout(r, T(ms)));
const rnd  = (a, b) => a + Math.random() * (b - a);
const frame2 = f => requestAnimationFrame(() => requestAnimationFrame(f));
const fill = s => s.replace(/\{name\}/g, CONFIG.name).replace(/\{sender\}/g, CONFIG.sender);
const show = el => frame2(() => el.classList.add('in'));
const hide = el => el.classList.remove('in');
const keepInView = el => { try { el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {} };

$$('[data-name]').forEach(e => e.textContent = CONFIG.name);
$$('[data-sender]').forEach(e => e.textContent = CONFIG.sender);
$$('[data-date]').forEach(e => e.textContent = CONFIG.date);

// Run a button's action only ONCE (blocks double-taps during animations)
const once = (sel, fn) => {
  const b = $(sel);
  b.addEventListener('click', () => { if (b.disabled) return; b.disabled = true; hide(b); fn(b); });
};


/* =====================================================================
   MUSIC — one <audio> element for the whole experience (never restarts)
   ===================================================================== */
const au = $('#bgm'), muteBtn = $('#mute');
let playing = false, userMuted = false, mode = 'file', fileFailed = false, startP = null, fadeT = null;
au.src = CONFIG.music; au.loop = true; au.volume = 0;
au.addEventListener('error', () => { fileFailed = true; });

const setIcon = () => { muteBtn.textContent = playing ? '🔊' : '🔇'; };
setIcon();

function fadeFile(target) {
  clearInterval(fadeT);
  fadeT = setInterval(() => {
    const d = target - au.volume;
    if (Math.abs(d) < .03) { au.volume = target; clearInterval(fadeT); return; }
    au.volume = Math.max(0, Math.min(1, au.volume + Math.sign(d) * .03));
  }, 120);
}

/* --- fallback: soft music-box "Happy Birthday" made with the Web Audio API --- */
let actx = null, bus = null, loopT = null;
const N = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const MELODY = [ // [note, beats]
  ['G4',.75],['G4',.25],['A4',1],['G4',1],['C5',1],['B4',2],
  ['G4',.75],['G4',.25],['A4',1],['G4',1],['D5',1],['C5',2],
  ['G4',.75],['G4',.25],['G5',1],['E5',1],['C5',1],['B4',1],['A4',1],
  ['F5',.75],['F5',.25],['E5',1],['C5',1],['D5',1],['C5',2.5]
];
function note(f, t, d) {
  const o = actx.createOscillator(), o2 = actx.createOscillator(), g = actx.createGain(), g2 = actx.createGain();
  o.type = 'sine'; o.frequency.value = f; o2.type = 'triangle'; o2.frequency.value = f * 2; g2.gain.value = .22;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.32, t + .015);
  g.gain.exponentialRampToValueAtTime(.001, t + Math.max(d, .5) + .7);
  o.connect(g); o2.connect(g2); g2.connect(g); g.connect(bus);
  o.start(t); o2.start(t); o.stop(t + d + 1); o2.stop(t + d + 1);
}
function scheduleLoop() {
  clearTimeout(loopT);
  let t = actx.currentTime + .15; const beat = .62;
  MELODY.forEach(([n, b]) => { note(N[n], t, b * beat); t += b * beat; });
  loopT = setTimeout(scheduleLoop, (t - actx.currentTime + 2.5) * 1000);
}
async function startSynth() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) throw { name: 'NoAudio' };
  if (!actx) {
    actx = new AC();
    const master = actx.createGain(); master.gain.value = CONFIG.volume * .8; master.connect(actx.destination);
    bus = actx.createGain(); bus.connect(master);
    const dly = actx.createDelay(); dly.delayTime.value = .3; const fb = actx.createGain(); fb.gain.value = .3;
    bus.connect(dly); dly.connect(fb); fb.connect(dly); dly.connect(master);
  }
  if (actx.state !== 'running') await Promise.race([actx.resume(), new Promise(r => setTimeout(r, 400))]);
  if (actx.state !== 'running') throw { name: 'NotAllowedError' };   // needs a tap
  scheduleLoop();
}
function stopSynth() { clearTimeout(loopT); if (actx) { actx.close().catch(() => {}); actx = null; } }

/* --- start / stop --- */
async function _start() {
  if (mode === 'file' && !fileFailed) {
    try { await au.play(); fadeFile(CONFIG.volume); playing = true; setIcon(); return; }
    catch (e) { if (e && e.name === 'NotAllowedError') throw e; mode = 'synth'; }   // file missing/unsupported -> fallback
  } else mode = 'synth';
  await startSynth(); playing = true; setIcon();
}
function startMusic() {
  if (playing) return Promise.resolve();
  if (!startP) startP = _start().finally(() => { startP = null; });
  return startP;
}
function pauseMusic() { if (mode === 'file') au.pause(); else stopSynth(); playing = false; setIcon(); }

muteBtn.addEventListener('click', async () => {
  if (playing) { userMuted = true; pauseMusic(); }
  else { userMuted = false; try { await startMusic(); } catch (e) {} }
});
// If the browser blocked autoplay, the first tap anywhere starts the music
let cardOpen = false;   // stays false while the countdown is showing -> no music before the card unlocks
addEventListener('pointerdown', e => {
  if (!cardOpen || playing || userMuted || (e.target.closest && e.target.closest('#mute'))) return;
  startMusic().catch(() => {});
}, { passive: true });


/* =====================================================================
   PARTICLES — one canvas: floating motes, confetti, sparks, petals
   ===================================================================== */
const cv = $('#fx'), cx = cv.getContext('2d');
let W = 0, H = 0, P = [], tint = ['233,201,138', '232,96,122'];
function size() { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); }
addEventListener('resize', size); size();

const sprites = {};
function sprite(rgb) {                       // pre-rendered soft glow dot (fast to draw)
  if (sprites[rgb]) return sprites[rgb];
  const c = document.createElement('canvas'); c.width = c.height = 48; const g = c.getContext('2d');
  const gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
  gr.addColorStop(0, `rgba(${rgb},1)`); gr.addColorStop(.25, `rgba(${rgb},.55)`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr; g.fillRect(0, 0, 48, 48); return sprites[rgb] = c;
}
function motes(n) { for (let i = 0; i < n; i++) P.push({ t: 'm', x: rnd(0, W), y: rnd(0, H), r: rnd(1.2, 3), vx: rnd(-.12, .12), vy: rnd(-.45, -.1), a: rnd(.2, .7), c: Math.random() < .6 ? 0 : 1 }); }
motes(RM ? 14 : Math.min(55, Math.round(W / 12)));
function confetti(x, y, n, ang, spread) {
  if (RM) n = Math.round(n / 3); if (P.length > 900) return;
  for (let i = 0; i < n; i++) { const a = ang + rnd(-spread, spread), s = rnd(5, 15);
    P.push({ t: 'c', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, w: rnd(5, 10), h: rnd(3, 6), rot: rnd(0, 6), vr: rnd(-.3, .3), c: CONFETTI_COLORS[i % CONFETTI_COLORS.length], life: 150 + rnd(0, 60) }); }
}
function sparks(x, y, n, spd = 3) { for (let i = 0; i < n; i++) { const a = rnd(0, 6.28), s = rnd(.5, spd); P.push({ t: 's', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - .5, r: rnd(1.5, 3.2), life: 50 + rnd(0, 40), max: 90 }); } }
function petals(n) { for (let i = 0; i < n; i++) P.push({ t: 'p', x: rnd(0, W), y: rnd(-80, -10), vx: rnd(-.3, .3), vy: rnd(.6, 1.3), rot: rnd(0, 6), vr: rnd(-.03, .03), sw: rnd(0, 6), s: rnd(5, 10) }); }
function at(el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }

(function loop() {
  cx.clearRect(0, 0, W, H);
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i]; p.x += p.vx; p.y += p.vy;
    if (p.t === 'm') {
      if (p.y < -5) { p.y = H + 5; p.x = rnd(0, W); } if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      cx.globalAlpha = p.a; cx.drawImage(sprite(tint[p.c]), p.x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8); cx.globalAlpha = 1; continue;
    }
    if (p.t === 'c') {
      p.vy += .22; p.vx *= .985; p.vy *= .985; p.rot += p.vr; if (--p.life <= 0) { P.splice(i, 1); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = Math.min(1, p.life / 40); cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore(); continue;
    }
    if (p.t === 's') {
      p.vx *= .97; p.vy += .02; if (--p.life <= 0) { P.splice(i, 1); continue; }
      cx.globalAlpha = p.life / p.max; cx.drawImage(sprite('255,224,160'), p.x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8); cx.globalAlpha = 1; continue;
    }
    if (p.t === 'p') {
      p.sw += .03; p.x += Math.sin(p.sw) * .6; p.rot += p.vr; if (p.y > H + 20) { P.splice(i, 1); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.fillStyle = 'rgba(200,30,63,.85)'; cx.beginPath(); cx.ellipse(0, 0, p.s, p.s * .6, 0, 0, 6.28); cx.fill(); cx.restore();
    }
  }
  requestAnimationFrame(loop);
})();


/* =====================================================================
   SCENE CONTROL
   ===================================================================== */
let cur = null;
async function go(id) {
  const old = cur, nxt = $(id); cur = nxt;
  if (old) { old.classList.remove('on'); await wait(800); }
  nxt.scrollTop = 0;
  frame2(() => nxt.classList.add('on'));
}
async function seq(els, gap = 1400) { for (const e of els) { show(e); await wait(gap); } }
async function setText(el, html) { el.style.opacity = 0; await wait(500); el.innerHTML = html; $$('[data-name]').forEach(e => e.textContent = CONFIG.name); el.style.opacity = 1; }


/* =====================================================================
   SCENE 1 — OPENING
   ===================================================================== */
async function intro() {
  const b = $('#begin'); if (b) b.remove();
  const h = innerHeight;
  confetti(0, h, 90, -1.0, .4); confetti(innerWidth, h, 90, -2.14, .4);     // party-popper blast
  sparks(0, h, 20, 6); sparks(innerWidth, h, 20, 6);
  await wait(700);
  confetti(innerWidth / 2, h, 60, -1.57, .5);
  await seq([$('#date')], 2200);       // "29 October ✨"
  await seq([$('#title')], 2000);      // "Happy Birthday, Jaadu ❤️"
  await seq([$('#sub')], 1500);        // "Today is your special day ✨"
  show($('#toCake'));
}
async function start() {
  await go('#s1'); await wait(1800); $('#loader').classList.add('off');
  try { await startMusic(); intro(); }
  catch (e) {
    if (e && e.name === 'NotAllowedError') {            // autoplay blocked -> ask for one tap
      const b = $('#begin'); show(b);
      b.addEventListener('click', () => { hide(b); startMusic().catch(() => {}); setTimeout(intro, T(500)); }, { once: true });
    } else { intro(); }                                   // no audio possible: continue silently
  }
}


/* =====================================================================
   SCENE 2 — CAKE (pure SVG)
   ===================================================================== */
function buildCake() {
  const tiers = [
    { x: 40,  y: 176, w: 220, h: 70, a: '#9a2b4c', b: '#68162f' },
    { x: 70,  y: 122, w: 160, h: 54, a: '#c2415f', b: '#8e2443' },
    { x: 100, y: 78,  w: 100, h: 44, a: '#e66a88', b: '#b83a5c' }
  ];
  let defs = '', body = '';
  tiers.forEach((t, i) => {
    defs += `<linearGradient id="tg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>`;
    body += `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="10" fill="url(#tg${i})"/>`;
    body += `<rect x="${t.x + 6}" y="${t.y + 16}" width="5" height="${t.h - 26}" rx="2.5" fill="#fff" opacity=".07"/>`;
    body += `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="13" rx="6.5" fill="#f8ece4"/>`;
    const n = Math.floor(t.w / 20);
    for (let k = 0; k < n; k++) {                      // frosting drips
      const cxp = t.x + 12 + k * ((t.w - 24) / (n - 1)), dh = 8 + ((k * 7) % 3) * 6;
      body += `<rect x="${cxp - 4.5}" y="${t.y + 6}" width="9" height="${dh + 8}" rx="4.5" fill="#f8ece4"/>`;
    }
  });
  for (let k = 0; k < 11; k++) body += `<circle cx="${52 + k * 19.6}" cy="238" r="3" fill="#e9c98a"/>`;   // gold pearls
  const cx4 = [122, 138, 162, 178];                    // candle positions (none on the cut line)
  const candles = cx4.map(x => `<rect x="${x - 3}" y="44" width="6" height="34" rx="2" fill="#fff1e0"/><rect x="${x - 3}" y="52" width="6" height="3" fill="#e8607a" opacity=".8"/><rect x="${x - 3}" y="62" width="6" height="3" fill="#e8607a" opacity=".8"/>`).join('');
  body += candles;
  const flames = cx4.map((x, i) =>
    `<circle class="glow" cx="${x}" cy="34" r="24" fill="url(#gl)"/>` +
    `<ellipse class="flame" cx="${x}" cy="33" rx="4.5" ry="9.5" fill="url(#fl)"/>` +
    `<path class="smoke" style="animation-delay:${i * .25}s" d="M${x} 30 q-6 -9 0 -17 q6 -8 0 -16"/>`).join('');
  const star = (x, y, d) => `<g transform="translate(${x} ${y})"><path class="tw" style="animation-delay:${d}s" d="M0-7 L1.8-1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8-1.8Z" fill="#ffe7a8"/></g>`;
  const slice = `<g id="slice"><rect x="132" y="78" width="36" height="168" fill="#f3d9c4"/><rect x="132" y="98" width="36" height="4" fill="#c8456a"/><rect x="132" y="146" width="36" height="4" fill="#c8456a"/><rect x="132" y="206" width="36" height="4" fill="#c8456a"/></g>`;

  $('#cake').innerHTML = `<svg viewBox="0 0 300 290" role="img" aria-label="Birthday cake with candles"><defs>
    <radialGradient id="gl"><stop offset="0" stop-color="#ffcf70" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf70" stop-opacity="0"/></radialGradient>
    <radialGradient id="halo"><stop offset="0" stop-color="#ffb866" stop-opacity=".28"/><stop offset="1" stop-color="#ffb866" stop-opacity="0"/></radialGradient>
    <linearGradient id="fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff7a2e"/><stop offset="1" stop-color="#fff2b0"/></linearGradient>
    <linearGradient id="bl" x1="0" x2="1"><stop offset="0" stop-color="#aaa"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#8a8a8a"/></linearGradient>
    ${defs}
    <clipPath id="cl"><rect x="-100" y="-100" width="250" height="500"/></clipPath>
    <clipPath id="cr"><rect x="150" y="-100" width="250" height="500"/></clipPath></defs>
    <circle class="halo" cx="150" cy="80" r="150" fill="url(#halo)"/>
    <ellipse cx="150" cy="248" rx="142" ry="17" fill="#2a1118" stroke="#e9c98a" stroke-opacity=".5"/>
    ${slice}
    <g id="hl" clip-path="url(#cl)">${body}</g>
    <g id="hr" clip-path="url(#cr)">${body}</g>
    <g id="flames">${flames}</g>
    ${star(30, 120, 0)}${star(274, 100, .9)}${star(58, 40, 1.6)}${star(246, 30, .4)}${star(150, 12, 1.2)}
    <g id="knife"><rect x="144" y="-30" width="12" height="46" rx="4" fill="#5a2a2a"/><polygon points="144,16 156,16 156,150 144,172" fill="url(#bl)"/></g></svg>`;
}
buildCake();

const cakeTxt = $('#cakeTxt');
let cakeSpark = null;
once('#toCake', async () => {
  await go('#s2'); await wait(900); show($('#wish'));
  cakeSpark = setInterval(() => { if (cur === $('#s2') && !RM) { const p = at($('#cake')); sparks(p.x + rnd(-110, 110), p.y + rnd(-110, 100), 1, 1); } }, T(350));
});
once('#wish', async () => {
  $('#cake').classList.add('out');                                  // flames, glow & halo fade; smoke rises
  $$('#cake .flame').forEach(f => { const p = at(f); sparks(p.x, p.y, 10, 2); });
  await wait(900);
  $$('#cake .smoke').forEach(f => { const p = at(f); sparks(p.x, p.y - 20, 4, 1.2); });
  await setText(cakeTxt, 'Wish made? ✨'); await wait(900); show($('#cut'));
});
once('#cut', async () => {
  $('#cake').classList.add('cut'); await wait(1500);                // knife drops, cake splits
  const p = at($('#cake')); confetti(p.x, p.y, 110, -1.57, 1.0); sparks(p.x, p.y, 40, 5);
  await wait(900); await setText(cakeTxt, 'That deserves a celebration! 🎉'); await wait(800); show($('#toGift'));
});


/* =====================================================================
   SCENE 3 — GIFT (pure SVG)
   ===================================================================== */
$('#gift').innerHTML = `<svg viewBox="0 0 200 200" role="img" aria-label="Gift box"><defs>
  <radialGradient id="gg"><stop offset="0" stop-color="#ff6f91" stop-opacity=".5"/><stop offset="1" stop-color="#ff6f91" stop-opacity="0"/></radialGradient>
  <linearGradient id="gb" x1="0" x2="1"><stop offset="0" stop-color="#b3153f"/><stop offset=".5" stop-color="#e8607a"/><stop offset="1" stop-color="#9c1136"/></linearGradient>
  <linearGradient id="rb" x1="0" x2="1"><stop offset="0" stop-color="#c9a15a"/><stop offset=".5" stop-color="#f3dca4"/><stop offset="1" stop-color="#c9a15a"/></linearGradient></defs>
  <circle cx="100" cy="110" r="105" fill="url(#gg)"/>
  <g class="rays"><polygon points="100,96 60,-40 140,-40" fill="#fff3cf" opacity=".5"/><polygon points="100,96 -20,40 -20,-10" fill="#fff3cf" opacity=".3"/><polygon points="100,96 220,40 220,-10" fill="#fff3cf" opacity=".3"/></g>
  <g class="gbox"><rect x="30" y="96" width="140" height="96" rx="6" fill="url(#gb)"/><rect x="92" y="96" width="16" height="96" fill="url(#rb)"/>
    <ellipse class="inl" cx="100" cy="98" rx="62" ry="9" fill="#fff3cf"/>
    <g id="lid"><rect x="22" y="70" width="156" height="32" rx="6" fill="url(#gb)"/><rect x="92" y="70" width="16" height="32" fill="url(#rb)"/>
    <ellipse cx="80" cy="62" rx="22" ry="12" transform="rotate(-18 80 62)" fill="none" stroke="url(#rb)" stroke-width="8"/>
    <ellipse cx="120" cy="62" rx="22" ry="12" transform="rotate(18 120 62)" fill="none" stroke="url(#rb)" stroke-width="8"/>
    <circle cx="100" cy="68" r="8" fill="url(#rb)"/></g></g></svg>`;
let giftSpark = null;
once('#toGift', async () => {
  clearInterval(cakeSpark);
  await go('#s3'); await wait(900); show($('#openGift'));
  giftSpark = setInterval(() => { if (cur === $('#s3') && !RM) { const p = at($('#gift')); sparks(p.x + rnd(-90, 90), p.y + rnd(-70, 80), 1, 1); } }, T(250));
});
once('#openGift', async () => {
  clearInterval(giftSpark);
  $('#gift').classList.add('open'); await wait(700);                // lid opens, light bursts
  const p = at($('#gift')); confetti(p.x, p.y, 70, -1.57, .8); sparks(p.x, p.y, 60, 6);
  $('#flash').classList.add('go'); await wait(1700);
  document.body.classList.add('dark'); tint = ['233,201,138', '233,201,138'];
  $('#flash').style.opacity = 0; await wait(1500); letter();
});


/* =====================================================================
   SCENE 4 — LETTER (slow typewriter, tap the letter to speed it up)
   ===================================================================== */
async function letter() {
  await go('#s4'); await wait(1200);
  const box = $('#letter'); box.classList.add('typing');
  let fast = false, prev = null;
  $('#s4').addEventListener('click', () => { fast = true; });
  for (const raw of LETTER) {
    if (prev) { prev.classList.remove('cur'); prev.classList.add('done'); }
    if (!raw) { const g = document.createElement('div'); g.className = 'gap'; box.appendChild(g); box.scrollTop = box.scrollHeight; await wait(fast ? 80 : 650); continue; }
    const d = document.createElement('div'); d.className = 'ln cur'; box.appendChild(d); prev = d;
    for (const ch of Array.from(fill(raw))) {
      d.textContent += ch; box.scrollTop = box.scrollHeight;
      await wait(fast ? 6 : CONFIG.typeMs + (/[.,…!?—]/.test(ch) ? 200 : 0));
    }
    await wait(fast ? 40 : 600);
  }
  prev.classList.remove('cur'); box.classList.remove('typing');
  await wait(900); show($('#sig')); await wait(1800); show($('#c4'));
}
once('#c4', async () => { await go('#s5'); await wait(700); await seq([$('#q1'), $('#q2')], 1600); show($('#qbtns')); });


/* =====================================================================
   SCENE 5 — "Do you miss me?"
   ===================================================================== */
function heart() {
  const h = document.createElement('div'); h.className = 'heart'; h.textContent = '❤'; h.style.left = rnd(5, 95) + 'vw';
  h.style.fontSize = rnd(16, 36) + 'px'; h.style.setProperty('--dx', rnd(-40, 40) + 'px'); document.body.appendChild(h); setTimeout(() => h.remove(), 4200);
}
let dodges = 0, answered = false, tx = 0, ty = 0;
const noBtn = $('#no');
async function answer(html, hearts) {
  if (answered) return; answered = true;
  [$('#qbtns'), $('#q1'), $('#q2')].forEach(hide);
  await wait(1100); [$('#qbtns'), $('#q1'), $('#q2')].forEach(e => e.style.display = 'none');
  if (hearts) { tint = ['232,96,122', '255,155,176']; for (let i = 0; i < 22; i++) setTimeout(heart, T(i * 180)); confetti(innerWidth / 2, innerHeight / 2, 40, -1.57, 3); }
  $('#ans').innerHTML = html; show($('#ans')); await wait(2800); show($('#c5'));
}
noBtn.addEventListener('click', () => {
  if (dodges < 2) {            // playful: dodges only twice, then it can be clicked normally
    dodges++;
    let dx = rnd(50, 90) * (Math.random() < .5 ? -1 : 1), dy = rnd(-50, 50);
    const r = noBtn.getBoundingClientRect();
    if (r.left + dx < 14 || r.right + dx > innerWidth - 14) dx = -dx;     // keep it on screen
    if (r.top + dy < 70 || r.bottom + dy > innerHeight - 20) dy = -dy;
    tx += dx; ty += dy; noBtn.style.transform = `translate(${tx}px,${ty}px)`;
  } else answer(NO_ANSWER, false);
});
$('#yes').addEventListener('click', () => answer(YES_ANSWER, true));
once('#c5', async () => { await go('#s6'); document.body.classList.add('red'); tint = ['232,96,122', '200,30,63']; rose(); });


/* =====================================================================
   SCENE 6 — ROSE (pure SVG)
   ===================================================================== */
async function rose() {
  const layers = [ // [count, rotation offset, distance from centre, rx, ry, colour]
    [5, 0, 30, 30, 36, '#7d0c26'], [5, 36, 24, 24, 30, '#a3142f'], [4, 18, 16, 17, 22, '#c81e3f'], [3, 50, 9, 10, 14, '#e23a5b']];
  let pe = '', n = 0;
  layers.forEach(([k, off, d, rx, ry, c]) => { for (let i = 0; i < k; i++)
    pe += `<ellipse class="p" style="--r:${off + i * 360 / k}deg;--i:${n++}" cx="100" cy="${118 - d}" rx="${rx}" ry="${ry}" fill="${c}" stroke="#4a0512" stroke-opacity=".45" stroke-width=".8"/>`; });
  $('#rose').innerHTML = `<svg viewBox="0 0 200 320" role="img" aria-label="Red rose">
    <path class="st" d="M100 318 C98 270 104 220 100 170" fill="none" stroke="#2f7d4f" stroke-width="5" stroke-linecap="round"/>
    <path class="lf" d="M100 270 C70 262 52 242 48 220 C78 224 98 244 100 270Z" fill="#2f7d4f"/>
    <path class="lf l2" d="M101 235 C128 228 146 210 150 190 C122 194 104 212 101 235Z" fill="#3a9560"/>
    ${pe}
    <g class="core"><path d="M100 118 c-6 -2 -7 -10 0 -12 c9 -2 14 7 7 13" fill="none" stroke="#4a0512" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>
    <ellipse cx="84" cy="80" rx="14" ry="6" transform="rotate(-35 84 80)" fill="#fff" opacity=".1"/></g></svg>`;
  frame2(() => $('#rose').classList.add('bloom'));
  setTimeout(() => { if (!RM) petals(18); const i = setInterval(() => { if (cur === $('#s6')) petals(1); else clearInterval(i); }, T(900)); }, T(3500));
  await wait(6200);
  $('#rose').classList.add('small'); await wait(800);
  show($('#r1')); await wait(2800);
  const poem = $('#poem');
  for (const ln of SHAYARI) {
    const d = document.createElement('div'); d.className = 'rv'; d.innerHTML = ln || '&nbsp;'; poem.appendChild(d); show(d); keepInView(d);
    await wait(ln ? 1500 : 500);
  }
  await wait(1000); show($('#c6')); keepInView($('#c6'));
}
once('#c6', async () => { await go('#s7'); finalCard(); });


/* =====================================================================
   SCENE 7 — FINAL CARD
   ===================================================================== */
async function finalCard() {
  const c = $('#final'); await wait(800);
  const add = (cls, html) => { const p = document.createElement('p'); p.className = 'rv ' + cls; p.innerHTML = fill(html); c.appendChild(p); show(p); keepInView(p); return p; };
  for (const html of FINAL) { add('', html); await wait(2300); }
  const s = add('sign', `${FINAL_SIGN} <span class="pop">🙂</span>`);
  await wait(1500); s.querySelector('.pop').classList.add('in');
  await wait(1800); add('big', FINAL_LAST);
  tint = ['233,201,138', '232,96,122']; motes(RM ? 5 : 25); if (!RM) petals(10);          // gentle final particles
  setInterval(() => sparks(rnd(0, W), rnd(H * .2, H), 2, 1.2), T(700));
  if (!RM) setInterval(() => petals(1), T(1800));
}

/* =====================================================================
   SCENE 0 — COUNTDOWN LANDING (runs before start())
   ===================================================================== */
const UNLOCK_MS = Date.parse(CONFIG.unlockAt);   // one absolute moment in time -> same for every timezone

const svgURI = s => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const BLUR = '<defs><filter id="b" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/></filter></defs>';
const HEART_D = 'M16 28C6 20 2 14 2 9.5C2 5.5 5 3 8.5 3C11.5 3 14.5 4.8 16 7.5C17.5 4.8 20.5 3 23.5 3C27 3 30 5.5 30 9.5C30 14 26 20 16 28Z';
const heartSVG = c => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 48 48">${BLUR}<path filter="url(#b)" fill="${c}" d="${HEART_D}"/><path fill="${c}" d="${HEART_D}"/><path fill="#fff" opacity=".25" d="M8 9c1-2.5 3.5-3.5 5.5-2.5-2.5-.2-4 .8-5.5 2.5z"/></svg>`;
const balloonSVG = c => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 48 78">${BLUR}<ellipse filter="url(#b)" cx="16" cy="18" rx="12" ry="15" fill="${c}"/><ellipse cx="16" cy="18" rx="12" ry="15" fill="${c}"/><path d="M16 33l-3.2 4.2h6.4z" fill="${c}"/><path d="M16 37.2q-5 7 0 13t0 11" fill="none" stroke="#e9c98a" stroke-opacity=".6" stroke-width="1"/><ellipse cx="11" cy="11" rx="2.8" ry="5" transform="rotate(25 11 11)" fill="#fff" opacity=".3"/></svg>`;
const starSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 24 24">' + BLUR + '<path filter="url(#b)" fill="#ffe7a8" d="M0-8L2-2 8 0 2 2 0 8-2 2-8 0-2-2Z"/><path fill="#fff4cf" d="M0-8L2-2 8 0 2 2 0 8-2 2-8 0-2-2Z"/></svg>';

function buildFloaters() {
  if (RM) return;                                   // reduced motion: keep it calm, no floating objects
  const box = $('#cdfx'), frag = document.createDocumentFragment(), cols = ['#e8607a', '#c81e3f', '#ff9bb0', '#e9c98a'];
  const add = (img, ar, sMin, sMax, tMin, tMax) => {
    const side = Math.random() < .7, x = side ? (Math.random() < .5 ? rnd(1, 20) : rnd(76, 94)) : rnd(22, 72);   // keep the centre mostly clear
    const t = rnd(tMin, tMax), el = document.createElement('i'); el.className = 'fl';
    el.style.cssText = `--x:${x}%;--s:${rnd(sMin, sMax).toFixed(0)}px;--ar:${ar};--t:${t.toFixed(1)}s;--d:-${rnd(0, t).toFixed(1)}s;--dx:${rnd(10, 34).toFixed(0)}px;--o:${side ? rnd(.22, .4).toFixed(2) : rnd(.08, .15).toFixed(2)};--img:${img}`;
    frag.appendChild(el);
  };
  for (let i = 0; i < 8; i++) add(svgURI(heartSVG(cols[i % 4])), 1, 14, 34, 16, 28);          // hearts
  for (let i = 0; i < 5; i++) add(svgURI(balloonSVG(cols[(i + 1) % 4])), .615, 26, 44, 24, 38); // balloons
  for (let i = 0; i < 6; i++) {                                                                // occasional sparkles
    const el = document.createElement('i'); el.className = 'fs';
    el.style.cssText = `--x:${rnd(4, 94).toFixed(0)}%;--y:${rnd(6, 90).toFixed(0)}%;--s:${rnd(10, 18).toFixed(0)}px;--t:${rnd(3, 6).toFixed(1)}s;--d:-${rnd(0, 5).toFixed(1)}s;--img:${svgURI(starSVG)}`;
    frag.appendChild(el);
  }
  box.appendChild(frag);
}

function openCard() {            // the existing birthday experience, unchanged
  cardOpen = true; document.body.classList.remove('counting');
  const f = $('#cdfx'); if (f) f.remove();
  start();
}

function runCountdown() {
  document.body.classList.add('counting'); buildFloaters(); go('#s0');
  const el = { d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS') }, pad = n => String(n).padStart(2, '0');
  let last = -1, done = false, iv = null, sp = null;
  const unlock = async () => {
    if (done) return; done = true; clearInterval(iv); clearInterval(sp);
    $('#s0').classList.remove('on');                       // countdown disappears
    document.body.classList.add('dark'); $('#cdfx').classList.add('off');   // screen briefly becomes dark
    await wait(1800);                                      // small pause
    document.body.classList.remove('dark');
    openCard();                                            // confetti -> date -> title -> music -> card continues
  };
  const tick = () => {
    if (done) return;
    const left = UNLOCK_MS - Date.now();
    if (left <= 0) { unlock(); return; }
    const sec = Math.ceil(left / 1000); if (sec === last) return; last = sec;   // only touch the DOM when the second changes
    el.d.textContent = pad(Math.floor(sec / 86400)); el.h.textContent = pad(Math.floor(sec % 86400 / 3600));
    el.m.textContent = pad(Math.floor(sec % 3600 / 60)); el.s.textContent = pad(sec % 60);
  };
  tick(); iv = setInterval(tick, 250);
  document.addEventListener('visibilitychange', tick);     // catch up instantly when the phone wakes up
  if (!RM) sp = setInterval(() => { if (cur === $('#s0')) sparks(rnd(0, W), rnd(H * .1, H * .9), 3, .8); }, 1400);
}

// Already past the unlock time (or invalid date)? -> straight to the birthday card, no countdown.
if (UNLOCK_MS > Date.now()) runCountdown(); else openCard();
