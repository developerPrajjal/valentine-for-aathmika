// ===============================
// 🔐 CREDENTIALS
// ===============================
const correctName = "aathmika";
const correctNick = "petni";
const PREVIEW_DAY = null; // set to 8 to test Propose Day

// ===============================
// 🖼️ DAY-WISE PROFILE IMAGES
// ===============================
const dayImages = {
  7: "images/her-7.jpeg", // Rose Day
  8: "images/her-8.jpeg", // Propose Day
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
    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = "14px";
    heart.style.pointerEvents = "none";
    heart.style.transition = "all 0.8s ease-out";
    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 40 + 20;

    setTimeout(() => {
      heart.style.transform =
        `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1.5)`;
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
// 🕒 GET TODAY DATE IN IST
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

  if (selectedDate !== getTodayISTDate()) {
    alert("Umm I see you are trying to be smart!! But you gotta wait!! 😌");
    return;
  }

  if (name === correctName && nick === correctNick) {
    lockScreen.classList.add("hidden");
    choiceScreen.classList.remove("hidden");
    window.ACTIVE_DAY = selectedDate;

    // 🔁 UPDATE PROFILE IMAGE BASED ON DAY
    const profileImg = document.querySelector(".profilePic");
    if (dayImages[window.ACTIVE_DAY]) {
      profileImg.src = dayImages[window.ACTIVE_DAY];
    }
  } else {
    error.textContent = "Hmm… that doesn’t feel right 💭";
  }
}

// ===============================
// 🎁 OPEN GIFT (DAY-WISE)
// ===============================
function openGift() {
  if (window.ACTIVE_DAY === 7) {
    choiceScreen.classList.add("hidden");
    gardenScreen.classList.remove("hidden");
    return;
  }

  if (window.ACTIVE_DAY === 8) {
    openProposeGift();
    return;
  }

  alert("This gift opens on the right day 💖");
}

function goBack() {
  gardenScreen.classList.add("hidden");
  choiceScreen.classList.remove("hidden");
}

// ===============================
// ✉️ OPEN ENVELOPE (DAY-WISE)
// ===============================
function openEnvelope() {
  if (window.ACTIVE_DAY === 8) {
    openProposeFlow();
    return;
  }

  if (window.ACTIVE_DAY !== 7) {
    alert("This letter opens on Rose Day 🌹");
    return;
  }

  openRoseLetter();
}

// ===============================
// 🌹 ROSE DAY LETTER
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
// 💌 PROPOSE DAY ENVELOPE FLOW
// ===============================
function openProposeFlow() {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:999";

  const card = document.createElement("div");
  card.style.cssText =
    "background:#fff;border-radius:18px;padding:25px;width:300px;text-align:center;font-family:Georgia;color:#6a0572";

  const text = document.createElement("div");
  text.textContent = "I have something to tell you…";
  text.style.marginBottom = "20px";

  const scaredBtn = document.createElement("button");
  scaredBtn.textContent = "I’m scared 🙈";

  const tellBtn = document.createElement("button");
  tellBtn.textContent = "Should I tell you? 🥺";
  tellBtn.style.display = "none";

  scaredBtn.onclick = () => {
    scaredBtn.style.display = "none";
    setTimeout(() => tellBtn.style.display = "inline-block", 800);
  };

  tellBtn.onclick = () => {
    overlay.remove();
    openProposeLetter();
  };

  card.append(text, scaredBtn, tellBtn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

// ===============================
// ✍️ PROPOSE LETTER
// ===============================
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
// 💗 PROPOSE DAY GIFT (HEART + UNSENT)
// ===============================
function openProposeGift() {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:999";

  const card = document.createElement("div");
  card.style.cssText =
    "background:linear-gradient(135deg,#fff,#ffe4ec);border-radius:22px;padding:30px;width:300px;text-align:center;font-family:Georgia;color:#6a0572;box-shadow:0 10px 30px rgba(0,0,0,0.25)";

  const heart = document.createElement("div");
  heart.textContent = "💗";
  heart.style.fontSize = "64px";
  heart.style.marginBottom = "18px";
  heart.style.animation = "pulse 1.5s infinite";

  const hintBtn = document.createElement("div");
  hintBtn.textContent = "Some feelings don’t need words yet.";
  hintBtn.style.cssText =
    "display:inline-block;background:#ffb6c9;color:#7a003c;padding:10px 16px;border-radius:999px;font-size:0.85rem;cursor:pointer;user-select:none";

  card.append(heart, hintBtn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.85; }
      50% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(1); opacity: 0.85; }
    }
  `;
  document.head.appendChild(style);

  hintBtn.onclick = () => {
    overlay.remove();
    openUnsentOverlay();
  };
}

function openUnsentOverlay() {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:999";

  const bubble = document.createElement("div");
  bubble.style.cssText =
    "background:#fff;border-radius:20px;padding:22px 26px;font-family:Georgia;color:#6a0572;font-size:0.95rem;box-shadow:0 8px 25px rgba(0,0,0,0.25)";

  overlay.appendChild(bubble);
  document.body.appendChild(overlay);

  const message = "I was going to ask you if—";
  let i = 0;

  const typer = setInterval(() => {
    bubble.textContent += message[i++];
    if (i >= message.length) {
      clearInterval(typer);
      setTimeout(() => eraseMessage(bubble, overlay), 900);
    }
  }, 45);
}

function eraseMessage(bubble, overlay) {
  let text = bubble.textContent;

  const eraser = setInterval(() => {
    text = text.slice(0, -1);
    bubble.textContent = text;
    if (text.length === 0) {
      clearInterval(eraser);
      bubble.textContent = "Not today.";
      setTimeout(() => overlay.remove(), 1200);
    }
  }, 35);
}

// ===============================
// 📜 LETTER RENDER (SHARED)
// ===============================
function openLetter(message) {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:999";

  const paper = document.createElement("div");
  paper.style.cssText =
    "width:340px;height:520px;background:url('images/icons/letter.png') no-repeat center/cover;border-radius:18px;position:relative";

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
// 🌹 ROSE GARDEN
// ===============================
function addRose(x, y) {
  const rose = document.createElement("img");
  rose.src = "images/icons/rose.png";
  rose.className = "rose";
  rose.style.width = Math.random() * 20 + 35 + "px";
  rose.style.left = x + "px";
  rose.style.top = y + "px";
  gardenScreen.appendChild(rose);
}

gardenScreen.addEventListener("click", e => {
  if (!e.target.closest(".controls")) {
    addRose(e.clientX, e.clientY);
  }
});

function clearGarden() {
  document.querySelectorAll(".rose").forEach(r => r.remove());
}

function autoAddRoses() {
  if (autoInterval) return;
  autoInterval = setInterval(() => {
    addRose(Math.random() * innerWidth, Math.random() * innerHeight);
    if (document.querySelectorAll(".rose").length >= 15000) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }, 160);
}

