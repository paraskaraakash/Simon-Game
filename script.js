let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.querySelector("#start-btn").addEventListener("click", () => {
  if (!started) {
    started = true;
    levelup();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 300);
}

function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomIdx = Math.floor(Math.random() * 4);
  let color = btns[randomIdx];
  let randbtn = document.querySelector(`.${color}`);
  gameseq.push(color);
  gameflash(randbtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score: <b>${level}</b><br>Click "Start Game" to try again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 300);
    reset();
  }
}

function btnpress() {
  let btn = this;
  let color = btn.getAttribute("id");
  userseq.push(color);
  userflash(btn);
  checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => {
  btn.addEventListener("click", btnpress);
});

function reset() {
  gameseq = [];
  userseq = [];
  started = false;
  level = 0;
}

// Footer page open (you can later create these .html pages)
function openTerms() {
  window.location.href = "terms.html";
}

function openHelp() {
  window.location.href = "contact.html";
}
