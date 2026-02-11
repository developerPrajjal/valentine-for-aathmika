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
const PREVIEW_DAY = null;

// ===============================
// 🖼️ DAY-WISE PROFILE IMAGES
// ===============================
const dayImages = {
  7: "images/her-7.jpeg",
  8: "images/her-8.jpeg",
  9: "images/her-9.jpeg",
  10: "images/her-10.jpeg",
  11: "images/her-11.jpeg",
  12: "images/her-12.jpeg",
  13: "images/her-13.jpeg",
  14: "images/her-14.jpeg"
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
    alert("You gotta wait 😌");
    return;
  }

  if (name === correctName && nick === correctNick) {
    lockScreen.classList.add("hidden");
    choiceScreen.classList.remove("hidden");

    ACTIVE_DAY = selectedDate;

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
  if (ACTIVE_DAY === 11) return openPromiseDayCard();
  if (ACTIVE_DAY === 12) return openHugGift();
  if (ACTIVE_DAY === 13) return openConfessionGift();
  if (ACTIVE_DAY === 14) return openValentineFinalScreen();
}

// ===============================
// ✉️ ENVELOPE HANDLER
// ===============================
function openEnvelope() {
  if (ACTIVE_DAY === 7) return openRoseLetter();
  if (ACTIVE_DAY === 8) return openProposeLetter();
  if (ACTIVE_DAY === 9) return openChocolateLetter();
  if (ACTIVE_DAY === 10) return openTeddyLetter();
  if (ACTIVE_DAY === 11) return openPromiseDayLetter();
  if (ACTIVE_DAY === 12) return openHugLetter();
  if (ACTIVE_DAY === 13) return openConfessionLetter();
  if (ACTIVE_DAY === 14) return openValentineFinalLetter();
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
    ["🍫 Dairy Milk Silk", "I might not always say the right thing.\nBut I’ll never pretend."],
    ["🍫 KitKat", "Breaks feel better when they’re shared."],
    ["🍫 Milky Bar", "Simple sweetness.\nNo complications."],
    ["🍫 Ferrero Rocher", "A little fancy outside.\nWarm inside."],
    ["🍫 5 Star", "Messy sometimes.\nWorth it always."]
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
A quiet smile.
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
  showCenteredMessage("Sit here.\nBreathe.\nI’ve got you. 🧸");
}

function openTeddyHold() {
  showCenteredMessage("Some days, holding is enough. 🤍");
}

