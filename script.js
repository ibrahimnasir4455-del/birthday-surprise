// ---------- Fairy lights ----------
const bulbColors = ['#FFC857', '#FF6B9D', '#8E7CFF', '#7CE0FF', '#FDF6E3'];
const bulbsEl = document.getElementById('bulbs');
const bulbCount = 22;
for (let i = 0; i < bulbCount; i++) {
  const b = document.createElement('div');
  b.className = 'bulb';
  const pct = (i / (bulbCount - 1)) * 100;
  const wave = Math.sin((i / bulbCount) * Math.PI * 4) * 14;
  b.style.left = pct + '%';
  b.style.top = (18 + wave) + 'px';
  const color = bulbColors[i % bulbColors.length];
  b.style.background = color;
  b.style.color = color;
  b.style.animationDelay = (Math.random() * 1.6) + 's';
  bulbsEl.appendChild(b);
}

// ---------- Balloons ----------
const balloonColors = ['#FF6B9D', '#FFC857', '#8E7CFF', '#7CE0FF', '#FF9E6B'];
const balloonsEl = document.getElementById('balloons');
const balloonCount = 9;
for (let i = 0; i < balloonCount; i++) {
  const bal = document.createElement('div');
  bal.className = 'balloon';
  bal.style.left = (Math.random() * 92) + '%';
  bal.style.background = balloonColors[i % balloonColors.length];
  const duration = 10 + Math.random() * 8;
  bal.style.animationDuration = duration + 's';
  bal.style.animationDelay = (-Math.random() * duration) + 's';
  balloonsEl.appendChild(bal);
}

// ---------- Sprinkles on cake ----------
const sprinklesEl = document.getElementById('sprinkles');
const sprinkleColors = ['#FDF6E3', '#8E7CFF', '#7CE0FF', '#FF9E6B'];
for (let i = 0; i < 24; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const x = 45 + Math.random() * 250;
  const y = 150 + Math.random() * 45;
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', 4);
  rect.setAttribute('height', 2);
  rect.setAttribute('rx', 1);
  rect.setAttribute('fill', sprinkleColors[i % sprinkleColors.length]);
  rect.setAttribute('transform', `rotate(${Math.random() * 360} ${x} ${y})`);
  sprinklesEl.appendChild(rect);
}

// ---------- Candles ----------
const candles = Array.from(document.querySelectorAll('.candle'));
const tapHint = document.getElementById('tapHint');
const subhead = document.getElementById('subhead');
const reveal = document.getElementById('reveal');
const bgMusic = document.getElementById('bgMusic');
const blowSound = document.getElementById('blowSound');
const cakeWrap = document.getElementById('cakeWrap');

candles.forEach((candle) => {
  candle.setAttribute('tabindex', '0');
  candle.setAttribute('role', 'button');
  candle.setAttribute('aria-label', 'Candle bujhao');
  const blowOut = () => {
    if (candle.dataset.lit === 'false') return;
    candle.dataset.lit = 'false';
    spawnSmoke(candle);
    try { blowSound.currentTime = 0; blowSound.play(); } catch (e) {}
    if (bgMusic.paused) { bgMusic.volume = 0.55; bgMusic.play().catch(() => {}); }
    checkAllBlown();
  };
  candle.addEventListener('click', blowOut);
  candle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blowOut(); }
  });
});

function spawnSmoke(candle) {
  const rect = candle.querySelector('.flame').getBoundingClientRect();
  const wrapRect = cakeWrap.getBoundingClientRect();
  const puff = document.createElement('div');
  puff.className = 'smoke';
  puff.style.left = (rect.left - wrapRect.left) + 'px';
  puff.style.top = (rect.top - wrapRect.top) + 'px';
  cakeWrap.appendChild(puff);
  setTimeout(() => puff.remove(), 1000);
}

function checkAllBlown() {
  const allOut = candles.every(c => c.dataset.lit === 'false');
  if (allOut) {
    tapHint.classList.add('hidden');
    subhead.textContent = 'Wish poori ho! Ab dekho tumhara surprise 🎁';
    launchConfetti();
    setTimeout(() => reveal.classList.add('show'), 500);
  }
}

// ---------- Replay ----------
document.getElementById('replayBtn').addEventListener('click', () => {
  candles.forEach(c => c.dataset.lit = 'true');
  reveal.classList.remove('show');
  tapHint.classList.remove('hidden');
  subhead.textContent = 'Candles pe tap karo aur bujha do — party shuru karte hain 🕯️';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Confetti ----------
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confettiColors = ['#FF6B9D', '#FFC857', '#8E7CFF', '#7CE0FF', '#FDF6E3', '#FF9E6B'];
let particles = [];
let confettiRunning = false;

function launchConfetti() {
  particles = [];
  const count = 160;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.42,
      vx: (Math.random() - 0.5) * 12,
      vy: -(Math.random() * 12 + 6),
      size: 5 + Math.random() * 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      gravity: 0.35 + Math.random() * 0.15,
      life: 0
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let alive = false;
  particles.forEach(p => {
    p.life++;
    p.vy += p.gravity;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    if (p.y < canvas.height + 20 && p.life < 420) alive = true;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, 1 - p.life / 420);
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
  if (alive) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Editable name persists in page (contenteditable) — no storage needed.
