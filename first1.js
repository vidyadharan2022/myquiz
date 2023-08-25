const questions = [
    {
        question: "How many sides are there in a triangle?",
        answers: [
            { text: "1", correct: false },
            { text: "3", correct: true },
            { text: "4", correct: false },
            { text: "2", correct: false },
        ]
    },
    
    {
        question:"How many continents are there in the world?",
                answers:[
                    {text:"7",correct:true},
                    {text:"8",correct:false},
                    {text:"3",correct:false},
                    {text:"6",correct:false}, 
                ]
            
    },
    {
        question:"How many minutes are there in an hour?",
                answers:[
                    {text:"30",correct:false},
                    {text:"70",correct:false},
                    {text:"60",correct:true},
                    {text:"None of the above",correct:false},
                ]
    },
    {
        question:"Rainbow consist of how many colours?",
                answers:[
                    {text:"9",correct:false},
                    {text:"4",correct:false},
                    {text:"6",correct:false},
                    {text:"7",correct:true},
                ]
    },
    
    {
        question:" How many days are there in a week?",
                answers:[
                    {text:"9",correct:false},
                    {text:"3",correct:false},
                    {text:"7",correct:true},
                    {text:"5",correct:false},
                ]
    },
    {
        question:"How many states are there in India?",
        answers:[
                {text:"28",correct:true},
                {text:"29",correct:false},
                {text:"31",correct:false},
                {text:"32",correct:false},
                ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-question-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        console.log("button is clicked");
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score+=5;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of 30!`;
    nextButton.innerHTML = "Retake Test";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click",() => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

startQuiz();