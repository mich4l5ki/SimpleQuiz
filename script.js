"use strict";

var button = document.getElementById("start-quiz-button");
button.addEventListener("click", timer);

function timer() {
    let countdown = 15;
    document.getElementById("countdown").innerHTML = countdown

    function updateTimer() {
        countdown -= 1;
        document.getElementById("countdown").innerHTML = countdown
        if (countdown == 0){
            countdown = 15;
            // do something
        }
    }

    const timer = setInterval(updateTimer, 1000);
    
}

function createBaseQuiz(){
    let quiz = {
            "quizNumberOne": {
            "An atom is the smallest particle.": 'false',
            "Arachnophobia is the fear of bathing.": "false",
            'Boiling water is 100 degrees Celsius.': 'true',
            'Butterflies taste things with their wings.': 'false',
            'Colorblind people can see color.': 'true'
            },
            "quizNumberTwo": {
                "An atom is the smallest particle.": 'false',
                "Arachnophobia is the fear of bathing.": "false",
                'Boiling water is 100 degrees Celsius.': 'true',
                'Butterflies taste things with their wings.': 'false',
                'Colorblind people can see color.': 'true'
                }
        };

    localStorage.setItem("quizes", JSON.stringify(quiz));
};

function fillSelects(quizes) {
    var quizSelect = document.getElementById("quiz-select");
    var playQuizSelect = document.getElementById("play-quiz-select");
    for (const [key, _] of Object.entries(quizes)) {
        if(key == 'debug'){
            // pass
        }
        else {
            var option = document.createElement("option");
            option.text = key;
            option.value = key;
            quizSelect.add(option.cloneNode(true));
            playQuizSelect.add(option);
        }
        
    }
}

function fillTable() {
    var tbody = document.querySelector('#quiz-table tbody');
    tbody.innerHTML = '';
    const quizes = JSON.parse(localStorage.getItem("quizes"));
    var quizName = document.getElementById("quiz-select").value
    // console.log(quizes[quizName])
    for (const [question, answer] of Object.entries(quizes[quizName])) {
        var tbody = document.querySelector('#quiz-table tbody');
        var tr = document.createElement('tr');
        console.log(answer)
        tr.innerHTML = '<td>' + question + '</td>' +
        "<td value='" + answer + "'>hidden answer</td>" +
        '<td><button type="button" class="delete-question-button">DELETE</button></td>';
        tbody.appendChild(tr);
    }
}



document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("quizes") === null) {
        createBaseQuiz();
      }
    const quizes = JSON.parse(localStorage.getItem("quizes"));
    fillSelects(quizes);
    fillTable();
});

document.getElementById("add-question-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var quizName = document.getElementById("quiz-select").value
    var question = formData.get("question-input")
    var answer = document.getElementById("answer-select").value
    const quizes = JSON.parse(localStorage.getItem("quizes"));
    quizes[quizName][question] = answer;
    localStorage.setItem('quizes', JSON.stringify(quizes));
    document.getElementById("question-input").value = "";
    
})

document.getElementById("quiz-select").addEventListener("change", (e) => {
    fillTable();
})

document.getElementById("show-answers-button").addEventListener("click", () => {
    var tableRows = document.querySelectorAll('#quiz-table tbody tr');
    tableRows.forEach(row => {
        var answerCell = row.querySelector('td:nth-child(2)');
        answerCell.textContent = answerCell.getAttribute('value');
    });
});
