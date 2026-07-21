/* ============================================
   EDIT YAHAN SE — apni details daalein
   ============================================ */
const CONFIG = {
  name: "Rija Burney",          // birthday wale ka naam
  wish: "Muskurahaton bhari zindagi, khushiyon se bhara har din, aur har khwahish poori ho — Happy Birthday, Rija!",
};

document.getElementById("bdayName").textContent = CONFIG.name;
document.getElementById("wishText").textContent = CONFIG.wish;
document.title = "Happy Birthday " + CONFIG.name;

/* ============================================
   SCENE TRANSITION: door -> cake
   ============================================ */
const doorScene   = document.getElementById("doorScene");
const doorFrame   = document.getElementById("doorFrame");
const openDoorBtn = document.getElementById("openDoorBtn");
const cakeScene   = document.getElementById("cakeScene");

openDoorBtn.addEventListener("click", () => {
  doorFrame.classList.add("open");
  openDoorBtn.disabled = true;

  setTimeout(() => {
    doorScene.style.display = "none";
    cakeScene.classList.add("visible");
    window.scrollTo({ top: 0 });
  }, 1300);
});

/* ============================================
   CAKE CUTTING
   ============================================ */
const cutCakeBtn  = document.getElementById("cutCakeBtn");
const cake        = document.getElementById("cake");
const knife       = document.getElementById("knife");
const messageCard = document.getElementById("messageCard");

let cakeCut = false;

cutCakeBtn.addEventListener("click", () => {
  if (cakeCut) return;
  cakeCut = true;
  cutCakeBtn.disabled = true;

  knife.classList.add("slicing");

  setTimeout(() => {
    cake.classList.add("cut");
    cakeScene.classList.add("cut");
    launchConfetti();
  }, 500);

  setTimeout(() => {
    messageCard.classList.add("show");
    tryPlayMusic();
  }, 1200);
});

/* ============================================
   MUSIC
   ============================================ */
const bgMusic  = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = false;

function tryPlayMusic(){
  bgMusic.volume = 0.6;
  bgMusic.play()
    .then(() => { musicPlaying = true; updateMusicBtn(); })
    .catch(() => { updateMusicBtn(); }); // autoplay blocked, user taps button
}

function updateMusicBtn(){
  musicBtn.textContent = musicPlaying ? "🔊 Music Bajj Rahi Hai" : "🎵 Gaana Bajao";
}

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.play().catch(() => {});
    musicPlaying = true;
  }
  updateMusicBtn();
});

/* ============================================
   AMBIENT FLOATING PETALS
   ============================================ */
const petalsLayer = document.getElementById("petals");
const PETAL_COLORS = ["#ff7aa8", "#ffb3cf", "#f2c14e"];

function spawnPetal(){
  const p = document.createElement("div");
  p.className = "petal";
  const size = 6 + Math.random() * 8;
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.left = Math.random() * 100 + "vw";
  p.style.background = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  const fallDuration = 8 + Math.random() * 8;
  const swayDuration = 2 + Math.random() * 2;
  p.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  petalsLayer.appendChild(p);
  setTimeout(() => p.remove(), fallDuration * 1000);
}

setInterval(spawnPetal, 600);
for (let i = 0; i < 8; i++) setTimeout(spawnPetal, i * 200);

/* ============================================
   CONFETTI BURST (on cake cut)
   ============================================ */
const confettiLayer = document.getElementById("confettiLayer");
const CONFETTI_COLORS = ["#f2c14e", "#ff7aa8", "#ffb3cf", "#fff5e8", "#ff8c42"];

function launchConfetti(){
  const count = 90;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDuration = (2.2 + Math.random() * 1.8) + "s";
    piece.style.width = (6 + Math.random() * 6) + "px";
    piece.style.height = (10 + Math.random() * 8) + "px";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}
