// DOM
const rulesBtn = document.querySelector(".rules");
const closeBtn = document.querySelector(".close-mark");
const modalRules = document.querySelector(".modal");


const Choices = [
    {
        name: "rock",
        beats: "peace"
    },
    {
        name: "peace",
        beats: "paper"
    },
    {
        name: "paper",
        beats: "rock"
    },
]

const choiceButtons = document.querySelectorAll(".choices");
const game = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");

const resultDivs = document.querySelectorAll(".result");
const resultWinner = document.querySelector(".result-winner");
const resultText = document.querySelector(".result-text");
const nextBtn = document.querySelector(".next");
const hurray = document.querySelector(".hurray");
const container = document.querySelector(".container")

const playButton = document.querySelector(".play-again");
  const CompScore = document.getElementById("comp-score");
  const UserScore = document.getElementById("user-score");
  const restscore = document.querySelector(".rest");

let userScore = 0;
let compScore = 0;


hurray.style.display = 'none';
// GAME LOGIC

choiceButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        const choiceName = button.dataset.choice;
        const choice = Choices.find(choice => choice.name === choiceName)
    choose(choice)
    })
})
function choose(choice){
    const pcChoice = pcChoose();
    displayResults([choice, pcChoice]);
    displayWinner([choice,pcChoice]);
    
}

function pcChoose() {
    const rand = Math.floor(Math.random() * Choices.length)
return Choices[rand]
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        if (results[idx]) {
            setTimeout(() => {
                resultDiv.innerHTML = `
               <div class="choices" data-choice="${results[idx].name}">
            <div class="choice ${results[idx].name}">
                <i class="fa-solid fa-hand-${results[idx].name}"></i>
            </div>
        </div>`;
            }, idx*1000);
        }
    });
    game.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")
}
function displayWinner(results){
    setTimeout(()=>{
        const userWins = isWinner(results);
        const PcWins = isWinner(results.reverse());

        if(userWins){
            resultText.innerHTML = `<h2>YOU WIN</h2><h5>AGAINST PC</h5>`;
            resultDivs[0].classList.toggle("winner");
            nextBtn.style.display = 'block';
            userScore++;
            updateScores();
            localStorage.setItem("userScore", JSON.stringify(userScore))

            displayHurray();
        } else if(PcWins){
            resultText.innerHTML = `<h2>YOU LOST</h2><h5>AGAINST PC</h5>`;
            resultDivs[1].classList.toggle("winner");
            compScore++;
            updateScores();
            localStorage.setItem("compScore", JSON.stringify(compScore))

        } else {
            resultText.innerHTML = `<h2>TIE UP</h2>`
        }
        resultWinner.classList.toggle("hidden");
    // resultsDiv.classList.add("show-winner");
   
    }, 1000);
}

function isWinner(results){
    return results[0].beats === results[1].name;
    // playAgainButton()
}

//Updating of scores
function updateScores(){
    CompScore.innerText = compScore;
    UserScore.innerText = userScore;
}

//PLay AGAIN
function resetGame() {
    game.classList.remove("hidden");
    resultsDiv.classList.add("hidden");
    // resultsDiv.classList.remove("show-winner");
    resultDivs.forEach(resultDiv => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
    resultText.innerText = "";
    resultWinner.classList.add("hidden");
    nextBtn.style.display = "none";
    hurray.style.display = "none";
    container.classList.remove("hidden");
  }

    playButton.addEventListener("click",resetGame)


// Show and Hide rules Toggle Button
rulesBtn.addEventListener("click",()=>{
    modalRules.classList.toggle("show-modal");
});

closeBtn.addEventListener("click",()=>{
    modalRules.classList.toggle("show-modal")
});
function displayHurray () {
    nextBtn.addEventListener('click', () => {
        hurray.style.display = 'block';
        nextBtn.style.display = "none"
        container.classList.add("hidden");
        resultWinner.classList.add("hidden");
        // resultsDiv.classList.remove("show-winner");
        resultsDiv.classList.add("hidden")
        
    });
}

const hurrayPlayAgainBtn = hurray.querySelector(".play-again");

hurrayPlayAgainBtn.addEventListener('click', () => {
    hurray.style.display = 'none'; 
    resetGame(); 
});


let storedUserScore = localStorage.getItem("userScore");
let storedCompScore = localStorage.getItem("compScore");

if (storedUserScore) {
    userScore = JSON.parse(storedUserScore);
    UserScore.innerText = userScore;
}

if (storedCompScore) {
    compScore = JSON.parse(storedCompScore);
    CompScore.innerText = compScore;
}

// localStorage.setItem("testKey", "testValue");
// console.log(localStorage.getItem("testKey"));
// localStorage.removeItem("testKey");


restscore.addEventListener("click",()=>{
    userScore = 0;
    compScore = 0;
    updateScores();
})

