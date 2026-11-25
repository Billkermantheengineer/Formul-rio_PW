const testForm = document.querySelector("#test-form");
const resultArea = document.querySelector("#result");

const answerKey = {
    q1: "a",
    q2: "c",
    q3: "d",
    q4: "c",
    q5: "c",
    q6: "b",
    q7: "a",
    q8: "d",
    q9: "c",
    q10: "d"
};


testForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;

    const totalQuestions = Object.keys(answerKey).length;

    const unanswered = [];


    // Percorre todas as questões do gabarito
    for (const questionName in answerKey) {

        const selectedOption = testForm.querySelector(
            `input[name="${questionName}"]:checked`
        );

        if (!selectedOption) {

            unanswered.push(questionName);

        }

        // Compara a resposta com o gabarito
        else if (
            selectedOption.value === answerKey[questionName]
        ) {

            score++;

        }

    }


    // Verifica se existem questões sem resposta
    if (unanswered.length > 0) {

        resultArea.hidden = false;

        resultArea.textContent =
            `Você ainda precisa responder ${unanswered.length} questão(ões).`;

        resultArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;

    }


    // Calcula a porcentagem de acertos
    const percentage = Math.round(
        (score / totalQuestions) * 100
    );


    // Define uma mensagem de acordo com o resultado
    let message = "você acertou menos da metade das questões";

    if (percentage === 100) {

        message = "Você acertou todas as questões.";

    }

    else if (percentage >= 60) {

        message = "Você acertou a maioria das questões.";

    }


    resultArea.hidden = false;

    resultArea.innerHTML = `
        <strong>
            Resultado: ${score} de ${totalQuestions}
            (${percentage}%).
        </strong>

        <p>${message}</p>
    `;


    resultArea.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

quizForm.addEventListener("reset", function () {

    resultArea.hidden = true;

    resultArea.textContent = "";

});