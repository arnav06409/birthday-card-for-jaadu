/* =====================================================================
   EDIT HERE — names, date, texts, music, speed
   ===================================================================== */
const CONFIG = {
  name:   "Jaadu",          // her nickname      -> replaces every "{name}" and [data-name] in the page
  sender: "Arnav Singh",    // your name         -> replaces every "{sender}" and [data-sender]
  date:   "29 October ✨",  // birthday date shown in Scene 1
  speed:  1,                // ANIMATION SPEED: 1 = normal, 1.5 = faster, 0.7 = slower
  typeMs: 40,               // typewriter speed per character in the letter (smaller = faster)
  music:  "assets/music/happy-birthday.mp3", // Supplied birthday song; only used for intro and cake.
  volume: 0.8,              // music volume 0 – 1

  // ============================================================
  // BIRTHDAY TARGET DATE  (the ONLY place the unlock time is set)
  // 29 October 2026, 12:00 AM IST  (+05:30 = Asia/Kolkata)
  // Format: "YYYY-MM-DDTHH:MM:SS+05:30". The +05:30 makes it independent of the viewer's timezone.
  // Before this moment: countdown screen. From this moment on: the birthday card.
  // ============================================================
  unlockAt: "2026-10-29T00:00:00+05:30",
  codes: { oneUse: "2910", twoUse: "anshika29", unlimited: "arnav81", owner: "arnavowner" }
};
// Scene-specific music files are bundled in assets/music/. No substitute tracks are generated.

// Letter (Scene 4). One string per line. "" = a pause / blank gap between paragraphs.
const LETTER = [
"Hi {name} ❤️","",
"First of all, I’m so sorry for everything I did and for the way I hurt you.","",
"I thought my attachment was becoming less, and I started wondering whether my love was fading. Those thoughts confused me, and I made a decision because I was scared that if I continued the relationship while feeling that way, it would become unfair to you and hurt you even more in the future.","",
"But I understand that phases like this can happen in relationships. Sometimes people get confused, overthink, or struggle to understand their feelings. I’m not saying this to justify what I did—I just want to explain honestly what was going on in my mind.","",
"And when I said, “I wish you never meet a person like me,” I was joking with that dramatic line because, well… there’s only one me 😭😂. But jokes aside, I’m sorry for the pain I caused.","",
"You deserved honesty, kindness, and care. I hope life brings you peace, happiness, good people, and every beautiful thing you dream of.","",
"Be happy always, Jaadu. Please keep smiling and keep becoming the person you want to be. ❤️","",
"Happy Birthday once again. 🎂✨","",
"A little more from my heart…","",
"First of all soo sorry for everything I had done. Maine socha yrr ki mera attachment kam ho rha or jo bhi bola like love fade ho rha ussi thought ke wajah se meine socha yrr if I continue our relationship then it will be called cheating and hurt u even more in future isiliye meine breakup kar liya yahi.","",
"Yrr ye phase toh sabke relationship mein aata h jaha unhe lagne lagta ki woh pyaar nhi kartee and mere case mein bhi esa hua.","",
"I am giving safai, mere mann mein thoughts the.","",
"Ye toh bol rha tha I wish u never meet a person like me bcz mein ek hi hun 😎😂 majak kar rha tha.","",
"Be happy always."
];

// Shayari (Scene 6). One string per line, "" = short pause.
// Additional birthday letter (separate page; the original apology letter remains above).
const BIRTHDAY_LETTER = [
"Hi Jaadu ❤️","","Happy Birthday! 🎂","",
"I’m genuinely so happy for you, and I wish you nothing but happiness, success and beautiful moments in your life.","",
"I know my English isn't perfect, but I wanted to write this myself because these words are truly from my heart.","",
"I still remember how we met and all those little moments we shared.","",
"Honestly, those memories are some of my favourite ones, and lately, I’ve been missing those days a lot.","",
"I miss talking to you,","listening to your talks,","and simply spending time with you.","",
"I know things didn't turn out the way we wanted, and maybe I made some mistakes too.","",
"But we can't change the past. We can only keep the good memories and move forward.","",
"And who knows...","","Maybe if two people are meant to meet again, life will find a way. ✨","",
"For now, I just want you to work hard, study well, chase your dreams, and build the beautiful future you deserve.","",
"I don't know if you miss those days or not...","","But I do know that you are still one of my favourite people. ❤️","",
"So keep smiling, keep shining, and please be happy.","","Happy Birthday once again, Jaadu. 🎂❤️"
];

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
   CENTRAL MUSIC CONTROLLER — one shared audio element, never overlaps
   ===================================================================== */
