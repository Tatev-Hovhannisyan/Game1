let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowoOrHi = document.querySelector(".lowOrHi");

let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".gussField");

let guessCount = 1;
let restButton;


// --- Меню управления ---
const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const settingsScreen = document.getElementById('settingsScreen');

const playBtn = document.getElementById('playBtn');
const settingsBtn = document.getElementById('settingsBtn');
const backMenu = document.getElementById('backMenu');
const backMenuFromSettings = document.getElementById('backMenuFromSettings');

playBtn.addEventListener('click', () => {
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
});

settingsBtn.addEventListener('click', () => {
    menuScreen.style.display = 'none';
    settingsScreen.style.display = 'flex';
});

backMenu.addEventListener('click', () => {
    gameScreen.style.display = 'none';
    menuScreen.style.display = 'flex';
});

backMenuFromSettings.addEventListener('click', () => {
    settingsScreen.style.display = 'none';
    menuScreen.style.display = 'flex';
});


function checkGuess() {
  let userGuess = Number(guessField.value);

  // ✅ Проверка на валидность
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    lastResult.textContent = "⚠️ Enter a number from 1 to 100!";
    lastResult.className = "lastResult lose"; // обычный красный фон
    lowoOrHi.textContent = "";
    guessField.value = "";
    guessField.focus();
    return;
  }

  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    showWin();
    setGameOver();
  } else if (guessCount === 10) {
    showGameOver();
    setGameOver();
  } else {
    showLose(userGuess);
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// 🎉 Победа
function showWin() {
  lastResult.textContent = "🎉 You guessed it right!";
  lastResult.className = "lastResult win"; // блестящий фон
  lowoOrHi.textContent = "";
}

// ❌ Обычная ошибка
function showLose(userGuess) {
  lastResult.textContent = "Wrong!";
  lastResult.className = "lastResult lose"; // красный фон без анимации

  if (userGuess < randomNumber) {
    lowoOrHi.textContent = "📉 Too low!";
  } else {
    lowoOrHi.textContent = "📈 Too high!";
  }
}

// 💀 Проигрыш
function showGameOver() {
  lastResult.textContent = "💀 GAME OVER!";
  lastResult.className = "lastResult gameover"; // мигающий красный фон
  lowoOrHi.textContent = "";
}

guessSubmit.addEventListener("click", checkGuess);

document.addEventListener("keydown", function(event){
  if(event.key === "Enter"){
      checkGuess()
  }
})

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  restButton = document.createElement("button");
  restButton.textContent = " Start new game";
  restButton.classList.add("myButton");
  document.querySelector(".resultParas").appendChild(restButton);
  restButton.addEventListener("click", resetGame);
}

// 🔄 Сброс игры
function resetGame() {
  guessCount = 1;

  // Сброс текста
  document.querySelectorAll(".resultParas p").forEach(p => p.textContent = "");

  // Сброс классов
  lastResult.className = "lastResult";

  // Удаление кнопки рестарта
  if (restButton) restButton.remove();

  // Разблокировка полей
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  // Новый рандом
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
