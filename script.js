// ===============================
// 🔗 DOM BINDINGS (CRITICAL FIX)
// ===============================
const lockScreen = document.getElementById("lockScreen");
const choiceScreen = document.getElementById("choiceScreen");
const gardenScreen = document.getElementById("gardenScreen");
const herName = document.getElementById("herName");
const nickname = document.getElementById("nickname");

// ===============================
// 🔐 CREDENTIALS
// ===============================
const correctName = "aathmika";
const correctNick = "petni";
const PREVIEW_DAY = null;

// ===============================
// 🖼️ DAY-WISE PROFILE IMAGES
// ===============================
const dayImages = {
  7: "images/her-7.jpeg",
  8: "images/her-8.jpeg",
  9: "images/her-9.jpeg",
};

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
  const error = document.getElementById("error");

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
    window.ACTIVE_DAY = selectedDate;

    const img = document.querySelector(".profilePic");
    if (dayImages[selectedDate]) img.src = dayImages[selectedDate];
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
}

// ===============================
// ✉️ ENVELOPE HANDLER
// ===============================
function openEnvelope() {
  if (ACTIVE_DAY === 7) return openRoseLetter();
  if (ACTIVE_DAY === 8) return openProposeFlow();
  if (ACTIVE_DAY === 9) return openChocolateLetter();
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

// 🌹 ROSE GARDEN
gardenScreen.addEventListener("click", e => {
  if (!e.target.closest(".controls")) {
    const rose = document.createElement("img");
    rose.src = "images/icons/rose.png";
    rose.className = "rose";
    rose.style.cssText =
      `position:absolute;width:${Math.random()*20+35}px;
       left:${e.clientX}px;top:${e.clientY}px`;
    gardenScreen.appendChild(rose);
  }
});

function clearGarden() {
  document.querySelectorAll(".rose").forEach(r => r.remove());
}

// ===============================
// 💌 PROPOSE DAY
// ===============================
function openProposeGift() {
  showCenteredMessage("Some feelings don’t need words yet.");
}

function openProposeFlow() {
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
  showCenteredMessage("Chocolate Day 🍫 — sweetness without expectations.");
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

And if it does —
that’s more than enough.
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
    "background:#fff;border-radius:20px;padding:22px 26px;font-family:Georgia;color:#6a0572;text-align:center";
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