const au = $('#bgm'), muteBtn = $('#mute');
const TRACKS = {
  default: 'assets/music/iktara.mp3', // persistent default background track
  birthday: 'assets/music/happy-birthday.mp3',
  album: 'assets/music/ilahi.mp3',
  garden: 'assets/music/khairiyat.mp3',
  secret: 'assets/music/hawayein.mp3',
  finale: 'assets/music/apna-bana-le.mp3'
};
const TRACK_LABELS = {default:'Iktara',birthday:'Happy Birthday',album:'Ilahi',garden:'Khairiyat',secret:'Hawayein',finale:'Apna Bana Le'};
let playing = false, userMuted = localStorage.getItem('jaadu_music_muted') === '1', activeTrack = '', pendingTrack = '', playPromise = null, trackRequest = 0;
// Remember Iktara's exact position while a scene-specific song temporarily owns the shared audio element.
let iktaraSavedTime = 0;
let activeContext = 'scene', currentPlaylistId = null, secretRestoreTrack = null;
let slideshowTimer=null, slideshowIndex=0;
const PHOTO_FILES=['IMG-20251228-WA0089.jpg','IMG-20251227-WA0014.jpg','IMG-20251229-WA0005.jpg','IMG-20251229-WA0002.jpg','IMG-20251229-WA0003.jpg','IMG-20251231-WA0002.jpg','IMG-20251227-WA0008.jpg','IMG-20251229-WA0009.jpg','IMG-20251228-WA0090.jpg','IMG-20251227-WA0007.jpg'];
au.loop = false; au.volume = 0.72; muteBtn.textContent = userMuted ? '🔇' : '♫';
function showMusicStatus(message, visible=true){const el=$('#globalMusicStatus');if(!el)return;el.textContent=message;el.classList.toggle('visible',!!visible);if(visible){clearTimeout(showMusicStatus.timer);showMusicStatus.timer=setTimeout(()=>el.classList.remove('visible'),5200);}}
function updateMusicIcon(){muteBtn.textContent=userMuted?'🔇':(playing?'🔊':'♫');muteBtn.setAttribute('aria-label',userMuted?'Unmute music':(playing?'Mute music':'Play music'));}
function updatePlayerPlaybackUI(){const b=$('#playPauseSong');if(b){b.textContent=playing?'Ⅱ':'▶';b.setAttribute('aria-label',playing?'Pause song':'Play song');}const n=$('#playerNotice');if(n&&cur&&cur.id==='sMusic'&&!playing&&!userMuted&&!pendingTrack&&activeTrack==='default'&&au.error)n.textContent='Default music file missing: add assets/music/iktara.mp3';syncSlideshow();}
function stopCurrentAudio(reset=true){au.pause();if(reset){try{au.currentTime=0;}catch(e){}}playing=false;updateMusicIcon();updatePlayerPlaybackUI();}
async function playTrack(key, options={}){
  // Save Iktara before replacing the persistent audio element's source.
  if(activeTrack==='default' && key!=='default' && Number.isFinite(au.currentTime)) iktaraSavedTime=au.currentTime;
  // Returning to the default scene resumes exactly where Iktara was paused.
  if(key==='default' && activeTrack!=='default' && options.startAt==null) options={...options,startAt:iktaraSavedTime};
  const src=options.src || TRACKS[key];
  const label=options.label || TRACK_LABELS[key] || 'Selected song';
  if(userMuted){pendingTrack=key;activeTrack=key;activeContext=options.context||'scene';stopCurrentAudio(false);return false;}
  if(!src){
    ++trackRequest;au.pause();playing=false;pendingTrack='';activeTrack=key;activeContext=options.context||'scene';
    if(key==='default'){showMusicStatus('Iktara is missing. Add assets/music/iktara.mp3 to enable default background music.');if($('#playerNotice')&&cur&&cur.id==='sMusic')$('#playerNotice').textContent='Iktara is missing. Add assets/music/iktara.mp3 to the project to enable default music.';}
    updateMusicIcon();updatePlayerPlaybackUI();return false;
  }
  let sameSource=false;try{sameSource=activeTrack===key&&!!au.getAttribute('src')&&new URL(au.getAttribute('src'),document.baseURI).href===new URL(src,document.baseURI).href;}catch(e){sameSource=activeTrack===key&&au.getAttribute('src')===src;}
  if(sameSource&&!options.restart){
    activeContext=options.context||activeContext;
    if(options.startAt!=null&&Number.isFinite(options.startAt)){try{au.currentTime=options.startAt;}catch(e){}}
    if(!au.paused)return true;
  }else{
    ++trackRequest;const request=trackRequest;
    const previousTrack=activeTrack;
    au.pause();playing=false;
    // Never zero Iktara's clock when pausing it; changing src below naturally resets the shared element.
    if(previousTrack!=='default'){try{au.currentTime=0;}catch(e){}}
    activeTrack=key;activeContext=options.context||'scene';pendingTrack=key;
    au.src=src;au.loop=key==='default';au.load();
    if(options.startAt!=null){const seekTo=options.startAt;const seek=()=>{try{au.currentTime=seekTo;}catch(e){}au.removeEventListener('loadedmetadata',seek);};au.addEventListener('loadedmetadata',seek);}
    if(request!==trackRequest)return false;
  }
  pendingTrack=key;
  if(playPromise){try{await playPromise;}catch(e){}}
  const requestNow=trackRequest;
  playPromise=au.play();
  try{await playPromise;if(requestNow!==trackRequest){au.pause();return false;}pendingTrack='';playing=true;if($('#playerNotice')&&cur&&cur.id==='sMusic')$('#playerNotice').textContent='Playing now';return true;}
  catch(e){if(e&&(['NotAllowedError','AbortError'].includes(e.name))){pendingTrack=key;if(e.name==='NotAllowedError')showMusicStatus('Tap Play or the page to start music.');}else{pendingTrack='';if(key!=='default')console.warn('Music playback failed for '+label+':',e);if($('#playerNotice')&&cur&&cur.id==='sMusic')$('#playerNotice').textContent=key==='default'?'Iktara is missing. Add assets/music/iktara.mp3 to enable default music.':'Could not play this file. Check that it is a supported audio file.';}return false;}
  finally{playPromise=null;updateMusicIcon();updatePlayerPlaybackUI();}
}
function musicForScene(id){
  if(id==='#s1'||id==='#s2')return 'birthday';
  if(id==='#sAlbum')return 'album';
  if(id==='#sGarden')return 'garden';
  if(id==='#sFinale'||id==='#sGoodbye')return 'finale';
  return 'default';
}
async function syncMusicForScene(id){
  if(id==='#sMusic')return; // the playlist owns the shared audio while this page is open
  currentPlaylistId=null;
  const key=musicForScene(id);
  if(userMuted){pendingTrack=key;stopCurrentAudio(false);activeContext='scene';return;}
  await playTrack(key,{context:'scene'});
}
au.addEventListener('play',()=>{playing=true;updateMusicIcon();updatePlayerPlaybackUI();});
au.addEventListener('pause',()=>{playing=false;updateMusicIcon();updatePlayerPlaybackUI();});
au.addEventListener('timeupdate',()=>{const seek=$('#seekBar');if(seek&&cur&&cur.id==='sMusic'&&au.duration){seek.value=String(Math.round(au.currentTime/au.duration*1000));$('#currentTime').textContent=formatTime(au.currentTime);$('#totalTime').textContent=formatTime(au.duration);}});
au.addEventListener('loadedmetadata',()=>{if(cur&&cur.id==='sMusic'){$('#totalTime').textContent=formatTime(au.duration);$('#seekBar').value=au.duration?String(Math.round(au.currentTime/au.duration*1000)):'0';}if(activeContext==='playlist'&&currentPlaylistId){const song=musicPlaylist.find(x=>x.id===currentPlaylistId);if(song&&Number.isFinite(au.duration)){song.duration=au.duration;renderMusicPlaylist();}}});
au.addEventListener('ended',()=>{playing=false;updateMusicIcon();if(activeContext==='playlist'){handlePlaylistEnded();return;}if(activeTrack!=='default'&&!userMuted)playTrack('default',{context:'scene'});else updatePlayerPlaybackUI();});
au.addEventListener('error',()=>{playing=false;updateMusicIcon();if(activeTrack==='default')showMusicStatus('Iktara is missing or could not be loaded. Add assets/music/iktara.mp3.');else console.warn('Unable to load music:',au.currentSrc||au.src);if($('#playerNotice')&&cur&&cur.id==='sMusic')$('#playerNotice').textContent=activeTrack==='default'?'Iktara is missing. Add assets/music/iktara.mp3.':'Unable to load this song.';});
muteBtn.addEventListener('click',async()=>{
  userMuted=!userMuted;localStorage.setItem('jaadu_music_muted',userMuted?'1':'0');
  if(userMuted){pendingTrack=activeTrack;stopCurrentAudio(false);showMusicStatus('Music muted');}
  else{const key=pendingTrack||activeTrack||musicForScene(cur&&cur.id?'#'+cur.id:'');if((key==='playlist'||String(key).startsWith('playlist:')||activeContext==='playlist')&&currentPlaylistId){const song=musicPlaylist.find(x=>x.id===currentPlaylistId);if(song)await playPlaylistSong(song,{startAt:au.currentTime});}else await playTrack(key||'default',{context:cur&&cur.id==='sMusic'?'playlist':'scene'});}
  updateMusicIcon();
});
// Autoplay can be blocked; the first explicit interaction retries without duplicating audio.
addEventListener('pointerdown',()=>{if(!userMuted&&pendingTrack&&au.paused){if(pendingTrack.startsWith('playlist:')){const song=musicPlaylist.find(x=>x.id===pendingTrack.slice(9));if(song)playPlaylistSong(song);}else playTrack(pendingTrack,{context:cur&&cur.id==='sMusic'?'playlist':'scene'});}},{passive:true});

