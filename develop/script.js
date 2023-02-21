var startQuizButton = document.querySelector("#startButton");
var timer = document.querySelector('.timer');
var introSection = document.querySelector('.introduction');
var viewHighScores = document.querySelector('.viewHighScores');
var clearHighScoresBtn = document.getElementById("clearHighScoresBtn");

var questionContainer = document.querySelector('#questionContainer');
var firstWindow = document.getElementById("firstWindow");
var secondWindow = document.getElementById("secondWindow");
var thirdWindow = document.getElementById("thirdWindow");
var fourthWindow = document.getElementById("fourthWindow");
var fifthWindow = document.getElementById("fifthWindow");

var scoreSubmission = document.getElementById("scoreSubmission");
var yourScore = document.getElementById("score");
var submitBtn = document.getElementById("submitBtn");
var highScorePage = document.getElementById('viewHighScores');
var errorMessage = document.getElementById('errorMessage');
var playAgainBtn = document.getElementById('playAgainBtn');


var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");
var q5 = document.getElementById("q5");

var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");

var count = 0;
var timeLeft = 60;
var timeInterval;
var userScore;
var userInitials;

var questionArray = [
    {
        question: "What does Dom stand for?" ,
        answer: [
            "Definetly Omit Me",
            "Documentation Overide Model",
            "Document Object Model"
        ],
        correct: "Document Object Model"
    },
    {
        question: "Does the element head belong in the body of your HTML?",
        answer: [
            "Yes",
            "No",
            "Maybe?"
        ],
        correct: "No"
    },
    {
        question: "Which of the following is NOT a programming language.",
        answer: [
            "Python",
            "C#",
            "JavaSwift"
        ],
        correct: "JavaSwift"
    },
    {
        question: "Can a string hold numerical characters?" ,
        answer: [
            "Yes",
            "No",
            "I dont know."
        ],
        correct: "Yes"
    },
    {
        question: "What does Math.Floor() do?",
        answer: [
            "Rounds a number down.",
            "Rounds a number up.",
            "Sets a number to the negative value.?"
        ],
        correct: "Rounds a number down."
    },
    
]


function startQuiz() {
    startTimer();
    renderQuestion();
    
}

function checkAnswer(event) {
    var choice = event.target.textContent;
    // console.log(count);
    if (count >= questionArray.length-1) {
        endQuiz();
    }
    else if (choice === questionArray[count].correct) {
        count ++;
        renderQuestion();
    } else {
        timeLeft -= 5;
        count ++;
        renderQuestion();
    }

}



function renderQuestion() {
    document.getElementById("q1").textContent = questionArray[count].question;
    questionArray[count].answer.forEach(function(answer, index){
        document.getElementById("a"+(index+1)).textContent = answer;
    })
    
}

function endQuiz() {
    questionContainer.style.display = 'none';
    scoreSubmission.style.display = 'flex';
    userScore = timeLeft;
    timer.style.visibility = 'hidden';
    yourScore.textContent = "Your score is: " + userScore;
    clearInterval(timeInterval);
    
}

function startTimer () { 
    timeInterval = setInterval(function () {
        if(timeLeft > 0) {
        timer.textContent = "Time remaining : " + timeLeft;
        timeLeft--;
        }
        else {
            timer.textContent = "Times up!";
            clearInterval(timeInterval);
            endQuiz();  
        }
        
    }, 1000);
}

var highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];

function submitScore() {
    scoreSubmission.style.display = 'none';
    highScorePage.style.display = 'flex';
    userInitials = document.getElementById('userInitials').value;
    if (userInitials === "") {
        userInitials = "Anonymous";
    }
    highScoresArray.push({userInitials: userInitials, timeLeft: timeLeft});
    localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));

    highScoresList.innerHTML = "";
    for (var i = 0; i < highScoresArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = highScoresArray[i].userInitials + " - " + highScoresArray[i].timeLeft;
        highScoresList.appendChild(li);
    }}



playAgainBtn.addEventListener("click", function() {
    highScorePage.style.display = 'none';
    introSection.style.display = 'flex';
    count = 0;
    timeLeft = 60;
})

viewHighScores.addEventListener("click", function() {
    var highScoresString = "";
    for (var i = 0; i < highScoresArray.length; i++) {
        highScoresString += highScoresArray[i].userInitials + " - " + highScoresArray[i].timeLeft + "\n";
    }
    alert("These are the high scores:\n" + highScoresString);
});

clearHighScoresBtn.addEventListener("click", function() {
    localStorage.clear();
    alert('Highscores cleared!')
    location.reload();
});

submitBtn.addEventListener("click", submitScore);
a1.addEventListener("click", checkAnswer);
a2.addEventListener("click", checkAnswer);
a3.addEventListener("click", checkAnswer);

startQuizButton.addEventListener("click", function() {
    introSection.style.display = 'none';
    timer.style.visibility = 'visible';
    questionContainer.style.display = 'flex';
    firstWindow.style.display = 'flex';
    startQuiz();

})

