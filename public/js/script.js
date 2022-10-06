function draw() {
  const canvas = document.querySelector("#canvas");

  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");

  // set line stroke and line width
  ctx.fillStyle = "#010b2f";
  ctx.strokeStyle = "#010b2f";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  // tronco vertical
  ctx.beginPath();
  ctx.moveTo(30, 10);
  ctx.lineTo(30, 300);
  ctx.stroke();

  // tronco horizontal
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(220, 10);
  ctx.stroke();

  // tronco angular
  ctx.beginPath();
  ctx.moveTo(30, 60);
  ctx.lineTo(80, 10);
  ctx.stroke();

  //  corda
  ctx.beginPath();
  ctx.moveTo(200, 10);
  ctx.lineTo(200, 50);
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.arc(200, 80, 30, 0, Math.PI * 2, true);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(200, 200);
  ctx.stroke();

  // Arm Right
  ctx.beginPath();
  ctx.moveTo(200, 120);
  ctx.lineTo(250, 150);
  ctx.stroke();

  // Arm Left
  ctx.beginPath();
  ctx.moveTo(200, 120);
  ctx.lineTo(150, 150);
  ctx.stroke();

  // Leg Right
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(170, 260);
  ctx.stroke();

  // Leg Left
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(230, 260);
  ctx.stroke();
}
draw();

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
if (document.body.id === "game") {
  const categoryText = document.getElementById("categoryLabel");
  const wordText = document.getElementById("word");
  const buttonVerify = document.getElementById("button-addon2");
  const inputValue = document.getElementById("inputLetter");
  const triesNumber = document.getElementById("triesNumber");
  const triesLetters = document.getElementById("tries");
  const categoryChoice = localStorage.getItem("id");

  categoryText.innerHTML = categoryChoice;

  if (categoryChoice !== "Aleatorio") {
    let categoryFiltered = Words.filter(
      (word) => word.category === categoryChoice
    );
    let randomWord =
      categoryFiltered[Math.floor(Math.random() * categoryFiltered.length)]
        .word;
    console.log(categoryFiltered);
    console.log(randomWord);
    console.log(randomWord.length);

    let wordDisplay = [];

    function generateAnswerDisplay(word) {
      let wordArray = word.split("");
      //console.log(wordArray);
      for (let i = 0; i < randomWord.length; i++) {
        if (wordArray[i] !== "-") {
          wordDisplay.push("_");
        } else {
          wordDisplay.push("-");
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
        triesNumber.innerHTML = `Restam ${tries} tentativas`;
      }
      if (tries == 0) {
        // se perder todas as chances
        triesNumber.innerHTML = "";
        wordText.innerHTML = "Você perdeu :(";
        triesNumber.innerHTML = `A palavra era ${randomWord}`
      }
      if (winCheck === randomWord) {
        wordText.innerHTML = "Ihuul!! Você ganhou :D";
        triesNumber.innerHTML = ""
      }

      inputValue.value = "";
    };
  }

  inputValue.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonVerify.click();
    }
  });
}
