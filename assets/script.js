//Declared variables and assigned each to an element within the html document
var startButton = document.getElementById("start-button");
var wordDisplay = document.getElementById("word-display");
var gameMessage = document.getElementById("game-message");
var timer = document.getElementById("time-left");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");

//Will randomly select a word from the wordArr
function generateWord(){
    var wordArr = ["California", "Dragon", "Android"]
    var randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    console.log(randomWord);
    wordDisplay.textContent = wordArr[randomWord];
}

// Will start a countdown
function countdown() {
    //Starts countdown from 90 seconds
    //Will decrement by one second until it reaches 0
    var timeLeft = 90;
  
    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else {
        timer.textContent = '0';
        clearInterval(timeInterval);
      }
    }, 1000);
  }

//Will keep track of the users letter selections
function userInput(){
    var userSelection;
}

//Will initiate the game
function startGame(){
    generateWord();
    countdown();
}

//Will keep count of total wins
function totalWins(){
    wins.textContent = won;
}

//Will keep count of total losses
function totalLosses(){
    losses.textContent = losses;
}

//Will retain the last score within local storage
function saveLastScore(){
    var lastScore = {
        wins: wins.value,
        losses: losses.value
    };

    localStorage.setItem("lastScore", JSON.stringify(lastScore));
}

//Will render last score when user return to webpage
function renderLastScore(){
    var lastScore = JSON.parse(localStorage.getItem("lastScore"));

    if (lastScore !== null){
        document.getElementById("wins");
        document.getElementById("losses");
    } else{
        return;
    }
}

// Will start game when user clicks start button
startButton.addEventListener("click", function() {
    startGame();
});

//Will recall local storage for last score upon user refreshing/returning to page
/*.addEventListener("refresh", function(event) {
    event.preventDefault();
    saveLastScore();
    renderLastScore();
});


function init(){
    renderLastScore();
}
init();*/