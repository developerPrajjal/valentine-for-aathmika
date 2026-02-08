// ===============================
// 🔐 CREDENTIALS
// ===============================
const correctName = "aathmika";
const correctNick = "petni";
const PREVIEW_DAY = null; // KEEP NULL FOR LIVE

// ===============================
// 🖼️ DAY-WISE PROFILE IMAGES
// ===============================
const dayImages = {
  7: "images/her-7.jpeg",
  8: "images/her-8.jpeg",
  9: "images/her-9.jpeg", // add when ready
};

// ===============================
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
// 🔓 UNLOCK (FINAL LOGIC)
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

    const profileImg = document.querySelector(".profilePic");
    if (dayImages[window.ACTIVE_DAY]) {
      profileImg.src = dayImages[window.ACTIVE_DAY];
    }
  } else {
    error.textContent = "Hmm… that doesn’t feel right 💭";
  }
}

// ===============================
// 🎁 GIFT (DAY-WISE)
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

  if (window.ACTIVE_DAY === 9) {
    openChocolateGift();
    return;
  }

  alert("This gift opens on the right day 💖");
}

function goBack() {
  gardenScreen.classList.add("hidden");
  choiceScreen.classList.remove("hidden");
}

// ===============================
// ✉️ ENVELOPE (DAY-WISE)
// ===============================
function openEnvelope() {
  if (window.ACTIVE_DAY === 8) {
    openProposeFlow();
    return;
  }

  if (window.ACTIVE_DAY === 9) {
    openChocolateLetter();
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
// 💌 PROPOSE DAY FLOW
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
// 🍫 CHOCOLATE DAY GIFT (9 FEB)
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
    "position:fixed;inset:0;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;z-index:999";

  const box = document.createElement("div");
  box.style.cssText =
    "background:#fff;border-radius:22px;padding:24px;width:320px;font-family:Georgia;color:#6a0572;text-align:center";

  const title = document.createElement("div");
  title.textContent = "Pick a chocolate 🍫";
  title.style.marginBottom = "14px";

  box.appendChild(title);

  chocolates.forEach(([label, msg]) => {
    const btn = document.createElement("div");
    btn.textContent = label;
    btn.style.cssText =
      "margin:8px 0;padding:10px;border-radius:14px;background:#ffe4ec;cursor:pointer";

    btn.onclick = () => {
      burstHearts(window.innerWidth / 2, window.innerHeight / 2);
      alert(msg);
    };

    box.appendChild(btn);
  });

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };
}

// ===============================
// 🍫 CHOCOLATE DAY LETTER (9 FEB)
// ===============================
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
// 🌹 ROSE GARDEN (UNCHANGED)
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
    if (document.querySelectorAll(".rose").length >= 300) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }, 160);
}
