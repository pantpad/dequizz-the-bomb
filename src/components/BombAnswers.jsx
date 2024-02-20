import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export default function BombAnswers({
  answers = ["", "", "", ""],
  addQuestion,
  endGame,
  correctAnswer = undefined,
  gameStatus,
  addTime,
  removeTime,
  time,
}) {
  const [answerSelection, setAnswerSelection] = useState({
    isChecking: false,
    checked: false,
    currentAnswer: "",
  });

  useEffect(() => {
    console.log("checked");
  }, [answerSelection.checked]);

  function handleAnswerSelection(index) {
    setAnswerSelection((prevState) => {
      return { ...prevState, isChecking: true, currentAnswer: index };
    });
    const correctTimer = setTimeout(() => {
      showCorrectAnswer();
      handlePoints(index);
      console.log(time);
      if (time - 5000 <= 0 || time + 15000 >= 75000) {
        clearTimeout(correctTimer);
      } else {
        setTimeout(() => {
          clearState();
          addQuestion(index);
        }, 500);
      }
    }, 500);
  }

  function showCorrectAnswer() {
    setAnswerSelection((prevState) => {
      return { ...prevState, checked: true };
    });
  }

  function clearState() {
    setAnswerSelection({});
  }

  function handlePoints(currentAnswer) {
    if (currentAnswer === correctAnswer) {
      addTime(15000);
    } else {
      removeTime(5000);
    }
  }

  function getConditionalClass(index) {
    let conditionalClass = answerSelection.isChecking
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
      : null;
    return conditionalClass;
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
                className={getConditionalClass(index)}
                disabled={answerSelection.isChecking}
                key={index}
                onClick={() => {
                  handleAnswerSelection(index);
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