function openTeddyExplore() {
  openLetter(`
Teddy Day 🧸

This isn’t about toys.
It’s about comfort.

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
  }, 35);

  overlay.onclick = () => overlay.remove();
}

// ===============================
// 🤍 PROMISE DAY – FIXED & COMPLETE
// ===============================
function openPromiseDayCard() {
  if (ACTIVE_DAY !== 11) return;

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:10000";

  const card = document.createElement("div");
  card.style.cssText =
    "width:320px;height:440px;perspective:1000px;font-family:Georgia";

  const inner = document.createElement("div");
  inner.style.cssText =
    "width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .7s";

  // FRONT
  const front = document.createElement("div");
  front.style.cssText =
    "position:absolute;inset:0;background:#fff;border-radius:26px;backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px";

  front.innerHTML = `
    <h2 style="color:#6a0572;">Happy Promise Day 🤍</h2>
    <p style="margin-top:12px;color:#8a3a78;">Tap to open the card</p>
  `;

  // BACK
  const back = document.createElement("div");
  back.style.cssText =
    "position:absolute;inset:0;background:#fff;border-radius:26px;backface-visibility:hidden;transform:rotateY(180deg);padding:18px;overflow:auto";

  back.innerHTML = `
    <h3 style="text-align:center;color:#6a0572;margin-bottom:10px;">
      Not all promises are loud.
    </h3>

    <div id="promiseArea" style="margin-bottom:14px;">
      <button class="pBtn">Promise 1 · Honesty</button>
      <button class="pBtn">Promise 2 · Patience</button>
      <button class="pBtn">Promise 3 · Respect</button>
    </div>

    <div id="promiseMsg" style="
      display:none;
      padding:14px;
      border-radius:14px;
      background:#fff6fa;
      color:#6a0572;
      font-size:.9rem;
      line-height:1.5;
      white-space:pre-line;
      margin-bottom:14px;
    "></div>

    <div style="
      padding:14px;
      border-radius:14px;
      background:#fff0f5;
      font-size:.85rem;
      color:#6a0572;
    ">
      <b>Can I make you some more promises?</b><br><br>
      What would you want me<br>
      to carry forward — no matter what?
      <br><br>
      <small>
        Please answer this via WhatsApp inbox.<br>
        I’ll do it for you — and I won’t break those promises. Ever.
      </small>
    </div>
  `;

  inner.append(front, back);
  card.appendChild(inner);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  front.onclick = () => (inner.style.transform = "rotateY(180deg)");

  const buttons = back.querySelectorAll(".pBtn");
  const msgBox = back.querySelector("#promiseMsg");

  buttons[0].onclick = () => {
    msgBox.style.display = "block";
    msgBox.textContent =
      "I might not always say the right thing.\nBut I’ll never pretend.";
  };

  buttons[1].onclick = () => {
    msgBox.style.display = "block";
    msgBox.textContent = "Some things take time.\nAnd I’m okay with that.";
  };

  buttons[2].onclick = () => {
    msgBox.style.display = "block";
    msgBox.textContent =
      "No matter what this becomes,\nyour feelings will never be a joke to me.";
  };

  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };
}


// ===============================
// ✉️ PROMISE DAY LETTER
// ===============================
function openPromiseDayLetter() {
  openLetter(`
Happy Promise Day 🤍

I don’t want to promise
things I can’t keep.

But I want to promise
things that matter.

So tell me —
what are the promises
you’d want me to hold onto?

Reply to this on WhatsApp.
I’ll listen.
I’ll remember.
And I won’t break them.
`);
}
// ===============================
// 🤗 HUG DAY (12 FEB) – SAFE MODULE
// ===============================

// 🎁 HUG GIFT
function openHugGift() {
  if (ACTIVE_DAY !== 12) return;

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:10000";

  const box = document.createElement("div");
  box.style.cssText =
    "width:340px;background:#fff;border-radius:24px;padding:28px 24px;text-align:center;font-family:Georgia;position:relative";

  box.innerHTML = `
    <h2 style="color:#6a0572;margin-bottom:6px;">Hug Day 🤍</h2>
    <p style="font-size:.9rem;color:#8a3a78;margin-bottom:18px;">
      Choose the kind of hug you need today
    </p>

    <div style="display:flex;flex-direction:column;gap:10px;">
      <button id="softHug" style="padding:10px;border-radius:16px;border:none;background:#ffe4ec;cursor:pointer;">🤗 Soft Hug</button>
      <button id="tightHug" style="padding:10px;border-radius:16px;border:none;background:#ffd6e8;cursor:pointer;">🫂 Tight Hug</button>
      <button id="silentHug" style="padding:10px;border-radius:16px;border:none;background:#fff0f5;cursor:pointer;">🌙 Silent Hug</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  // Attach handlers
  document.getElementById("softHug").onclick = e => {
    e.stopPropagation();
    showHugMessage(
      "Not every hug needs a reason.\nSome are just comfort."
    );
  };

  document.getElementById("tightHug").onclick = e => {
    e.stopPropagation();
    showHugMessage(
      "For the days that feel heavy.\nYou don’t have to carry them alone."
    );
  };

  document.getElementById("silentHug").onclick = e => {
    e.stopPropagation();
    showHugMessage(
      "No words.\nJust presence."
    );
  };
}


// 💬 HUG MESSAGE (CENTERED + SAFE)
function showHugMessage(text) {

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:11000";

  const card = document.createElement("div");
  card.style.cssText =
    "background:#fff;border-radius:22px;padding:26px 30px;font-family:Georgia;color:#6a0572;text-align:center;white-space:pre-line;box-shadow:0 10px 30px rgba(0,0,0,.2)";

  card.textContent = text;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // Floating hearts effect
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.textContent = "🤍";
    heart.style.cssText =
      `position:fixed;
       left:${Math.random() * window.innerWidth}px;
       top:${Math.random() * window.innerHeight}px;
       font-size:18px;
       opacity:0;
       transition:all 1s ease;
       z-index:12000;`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.opacity = "1";
      heart.style.transform = "translateY(-40px)";
    }, 20);

    setTimeout(() => heart.remove(), 1000);
  }

  overlay.onclick = () => overlay.remove();
}


// ✉️ HUG LETTER
function openHugLetter() {
  if (ACTIVE_DAY !== 12) return;

  openLetter(`
Hug Day 🤍

I don’t know where we stand.
I don’t know what changes.

But if ever you need
a quiet place to rest,

I hope you remember —
you’re not alone.
`);
}
// ===============================
// 💌 CONFESSION DAY (13 FEB) – SAFE MODULE
// ===============================

