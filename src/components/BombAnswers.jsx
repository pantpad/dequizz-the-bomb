import { useState } from "react";

/* eslint-disable react/prop-types */
export default function BombAnswers({
  answers = ["", "", "", ""],
  addQuestion,
  endGame,
  correctAnswer = undefined,
  gameStatus,
}) {
  const [answerSelection, setAnswerSelection] = useState({
    isChecking: false,
    checked: false,
    currentAnswer: undefined,
  });

  console.log(answerSelection);

  function handleAnswerSelection(index) {
    setAnswerSelection((prevState) => {
      return { ...prevState, isChecking: true, currentAnswer: index };
    });
  }

  function showCorrectAnswer() {
    setAnswerSelection((prevState) => {
      return { ...prevState, checked: true };
    });
  }

  function clearState() {
    setAnswerSelection({});
  }

  //controllo se ho selezionato
  //se ho selezionato qualcosa, in base all'indice selezionato -> coloro giallo
  //dopo 100ms mostra la risposta corretta -> metto un setTimeout che cambia lo stato con un altro parametro e cambia il className?

  return (
    <>
      <section className="answers-wrapper">
        <div className="answers">
          {answers.map((answer, index) => {
            if (gameStatus == undefined) {
              return <button key={index}></button>;
            }
            return (
              <button
                className={
                  answerSelection.isChecking
                    ? index === answerSelection.currentAnswer
                      ? !answerSelection.checked
                        ? "selected"
                        : index === correctAnswer
                        ? "selected"
                        : "incorrect"
                      : index === correctAnswer
                      ? answerSelection.checked
                        ? "selected"
                        : null
                      : null
                    : null
                }
                disabled={answerSelection.isChecking}
                key={index}
                onClick={() => {
                  handleAnswerSelection(index);
                  setTimeout(() => {
                    showCorrectAnswer();
                  }, 1000);
                  //quello selezionato diventa giallo
                  //quello giusto diventa giallo
                  //se quello selezionato e' diverso da quello giusto diventa rosso
                  //aggiungo domanda
                  setTimeout(() => {
                    clearState();
                    addQuestion(index);
                  }, 2000);
                }}
              >
                {answer}
              </button>
            );
          })}
          <button onClick={endGame}>EndGame</button>
        </div>
      </section>
    </>
  );
}
