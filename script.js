// ===============================
// 🔗 DOM BINDINGS
// ===============================
const lockScreen = document.getElementById("lockScreen");
const choiceScreen = document.getElementById("choiceScreen");
const gardenScreen = document.getElementById("gardenScreen");
const herName = document.getElementById("herName");
const nickname = document.getElementById("nickname");
const error = document.getElementById("error");

// ===============================
// 🔐 CREDENTIALS
// ===============================
const correctName = "aathmika";
const correctNick = "petni";
const PREVIEW_DAY = 10;

// ===============================
// 🖼️ DAY-WISE PROFILE IMAGES
// ===============================
const dayImages = {
  7: "images/her-7.jpeg",
  8: "images/her-8.jpeg",
  9: "images/her-9.jpeg",
  10: "images/her-10.jpeg"
};

// ✅ SINGLE SOURCE OF TRUTH
let ACTIVE_DAY = null;

let selectedDate = null;
let autoInterval = null;

// ===============================
// 💕 HEART BURST EFFECT
// ===============================
function burstHearts(x, y) {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.style.cssText =
      `position:fixed;left:${x}px;top:${y}px;font-size:16px;
       pointer-events:none;transition:all .8s ease-out;z-index:9999`;
    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 40 + 20;

    setTimeout(() => {
      heart.style.transform =
        `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(1.5)`;
      heart.style.opacity = "0";
    }, 10);

    setTimeout(() => heart.remove(), 900);
  }
}

// ===============================
// 📅 DATE SELECTION
// ===============================
function selectDate(day, btn) {
  selectedDate = day;
  document.querySelectorAll(".dateButtons button")
    .forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  const r = btn.getBoundingClientRect();
  burstHearts(r.left + r.width / 2, r.top + r.height / 2);
}

// ===============================
// 🕒 GET TODAY DATE (IST)
// ===============================
function getTodayISTDate() {
  if (PREVIEW_DAY !== null) return PREVIEW_DAY;
  return parseInt(
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric"
    }).format(new Date()),
    10
  );
}

// ===============================
// 🔓 UNLOCK
// ===============================
function unlock() {
  const name = herName.value.toLowerCase().trim();
  const nick = nickname.value.toLowerCase().trim();

  if (!selectedDate) {
    error.textContent = "Pick today’s date 🙂";
    return;
  }

  if (selectedDate > getTodayISTDate()) {
    alert("Umm I see you are trying to be smart!! But you gotta wait!! 😌");
    return;
  }

  if (name === correctName && nick === correctNick) {
    lockScreen.classList.add("hidden");
    choiceScreen.classList.remove("hidden");

    ACTIVE_DAY = selectedDate; // ✅ FIX

    const img = document.querySelector(".profilePic");
    if (dayImages[ACTIVE_DAY]) img.src = dayImages[ACTIVE_DAY];

    const teddy = document.getElementById("teddySection");
    if (teddy) {
      ACTIVE_DAY === 10
        ? teddy.classList.remove("hidden")
        : teddy.classList.add("hidden");
    }
  } else {
    error.textContent = "Hmm… that doesn’t feel right 💭";
  }
}

// ===============================
// 🎁 GIFT HANDLER
// ===============================
function openGift() {
  if (ACTIVE_DAY === 7) {
    choiceScreen.classList.add("hidden");
    gardenScreen.classList.remove("hidden");
    return;
  }
  if (ACTIVE_DAY === 8) return openProposeGift();
  if (ACTIVE_DAY === 9) return openChocolateGift();
  if (ACTIVE_DAY === 10) return openTeddyGift();
}

// ===============================
// ✉️ ENVELOPE HANDLER
// ===============================
function openEnvelope() {
  if (ACTIVE_DAY === 7) return openRoseLetter();
  if (ACTIVE_DAY === 8) return openProposeLetter();
  if (ACTIVE_DAY === 9) return openChocolateLetter();
  if (ACTIVE_DAY === 10) return openTeddyLetter();
}

// ===============================
// 🌹 ROSE DAY
// ===============================
function openRoseLetter() {
  openLetter(`
Happy Rose Day 🌹

This rose didn’t bloom overnight.
It took its time —
just like the way you quietly
made your place in my life.

This isn’t a grand gesture.
Just a gentle one.
Like you.
`);
}

// ===============================
// 🌹 ROSE GARDEN
// ===============================
gardenScreen.addEventListener("click", e => {
  if (!e.target.closest(".controls")) addRose(e.clientX, e.clientY);
});

