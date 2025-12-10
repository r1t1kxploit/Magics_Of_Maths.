const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");
let w,
  h,
  particles = [];

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  bgCanvas.width = w;
  bgCanvas.height = h;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    bgCtx.fillStyle = "rgba(0, 243, 255, 0.4)";
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
  }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());

function loop() {
  bgCtx.fillStyle = "rgba(5, 5, 16, 0.2)";
  bgCtx.fillRect(0, 0, w, h);
  particles.forEach((p) => p.update());
  bgCtx.strokeStyle = "rgba(188, 19, 254, 0.1)";
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      if (dx * dx + dy * dy < 10000) {
        bgCtx.beginPath();
        bgCtx.moveTo(particles[i].x, particles[i].y);
        bgCtx.lineTo(particles[j].x, particles[j].y);
        bgCtx.stroke();
      }
    }
  }
  requestAnimationFrame(loop);
}
loop();

function enterSystem() {
  const landing = document.getElementById("landing-page");
  const app = document.getElementById("app-interface");

  landing.style.opacity = "0";

  setTimeout(() => {
    landing.style.display = "none";

    app.classList.remove("hidden");
    setTimeout(() => {
      app.style.opacity = "1";
    }, 50);

    loadScene(1);
  }, 800);
}

const contentData = {
  1: {
    title: "01. Multiplying by 6",
    desc: "Multiply 6 by an even number? The result ends with the same digit.",
    html: `<input type="number" id="inp1" placeholder="Even Num" oninput="runTrick1()"><div id="res1" class="result-box">Waiting...</div>`,
  },
  2: {
    title: "02. The Answer Is 2",
    desc: "Follow the algorithm. The math cancels itself out, always leaving 2.",
    html: `<input type="number" id="inp2" placeholder="Any Number" value="5"><button class="action-btn" onclick="runTrick2()">RUN</button><div id="res2" class="result-box"></div>`,
  },
  3: {
    title: "03. Same Digits",
    desc: "Take 333, 666, etc. Divide by sum of digits. Answer is always 37.",
    html: `<select id="inp3" style="padding:10px; background:#000; color:#fff;"><option value="111">111</option><option value="333">333</option><option value="666">666</option><option value="999">999</option></select><button class="action-btn" onclick="runTrick3()">CALCULATE</button><div id="res3" class="result-box"></div>`,
  },
  4: {
    title: "04. 6 Digits to 3",
    desc: "Repeat 3 digits (123123). Divide by 7, 11, 13. You get original back.",
    html: `<input type="number" id="inp4" placeholder="3-digits" max="999"><button class="action-btn" onclick="runTrick4()">MAGIC</button><div id="res4" class="result-box"></div>`,
  },
  5: {
    title: "05. The 11 Rule",
    desc: "Multiply by 11: Split digits, sum goes in middle.",
    html: `<input type="number" id="inp5" placeholder="2-digits"><button class="action-btn" onclick="runTrick5()">SOLVE</button><div id="res5" class="result-box"></div>`,
  },
  6: {
    title: "06. Memorizing Pi",
    desc: "Count letters: 'How I wish I could calculate pi.'",
    html: `<div style="font-size:1.5rem">How(3) I(1) wish(4) I(1) could(5) calculate(9) pi(2)</div><div class="result-box" style="text-align:center">3.141592</div>`,
  },
  7: {
    title: "07. Magic Digits",
    desc: "Multiply 1-6 by 9, 111, 1001, divide by 7.",
    html: `<input type="number" id="inp7" placeholder="1-6" min="1" max="6"><button class="action-btn" onclick="runTrick7()">REVEAL</button><div id="res7" class="result-box"></div>`,
  },
  8: {
    title: "08. Large Multiply",
    desc: "Use distance from 100 to multiply fast.",
    html: `<input type="number" id="inp8a" placeholder="96" style="width:80px"> x <input type="number" id="inp8b" placeholder="97" style="width:80px"><button class="action-btn" onclick="runTrick8()">CALC</button><div id="res8" class="result-box"></div>`,
  },
  9: {
    title: "09. Divisibility",
    desc: "Check divisibility rules instantly.",
    html: `<input type="number" id="inp9" placeholder="Number"><button class="action-btn" onclick="runTrick9()">CHECK</button><div id="res9" class="result-box"></div>`,
  },
  10: {
    title: "10. Finger Math (9s)",
    desc: "Multiply 9 by N? Fold Nth finger.",
    html: `<input type="range" id="inp10" min="1" max="10" value="1" style="width:100%" oninput="runTrick10()"><div id="hands10" class="finger-visual" style="text-align:center"></div><div id="res10" class="result-box" style="text-align:center"></div>`,
  },
};

