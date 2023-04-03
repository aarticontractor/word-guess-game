// Defined variables
const startButton = document.getElementById("start-button");
const wordDisplay = document.getElementById("word-display");
const timerDisplay = document.getElementById("time-left");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const gameMessage = document.getElementById("game-message");

let timer;
let word;
let blanks;
let remainingTime;
let wins = localStorage.getItem("wins") || 0;
let losses = localStorage.getItem("losses") || 0;

winsDisplay.textContent = wins;
lossesDisplay.textContent = losses;

const words = [
    "elephant",
    "giraffe",
    "kangaroo",
    "dolphin",
    "cheetah",
    "alligator",
    "penguin",
    "flamingo",
    "octopus",
    "squirrel"
];

// Made function to get random words from the list of array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
// Added a functionality to prefill 2 blanks in the random word and keep remaining blanks empty for user input 
function prefillLetters() {
    const numPrefilled = Math.ceil(word.length / 4);
    let indices = [];

    while (indices.length < numPrefilled) {
        let index = Math.floor(Math.random() * word.length);

        if (!indices.includes(index)) {
            indices.push(index);
            blanks = blanks.slice(0, index) + word[index] + blanks.slice(index + 1);
        }
    }
}
// Added a function to initialize game variables
function startGame() {
    
    word = getRandomWord();
    blanks = "_".repeat(word.length);
    prefillLetters();
    remainingTime = 20; 

    // Resets the display
    wordDisplay.textContent = blanks;
    timerDisplay.textContent = remainingTime;
    gameMessage.textContent = "";

    // Function to start timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    remainingTime--;
    timerDisplay.textContent = remainingTime;

    if (remainingTime <= 0) {
        clearInterval(timer);
        losses++;
        lossesDisplay.textContent = losses;
        gameMessage.textContent = "You lost! The word was: " + word;
    }
}

// added function to process the user input event
function processGuess(event) {
    // Ensure the pressed key is a lowercase letter
    if (event.key.length === 1 && event.key >= "a" && event.key <= "z") {
        let updatedBlanks = "";
        let foundLetter = false;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === event.key && blanks[i] === "_") {
                updatedBlanks += word[i];
                foundLetter = true;
            } else {
                updatedBlanks += blanks[i];
            }
        }

        if (foundLetter) {
            blanks = updatedBlanks;
            wordDisplay.textContent = blanks;

            if (blanks === word) {
                clearInterval(timer);
                wins++;
                winsDisplay.textContent = wins;
                gameMessage.textContent = "You won!";
            }
        }
    }
}
// added function to update to storage
function updateLocalStorage() {
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
}


// added event listner 
startButton.addEventListener("click", startGame);
document.addEventListener("keydown", processGuess);

// Update localStorage when the page is unloaded
window.addEventListener("beforeunload", updateLocalStorage);