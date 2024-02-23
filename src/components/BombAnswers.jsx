import { useState, useContext } from "react";
import { BombContext } from "../store/bomb-context";

/* eslint-disable react/prop-types */
export default function BombAnswers() {
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null,
    isCorrect: null,
  });

  const { status, lastQuestion, addQuestion, handleAddTime, handleRemoveTime } =
    useContext(BombContext);

  function handleAnswerSelection(index) {
    setAnswerState({
      selectedAnswer: index,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswerState({
        selectedAnswer: index,
        isCorrect: lastQuestion.correctAnswer === index,
      });
      handlePoints(index);
      setTimeout(() => {
        setAnswerState({
          selectedAnswer: null,
          isCorrect: null,
        });
        addQuestion(index);
      }, 500);
    }, 500);
  }

  function handlePoints(currentAnswer) {
    if (currentAnswer === lastQuestion.correctAnswer) {
      handleAddTime(15000);
    } else {
      handleRemoveTime(5000);
    }
  }

  function getAnswerClass(index) {
    let answerClass = "";
    //se il bottone selezionato e' selezionato
    if (index === answerState.selectedAnswer) {
      if (answerState.selectedAnswer !== null) {
        answerClass = "selected";
        //se il bottone selezionato e' corretto o sbagliato
        if (answerState.isCorrect !== null) {
          answerClass = answerState.isCorrect
            ? "selected active"
            : "incorrect active";
        }
      }
    }
    //vai sul bottone della risposta corretta e selezionala se si e' gia' stabilita la correttezza
    if (
      index === lastQuestion.correctAnswer &&
      answerState.isCorrect !== null
    ) {
      answerClass = "selected active";
    }
    return answerClass;
  }

  return (
    <>
      <section className="answers-wrapper">
        <div className="answers">
          {lastQuestion.answers.map((answer, index) => {
            if (status == undefined) {
              return (
                <button key={index} disabled className="disabled"></button>
              );
            }
            return (
              <button
                className={getAnswerClass(index)}
                disabled={answerState.selectedAnswer !== null}
                key={index}
                onClick={() => {
                  handleAnswerSelection(index);
                }}
                onAnimationIteration={(e) => {
                  e.target.classList.toggle("stopped");
                }}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