function loadScene(id) {
  const stage = document.getElementById("stage");
  const data = contentData[id];
  document
    .querySelectorAll(".sidebar button")
    .forEach((b) => b.classList.remove("active"));
  document.querySelectorAll(".sidebar button")[id - 1].classList.add("active");
  stage.innerHTML = `<div class="card"><h2>${data.title}</h2><div class="description">${data.desc}</div><div class="interaction-zone">${data.html}</div></div>`;
  if (id === 10) runTrick10();
}

function runTrick1() {
  let n = parseInt(document.getElementById("inp1").value);
  let out = document.getElementById("res1");
  if (n % 2 !== 0) {
    out.innerHTML = "Must be Even";
    return;
  }
  out.innerHTML = `<span class="highlight">6 x ${n} = ${
    6 * n
  }</span> (Ends in ${n})`;
}
function runTrick2() {
  let n = parseInt(document.getElementById("inp2").value);
  document.getElementById("res2").innerHTML = `1. ${n}x3 = ${
    n * 3
  }<br>2. +6 = ${n * 3 + 6}<br>3. /3 = ${
    (n * 3 + 6) / 3
  }<br>4. -${n} = <span class="highlight">2</span>`;
}
function runTrick3() {
  let n = parseInt(document.getElementById("inp3").value);
  let sum = (n / 111) * 3;
  document.getElementById(
    "res3"
  ).innerHTML = `Sum of digits: ${sum}<br>${n} ÷ ${sum} = <span class="highlight">37</span>`;
}
function runTrick4() {
  let n = document.getElementById("inp4").value;
  if (n.length !== 3) return;
  let big = parseInt(n + n);
  document.getElementById(
    "res4"
  ).innerHTML = `${big} ÷ 7 ÷ 11 ÷ 13 = <span class="highlight">${
    big / 7 / 11 / 13
  }</span>`;
}
function runTrick5() {
  let n = document.getElementById("inp5").value;
  if (n.length !== 2) return;
  let s = parseInt(n[0]) + parseInt(n[1]);
  document.getElementById("res5").innerHTML = `${n[0]} _ ${
    n[1]
  } -> middle is ${s}<br>Result: <span class="highlight">${n * 11}</span>`;
}
function runTrick7() {
  let n = document.getElementById("inp7").value;
  document.getElementById(
    "res7"
  ).innerHTML = `Result: <span class="highlight">${
    (n * 9 * 111 * 1001) / 7
  }</span>`;
}
function runTrick8() {
  let a = document.getElementById("inp8a").value,
    b = document.getElementById("inp8b").value;
  let d1 = 100 - a,
    d2 = 100 - b;
  document.getElementById("res8").innerHTML = `Part 1: 100-(${d1}+${d2}) = ${
    100 - (d1 + d2)
  }<br>Part 2: ${d1}x${d2} = ${d1 * d2}<br>Result: <span class="highlight">${
    a * b
  }</span>`;
}
function runTrick9() {
  let n = parseInt(document.getElementById("inp9").value),
    s = "";
  if (n % 2 == 0) s += "Divisible by 2<br>";
  if (n % 3 == 0) s += "Divisible by 3<br>";
  if (n % 5 == 0) s += "Divisible by 5<br>";
  document.getElementById("res9").innerHTML =
    s || "Not divisible by 2, 3, or 5";
}
function runTrick10() {
  let n = parseInt(document.getElementById("inp10").value);
  let h = "";
  for (let i = 1; i <= 10; i++)
    h +=
      i === n
        ? '<i class="far fa-hand-point-down" style="color:#555"></i> '
        : '<i class="fas fa-hand-paper" style="color:cyan"></i> ';
  document.getElementById("hands10").innerHTML = h;
  document.getElementById("res10").innerHTML = `Left: ${n - 1} | Right: ${
    10 - n
  } -> <span class="highlight">${9 * n}</span>`;
}
