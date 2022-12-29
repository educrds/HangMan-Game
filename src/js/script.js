import words from '../../assets/data/choices.js';

// -------------------  CANVAS SETUP ---------------------------------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const wordText = document.getElementById('word');
const category = document.querySelector('.category');
const triesLetters = document.getElementById('tries');
const restartBtn = document.getElementById('restart');
const inputValue = document.getElementById('inputLetter');
const triesNumber = document.getElementById('triesNumber');
const buttonVerify = document.getElementById('button-addon2');

const categoriesButton = document.querySelectorAll('.btnCategories');

// -------------------  Local Storage Choice ---------------------------------------------
const categoryChoice = localStorage.getItem('id');

// ------------------- STORING CHOICE IN LOCAL STORAGE ---------------------------------------------
if (document.body.id === 'initial-page') {
  categoriesButton.forEach((btn) =>
    btn.addEventListener('click', (e) =>
      localStorage.setItem('id', e.target.innerHTML)
    )
  );
}

init();

// ------------------- BEGIN PAGE ---------------------------------------------
function init() {
  inputValue.focus();
  ctx.clearRect(0, 0, 300, 300);
  canva();

  let tries = 10;
  let winCheck = '';

  triesNumber.textContent = `Restam ${tries} tentativas`;
  category.textContent = categoryChoice;

  if (document.body.id === 'game') {
    let categoryFiltered = words.filter((word) => word.category === categoryChoice);
    let randomWord =
      categoryFiltered[Math.floor(Math.random() * categoryFiltered.length)].word;

    let wordDisplay = [];

    function generateAnswerDisplay(word) {
      let wordArray = word.split('');
      for (let i = 0; i < randomWord.length; i++) {
        wordDisplay.push('_');
      }
      return wordDisplay.join(' ');
    }

    wordText.innerHTML = generateAnswerDisplay(randomWord);
    triesLetters.innerHTML = '';

    inputValue.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        e.stopImmediatePropagation();
        buttonVerify.click();
      }
    });

    buttonVerify.onclick = () => {
      let status = false;
      const answerArray = randomWord.split('');
      for (let j = 0; j < randomWord.length; j++) {
        if (inputValue.value.toLowerCase() === answerArray[j]) {
          wordDisplay[j] = inputValue.value.toLowerCase();
          wordText.innerHTML = wordDisplay.join(' ');
          winCheck = wordDisplay.join('');
          status = true;
        }
      }
      // Wrong Attempt
      if (!status) {
        triesLetters.innerHTML += inputValue.value.toLowerCase();
        tries--;
        drawArray[tries]();
        triesNumber.innerHTML = `Restam ${tries} tentativas`;
      }
      // Attempt Ended
      if (tries == 0) {
        triesNumber.innerHTML = '';
        wordText.innerHTML = 'Você perdeu :(';
        triesNumber.innerHTML = `A palavra era ${randomWord}`;
      }
      // Right Word
      if (winCheck === randomWord) {
        wordText.innerHTML = 'Ihuul!! Você ganhou :D';
        triesNumber.innerHTML = '';
      }

      inputValue.value = '';
    };
  }
}
restartBtn.addEventListener('click', () => init());

function canva() {
  ctx.fillStyle = '#010b2f';
  ctx.strokeStyle = '#010b2f';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
}
function draw(fromX, fromY, toX, toY) {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

const drawArray = [
  () => draw(200, 200, 170, 260),
  () => draw(200, 200, 230, 260),
  () => draw(200, 100, 200, 200),
  () => draw(200, 120, 150, 150),
  () => draw(200, 120, 250, 150),
  () => {
    ctx.beginPath();
    ctx.arc(200, 80, 30, 0, Math.PI * 2, true);
    ctx.fill();
  },
  () => draw(200, 10, 200, 50),
  () => draw(10, 10, 220, 10),
  () => draw(30, 60, 80, 10),
  () => draw(30, 10, 30, 300),
];
