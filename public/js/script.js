const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function canva() {
  ctx.fillStyle = "#010b2f";
  ctx.strokeStyle = "#010b2f";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
}
// if (!canvas.getContext) {
//   return;
// }
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

// // tronco vertical
// ctx.beginPath();
// ctx.moveTo(30, 10);
// ctx.lineTo(30, 300);
// ctx.stroke();
// // tronco horizontal
// ctx.beginPath();
// ctx.moveTo(10, 10);
// ctx.lineTo(220, 10);
// ctx.stroke();
// // tronco angular
// ctx.beginPath();
// ctx.moveTo(30, 60);
// ctx.lineTo(80, 10);
// ctx.stroke();
// //  corda
// ctx.beginPath();
// ctx.moveTo(200, 10);
// ctx.lineTo(200, 50);
// ctx.stroke();
// Body
// ctx.beginPath();
// ctx.moveTo(200, 100);
// ctx.lineTo(200, 200);
// ctx.stroke();

// Arm Right
// ctx.beginPath();
// ctx.moveTo(200, 120);
// ctx.lineTo(250, 150);
// ctx.stroke();

// // Arm Left
// ctx.beginPath();
// ctx.moveTo(200, 120);
// ctx.lineTo(150, 150);
// ctx.stroke();
// Leg Right
// ctx.beginPath();
// ctx.moveTo(200, 200);
// ctx.lineTo(170, 260);
// ctx.stroke();

// // Leg Left
// ctx.beginPath();
// ctx.moveTo(200, 200);
// ctx.lineTo(230, 260);
// ctx.stroke();

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
  document.querySelector("#Animal").onclick = () => {
    localStorage.setItem("id", "Animal");
  };
  document.querySelector("#Time").onclick = () => {
    localStorage.setItem("id", "Time");
  };
  document.querySelector("#Esportes").onclick = () => {
    localStorage.setItem("id", "Esportes");
  };
  document.querySelector("#Aleatorio").onclick = () => {
    localStorage.setItem("id", "Aleatorio");
  };
}
// ------------------- GAME PAGE ---------------------------------------------
init();

function init() {
  if (document.body.id === "game") {
    const categoryText = document.getElementById("categoryLabel");
    const wordText = document.getElementById("word");
    const buttonVerify = document.getElementById("button-addon2");
    const inputValue = document.getElementById("inputLetter");
    const triesNumber = document.getElementById("triesNumber");
    const triesLetters = document.getElementById("tries");
    const restartBtn = document.getElementById("restart");
    const categoryChoice = localStorage.getItem("id");

    categoryText.innerHTML = categoryChoice;

    canva();

    triesLetters.innerHTML = "";

    let categoryFiltered = Words.filter(
      (word) => word.category === categoryChoice
    );
    let randomWord =
      categoryFiltered[Math.floor(Math.random() * categoryFiltered.length)]
        .word;
    // console.log(randomWord);

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
    let winCheck = "";

    let tries = 10;
    triesNumber.innerHTML = `Restam ${tries} tentativas`;
    triesLetters, (innerHTML = "");

    buttonVerify.onclick = () => {
      const answerArray = randomWord.split("");
      let status = false;

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
        console.log(status);
        triesLetters.innerHTML += inputValue.value.toLowerCase();
        tries--;

        drawArray[tries]();

        triesNumber.innerHTML = `Restam ${tries} tentativas`;
      }
      if (tries == 0) {
        // se perder todas as chances
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
    inputValue.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        buttonVerify.click();
      }
    });

    restartBtn.addEventListener("click", init);
  }
}
