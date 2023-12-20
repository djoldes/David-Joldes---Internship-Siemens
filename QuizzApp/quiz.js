const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2 // Paris
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    correctAnswer: 0 // Leonardo da Vinci
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    choices: ["Jupiter", "Mars", "Saturn", "Neptune"],
    correctAnswer: 1 // Mars
  },
  {
    id: 4,
    question: "What is the largest mammal in the world?",
    choices: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1 // Blue Whale
  },
  {
    id: 5,
    question: "Which of these countries is the largest by land area?",
    choices: ["China", "Russia", "United States", "Canada"],
    correctAnswer: 1 // Russia
  },
  {
    id: 6,
    question: "The Great Barrier Reef is located in which country?",
    choices: ["Australia", "Brazil", "Mexico", "South Africa"],
    correctAnswer: 0 // Australia
  },
  {
    id: 7,
    question: "What is the capital of Italy?",
    choices: ["Milan", "Rome", "Naples", "Florence"],
    correctAnswer: 1 // Rome
  },
  {
    id: 8,
    question: "Which continent is the least populated?",
    choices: ["Asia", "Africa", "Australia", "Antarctica"],
    correctAnswer: 3 // Antarctica
  },
  {
    id: 9,
    question: "What is the chemical symbol for gold?",
    choices: ["Au", "Ag", "G", "Go"],
    correctAnswer: 0 // Au
  },
  {
    id: 10,
    question: "What causes tides in the ocean?",
    choices: ["Gravitational pull of the Moon", "Wind", "Earth's rotation", "Solar energy"],
    correctAnswer: 0 // Gravitational pull of the Moon
  },
  {
    id: 11,
    question: "What is the powerhouse of the cell?",
    choices: ["Nucleus", "Ribosome", "Mitochondrion", "Lysosome"],
    correctAnswer: 2 // Mitochondrion
  },
  {
    id: 12,
    question: "Who was the first female Prime Minister of the United Kingdom?",
    choices: ["Margaret Thatcher", "Theresa May", "Angela Merkel", "Indira Gandhi"],
    correctAnswer: 0 // Margaret Thatcher
  },
  {
    id: 13,
    question: "Which ancient civilization built the Machu Picchu complex?",
    choices: ["Maya", "Aztec", "Inca", "Egyptian"],
    correctAnswer: 2 // Inca
  },
  {
    id: 14,
    question: "The French Revolution began in which year?",
    choices: ["1776", "1789", "1804", "1812"],
    correctAnswer: 1 // 1789
  },
  {
    id: 15,
    question: "Who painted 'The Starry Night'?",
    choices: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: 1 // Vincent van Gogh
  },
  {
    id: 16,
    question: "What is the capital of Japan?",
    choices: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
    correctAnswer: 0 // Tokyo
  },
  {
    id: 17,
    question: "Which river is the longest in the world?",
    choices: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctAnswer: 0 // Nile
  },
  {
    id: 18,
    question: "What is the atomic number of hydrogen?",
    choices: ["1", "2", "3", "4"],
    correctAnswer: 0 // 1
  },
  {
    id: 19,
    question: "What is the largest organ in the human body?",
    choices: ["Liver", "Skin", "Brain", "Heart"],
    correctAnswer: 1 // Skin
  },
  {
    id: 20,
    question: "Who was the first President of the United States?",
    choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
    correctAnswer: 1 // George Washington
  },
  // I added only 20 questions to be able to test the app more easily
];

let score = 0;
let currentQuestion = null;
let quizCompleted = false;

// The random selection function!!!!
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const selectedQuestion = questions[randomIndex];
  questions.splice(randomIndex, 1);
  return selectedQuestion;
}

function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.id = `choice${index}`;
    input.name = "choice";
    input.value = index;

    const label = document.createElement("label");
    label.textContent = choice;
    label.setAttribute("for", `choice${index}`);

    choicesElement.appendChild(input);
    choicesElement.appendChild(label);
    choicesElement.appendChild(document.createElement("br"));
  });

  currentQuestion = question;
}

function showSubmitButton() {
  const submitBtn = document.getElementById("submitBtn");
  if (!quizCompleted) {
    submitBtn.style.display = "block";
    submitBtn.addEventListener("click", handleAnswerSubmission);
  } else {
    submitBtn.style.display = "none";
  }
}

function handleAnswerSubmission() {
  const selectedAnswer = document.querySelector('input[name="choice"]:checked');
  if (selectedAnswer) {
    const selectedIndex = parseInt(selectedAnswer.value, 10);
    handleAnswer(selectedIndex);
  }
}

function handleAnswer(selectedIndex) {
  if (selectedIndex === currentQuestion.correctAnswer) {
    score++;
  }
  displayNextQuestion();
}

function displayNextQuestion() {
  if (questions.length > 0) {
    const question = getRandomQuestion();
    displayQuestion(question);
    showSubmitButton();
  } else {
    showResult();
  }
}

function showResult() {
  const resultElement = document.getElementById("result");
  resultElement.textContent = `You scored ${score} out of ${21}.`;

  const quizContainer = document.querySelector(".quiz-container");
  quizContainer.classList.add("result-displayed");

  quizCompleted = true; 
  showSubmitButton();
}

window.addEventListener('load', displayNextQuestion);