let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

const h2 = document.getElementById("level-title"); // main heading
const startBtn = document.getElementById("start-btn");

// Start Game
startBtn.addEventListener("click", () => {
  if (!started) {
    started = true;
    startBtn.style.display = "none";
    level = 0;
    gameseq = [];
    levelup();
  }
});

// Flash for Simon Says sequence
function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

// Flash for user click
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 300);
}

// Level Up
function levelup() {
  userseq = [];
  level++;
  h2.textContent = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let color = btns[randomIdx];
  let randbtn = document.getElementById(color);
  gameseq.push(color);
  gameflash(randbtn);
}

// User answer check
function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    // Game Over message with score
    h2.innerHTML = `❌ Game Over!<br><b>Your Score: ${level - 1}</b><br>Click "Start" to try again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 300);
    reset();
  }
}

// Button Press Handler
function btnpress() {
  if (!started) return;
  let btn = this;
  let color = btn.getAttribute("id");
  userseq.push(color);
  userflash(btn);
  checkAns(userseq.length - 1);
}

// Bind all buttons
let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => {
  btn.addEventListener("click", btnpress);
});

// Reset
function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
  startBtn.style.display = "inline-block";
}

// Username
document.getElementById("username-display").textContent =
  localStorage.getItem("username") || "Player";

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "main.html";
}

// Terms and Help
function openTerms() {
  window.location.href = "terms.html";
}

function openHelp() {
  window.location.href = "contact.html";
}