function stopSceneMusic(){const wasDefault=activeTrack==='default';if(wasDefault&&Number.isFinite(au.currentTime))iktaraSavedTime=au.currentTime;au.pause();if(!wasDefault){try{au.currentTime=0;}catch(e){}}playing=false;pendingTrack='';activeTrack='';updateMusicIcon();updatePlayerPlaybackUI();}
/* =====================================================================
   BEST-EFFORT MEDIA COPY DETERRENTS (not screenshot prevention)
   ===================================================================== */
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&e.target.closest('.protected-photo,.protected-photo-img'))e.preventDefault();});
document.addEventListener('dragstart',e=>{if(e.target&&e.target.closest&&e.target.closest('.protected-photo,.protected-photo-img'))e.preventDefault();});
document.addEventListener('selectstart',e=>{if(e.target&&e.target.closest&&e.target.closest('.protected-photo'))e.preventDefault();});

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
  const old = cur, nxt = $(id); if (!nxt) return;
  cur = nxt;
  const protectedScenes=['#sAlbum','#s5','#sThought','#sGames','#sGarden','#sMusic','#sFinale','#sGoodbye','#sOwner'];
  document.body.classList.toggle('protected-view-active',protectedScenes.includes(id));
  document.body.classList.toggle('album-view-active',id==='#sAlbum');
  const wm=$('#privacyWatermark');if(wm)wm.textContent=id==='#sOwner'?'PRIVATE • OWNER VIEW':'FOR JAADU • PRIVATE';
  await syncMusicForScene(id);
  if (old) { old.classList.remove('on'); await wait(800); }
  nxt.scrollTop = 0;
  frame2(() => nxt.classList.add('on'));
  if(id==='#sGarden'){gardenHasEntered=true;setTimeout(()=>scheduleGardenAuto(),900);}else{stopGardenAuto();}
  if(id==='#sMusic') { if(!currentPlaylistId){const sceneToSong={default:'iktara',album:'ilahi',garden:'khairiyat',secret:'hawayein',finale:'apna-bana-le',birthday:'birthday'};const match=sceneToSong[activeTrack];if(match&&musicPlaylist.some(x=>x.id===match)){currentPlaylistId=match;activeContext='playlist';}} renderMusicPlaylist(); updatePlayerFromAudio(); syncSlideshow(); }
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
  await seq([$('#openMessage')], 900);
  await seq([$('#date')], 2200);       // "29 October ✨"
  const title = $('#title'); title.innerHTML = ''; show(title); for (const ch of `Happy Birthday, ${CONFIG.name} ❤️`) { title.textContent += ch; await wait(72); } await wait(450);
  await seq([$('#sub')], 1500);        // "Today is your special day ✨"
  show($('#toCake'));
}
async function start() {
  await go('#s1'); await wait(1800); $('#loader').classList.add('off');
  playTrack('birthday').catch(() => {}); intro();
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
$('#skipIntro')?.addEventListener('click', async () => { stopSceneMusic(); await go('#sLock'); $('#accessCode').focus(); });
$('#skipCake')?.addEventListener('click', async () => { stopSceneMusic(); clearInterval(cakeSpark); await go('#sLock'); $('#accessCode').focus(); });
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
  await wait(900); stopSceneMusic(); await setText(cakeTxt, 'Now gift time 🎁'); await wait(800); show($('#toGift'));
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
  stopSceneMusic(); clearInterval(cakeSpark);
  await go('#sLock'); await wait(500); $('#accessCode').focus();
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
once('#c4', async () => { await showBirthdayLetter(); });
async function showBirthdayLetter(){
 await go('#sBirthdayLetter');
 const box=$('#birthdayLetter'); if(box.dataset.done==='1')return; box.dataset.done='1'; box.textContent='';
 for(const raw of BIRTHDAY_LETTER){
  if(!raw){const gap=document.createElement('div');gap.className='gap';box.appendChild(gap);await wait(220);continue;}
  const line=document.createElement('div');line.className='ln';box.appendChild(line);
  for(const ch of Array.from(fill(raw))){line.textContent+=ch;await wait(RM?0:Math.min(18,CONFIG.typeMs/2));}
  keepInView(line);await wait(110);
 }
}
$('#birthdayLetterNext')?.addEventListener('click',async()=>{await buildAlbum();await go('#sAlbum');});


/* =====================================================================
   SCENE 5 — "Do you miss me?"
   ===================================================================== */
function heart() {
  const h = document.createElement('div'); h.className = 'heart'; h.textContent = '❤'; h.style.left = rnd(5, 95) + 'vw';
  h.style.fontSize = rnd(16, 36) + 'px'; h.style.setProperty('--dx', rnd(-40, 40) + 'px'); document.body.appendChild(h); setTimeout(() => h.remove(), 4200);
}
const answerLog = JSON.parse(localStorage.getItem('jaadu_answers') || '{}');
let questionIndex = 0;
const questions = [
 {q:'Do u still love me?',opts:['Yes','No'],key:'love'},
 {q:'Do u regret while thinking old days?',opts:['Yes','No'],key:'regret'},
 {q:'Do u want to talk to me?',opts:['Yes','No'],key:'talk'},
 {q:'Do u like my messages i send u?',opts:['Yes','No'],key:'messages'},
 {q:'Do you miss me? ❤️',opts:['Yes','No'],key:'miss'}
];
function renderQuestion() {
 $('#s5').innerHTML = `<p class="eyebrow">Questions time 💌</p><p id="privacyNote" class="privacy-note">Your answers won’t appear on the public pages. Only the person with the owner code can view them. You can skip any question.</p><div class="question-card"><p class="question-count"></p><h2 id="questionTitle"></h2><div class="row" id="questionOptions"></div><p id="questionAnswer" class="soft"></p><button class="btn" id="questionNext" hidden>Next →</button></div>`;
 questionIndex=0; showQuestionAtIndex();
}
function showQuestionAtIndex() {
 if(questionIndex>=questions.length){localStorage.setItem('jaadu_answers',JSON.stringify(answerLog));go('#sThought');return;}
 const q=questions[questionIndex]; $('.question-count').textContent=`Question ${questionIndex+1} of ${questions.length}`;
 $('#questionTitle').textContent=q.q; $('#questionAnswer').textContent=''; $('#questionOptions').innerHTML=''; $('#questionNext').hidden=true;
 $('#privacyNote').classList.remove('fade-away'); setTimeout(()=>$('#privacyNote')?.classList.add('fade-away'),2400);
 q.opts.forEach(opt=>{const btn=document.createElement('button');btn.className='btn'+(opt==='No'?' ghost':'');btn.textContent=opt;
  btn.addEventListener('click',()=>{answerLog[q.key]=opt;localStorage.setItem('jaadu_answers',JSON.stringify(answerLog));$$('#questionOptions button').forEach(b=>b.disabled=true);
   const msg=$('#questionAnswer');
   if(questionIndex===0&&opt==='Yes'){msg.innerHTML='awwwww 🥹💗<br><span class="panda-cute">🐼💕</span><br>may be bcm close together, slowly and honestly.';confetti(innerWidth/2,innerHeight/2,35,-1.57,2);}
   else if(q.key==='miss'&&opt==='Yes')msg.innerHTML='I miss you too...<br>So, so, so much. ❤️';
   else if(q.key==='miss'&&opt==='No')msg.innerHTML="That's okay.<br>Thank you for being honest. 🙂";
   else if(questionIndex===0&&opt==='No')msg.textContent="I know it and it's better for u. ❤️";
   else msg.textContent='Thank you for answering honestly. 💗';
   show(msg);$('#questionNext').hidden=false;
  });$('#questionOptions').appendChild(btn);});
 $('#questionNext').onclick=()=>{questionIndex++;showQuestionAtIndex();};
}
once('#c5', async () => { await go('#sThought'); });


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
  show($('#shayariIntro')); await wait(1700);
  const poem = $('#poem');
  for (const ln of SHAYARI) {
    const d = document.createElement('div'); d.className = 'rv'; d.innerHTML = ln || '&nbsp;'; poem.appendChild(d); show(d); keepInView(d);
    await wait(ln ? 1500 : 500);
  }
  await wait(1000); show($('#c6')); keepInView($('#c6'));
}
once('#c6', async () => { await go('#sGarden'); });


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
if (localStorage.getItem('jaadu_finished') === 'yes') { /* completed cards stay closed */ } else if (UNLOCK_MS > Date.now()) runCountdown(); else openCard();

