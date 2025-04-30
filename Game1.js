let randomNumber =Math.floor(Math.random() * (100 - 1) + 1);

let guesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowoOrHi = document.querySelector(".lowOrHi");

let guessSubmit = document.querySelector(".guessSubmit");
let guessField = document.querySelector(".gussField");

let guessCount = 1;
let restButton;

function flashText() {
    let isVisible = true;
    const intervalID = setInterval(() => {
        if(isVisible){
            lastResult.style.visibility = 'hidden';
        }else {
            lastResult.style.visibility = 'visible'
        }
        isVisible = !isVisible
    }, 500)

    setTimeout(() => {
        clearInterval(intervalID);
        lastResult.style.visibility = 'visible'
    }, 2000);
}

function checkGuess() {
  let userGuess = Number(guessField.value);
  console.log("User guessed: " + userGuess); 
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses:";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!"
    lastResult.style.backgroundColor = "green";

    flashText()
    lowoOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "white";

    if (userGuess < randomNumber) {
      lowoOrHi.textContent = "Last guess was too low!";
    
    } else {
      lowoOrHi.textContent = "Last guess was too high!";

    }
  }
  guessCount++;
  guessField.value = "";
  guessField.focus();
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
  restButton.textContent = "Start new game";
  restButton.classList.add("myButton");
  document.querySelector(".resultParas").appendChild(restButton);
  restButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;
  let resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  restButton.parentNode.removeChild(restButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";


  randomNumber = Math.floor(Math.random() * 100) + 1;
}
