var quiz = {};
var numOfQuestion = 0;
var correctAnswers = 0;
var lenOfQuiz = 0;

document.addEventListener("DOMContentLoaded", () => {
    
    var params = new URLSearchParams(window.location.search);
    var quizName = params.get("quizName");
    var quizes = JSON.parse(localStorage.getItem("quizes"));
    quiz = quizes[quizName];
    lenOfQuiz = Object.keys(quiz).length;
    document.getElementById("answers-counter").textContent = correctAnswers + "/" + lenOfQuiz;
    document.getElementById("question-text").textContent = Object.keys(quiz)[numOfQuestion];

});

document.getElementById("true-button").addEventListener("click", () => {
    var answer = quiz[Object.keys(quiz)[numOfQuestion]]
    if (answer === "true") {
        updateCounter();
    }
    numOfQuestion += 1;
    nextQuestion();
});

document.getElementById("false-button").addEventListener("click", () => {
    var answer = quiz[Object.keys(quiz)[numOfQuestion]]
    if (answer === "false") {
        updateCounter();
    }
    numOfQuestion += 1;
    nextQuestion();
});

function updateCounter() {
    correctAnswers += 1
    document.getElementById("answers-counter").textContent = correctAnswers + "/" + lenOfQuiz;
}

function nextQuestion() {
    if (numOfQuestion == lenOfQuiz) {
        showFinalScore()
    }
    document.getElementById("question-text").textContent = Object.keys(quiz)[numOfQuestion];
}

function showFinalScore() {
    document.getElementById("answers-counter").textContent = '';
    $('#game-quiz-div div').empty();
    var yourScoreDiv = document.getElementById("game-quiz-div");
    var heading = document.createElement("h1");
    heading.textContent = "Your Score:";
    yourScoreDiv.appendChild(heading);
    var score = document.createElement("h2");
    score.textContent = correctAnswers + "/" + lenOfQuiz;
    yourScoreDiv.appendChild(score);
    var button1 = document.getElementById("true-button");
    var button2 = document.getElementById("false-button");
    button1.parentNode.removeChild(button1);
    button2.parentNode.removeChild(button2);
    var newButton = document.createElement("button");
    newButton.setAttribute("type", "button");
    newButton.setAttribute("id", "return-btn");
    newButton.textContent = "Return";
    document.getElementById("answers-counter").appendChild(newButton);
    document.getElementById("return-btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
