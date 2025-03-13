let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}


function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    //random btn chooose
    let randomIdx = Math.floor(Math.random() * 3);
    let rancolor = btns[randomIdx];
    let randbtn = document.querySelector(`.${rancolor}`);
    // console.log(rancolor);
    // console.log(randbtn)
    // console.log(randomIdx)
    gameseq.push(rancolor);
    console.log(gameseq)
    gameflash(randbtn);
}

function checkAns(idx) {

    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        h2.innerHTML = `Game over! your Score Was <b>${level}</br> press any key to start.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 100);

        reset();
    }
}



function btnpress() {

    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length - 1);
}


let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}