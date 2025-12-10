var bgCanvas = document.getElementById('bgCanvas');
var bgCtx = bgCanvas.getContext('2d');
let WIN_W, WIN_H;
var particles = [];
function doResize() {
  WIN_W = window.innerWidth;
  WIN_H = window.innerHeight;
  bgCanvas.width = WIN_W;
  bgCanvas.height = WIN_H;
}
window.addEventListener('resize', doResize);
doResize(); // init
function Particle() {
  this.init();
}
Particle.prototype.init = function() {
  this.x = Math.random() * WIN_W;
  this.y = Math.random() * WIN_H;
  // small speed but slightly non-uniform
  this.vx = (Math.random() - 0.45) * (0.6);
  this.vy = (Math.random() - 0.55) * (0.6);
  this.size = 0.5 + Math.random() * 2.0;
};
Particle.prototype.step = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x < -10 || this.x > WIN_W + 10 || this.y < -10 || this.y > WIN_H + 10) {
    // small bias to keep central density
    this.x = Math.random() * WIN_W;
    this.y = Math.random() * WIN_H;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
  }
  bgCtx.beginPath();
  bgCtx.fillStyle = 'rgba(0,243,255,0.42)';
  bgCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
  bgCtx.fill();
};
for (var i = 0; i < 80; i++) {
  particles.push(new Particle());
}
function animate() {
  // subtle trail effect
  bgCtx.fillStyle = 'rgba(5,5,16,0.22)';
  bgCtx.fillRect(0, 0, WIN_W, WIN_H);

  // update + draw particles
  for (var p = 0; p < particles.length; p++) {
    particles[p].step();
  }
  bgCtx.strokeStyle = 'rgba(188,19,254,0.09)';
  for (var a = 0; a < particles.length; a++) {
    for (var b = a + 1; b < particles.length; b++) {
      var dx = particles[a].x - particles[b].x;
      var dy = particles[a].y - particles[b].y;
      var dist2 = dx*dx + dy*dy;
      if (dist2 < 10000) {
        bgCtx.beginPath();
        bgCtx.moveTo(particles[a].x, particles[a].y);
        bgCtx.lineTo(particles[b].x, particles[b].y);
        bgCtx.stroke();
      }
    }
  }

  window.requestAnimationFrame(animate);
}
animate();
var contentData = {
  1: {
    title: "01. Multiplying by 6",
    desc: "Multiply 6 by an even number — last digit stays same.",
    html: '<input id="inp1" type="number" placeholder="Even number" oninput="runTrick1()"> <div id="res1" class="result-box">Waiting...</div>'
  },
  2: {
    title: "02. The Answer Is 2",
    desc: "A small algorithm that ends at 2.",
    html: '<input id="inp2" type="number" value="5" /> <button class="action-btn" onclick="runTrick2()">RUN</button> <div id="res2" class="result-box"></div>'
  },
  3: {
    title: "03. Same Digits",
    desc: "333, 666 etc — surprising division.",
    html: '<select id="inp3"><option value="111">111</option><option value="333">333</option><option value="666">666</option><option value="999">999</option></select> <button class="action-btn" onclick="runTrick3()">CALC</button> <div id="res3" class="result-box"></div>'
  },
  4: {
    title: "04. 6 Digits to 3",
    desc: "Repeat 3-digit number twice; divide by 7,11,13.",
    html: '<input id="inp4" type="number" placeholder="3 digits (e.g. 123)" max="999"> <button class="action-btn" onclick="runTrick4()">MAGIC</button> <div id="res4" class="result-box"></div>'
  },
  5: {
    title: "05. The 11 Rule",
    desc: "Short mental trick for multiplying by 11.",
    html: '<input id="inp5" type="number" placeholder="2 digits"> <button class="action-btn" onclick="runTrick5()">SOLVE</button> <div id="res5" class="result-box"></div>'
  },
  6: {
    title: "06. Memorizing Pi",
    desc: "A word-count trick.",
    html: '<div style="font-size:1.2rem">How(3) I(1) wish(4) I(1) could(5) calculate(9) pi(2)</div><div class="result-box" style="text-align:center">3.141592</div>'
  },
  7: {
    title: "07. Magic Digits",
    desc: "Play with 9,111,1001 and division by 7",
    html: '<input id="inp7" type="number" min="1" max="6" placeholder="1-6"> <button class="action-btn" onclick="runTrick7()">GO</button> <div id="res7" class="result-box"></div>'
  },
  8: {
    title: "08. Large Multiply",
    desc: "Handy method using distance from 100.",
    html: '<input id="inp8a" type="number" placeholder="96" style="width:85px"> x <input id="inp8b" type="number" placeholder="97" style="width:85px"> <button class="action-btn" onclick="runTrick8()">CALC</button> <div id="res8" class="result-box"></div>'
  },
  9: {
    title: "09. Divisibility",
    desc: "Check a few basics fast.",
    html: '<input id="inp9" type="number" placeholder="Number"> <button class="action-btn" onclick="runTrick9()">CHECK</button> <div id="res9" class="result-box"></div>'
  },
  10: {
    title: "10. Finger Math (9s)",
    desc: "Fold finger trick for 9s.",
    html: '<input id="inp10" type="range" min="1" max="10" value="1" style="width:100%" oninput="runTrick10()"> <div id="hands10" class="finger-visual" style="text-align:center"></div> <div id="res10" class="result-box" style="text-align:center"></div>'
  }
};
function buildMenu() {
  var menu = document.getElementById('menuBtns');
  for (var k = 1; k <= 10; k++) {
    var btn = document.createElement('button');
    btn.textContent = (k < 10 ? '0' + k : k) + '. ' + contentData[k].title.split('. ')[1];
    (function(i){
      btn.addEventListener('click', function(){ loadScene(i); });
    })(k);
    if (k === 1) btn.classList.add('active');
    menu.appendChild(btn);
  }
}
buildMenu();
document.getElementById('enterBtn').addEventListener('click', function(){
  document.getElementById('landing-page').style.opacity = '0';
  setTimeout(function(){
    document.getElementById('landing-page').style.display = 'none';
    var app = document.getElementById('app-interface');
    app.classList.remove('hidden');
    setTimeout(function(){ app.style.opacity = '1'; }, 60);
    loadScene(1);
  }, 700);
});
function loadScene(id) {
  // set active sidebar button
  var btns = document.querySelectorAll('.scroll-menu button');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  if (btns[id-1]) btns[id-1].classList.add('active');

  var stage = document.getElementById('stage');
  var data = contentData[id];
  stage.innerHTML = '<div class="card">' +
      '<h2>' + data.title + '</h2>' +
      '<div class="description">' + data.desc + '</div>' +
      '<div class="interaction-zone">' + data.html + '</div>' +
    '</div>';
  if (id === 10) {
    // slight delay so DOM available
    setTimeout(function(){ runTrick10(); }, 30);
  }
}
function runTrick1() {
  var n = parseInt(document.getElementById('inp1').value, 10);
  var out = document.getElementById('res1');
  if (!n && n !== 0) { out.innerHTML = 'Enter a number'; return; }
  if (n % 2 !== 0) { out.innerHTML = 'Must be Even'; return; }
  out.innerHTML = '<span class="highlight">6 x ' + n + ' = ' + (6 * n) + '</span> (Ends in ' + (n % 10) + ')';
}
function runTrick2() {
  var n = parseInt(document.getElementById('inp2').value, 10) || 0;
  var step1 = n * 3;
  var step2 = step1 + 6;
  var step3 = step2 / 3;
  var step4 = step3 - n;
  document.getElementById('res2').innerHTML =
    '1. ' + step1 + '<br>2. +6 = ' + step2 + '<br>3. /3 = ' + step3 + '<br>4. -' + n + ' = <span class="highlight">' + step4 + '</span>';
}
function runTrick3() {
  var n = parseInt(document.getElementById('inp3').value, 10);
  // human rewrite: compute digit sum explicitly for clarity
  var s = 0;
  var tmp = n;
  while (tmp > 0) { s += (tmp % 10); tmp = Math.floor(tmp / 10); }
  var res = (n / s) || 0;
  document.getElementById('res3').innerHTML = 'Sum of digits: ' + s + '<br>' + n + ' ÷ ' + s + ' = <span class="highlight">' + res + '</span>';
}
function runTrick4() {
  var n = document.getElementById('inp4').value + '';
  if (n.length !== 3) { document.getElementById('res4').innerHTML = 'Enter 3 digits'; return; }
  var big = parseInt(n + n, 10);
  var divided = big / 7 / 11 / 13;
  document.getElementById('res4').innerHTML = big + ' ÷ 7 ÷ 11 ÷ 13 = <span class="highlight">' + divided + '</span>';
}
function runTrick5() {
  var n = (document.getElementById('inp5').value || '') + '';
  if (n.length !== 2) { document.getElementById('res5').innerHTML = 'Enter two digits'; return; }
  var a = parseInt(n[0],10), b = parseInt(n[1],10);
  var middle = a + b;
  document.getElementById('res5').innerHTML = a + ' _ ' + b + ' -> middle is ' + middle + '<br>Result: <span class="highlight">' + (parseInt(n,10) * 11) + '</span>';
}
function runTrick7() {
  var n = parseInt(document.getElementById('inp7').value, 10) || 0;
  var result = (n * 9 * 111 * 1001) / 7;
  document.getElementById('res7').innerHTML = 'Result: <span class="highlight">' + result + '</span>';
}
function runTrick8() {
  var a = parseInt(document.getElementById('inp8a').value, 10) || 0;
  var b = parseInt(document.getElementById('inp8b').value, 10) || 0;
  var d1 = 100 - a, d2 = 100 - b;
  var left = 100 - (d1 + d2);
  var right = d1 * d2;
  var final = a * b; // simply multiply (human: trust browser)
  document.getElementById('res8').innerHTML = 'Part 1: 100-(' + d1 + '+' + d2 + ') = ' + left + '<br>Part 2: ' + d1 + 'x' + d2 + ' = ' + right + '<br>Result: <span class="highlight">' + final + '</span>';
}
function runTrick9() {
  var n = parseInt(document.getElementById('inp9').value, 10);
  if (!n && n !== 0) { document.getElementById('res9').innerHTML = 'Type a number'; return; }
  var s = '';
  if (n % 2 === 0) s += 'Divisible by 2<br>';
  if (n % 3 === 0) s += 'Divisible by 3<br>';
  if (n % 5 === 0) s += 'Divisible by 5<br>';
  document.getElementById('res9').innerHTML = s || 'Not divisible by 2, 3 or 5';
}
function runTrick10() {
  var n = parseInt(document.getElementById('inp10').value, 10) || 1;
  var html = '';
  for (var i = 1; i <= 10; i++) {
    if (i === n) html += '<i class="far fa-hand-point-down" style="color:#666"></i> ';
    else html += '<i class="fas fa-hand-paper" style="color:cyan"></i> ';
  }
  document.getElementById('hands10').innerHTML = html;
  document.getElementById('res10').innerHTML = 'Left: ' + (n-1) + ' | Right: ' + (10-n) + ' -> <span class="highlight">' + (9*n) + '</span>';
}
