let tries;
let wordDisplay;
let winCheck;
// -------------------  CANVAS SETUP ---------------------------------------------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// ------------------- ID`s ------------------------------------------------------
const categoryText = document.getElementById("categoryLabel");
const wordText = document.getElementById("word");
const buttonVerify = document.getElementById("button-addon2");
const inputValue = document.getElementById("inputLetter");
const triesNumber = document.getElementById("triesNumber");
const triesLetters = document.getElementById("tries");
const restartBtn = document.getElementById("restart");
const categoryChoice = localStorage.getItem("id");

const Words = [
  {
    word: "leao",
    category: "Animal",
  },
  {
    word: "tigre",
    category: "Animal",
  },
  {
    word: "jacare",
    category: "Animal",
  },
  {
    word: "abelha",
    category: "Animal",
  },
  {
    word: "foca",
    category: "Animal",
  },
  {
    word: "elefante",
    category: "Animal",
  },
  {
    word: "jaguar",
    category: "Animal",
  },
  {
    word: "hiena",
    category: "Animal",
  },
  {
    word: "cachorro",
    category: "Animal",
  },
  {
    word: "raposa",
    category: "Animal",
  },
  {
    word: "onça",
    category: "Animal",
  },
  {
    word: "fluminense",
    category: "Time",
  },
  {
    word: "gremio",
    category: "Time",
  },
  {
    word: "cruzeiro",
    category: "Time",
  },
  {
    word: "vasco",
    category: "Time",
  },
  {
    word: "botafogo",
    category: "Time",
  },
  {
    word: "flamengo",
    category: "Time",
  },
  {
    word: "palmeiras",
    category: "Time",
  },
  {
    word: "judo",
    category: "Esportes",
  },
  {
    word: "karate",
    category: "Esportes",
  },
  {
    word: "futebol",
    category: "Esportes",
  },
  {
    word: "nataçao",
    category: "Esportes",
  },
  {
    word: "basquete",
    category: "Esportes",
  },
];
// ------------------- BEGIN PAGE ---------------------------------------------
if (document.body.id === "start") {
  document.querySelector("#btnAnimal").onclick = () => {
    localStorage.setItem("id", "Animal");
  };
  document.querySelector("#btnTime").onclick = () => {
    localStorage.setItem("id", "Time");
  };
  document.querySelector("#btnEsportes").onclick = () => {
    localStorage.setItem("id", "Esportes");
  };
}

init();

function init() {
  inputValue.focus();
  ctx.clearRect(0, 0, 300, 300);
  canva();
  tries = 10;
  winCheck = "";
  triesLetters.innerHTML = "";
  triesNumber.innerHTML = `Restam ${tries} tentativas`;
  categoryText.innerHTML = categoryChoice;
  let status = false;

  // ------------------- GAME PAGE ---------------------------------------------
  if (document.body.id === "game") {
    let categoryFiltered = Words.filter(
      (word) => word.category === categoryChoice
    );
    let randomWord =
      categoryFiltered[Math.floor(Math.random() * categoryFiltered.length)]
        .word;

    let wordDisplay = [];

    function generateAnswerDisplay(word) {
      let wordArray = word.split("");
      for (let i = 0; i < randomWord.length; i++) {
        if (wordArray[i] !== "-") {
          wordDisplay.push("_");
        }
      }
      return wordDisplay.join(" ");
    }

    wordText.innerHTML = generateAnswerDisplay(randomWord);
    triesLetters, (innerHTML = "");

    inputValue.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.key === "Enter") {
        buttonVerify.click();
      }
    });
      buttonVerify.onclick = () => {
        const answerArray = randomWord.split("");
        status = false;
        for (let j = 0; j < randomWord.length; j++) {
          if (inputValue.value.toLowerCase() === answerArray[j]) {
            wordDisplay[j] = inputValue.value.toLowerCase();
            wordText.innerHTML = wordDisplay.join(" ");
            winCheck = wordDisplay.join("");
            console.log(winCheck);
            status = true;
          }
        }
        if (!status) {
          triesLetters.innerHTML += inputValue.value.toLowerCase();
          tries--;
          drawArray[tries]();
          triesNumber.innerHTML = `Restam ${tries} tentativas`;
        }
        if (tries == 0) {
          triesNumber.innerHTML = "";
          wordText.innerHTML = "Você perdeu :(";
          triesNumber.innerHTML = `A palavra era ${randomWord}`;
        }
        if (winCheck === randomWord) {
          wordText.innerHTML = "Ihuul!! Você ganhou :D";
          triesNumber.innerHTML = "";
        }

        inputValue.value = "";
      };

    restartBtn.addEventListener("click", () => {
      init();
    });
  }
}
function canva() {
  ctx.fillStyle = "#010b2f";
  ctx.strokeStyle = "#010b2f";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
}
function head() {
  ctx.beginPath();
  ctx.arc(200, 80, 30, 0, Math.PI * 2, true);
  ctx.fill();
}
function draw(fromX, fromY, toX, toY) {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}
function verticalTrunk() {
  draw(30, 10, 30, 300);
}
function horizontalTrunk() {
  draw(10, 10, 220, 10);
}
function diagonalTrunk() {
  draw(30, 60, 80, 10);
}
function rope() {
  draw(200, 10, 200, 50);
}
function body() {
  draw(200, 100, 200, 200);
}
function armRight() {
  draw(200, 120, 250, 150);
}
function armLeft() {
  draw(200, 120, 150, 150);
}
function legRight() {
  draw(200, 200, 170, 260);
}
function legLeft() {
  draw(200, 200, 230, 260);
}

var drawArray = [
  legRight,
  legLeft,
  body,
  armLeft,
  armRight,
  head,
  rope,
  horizontalTrunk,
  diagonalTrunk,
  verticalTrunk,
];