/* Extra card features */
const STORE = { uses:'jaadu_code_uses', visit:'jaadu_visits', finished:'jaadu_finished', review:'jaadu_review', thought:'jaadu_thought', response:'jaadu_response' };
const readStore = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } };
if (localStorage.getItem(STORE.finished) === 'yes') {
  showFinishedScreen('This surprise has already been opened 💗', 'Thank you for visiting. This card has closed.');
} else {
  localStorage.setItem(STORE.visit, String((Number(localStorage.getItem(STORE.visit)) || 0) + 1));
}
$('#codeForm')?.addEventListener('submit', async e => {
 e.preventDefault();
 const entered=$('#accessCode').value.trim(), uses=readStore(STORE.uses,{}), feedback=$('#codeFeedback');
 if(entered===CONFIG.codes.owner){
  $('#visitCount').textContent=localStorage.getItem(STORE.visit)||'0';
  $('#codeUses').textContent=Object.values(uses).reduce((a,b)=>a+Number(b||0),0);
  $('#oneUseCount').textContent=Number(uses.oneUse||0);
  $('#twoUseCount').textContent=Number(uses.twoUse||0);
  $('#unlimitedCount').textContent=Number(uses.unlimited||0);
  $('#answerLog').textContent=JSON.stringify(readStore('jaadu_answers',{}),null,2);
  $('#thoughtLog').textContent=localStorage.getItem(STORE.thought)||'No thoughts submitted yet.';
  $('#reviewLog').textContent=localStorage.getItem(STORE.review)||'No reviews yet.';
  $('#responseLog').textContent=localStorage.getItem(STORE.response)||('ORIGINAL APOLOGY LETTER\n\n'+LETTER.map(line=>fill(line)).join('\n\n')+'\n\nADDITIONAL BIRTHDAY LETTER\n\n'+BIRTHDAY_LETTER.map(line=>fill(line)).join('\n\n'));
  await go('#sOwner'); return;
 }
 let key='',max=Infinity;
 if(entered===CONFIG.codes.oneUse){key='oneUse';max=1;}
 else if(entered===CONFIG.codes.twoUse){key='twoUse';max=2;}
 else if(entered===CONFIG.codes.unlimited){key='unlimited';max=Infinity;}
 if(!key){feedback.textContent='That code doesn’t seem right. Try again 💗';return;}
 uses[key]=Number(uses[key]||0);
 if(uses[key]>=max){feedback.textContent='This code has used all its unlocks. Try another code.';return;}
 uses[key]++;localStorage.setItem(STORE.uses,JSON.stringify(uses));
 feedback.textContent='Unlocked! Your surprise is waiting… ✨';$('#accessCode').value='';
 await wait(650);await go('#s3');show($('#openGift'));
 giftSpark=setInterval(()=>{if(cur===$('#s3')&&!RM){const p=at($('#gift'));sparks(p.x+rnd(-90,90),p.y+rnd(-70,80),1,1);}},T(250));
});
async function buildAlbum(){
 const track=$('#albumTrack');if(!track||track.dataset.ready)return;track.dataset.ready='1';
 const moments=[
  ['A little childhood moment','IMG-20251227-WA0014.jpg','A little moment worth keeping 💗'],
  ['That familiar smile','IMG-20251227-WA0007.jpg','One of those pictures that feels like a memory ✨'],
  ['A lovely day','IMG-20251227-WA0008.jpg','A page from your little story 🌷'],
  ['A family memory','IMG-20251229-WA0005.jpg','The people and moments that matter 🫶'],
  ['Good times together','IMG-20251228-WA0090.jpg','A memory for the birthday scrapbook 🎀'],
  ['A favourite frame','IMG-20251228-WA0089.jpg','Some moments deserve their own frame 📸'],
  ['Festive memories','IMG-20251229-WA0002.jpg','A little sparkle from a special day ✨'],
  ['School-day memories','IMG-20251229-WA0009.jpg','The kind of memory you look back on and smile at 💕'],
  ['Another little chapter','IMG-20251229-WA0003.jpg','Keeping this one in the album 🌙'],
  ['One more for the scrapbook','IMG-20251231-WA0002.jpg','Happy birthday, Jaadu 🎂']
 ];
 moments.forEach((m,i)=>{const card=document.createElement('article');card.className='memory-frame protected-photo album-reveal-pending';card.setAttribute('aria-label','Protected personal photograph');
  const frame=document.createElement('div');frame.className='frame-art photo-frame';
  const img=document.createElement('img');img.src='assets/photos/'+m[1];img.alt=m[0];img.loading='lazy';img.decoding='async';img.draggable=false;img.addEventListener('contextmenu',e=>e.preventDefault());img.addEventListener('dragstart',e=>e.preventDefault());
  const label=document.createElement('small');label.textContent='MEMORY '+String(i+1).padStart(2,'0');
  frame.append(img,label);const title=document.createElement('h3');title.textContent=m[0];const caption=document.createElement('p');caption.textContent=m[2];
  card.append(frame,title,caption);if(i===0){const remembered=document.createElement('p');remembered.className='memory-original-caption';remembered.textContent='The time we spend together are sooooooo precious for me and amazing. abhi tak ke best days the';card.appendChild(remembered);}track.appendChild(card);
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('album-revealed');observer.unobserve(entry.target);}}),{threshold:.12});observer.observe(card);}else card.classList.add('album-revealed');
 });
}
/* =====================================================================
   OUR MUSIC — shared audio player, playlist, IndexedDB local uploads
   ===================================================================== */
