let headerP = document.querySelector(".header-p");
let timerHeading = document.querySelector("#timer-h");
let mainContainer = document.querySelector("#main-container");
const cards = document.querySelectorAll(".cell");
const messageContainer = document.querySelector(".message-container");
const playButton = document.querySelector("#play-button");
const flipCount = document.querySelector("#flip-count");
let board = document.querySelector("#board");
const fourByThreeBtn = document.querySelector("#four-by-three-btn");
const fourByTwoBtn = document.querySelector("#four-by-two-btn");
const threeByTwoBtn = document.querySelector("#three-by-two-btn");
const twoByTwoBtn = document.querySelector("#two-by-two-btn");
const jsDiv1 = document.querySelector(".js-div1");
const jsDiv2 = document.querySelector(".js-div2");
const cssDiv1 = document.querySelector(".css-div1");
const cssDiv2 = document.querySelector(".css-div2");
const linuxDiv1 = document.querySelector(".linux-div1");
const linuxDiv2 = document.querySelector(".linux-div2");
const reactDiv1 = document.querySelector(".react-div1");
const reactDiv2 = document.querySelector(".react-div2");
const githubDiv1 = document.querySelector(".github-div1");
const githubDiv2 = document.querySelector(".github-div2");
const htmlDiv1 = document.querySelector(".html-div1");
const htmlDiv2 = document.querySelector(".html-div2");
const boardSizesDiv = document.querySelector("#board-sizes-div");
const timer = document.querySelector("#timer");
let hr = 0;
let min = 0;
let sec = 0;
let stopTime = true;
let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCardsArr = [];
let count = 0;
let fourByTwoClicked = false;
let threeByTwoClicked = false;
let twoByTwoClicked = false;

function startTimer() {
    startTimer = function(){};
    if(stopTime = true) {
        stopTime = false;
        timerCycle();
    }
}

function stopTimer() {
    if(stopTime == false) {
        stopTime = true;
    }
}

function timerCycle() {
    if(stopTime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if(sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if(min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }
        if(sec < 10 || sec == 0) {
            sec = "0" + sec;
        }
        if(min < 10 || min == 0) {
            min = "0" + min;
        }
        if(hr < 10 || hr == 0) {
            hr = "0" + hr;
        }
        timer.innerHTML = `${hr}:${min}:${sec}`;
        setTimeout(function(){timerCycle()}, 1000);
    }
}

function resetTimer() {
    timer.innerHTML = "00:00:00";
}

function hideBoardSizeButtons() {
    boardSizesDiv.style.visibility = "hidden";
}

function flipCard() {
    startTimer();
    hideBoardSizeButtons();
    if(lockBoard) return false;
    if(this == firstCard) return true;

    this.classList.add("flip");

    if(!cardFlipped) {
        cardFlipped = true;
        count += 1;
        firstCard = this;
    } else {
        cardFlipped = false;
        secondCard = this;
        checkIfMatches();
    }
}

function checkIfMatches() {
    let isMatch = firstCard.dataset.cell == secondCard.dataset.cell;

    if(isMatch) {
        matchedCardsArr.push(`${firstCard.dataset.cell}`);
        freezeCards();
    } else {
        unflipCards();
    }
}

function freezeCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();

    if(matchedCardsArr.length == 6) {
        showMessage();
    }

    if(matchedCardsArr.length == 4 && fourByTwoClicked == true) {
        showMessage();
    }

    if(matchedCardsArr.length == 3 && threeByTwoClicked == true) {
        showMessage();
    }

    if(matchedCardsArr.length == 2 && twoByTwoClicked == true) {
        showMessage();
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    cardFlipped = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function reload() {
    messageContainer.style.display = "none";
    resetTimer();
    location.reload();
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function showMessage() {
    messageContainer.style.display = "flex";
    flipCount.innerHTML = count * 2;
    stopTimer();
}

function showFourByThreeBoard() {
    board.style.display = "grid";
    boardSizesDiv.style.display = "none";
    headerP.innerHTML = "Click a tile then match it";
    board.style.paddingLeft = "30%";
    board.style.paddingRight = "30%";
    timerHeading.style.visibility = "visible";
}

function hideHTMLDivs() {
    htmlDiv1.style.display = "none";
    htmlDiv2.style.display = "none";
}

function hideJSDivs() {
    jsDiv1.style.display = "none";
    jsDiv2.style.display = "none";
}

function hideCSSDivs() {
    cssDiv1.style.display = "none";
    cssDiv2.style.display = "none";
}

function hideLinuxDivs() {
    linuxDiv1.style.display = "none";
    linuxDiv2.style.display = "none";
}

function hideReactDivs() {
    reactDiv1.style.display = "none";
    reactDiv2.style.display = "none";
}

function hideGithubDivs() {
    githubDiv1.style.display = "none";
    githubDiv2.style.display = "none";
}

function showFourByTwoBoard() {
    board.style.display = "grid";
    boardSizesDiv.style.display = "none";
    showAllCards();
    fourByTwoClicked = true;
    hideHTMLDivs();
    hideJSDivs();
    board.style.gridTemplateColumns = "repeat(4, 30%)";
    boardSizesDiv.style.marginLeft = "9rem";
    messageContainer.style.left = "2rem";
    headerP.innerHTML = "Click a tile then match it";
    board.style.gridRowGap = "1.4em";
    board.style.paddingLeft = "28%";
    board.style.paddingRight = "35%";
    timerHeading.style.visibility = "visible";
}

function showThreeByTwoBoard() {
    board.style.display = "grid";
    boardSizesDiv.style.display = "none";
    showAllCards();
    threeByTwoClicked = true;
    hideHTMLDivs();
    hideJSDivs();
    hideCSSDivs();
    board.style.gridTemplateColumns = "repeat(3, 30%)";
    board.style.gridColumnGap = "0.9em";
    board.style.gridRowGap = "0.8em";
    headerP.innerHTML = "Click a tile then match it";
    board.style.paddingLeft = "34%";
    board.style.paddingRight = "34%";
    timerHeading.style.visibility = "visible";
}

function showTwoByTwoBoard() {
    board.style.display = "grid";
    boardSizesDiv.style.display = "none";
    twoByTwoClicked = true;
    showThreeByTwoBoard();
    hideReactDivs();
    board.style.gridTemplateColumns = "repeat(2, 50%)";
    headerP.innerHTML = "Click a tile then match it";
    board.style.gridColumnGap = "0.6em";
    board.style.gridRowGap = "0.8em";
    board.style.paddingLeft = "40%";
    board.style.paddingRight = "40%";
    timerHeading.style.visibility = "visible";
}

function showAllCards() {
    jsDiv1.style.display = "flex";
    jsDiv2.style.display = "flex";
    cssDiv1.style.display = "flex";
    cssDiv2.style.display = "flex";
    linuxDiv1.style.display = "flex";
    linuxDiv2.style.display = "flex";
    reactDiv1.style.display = "flex";
    reactDiv2.style.display = "flex";
    githubDiv1.style.display = "flex";
    githubDiv2.style.display = "flex";
    htmlDiv1.style.display = "flex";
    htmlDiv2.style.display = "flex";
}

cards.forEach(card => card.addEventListener("click", flipCard));
playButton.addEventListener("click", reload);
fourByThreeBtn.addEventListener("click", showFourByThreeBoard);
fourByTwoBtn.addEventListener("click", showFourByTwoBoard);
threeByTwoBtn.addEventListener("click", showThreeByTwoBoard);
twoByTwoBtn.addEventListener("click", showTwoByTwoBoard);

module.exports = {flipCard, showFourByTwoBoard, showThreeByTwoBoard};