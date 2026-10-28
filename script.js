

const questions = [
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to web pages?",
        options: ["CSS", "SQL", "JavaScript", "HTML"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["int", "let", "define", "String"],
        answer: "let"
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<p>", "<h1>", "<a>", "<img>"],
        answer: "<a>"
    }
];

let currentQuestion = 0;
let answers = {};
let timeLeft = 15;
let timer = null;
let examFinished = false;

function showQuestion() {
    clearInterval(timer);

    if (examFinished) return;

    const q = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1);

    document.getElementById("progress").textContent =
        (currentQuestion + 1) + " of " + questions.length;

    document.getElementById("question").textContent = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";

        if (answers[currentQuestion] === option) {
            button.classList.add("selected");
        }

        button.onclick = function () {
            answers[currentQuestion] = option;
            showQuestion();
        };

        optionsDiv.appendChild(button);
    });

    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;

    renderPalette();
    startTimer();
}

function renderPalette() {
    const palette = document.getElementById("question-palette");
    palette.innerHTML = "";

    questions.forEach((q, index) => {
        const button = document.createElement("button");
        button.textContent = index + 1;
        button.className = "question-number";

        if (answers[index] !== undefined) {
            button.classList.add("answered");
        }

        if (index === currentQuestion) {
            button.classList.add("current");
        }

        button.title = "Go to question " + (index + 1);

        button.onclick = function () {
            currentQuestion = index;
            showQuestion();
        };

        palette.appendChild(button);
    });
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                finishExam();
            }
        }
    }, 1000);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishExam();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function finishExam() {
    if (examFinished) return;

    examFinished = true;
    clearInterval(timer);

    let score = 0;

    questions.forEach((q, index) => {
        if (answers[index] === q.answer) {
            score++;
        }
    });

    document.querySelector(".exam-layout").style.display = "none";

    document.getElementById("result-screen").style.display = "block";

    document.getElementById("result").textContent =
        "Your score: " + score + " / " + questions.length;
}

function restartExam() {
    currentQuestion = 0;
    answers = {};
    timeLeft = 15;
    examFinished = false;

    document.querySelector(".exam-layout").style.display = "grid";
    document.getElementById("result-screen").style.display = "none";

    showQuestion();
}
function logout() {
    clearInterval(timer);

    sessionStorage.removeItem("quizLoggedIn");
    sessionStorage.removeItem("quizUserName");

    window.location.href = "index.html";
}
showQuestion();