const BUNDLED_PLAYLIST = [
 {id:'iktara',title:'Iktara',artist:'Default background track',src:'assets/music/iktara.mp3',kind:'bundled'},
 {id:'birthday',title:'Happy Birthday',artist:'Birthday song',src:'assets/music/happy-birthday.mp3',kind:'bundled'},
 {id:'ilahi',title:'Ilahi',artist:'Arijit Singh · Pritam',src:'assets/music/ilahi.mp3',kind:'bundled'},
 {id:'khairiyat',title:'Khairiyat',artist:'Arijit Singh · Pritam',src:'assets/music/khairiyat.mp3',kind:'bundled'},
 {id:'hawayein',title:'Hawayein',artist:'Arijit Singh · Pritam',src:'assets/music/hawayein.mp3',kind:'bundled'},
 {id:'apna-bana-le',title:'Apna Bana Le',artist:'Arijit Singh · Sachin–Jigar',src:'assets/music/apna-bana-le.mp3',kind:'bundled'}
];
const musicPlaylist = BUNDLED_PLAYLIST.map(x=>({...x,url:x.src,duration:0}));
let musicReturnScene='#sAlbum', shuffleEnabled=false, repeatMode=0, dbPromise=null;
function formatTime(seconds){if(!Number.isFinite(seconds)||seconds<0)return '0:00';const m=Math.floor(seconds/60),s=Math.floor(seconds%60);return `${m}:${String(s).padStart(2,'0')}`;}
function openMusicPage(from){musicReturnScene=from||'#sAlbum';go('#sMusic');}
$('#openOurMusic')?.addEventListener('click',()=>openMusicPage('#sAlbum'));
$('#gardenMusic')?.addEventListener('click',()=>openMusicPage('#sGarden'));
$('#musicBack')?.addEventListener('click',()=>go(musicReturnScene||'#sAlbum'));
function updatePlayerFromAudio(){
 const song=musicPlaylist.find(x=>x.id===currentPlaylistId);
 if(song){$('#playerTitle').textContent=song.title;$('#playerArtist').textContent=song.artist||'Added on this device';$('#playerArtwork').innerHTML='<span>♫</span>';$('#playerNotice').textContent=userMuted?'Music is muted':(playing?'Playing now':'Ready to play');}
 else if(cur&&cur.id==='sMusic'){$('#playerTitle').textContent=activeTrack&&TRACK_LABELS[activeTrack]?TRACK_LABELS[activeTrack]:'Choose a song';$('#playerArtist').textContent=activeTrack==='default'?'Default background music':'Your personal playlist';if(activeTrack==='default'&&au.error)$('#playerNotice').textContent='Iktara is missing. Add assets/music/iktara.mp3 to the project to enable default music.';}
 const seek=$('#seekBar');if(seek){seek.value=au.duration?String(Math.round(au.currentTime/au.duration*1000)):'0';$('#currentTime').textContent=formatTime(au.currentTime);$('#totalTime').textContent=formatTime(au.duration);}
 const vol=$('#volumeBar');if(vol){vol.value=String(Math.round(au.volume*100));$('#volumeValue').textContent=Math.round(au.volume*100)+'%';}
 $('#shuffleBtn')?.setAttribute('aria-pressed',String(shuffleEnabled));$('#repeatBtn')?.setAttribute('aria-pressed',String(repeatMode!==0));$('#repeatBtn')?.setAttribute('title',['Repeat off','Repeat one','Repeat all'][repeatMode]);$('#repeatBtn').textContent=repeatMode===1?'↻¹':'↻';
}
function renderMusicPlaylist(){
 const list=$('#playlistList');if(!list)return;list.textContent='';$('#playlistEmpty').hidden=musicPlaylist.length>0;
 musicPlaylist.forEach(song=>{
  const row=document.createElement('div');row.className='playlist-item'+(song.id===currentPlaylistId?' active':'');row.dataset.songId=song.id;
  const play=document.createElement('button');play.type='button';play.className='playlist-play';play.textContent=song.id===currentPlaylistId&&playing?'Ⅱ':'▶';play.setAttribute('aria-label','Play '+song.title);play.addEventListener('click',()=>playPlaylistSong(song));
  const meta=document.createElement('div');meta.className='playlist-song-meta';
  const title=document.createElement('input');title.className='playlist-title';title.type='text';title.value=song.title;title.setAttribute('aria-label','Song title');title.readOnly=song.kind!=='user';title.title=song.kind==='user'?'Edit song title':'Bundled song';
  if(song.kind==='user'){title.addEventListener('click',e=>e.stopPropagation());title.addEventListener('keydown',e=>{if(e.key==='Enter')title.blur();});title.addEventListener('change',async()=>{const value=title.value.trim();if(!value){title.value=song.title;return;}song.title=value;await saveUserSongMeta(song);if(song.id===currentPlaylistId)updatePlayerFromAudio();});}
  const artist=document.createElement('span');artist.className='playlist-artist';artist.textContent=song.artist||(song.kind==='user'?'Added on this device':'');meta.append(title,artist);
  const tail=document.createElement('div');tail.className='playlist-tail';const duration=document.createElement('span');duration.className='playlist-duration';duration.textContent=song.duration?formatTime(song.duration):'--:--';tail.append(duration);
  if(song.kind==='user'){const remove=document.createElement('button');remove.type='button';remove.className='remove-song';remove.textContent='×';remove.title='Remove this added song';remove.setAttribute('aria-label','Remove '+song.title);remove.addEventListener('click',()=>removeUserSong(song.id));tail.append(remove);}
  row.append(play,meta,tail);list.append(row);
 });
}
async function playPlaylistSong(song,options={}){
 if(!song)return;
 if(cur&&cur.id!=='sMusic'){musicReturnScene='#sAlbum';await go('#sMusic');}
 currentPlaylistId=song.id;activeContext='playlist';
 $('#playerTitle').textContent=song.title;$('#playerArtist').textContent=song.artist||'Added on this device';$('#playerNotice').textContent=userMuted?'Music is muted':'Loading song…';
 $('#playerArtwork').innerHTML='<span>♫</span>';
 if(song.id==='iktara') await playTrack('default',{context:'playlist',startAt:options.startAt,restart:!!options.restart});
 else await playTrack('playlist:'+song.id,{src:song.url||song.src,label:song.title,context:'playlist',startAt:options.startAt,restart:!!options.restart});
 renderMusicPlaylist();updatePlayerFromAudio();
}
function getPlaylistIndex(){return musicPlaylist.findIndex(x=>x.id===currentPlaylistId);}
function chooseNextSong(manual=false){if(!musicPlaylist.length)return null;const current=getPlaylistIndex();if(shuffleEnabled&&musicPlaylist.length>1){let i=current;while(i===current)i=Math.floor(Math.random()*musicPlaylist.length);return musicPlaylist[i];}let next=current+(manual?1:1);if(current<0)next=0;if(next>=musicPlaylist.length)return repeatMode===2?musicPlaylist[0]:manual?musicPlaylist[0]:null;return musicPlaylist[next];}
async function handlePlaylistEnded(){
 if(userMuted)return;
 if(repeatMode===1){const song=musicPlaylist.find(x=>x.id===currentPlaylistId);if(song){await playPlaylistSong(song,{restart:true});return;}}
 const next=chooseNextSong(false);if(next){await playPlaylistSong(next);return;}
 currentPlaylistId=null;renderMusicPlaylist();updatePlayerFromAudio();await playTrack('default',{context:'scene'});
}
$('#playPauseSong')?.addEventListener('click',async()=>{
 if(userMuted){showMusicStatus('Unmute the website to play music.');return;}
 if(!au.paused){au.pause();return;}
 if(activeContext==='playlist'&&currentPlaylistId){const song=musicPlaylist.find(x=>x.id===currentPlaylistId);if(song){await playPlaylistSong(song,{startAt:au.currentTime});return;}}
 if(activeTrack&&TRACKS[activeTrack])await playTrack(activeTrack);else{const song=musicPlaylist[0];if(song)await playPlaylistSong(song);}
});
$('#previousSong')?.addEventListener('click',async()=>{if(au.currentTime>3){au.currentTime=0;return;}const i=getPlaylistIndex();const song=musicPlaylist[i>0?i-1:musicPlaylist.length-1];if(song)await playPlaylistSong(song);});
$('#nextSong')?.addEventListener('click',async()=>{const song=chooseNextSong(true);if(song)await playPlaylistSong(song);});
$('#shuffleBtn')?.addEventListener('click',()=>{shuffleEnabled=!shuffleEnabled;updatePlayerFromAudio();});
$('#repeatBtn')?.addEventListener('click',()=>{repeatMode=(repeatMode+1)%3;updatePlayerFromAudio();});
$('#seekBar')?.addEventListener('input',e=>{if(au.duration)au.currentTime=au.duration*(Number(e.target.value)/1000);});
$('#volumeBar')?.addEventListener('input',e=>{au.volume=Math.max(0,Math.min(1,Number(e.target.value)/100));$('#volumeValue').textContent=Math.round(au.volume*100)+'%';});

