"use strict";

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
    $("#quiz-select").empty();
    $("#play-quiz-select").empty();
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
    for (const [question, answer] of Object.entries(quizes[quizName])) {
        var tr = document.createElement('tr');
        var timer;
        tr.ondblclick = deleteQuestion;
        tr.setAttribute("data-id", question);
        tr.innerHTML = '<td id="question-td">' + question + '</td>' +
                       "<td value='" + answer + "'>hidden answer</td>" +
                       "<td><button onclick='editData(this)'>Edit</button>";
        tbody.appendChild(tr);
    };
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
    fillTable();
    
})

document.getElementById("quiz-select").addEventListener("change", (e) => {
    fillTable();
})

document.getElementById("show-answers-button").addEventListener("click", () => {
    showAnswers();
});

function showAnswers() {
    var tableRows = document.querySelectorAll('#quiz-table tbody tr');
    tableRows.forEach(row => {
        var answerCell = row.querySelector('td:nth-child(2)');
        answerCell.textContent = answerCell.getAttribute('value');
    });
}

function deleteQuestion(event) {
    // alert(question);
    const tr = event.target.parentElement;
    var question = tr.getAttribute('data-id');
    var quizName = document.getElementById("quiz-select").value
    if (!confirm(`Are you sure you want to delete question: ${question}?`)) {
        return;
    }
    removeQuestionFromDB(question, quizName);
    fillTable();
}

function removeQuestionFromDB(question, quizName) {
    const quizes = JSON.parse(localStorage.getItem("quizes"));
    quizes[quizName] = Object.keys(quizes[quizName]).filter(objKey =>
        objKey !== question).reduce((newObj, key) =>
        {
            newObj[key] = quizes[quizName][key];
            return newObj;
        }, {}
    );
    localStorage.setItem("quizes", JSON.stringify(quizes));
}

function editQuestion(event) {
    // alert(question);
    const tr = event.target.parentElement;
    alert("HELLO!!");
}

document.getElementById("create-quiz-btn").addEventListener("click", () => {
    var quizName = document.getElementById("new-quiz-input").value
    const quizes = JSON.parse(localStorage.getItem("quizes"));
    quizes[quizName] = {};
    localStorage.setItem('quizes', JSON.stringify(quizes));
    document.getElementById("new-quiz-input").value = "";
    fillSelects(quizes);
});

function editData(button) {
    // https://www.geeksforgeeks.org/how-to-add-edit-and-delete-data-in-html-table-using-javascript/
    let row = button.parentNode.parentNode;

    let question = row.cells[0];
    let answer = row.cells[1];

    let questionInput =
        prompt("Edit question:",
        question.innerHTML);
    if (questionInput === null) {
        return;
    }

    let answerInput =
        prompt("Write answer(true/false)",
        answer.getAttribute('value'));
    if (answerInput === null) {
        return;
    }

    while (answerInput !== 'true' && answerInput !== 'false' && answerInput !== null) {
        answerInput =  prompt("Answer must be (true/false) case sensitive!!");
        if (answerInput === null) {
            return;
        }
    }

    var quizName = document.getElementById("quiz-select").value

    removeQuestionFromDB(question.innerHTML, quizName);
    const quizes = JSON.parse(localStorage.getItem("quizes"));
    quizes[quizName][questionInput] = answerInput;
    localStorage.setItem('quizes', JSON.stringify(quizes));
    fillTable();
}

document.getElementById("start-quiz-button").addEventListener("click", () => {
    var quizName = document.getElementById("play-quiz-select").value;
    window.location.href = "playing-quiz.html?quizName=" + quizName;
});
