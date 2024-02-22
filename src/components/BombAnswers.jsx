import { useState } from "react";

/* eslint-disable react/prop-types */
export default function BombAnswers({
  answers = ["", "", "", ""],
  addQuestion,
  correctAnswer = undefined,
  gameStatus,
  addTime,
  removeTime,
}) {
  const [answerSelection, setAnswerSelection] = useState({
    isChecking: false,
    checked: false,
    //isCorrect: null,
    currentAnswer: "",
  });

  function handleAnswerSelection(index) {
    setAnswerSelection((prevState) => {
      return { ...prevState, isChecking: true, currentAnswer: index };
    });
    setTimeout(() => {
      showCorrectAnswer();
      handlePoints(index);
    }, 500);
    setTimeout(() => {
      clearState();
      addQuestion(index);
    }, 1000);
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
              return (
                <button key={index} disabled className="disabled"></button>
              );
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
        </div>
      </section>
    </>
  );
}

// import { useState } from 'react';
// import QuestionTimer from './QuestionTimer.jsx';
// import Answers from './Answers.jsx';
// import QUESTIONS from '../questions.js';

// export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
//   const [answer, setAnswer] = useState({
//     selectedAnswer: '',
//     isCorrect: null,
//   });

//   let timer = 10000;

//   if (answer.selectedAnswer) {
//     timer = 1000;
//   }

//   if (answer.isCorrect !== null) {
//     timer = 2000;
//   }

//   function handleSelectAnswer(answer) {
//     setAnswer({
//       selectedAnswer: answer,
//       isCorrect: null,
//     });

//     setTimeout(() => {
//       setAnswer({
//         selectedAnswer: answer,
//         isCorrect: QUESTIONS[index].answers[0] === answer,
//       });

//       setTimeout(() => {
//         onSelectAnswer(answer);
//       }, 2000);
//     }, 1000);
//   }

//   let answerState = '';

//   if (answer.selectedAnswer && answer.isCorrect !== null) {
//     answerState = answer.isCorrect ? 'correct' : 'wrong';
//   } else if (answer.selectedAnswer) {
//     answerState = 'answered';
//   }

//   return (
//     <div id="question">
//       <QuestionTimer
//         key={timer}
//         timeout={timer}
//         onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
//         mode={answerState}
//       />
//       <h2>{QUESTIONS[index].text}</h2>
//       <Answers
//         answers={QUESTIONS[index].answers}
//         selectedAnswer={answer.selectedAnswer}
//         answerState={answerState}
//         onSelect={handleSelectAnswer}
//       />
//     </div>
//   );
// }