function openMusicDB(){if(!('indexedDB'in window))return Promise.reject(new Error('IndexedDB is not supported in this browser.'));if(dbPromise)return dbPromise;dbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open('JaaduOurMusicDB',1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('songs'))db.createObjectStore('songs',{keyPath:'id'});};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('Could not open local music storage.'));});return dbPromise;}
async function readUserSongs(){const db=await openMusicDB();return new Promise((resolve,reject)=>{const req=db.transaction('songs','readonly').objectStore('songs').getAll();req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);});}
async function writeUserSong(record){const db=await openMusicDB();return new Promise((resolve,reject)=>{const tx=db.transaction('songs','readwrite');tx.objectStore('songs').put(record);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
async function deleteUserSongRecord(id){const db=await openMusicDB();return new Promise((resolve,reject)=>{const tx=db.transaction('songs','readwrite');tx.objectStore('songs').delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
async function saveUserSongMeta(song){try{const record=await getUserSongRecord(song.id);if(record){record.title=song.title;record.artist=song.artist;record.duration=song.duration;await writeUserSong(record);}}catch(e){console.warn('Could not save song metadata:',e);}}
async function getUserSongRecord(id){const db=await openMusicDB();return new Promise((resolve,reject)=>{const req=db.transaction('songs','readonly').objectStore('songs').get(id);req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error);});}
function supportedAudioFile(file){const ext=(file.name.split('.').pop()||'').toLowerCase();return ['mp3','wav','ogg','m4a','mp4'].includes(ext)||['audio/mpeg','audio/mp3','audio/wav','audio/x-wav','audio/ogg','audio/mp4','audio/x-m4a'].includes(file.type);}
function readAudioDuration(url){return new Promise(resolve=>{const probe=document.createElement('audio');probe.preload='metadata';probe.onloadedmetadata=()=>{const d=Number.isFinite(probe.duration)?probe.duration:0;probe.removeAttribute('src');probe.load();resolve(d);};probe.onerror=()=>resolve(0);probe.src=url;});}
$('#addSongBtn')?.addEventListener('click',()=>$('#addSongInput').click());
$('#addSongInput')?.addEventListener('change',async e=>{
 const file=e.target.files&&e.target.files[0];e.target.value='';if(!file)return;
 if(!supportedAudioFile(file)){ $('#playerNotice').textContent='Unsupported file. Choose MP3, WAV, OGG, or M4A.';showMusicStatus('Unsupported file. Choose MP3, WAV, OGG, or M4A.');return; }
 const id='user-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);const url=URL.createObjectURL(file);const duration=await readAudioDuration(url);const title=file.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').trim()||'Untitled song';
 const song={id,title,artist:'Added on this device',src:'',url,kind:'user',duration,file};
 let persisted=true;try{await writeUserSong({id,title,artist:song.artist,duration,type:file.type||'application/octet-stream',file,addedAt:Date.now()});}catch(err){persisted=false;console.warn('IndexedDB save failed; keeping the song for this visit only:',err);}
 musicPlaylist.push(song);renderMusicPlaylist();$('#playerNotice').textContent=persisted?'Song added and saved in this browser.':'Song added for this visit, but local storage is unavailable.';if(!persisted)showMusicStatus('This song will not persist after you close the page.');await playPlaylistSong(song);
});
async function removeUserSong(id){const index=musicPlaylist.findIndex(x=>x.id===id);if(index<0)return;const song=musicPlaylist[index];const wasPlaying=currentPlaylistId===id;if(wasPlaying){stopCurrentAudio(true);currentPlaylistId=null;activeContext='scene';}musicPlaylist.splice(index,1);try{await deleteUserSongRecord(id);}catch(e){console.warn('Could not remove saved song:',e);}if(song.url&&song.url.startsWith('blob:'))URL.revokeObjectURL(song.url);renderMusicPlaylist();if(wasPlaying){const next=musicPlaylist[Math.min(index,musicPlaylist.length-1)];if(next)await playPlaylistSong(next);else await playTrack('default',{context:'scene'});}updatePlayerFromAudio();}
async function loadSavedUserSongs(){try{const records=await readUserSongs();records.forEach(r=>{if(musicPlaylist.some(x=>x.id===r.id))return;const url=URL.createObjectURL(r.file);musicPlaylist.push({id:r.id,title:r.title||'Untitled song',artist:r.artist||'Added on this device',src:'',url,kind:'user',duration:r.duration||0,file:r.file});});renderMusicPlaylist();}catch(e){console.warn('Local music persistence is unavailable:',e);if($('#playerNotice'))$('#playerNotice').textContent='This browser does not support local song storage. Bundled songs still work.';}}
function ensureSlideshow(){const host=$('#musicBackdropFrames');if(!host||host.dataset.ready)return;host.dataset.ready='1';for(let i=0;i<3;i++){const img=document.createElement('img');img.alt='Decorative personal-photo slideshow';img.className='protected-photo-img';img.draggable=false;img.loading='lazy';img.decoding='async';img.addEventListener('contextmenu',e=>e.preventDefault());img.addEventListener('dragstart',e=>e.preventDefault());img.src='assets/photos/'+PHOTO_FILES[i%PHOTO_FILES.length];img.onerror=()=>{img.style.visibility='hidden';};host.append(img);}slideshowIndex=3;}
function advanceSlideshow(){const host=$('#musicBackdropFrames');if(!host)return;const imgs=Array.from(host.querySelectorAll('img'));if(!imgs.length)return;const img=imgs[slideshowIndex%imgs.length];const file=PHOTO_FILES[slideshowIndex%PHOTO_FILES.length];slideshowIndex++;img.style.opacity='0';const next='assets/photos/'+file;img.onload=()=>{img.style.opacity='.72';};img.onerror=()=>{img.style.opacity='0';};img.src=next;}
function syncSlideshow(){ensureSlideshow();if(cur&&cur.id==='sMusic'){if(!slideshowTimer)slideshowTimer=setInterval(advanceSlideshow,6500);}else if(slideshowTimer){clearInterval(slideshowTimer);slideshowTimer=null;}}
window.addEventListener('beforeunload',()=>{if(slideshowTimer)clearInterval(slideshowTimer);musicPlaylist.forEach(s=>{if(s.kind==='user'&&s.url&&s.url.startsWith('blob:'))URL.revokeObjectURL(s.url);});});
loadSavedUserSongs();ensureSlideshow();renderMusicPlaylist();updatePlayerFromAudio();

$('#albumNext')?.addEventListener('click',async()=>{renderQuestion();await go('#s5');});
$('#thoughtBox')?.addEventListener('input',()=>{$('#thoughtNext').disabled=!$('#thoughtBox').value.trim();});
$('#thoughtNext')?.addEventListener('click',async()=>{localStorage.setItem(STORE.thought,$('#thoughtBox').value.trim());await go('#sGames');initMemoryGame();});
function initMemoryGame(){
 const grid=$('#memoryGrid');if(!grid||grid.dataset.ready)return;grid.dataset.ready='1';
 const faces=['🌸','🐼','🎂','💌','🌸','🐼','🎂','💌'].sort(()=>Math.random()-.5);let opened=[],matched=0;
 faces.forEach(face=>{const btn=document.createElement('button');btn.className='memory-tile';btn.textContent='?';btn.setAttribute('aria-label','Memory card');
  btn.addEventListener('click',()=>{if(btn.classList.contains('matched')||opened.some(x=>x.b===btn)||opened.length===2)return;btn.textContent=face;btn.classList.add('revealed');opened.push({b:btn,face});
   if(opened.length===2){if(opened[0].face===opened[1].face){opened.forEach(x=>x.b.classList.add('matched'));matched++;$('#gameStatus').textContent=`Matched: ${matched} / 4`;opened=[];if(matched===4)$('#gameStatus').textContent='You did it! 🎉';}
   else setTimeout(()=>{opened.forEach(x=>{x.b.textContent='?';x.b.classList.remove('revealed')});opened=[];},750);}
  });grid.appendChild(btn);});
}
$('#gamesNext')?.addEventListener('click',async()=>{await go('#s6');await rose();});
$('#gamesNext')?.setAttribute('aria-label','Continue to the shayari surprise');
async function showFinale(){await go('#sFinale');await wait(1400);$('#finalWish').classList.add('vanish');await wait(1500);$('#cuteText').classList.add('vanish');await wait(1400);$('#boyRose').classList.add('show-boy');show($('#finalNext'));}
$('#finalNext')?.addEventListener('click',()=>go('#sGoodbye'));
$('#byyBtn')?.addEventListener('click',()=>{
 localStorage.setItem(STORE.review,$('#reviewBox').value.trim()||'No review left.');
 localStorage.setItem(STORE.response,LETTER.map(line=>fill(line)).join('\n\n'));
 localStorage.setItem(STORE.finished,'yes');
 showFinishedScreen('Byy Jaadu 💗','I miss you. I hope you have a beautiful life ahead. ✨');
});

// After the card has been completed, offer a way back to the same password screen.
// Usage counts are intentionally preserved, so expired one-time codes stay expired until the owner resets them.
function showFinishedScreen(title, message) {
 document.body.innerHTML = `<main class="finished-screen"><h1>${title}</h1><p>${message}</p><button id="reenterPasswordBtn" class="btn" type="button">🔐 Enter password again</button></main>`;
 document.getElementById('reenterPasswordBtn')?.addEventListener('click', () => {
   localStorage.removeItem(STORE.finished);
   location.reload();
 });
}

/* =====================================================================
   APPRECIATION GARDEN — staged SVG growth, with a small number of clicks
   ===================================================================== */
const gardenWishes = [
 'May your smile always find a reason to stay.',
 'You deserve happiness, peace, and beautiful opportunities.',
 'Never forget that your dreams are worth working towards.',
 'I hope life gives you countless reasons to feel proud of yourself.',
 'May the coming year bring you growth, laughter, and wonderful memories.',
 'Keep being yourself, and never stop discovering the person you want to become.'
];
let gardenStage = 0, gardenAutoTimer = null, gardenLastAdvance = 0, gardenHasEntered = false;
const gardenReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
function renderGardenStage(stage, fromUser=false) {
 const stageEl=$('#gardenStage'), messageEl=$('#gardenMessage'), progressEl=$('#gardenProgress'), button=$('#growFlower');
 if(!stageEl||!messageEl||!progressEl)return;
 gardenStage=Math.max(0,Math.min(6,stage)); stageEl.dataset.stage=String(gardenStage);
 messageEl.classList.add('message-change');
 window.setTimeout(()=>{ if(!messageEl.isConnected)return; messageEl.textContent=gardenStage===0?gardenWishes[0]:gardenWishes[Math.min(gardenStage-1,5)]; messageEl.classList.remove('message-change'); },gardenReducedMotion?0:180);
 const stageNames=['A little seed of good wishes','A tiny shoot reaches for the light','The first leaves unfold','Branches and new leaves appear','Little flower buds are forming','The first petals begin to open','A garden of wishes, blooming for you'];
 progressEl.textContent=`${stageNames[gardenStage]} · Stage ${Math.max(1,gardenStage)} of 6`;
 if(gardenStage===6) messageEl.textContent=gardenWishes[5];
 if(button){button.textContent=gardenStage>=6?'Garden in bloom 🌸':'Help it grow 🌱';button.setAttribute('aria-label',gardenStage>=6?'Garden fully grown':'Advance the garden growth animation');}
}
function stopGardenAuto(){if(gardenAutoTimer){clearTimeout(gardenAutoTimer);gardenAutoTimer=null;}}
function scheduleGardenAuto(){stopGardenAuto();if(gardenStage>=6||gardenReducedMotion||!$('#sGarden')?.classList.contains('on'))return;gardenAutoTimer=setTimeout(()=>{gardenAutoTimer=null;if(!$('#sGarden')?.classList.contains('on'))return;renderGardenStage(gardenStage+1);scheduleGardenAuto();},4800);}
function advanceGarden(fromUser=true){const now=performance.now();if(fromUser&&now-gardenLastAdvance<650)return;gardenLastAdvance=now;if(gardenStage<6){renderGardenStage(gardenStage+1,fromUser);scheduleGardenAuto();}else{renderGardenStage(0,fromUser);scheduleGardenAuto();}}
$('#growFlower')?.addEventListener('click',()=>advanceGarden(true));
renderGardenStage(0);
$('#gardenNext')?.addEventListener('click', showFinale);
$('#gardenSkip')?.addEventListener('click', showFinale);

/* =====================================================================
   SECRET STAR — returns to the same page without resetting its state/music
   ===================================================================== */
const secretOverlay = $('#secretOverlay'); let secretOpen = false, secretTypingTimer = null;
const secretMessage = 'I love u soooooo soooooo much, my beautiful Jaadu\n\nHappy Birthday, Jaadu! I hope this year brings you happiness, peace, success, and beautiful opportunities. ❤️✨\n\nI will always wish for your happiness, your peace, and all the beautiful things you deserve.\n\nNo matter what life brings, I genuinely hope you keep smiling, achieve your dreams, and find countless reasons to be happy.\n\nYou will always be someone whose happiness I wish for.\n\nWith lots and lots of love,\nAlways wishing the best for you. 💗';
function closeSecret(){ if (!secretOpen) return; secretOpen=false; secretOverlay.classList.remove('open'); secretOverlay.setAttribute('aria-hidden','true'); document.body.classList.remove('secret-active'); if(secretTypingTimer) clearInterval(secretTypingTimer); if(secretRestoreTrack&&!userMuted){const saved=secretRestoreTrack;secretRestoreTrack=null;if(saved&&saved.playlistId){const song=musicPlaylist.find(x=>x.id===saved.playlistId);if(song)playPlaylistSong(song,{startAt:saved.time});else syncMusicForScene(cur&&cur.id?'#'+cur.id:'');}else if(saved&&saved.key)playTrack(saved.key,{context:saved.context||'scene',startAt:saved.time});else syncMusicForScene(cur&&cur.id?'#'+cur.id:'');} $('#secretStar').focus({preventScroll:true}); }
function openSecret(){ if(secretOpen) return; secretOpen=true; secretRestoreTrack={key:activeTrack,time:au.currentTime||0,context:activeContext,playlistId:currentPlaylistId}; playTrack('secret',{context:'secret'}); secretOverlay.classList.add('open'); secretOverlay.setAttribute('aria-hidden','false'); document.body.classList.add('secret-active'); $('#secretTyped').textContent=''; $('#secretLast').hidden=true; $('#secretReturn').hidden=true; let i=0; const target=$('#secretTyped'); secretTypingTimer=setInterval(()=>{ if(!secretOpen){clearInterval(secretTypingTimer);return;} target.textContent=secretMessage.slice(0,++i); if(i>=secretMessage.length){clearInterval(secretTypingTimer); setTimeout(()=>{if(secretOpen){$('#secretLast').hidden=false;$('#secretReturn').hidden=false;}},850);}}, RM ? 1 : 26); }
$('#secretStar')?.addEventListener('click',openSecret); $('#secretClose')?.addEventListener('click',closeSecret); $('#secretReturn')?.addEventListener('click',closeSecret);
addEventListener('keydown',e=>{if(e.key==='Escape')closeSecret();});

$('#resetOneUse')?.addEventListener('click',()=>resetCodeUse('oneUse'));
$('#resetTwoUse')?.addEventListener('click',()=>resetCodeUse('twoUse'));
$('#resetAllCodes')?.addEventListener('click',()=>{if(confirm('Reset all recipient code counts?')){localStorage.setItem(STORE.uses,JSON.stringify({oneUse:0,twoUse:0,unlimited:0}));refreshOwnerCounts();}});
function refreshOwnerCounts(){const u=readStore(STORE.uses,{});$('#oneUseCount').textContent=Number(u.oneUse||0);$('#twoUseCount').textContent=Number(u.twoUse||0);$('#unlimitedCount').textContent=Number(u.unlimited||0);$('#codeUses').textContent=Object.values(u).reduce((a,b)=>a+Number(b||0),0);}
function resetCodeUse(key){const u=readStore(STORE.uses,{});u[key]=0;localStorage.setItem(STORE.uses,JSON.stringify(u));refreshOwnerCounts();}
$('#ownerClose')?.addEventListener('click',async()=>{await go('#s3');show($('#openGift'));});
