//Declared variables and assigned each to an element within the html document
var startButton = document.getElementById("start-button");
var wordDisplay = document.getElementById("word-display");
var gameMessage = document.getElementById("game-message");
var timer = document.getElementById("time-left");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");

//Will randomly select a word from the wordArr
var randomWord = "";
function generateWord(){
    var wordArr = ["California", "Dragon", "Android"];
    randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    console.log(randomWord);
    return randomWord;
}

var underscoredWord = "";
function hideWord(){
    for(var i = 0; i < randomWord.length; i++){
        randomWord.charAt(i) = "_ ";
        console.log(randomWord.charAt(i));
        underscoredWord = underscoredWord + randomWord.charAt(i);
        console.log(underscoredWord);
    }
    wordDisplay.textContent = underscoredWord;
}

//Will reveal letter if user inputs a letter matching the letters within the word
var word = "";
function userGuess(){
    var userInput = ""
    userInput = prompt("Input a letter");
        for (var i = 0; i < randomWord.length; i++){
            if (userInput == randomWord.charAt(i)){
                for (var j = i; j < randomWord.length; j++){
                    underscoredWord.charAt(j) = userInput;
                    console.log(underscoredWord.charAt(j));
                    word = word + underscoredWord.charAt(j);
                    console.log(word);
                }
            }else {
                underscoredWord.charAt(i) = "_ ";
                word = word + underscoredWord.charAt(i);
                console.log(word);
            }
        }
        console.log(word);
    wordDisplay.textContent = word;
}

// Will start a countdown
//Starts countdown from 10 seconds
var timeLeft = 10;
function countdown() {
    //Will decrement by one second until it reaches 0
    var timeInterval = setInterval(function () {
        if (timeLeft > 1 && word != randomWord) {
            timer.textContent = timeLeft;
            timeLeft--;
        }
        if (timeLeft != 0 && word == randomWord){
            var won = won + 1;
            alert("You Won!!");
        }
        if (timeLeft == 0 && word != randomWord){
            timer.textContent = '0';
            var lost = lost + 1;
            alert("You Lost!!");
            clearInterval(timeInterval);
        }
    }, 1000);
  }

//Will keep track of the users letter selections

//Will initiate the game
function startGame(){
    countdown();
    generateWord();
    hideWord();
}

//Will keep count of total wins
var won = 0;
function totalWins(){
    wins.textContent = won;
}

//Will keep count of total losses
var lost = 0;
function totalLosses(){
    losses.textContent = lost;
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