// 🎁 CONFESSION GIFT
function openConfessionGift() {
  if (ACTIVE_DAY !== 13) return;

  const overlay = document.createElement("div");
  overlay.style.cssText =
  "position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:20000";


  const box = document.createElement("div");
  box.style.cssText =
    "width:350px;background:#fff;border-radius:26px;padding:28px;text-align:center;font-family:Georgia;position:relative";

  box.innerHTML = `
    <h2 style="color:#6a0572;margin-bottom:8px;">Confession Day 💌</h2>
    <p style="font-size:.9rem;color:#8a3a78;margin-bottom:20px;">
      Some things were never said properly.
    </p>

    <div style="display:flex;flex-direction:column;gap:12px;">
      <button id="conf1" style="padding:10px;border-radius:16px;border:none;background:#ffe4ec;cursor:pointer;">Open Confession 1</button>
      <button id="conf2" style="padding:10px;border-radius:16px;border:none;background:#ffd6e8;cursor:pointer;">Open Confession 2</button>
      <button id="conf3" style="padding:10px;border-radius:16px;border:none;background:#fff0f5;cursor:pointer;">Open Confession 3</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };

  document.getElementById("conf1").onclick = e => {
    e.stopPropagation();
    overlay.remove();
    showCenteredMessage(
      "I never expected you to mean this much.\nBut somehow… you did."
    );
  };

  document.getElementById("conf2").onclick = e => {
    e.stopPropagation();
    overlay.remove();
    showCenteredMessage(
      "I tried acting normal.\nBut every small thing with you felt different."
    );
  };

  document.getElementById("conf3").onclick = e => {
    e.stopPropagation();
    overlay.remove();
    showCenteredMessage(
      "Whatever happens —\nthis was real for me.\nAnd I’m grateful for it."
    );
  };
}


// ✉️ CONFESSION LETTER
function openConfessionLetter() {
  if (ACTIVE_DAY !== 13) return;

  openLetter(`
Confession Day 💌

This wasn’t planned.

I didn’t sit down one day
and decide to feel something.

It just happened.

In conversations.
In silence.
In small moments that felt bigger than they were.

I don’t know what tomorrow looks like.

But I know this —
what I felt was honest.
`);
}
// ===============================
// ❤️ 14TH FEB – CALM FINAL MODULE
// ===============================

// 🎁 FINAL SCREEN (Gift Icon)
function openValentineFinalScreen() {
  if (ACTIVE_DAY !== 14) return;

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:10000";

  const card = document.createElement("div");
  card.style.cssText =
    "width:320px;background:#fff;border-radius:24px;padding:28px 22px;text-align:center;font-family:Georgia;color:#6a0572;line-height:1.6;opacity:0;transition:opacity .5s ease";

  card.innerHTML = `
    <h2 style="margin-bottom:14px;">Valentine’s Day ❤️</h2>
    <div id="finalTypeText" style="font-size:.95rem;min-height:120px;"></div>
    <button id="finalLetterBtn"
      style="margin-top:18px;padding:10px 18px;border:none;border-radius:18px;background:#6a0572;color:#fff;cursor:pointer;display:none;">
      One Last Letter
    </button>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  setTimeout(() => card.style.opacity = "1", 30);

  const text = `
I kept my promise.
I wrote till the last line of code.

And after writing 1523 lines of code in 3 days I can say....
I didn’t build this to impress you.
I built it because I meant it.

Whatever you choose next,
I will respect it.
`;

  const typeBox = card.querySelector("#finalTypeText");
  const button = card.querySelector("#finalLetterBtn");

  let i = 0;
  const typer = setInterval(() => {
    typeBox.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(typer);
      button.style.display = "inline-block";
    }
  }, 35);

  button.onclick = () => {
    overlay.remove();
    openValentineFinalLetter();
  };

  overlay.onclick = e => {
    if (e.target === overlay) overlay.remove();
  };
}


// ✉️ FINAL LETTER (Envelope Icon)
function openValentineFinalLetter() {
  if (ACTIVE_DAY !== 14) return;

  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:10000";

  const paper = document.createElement("div");
  paper.style.cssText =
    "width:340px;height:520px;background:url('images/icons/letter.png') center/cover no-repeat;border-radius:18px;position:relative;overflow:hidden";

  const text = document.createElement("div");
  text.style.cssText =
    "position:absolute;top:105px;left:50px;right:48px;" +
    "font:13px Georgia;line-height:22px;color:#6a1b4d;" +
    "white-space:normal;word-wrap:break-word";

  paper.appendChild(text);
  overlay.appendChild(paper);
  document.body.appendChild(overlay);

  const message = 
`Happy Valentine’s Day ❤️

I don’t know what tomorrow looks like, 
but I know I showed up honestly.

I gave effort. I gave intention. 
I gave meaning to something that mattered to me.

Not to pressure you. Not to impress you.
Just because it felt real to me.

If this becomes something, I’ll be grateful.
If it doesn’t, I’ll still be grateful —
for the conversations, the warmth,
and the moments that felt special.

No anger. No expectations. No noise.

Thereby I take depart. Just respect.

And peace.`;

  let i = 0;
  const typer = setInterval(() => {
    text.textContent += message[i++];
    if (i >= message.length) clearInterval(typer);
  }, 30);

  overlay.onclick = () => overlay.remove();
}


