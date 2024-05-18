document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("myRange");
    const output = document.getElementById("demo");
    const submitBtn = document.getElementById("submitBtn");
    const resultMessage = document.getElementById("resultMessage");
    const questionContainer = document.getElementById("questionContainer");
    const userInputContainer = document.getElementById("userInputContainer");
    
    // Function to generate random questions for the number line game
    function generateRandomQuestions() {
        const generatedQuestions = [];
        for (let i = 0; i < 3; i++) { // Generate 3 random questions
            const randomNumbers = Array.from({length: 4}, () => Math.floor(Math.random() * 19) - 9); // Random numbers between -9 and 9
            const sortedNumbers = randomNumbers.slice().sort((a, b) => a - b); // Sort the numbers
            const question = {
                questionText: `Arrange the numbers in increasing order: (${randomNumbers.join(', ')})`,
                correctOrder: sortedNumbers
            };
            generatedQuestions.push(question);
        }
        return generatedQuestions;
    }

    let currentQuestionIndex = 0;
    let questions = generateRandomQuestions();

    // Function to display a question for the number line game
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.querySelector("#questionText").textContent = currentQuestion.questionText;
        userInputContainer.innerHTML = `
            <input type="number" class="user-input" min="-9" max="9" placeholder="1">
            <input type="number" class="user-input" min="-9" max="9" placeholder="2">
            <input type="number" class="user-input" min="-9" max="9" placeholder="3">
            <input type="number" class="user-input" min="-9" max="9" placeholder="4">
        `;
    }

    // Function to check user input for the number line game
    function checkUserInput() {
        const userInput = Array.from(document.querySelectorAll(".user-input"));
        const userNumbers = userInput.map(input => parseInt(input.value));
        const currentQuestion = questions[currentQuestionIndex];
        if (JSON.stringify(userNumbers) === JSON.stringify(currentQuestion.correctOrder)) {
            resultMessage.textContent = "Correct! Well done!";
            setTimeout(() => {
                resultMessage.textContent = "";
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    displayQuestion();
                } else {
                    questionContainer.innerHTML = "<p>All questions completed!</p>";
                    userInputContainer.innerHTML = "";
                    submitBtn.style.display = "none";
                }
            }, 1000);
        } else {
            resultMessage.textContent = "Incorrect! Try again.";
        }
    }

    submitBtn.addEventListener("click", function() {
        checkUserInput();
    });

    displayQuestion();

    // Addition Game Logic
    const additionSubmitBtn = document.getElementById("additionSubmitBtn");
    const additionResultMessage = document.getElementById("additionResultMessage");
    const additionQuestionContainer = document.getElementById("additionQuestions");
    const additionUserInputContainer = document.getElementById("additionUserInputContainer");

    // Function to generate random addition questions
    function generateRandomAdditionQuestions() {
        const generatedQuestions = [];
        for (let i = 0; i < 3; i++) { // Generate 3 random addition questions
            const num1 = Math.floor(Math.random() * 19) - 9; // Random number between -9 and 9
            const num2 = Math.floor(Math.random() * 19) - 9; // Random number between -9 and 9
            const question = {
                questionText: `What is the sum of ${num1} and ${num2}?`,
                correctAnswer: num1 + num2
            };
            generatedQuestions.push(question);
        }
        return generatedQuestions;
    }

    let currentAdditionQuestionIndex = 0;
    let additionQuestions = generateRandomAdditionQuestions();

    // Function to display an addition question
    function displayAdditionQuestion() {
        const currentQuestion = additionQuestions[currentAdditionQuestionIndex];
        additionQuestionContainer.innerHTML = currentQuestion.questionText;
        additionUserInputContainer.innerHTML = `
            <input type="number" id="additionAnswer" min="-18" max="18" placeholder="Enter the sum">
        `;
    }

    // Function to check user's addition answer
    function checkAdditionAnswer() {
        const additionAnswerInput = document.getElementById("additionAnswer");
        const userAnswer = parseInt(additionAnswerInput.value);
        const currentQuestion = additionQuestions[currentAdditionQuestionIndex];
        if (userAnswer === currentQuestion.correctAnswer) {
            additionResultMessage.textContent = "Correct! Well done!";
            setTimeout(() => {
                additionResultMessage.textContent = "";
                currentAdditionQuestionIndex++;
                if (currentAdditionQuestionIndex < additionQuestions.length) {
                    displayAdditionQuestion();
                } else {
                    additionQuestionContainer.innerHTML = "<p>All questions completed!</p>";
                    additionUserInputContainer.innerHTML = "";
                    additionSubmitBtn.style.display = "none";
                }
            }, 1000);
        } else {
            additionResultMessage.textContent = "Incorrect! Try again.";
        }
    }

    additionSubmitBtn.addEventListener("click", function() {
        checkAdditionAnswer();
    });

    displayAdditionQuestion();

    // Update output when slider value changes
    slider.addEventListener("input", function() {
        output.textContent = this.value;
    });
});