function addRose(x, y) {
  const rose = document.createElement("img");
  rose.src = "images/icons/rose.png";
  rose.className = "rose";
  rose.style.cssText =
    `position:absolute;width:${Math.random()*20+35}px;left:${x}px;top:${y}px`;
  gardenScreen.appendChild(rose);
}

function autoAddRoses() {
  if (autoInterval) return;
  autoInterval = setInterval(() => {
    addRose(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
    if (document.querySelectorAll(".rose").length >= 250) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }, 150);
}

function clearGarden() {
  document.querySelectorAll(".rose").forEach(r => r.remove());
}

function goBack() {
  if (autoInterval) clearInterval(autoInterval);
  autoInterval = null;
  gardenScreen.classList.add("hidden");
  choiceScreen.classList.remove("hidden");
}

// ===============================
// 💌 PROPOSE DAY
// ===============================
function openProposeGift() {
  showCenteredMessage("Some feelings don’t need words yet.");
}

function openProposeLetter() {
  openLetter(`
I won’t rush you.
I won’t pressure you.

But if you ever decide
to choose someone —

I hope you remember
how this felt.
`);
}

// ===============================
// 🍫 CHOCOLATE DAY
// ===============================
function openChocolateGift() {
  const chocolates = [
    ["🍫 Dairy Milk Silk", "Smooth. Soft. The kind of sweetness that just feels right."],
    ["🍫 KitKat", "Breaks feel better when they’re shared."],
    ["🍫 Milky Bar", "Simple sweetness. No complications."],
    ["🍫 Ferrero Rocher", "A little fancy outside, warm inside."],
    ["🍫 5 Star", "Messy sometimes. Worth it always."]
  ];

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:9999";

  const box = document.createElement("div");
  box.style.cssText =
    "background:#fff;border-radius:22px;padding:24px;width:320px;text-align:center;font-family:Georgia;color:#6a0572";

  box.innerHTML = "<div style='margin-bottom:14px'>Pick a chocolate 🍫</div>";

  chocolates.forEach(([name, msg]) => {
    const btn = document.createElement("div");
    btn.textContent = name;
    btn.style.cssText =
      "margin:8px 0;padding:10px;border-radius:14px;background:#ffe4ec;cursor:pointer";
    btn.onclick = e => {
      e.stopPropagation();
      showCenteredMessage(msg);
    };
    box.appendChild(btn);
  });

  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.onclick = () => overlay.remove();
}

function openChocolateLetter() {
  openLetter(`
Chocolate melts easily.
But some feelings don’t.

So today is just about sweetness.
No meanings.
No expectations.

Just a small pause.
A lighter moment.
A quiet smile, if it happens.
`);
}

// ===============================
// 🧸 TEDDY DAY
// ===============================
function openTeddyGift() {
  showCenteredMessage("A small comfort, just for today 🧸");
}

function openTeddyLetter() {
  openLetter(`
Not every day needs celebration.
Some days just need comfort.

If today feels quiet,
that’s okay too.
`);
}

function openTeddySit() {
  showCenteredMessage("Sit here. Breathe. I’ve got you. 🧸");
}

function openTeddyHold() {
  showCenteredMessage("Some days, holding is enough. 🤍");
}

function openTeddyExplore() {
  openLetter(`
Teddy Day 🧸

This isn’t about toys.
It’s about comfort.

About the feeling that
someone thought of you.

And that…
is sometimes enough.
`);
}

// ===============================
// 💗 CENTER MESSAGE
// ===============================
function showCenteredMessage(msg) {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:9999";

  const card = document.createElement("div");
  card.style.cssText =
    "background:#fff;border-radius:20px;padding:22px 26px;font-family:Georgia;color:#6a0572;text-align:center;white-space:pre-line";

  card.textContent = msg;
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  overlay.onclick = () => overlay.remove();
}

// ===============================
// 📜 LETTER RENDER
// ===============================
function openLetter(message) {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:9999";

  const paper = document.createElement("div");
  paper.style.cssText =
    "width:340px;height:520px;background:url('images/icons/letter.png') center/cover no-repeat;border-radius:18px;position:relative";

  const text = document.createElement("div");
  text.style.cssText =
    "position:absolute;top:102px;left:44px;right:38px;font:13.5px Georgia;line-height:26px;color:#6a1b4d;white-space:pre-wrap";

  paper.appendChild(text);
  overlay.appendChild(paper);
  document.body.appendChild(overlay);

  let i = 0;
  const typer = setInterval(() => {
    text.textContent += message[i++];
    if (i >= message.length) clearInterval(typer);
  }, 40);

  overlay.onclick = () => overlay.remove();
}

// ===============================
// 🧸 CATCH THE TEDDY – MINI GAME (PATCHED, SAFE)
// ===============================
function openCatchTeddyGame() {
  if (ACTIVE_DAY !== 10) return;

  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic && !bgMusic.paused) bgMusic.pause();

  let score = 0;
  let timeLeft = 60;
  let gameInterval = null;
  let dropInterval = null;
  let gameActive = true;

  const highScoreKey = "teddy_high_score";
  const prevHigh = parseInt(localStorage.getItem(highScoreKey) || "0");

  // Overlay (CENTER FIXED)
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:10000";

  // Game Box
  const box = document.createElement("div");
  box.style.cssText =
    "width:320px;height:420px;background:#ffeef5;border-radius:24px;position:relative;overflow:hidden;font-family:Georgia;text-align:center";

  // Header
  const header = document.createElement("div");
  header.style.cssText =
    "padding:10px;font-size:.9rem;color:#6a0572;display:flex;justify-content:space-between";
  header.innerHTML = `<span>Score: <b id="tScore">0</b></span>
                      <span>High: ${prevHigh}</span>`;

  // Timer
  const timer = document.createElement("div");
  timer.style.cssText = "font-size:.8rem;color:#6a0572;margin-bottom:4px";
  timer.textContent = "Time: 60s";

  // Play Area
  const playArea = document.createElement("div");
  playArea.style.cssText =
    "position:absolute;top:70px;bottom:60px;left:0;right:0";

  // Basket
  const basket = document.createElement("div");
  basket.style.cssText =
    "position:absolute;bottom:10px;left:120px;width:70px;height:30px;background:#f7c6d8;border-radius:0 0 20px 20px;transition:.1s";

  playArea.appendChild(basket);

  // Close Button
  const closeBtn = document.createElement("div");
  closeBtn.textContent = "✕";
  closeBtn.style.cssText =
    "position:absolute;top:8px;right:12px;cursor:pointer;color:#6a0572";

  closeBtn.onclick = endGame;

  box.append(header, timer, closeBtn, playArea);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Basket movement
  function moveBasket(x) {
    const rect = playArea.getBoundingClientRect();
    let pos = x - rect.left - 35;
    pos = Math.max(0, Math.min(pos, rect.width - 70));
    basket.style.left = pos + "px";
  }

  playArea.addEventListener("mousemove", e => moveBasket(e.clientX));
  playArea.addEventListener("touchmove", e => moveBasket(e.touches[0].clientX));

  // Drop teddy
  function dropTeddy() {
    const teddy = document.createElement("div");
    teddy.textContent = "🧸";
    teddy.style.cssText =
      `position:absolute;top:-30px;left:${Math.random()*260}px;font-size:26px;transition:top 2.8s linear`;

    playArea.appendChild(teddy);
    setTimeout(() => teddy.style.top = "100%", 20);

    const fallCheck = setInterval(() => {
      if (!gameActive) {
        clearInterval(fallCheck);
        teddy.remove();
        return;
      }

      const tRect = teddy.getBoundingClientRect();
      const bRect = basket.getBoundingClientRect();

      if (
        tRect.bottom >= bRect.top &&
        tRect.left < bRect.right &&
        tRect.right > bRect.left
      ) {
        clearInterval(fallCheck);
        teddy.remove();
        score++;
        document.getElementById("tScore").textContent = score;

        basket.style.transform = "scale(1.1)";
        setTimeout(() => basket.style.transform = "scale(1)", 120);
      }
    }, 50);

    setTimeout(() => {
      clearInterval(fallCheck);
      teddy.remove();
    }, 3000);
  }

  // Timer
  gameInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) endGame();
  }, 1000);

  dropInterval = setInterval(dropTeddy, 900);

  function endGame() {
    if (!gameActive) return;
    gameActive = false;

    clearInterval(gameInterval);
    clearInterval(dropInterval);

    // DIM GAME + SHOW RESULT ON TOP
    box.style.filter = "blur(3px) brightness(0.8)";

    const result = document.createElement("div");
    result.style.cssText =
      "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:2";

    const msg = document.createElement("div");
    msg.style.cssText =
      "background:#fff;padding:22px 28px;border-radius:18px;font-family:Georgia;color:#6a0572;text-align:center";

    if (score > prevHigh) {
      localStorage.setItem(highScoreKey, score);
      msg.textContent =
        "Hurray!! 🎉\nNew High Score!!\nI see you’re getting better and better 🧸🤍";
    } else {
      msg.textContent =
        "That was cute 🧸\nWanna try once more?";
    }

    result.appendChild(msg);
    box.appendChild(result);

    setTimeout(() => {
      overlay.remove();
      if (bgMusic) bgMusic.play();
    }, 2200);
  }
}

