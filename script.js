// DOM 
const rulesBtn = document.querySelector(".rules");
const closeBtn = document.querySelector(".close-mark");
const modalRules = document.querySelector(".modal");
const choiceButtons = document.querySelectorAll(".choices");

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
const RulesContainer = document.querySelector(".main-rules")



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

//Random Function
function pcChoose() {
    const rand = Math.floor(Math.random() * Choices.length)
return Choices[rand]
}



// Displaying of results
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
            }, idx*500);
        }
    });
    game.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")
}
//Winner Display 
function displayWinner(results){
    setTimeout(()=>{
        const userWins = isWinner(results);
        const PcWins = isWinner(results.reverse());

        if(userWins){
            resultText.innerHTML = `<h2>YOU WIN</h2><h5>AGAINST PC</h5>`;
            resultDivs[0].classList.toggle("winner");
            nextBtn.style.display = 'block';

            rulesBtn.style.right = "8rem";

            userScore++;
            updateScores();
            localStorage.setItem("userScore", JSON.stringify(userScore))
            displayHurray();
            // confettiWinner();
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
   
    }, 1000);
}

function isWinner(results){
    return results[0].beats === results[1].name;
}

//Updating of scores
function updateScores(){
    CompScore.innerText = compScore;
    UserScore.innerText = userScore;
}

//PLay AGAIN
function playAgainGame() {
    game.classList.remove("hidden");
    resultsDiv.classList.add("hidden");

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
  playButton.addEventListener("click",playAgainGame)


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
        resultsDiv.classList.add("hidden");
        rulesBtn.style.right = "1rem";

        
    });
}

const hurrayPlayAgainBtn = hurray.querySelector(".play-again");

hurrayPlayAgainBtn.addEventListener('click', () => {
    hurray.style.display = 'none'; 
    playAgainGame(); 
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
// const confettiWinner = ()=>{
//        confetti({
//         particleCount: 1000,
//         spread: 120,
//         origin: { y: 0.7 },
//         colors: ['#2E9A25', '#ff9a00', '#ff0000', '#c6ff00', '#ffffff'],
//     });
// }