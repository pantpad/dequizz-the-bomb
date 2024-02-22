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
  const [answerState, setAnswerState] = useState({
    selectedAnswer: null,
    isCorrect: null,
  });

  function handleAnswerSelection(index) {
    setAnswerState({
      selectedAnswer: index,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswerState({
        selectedAnswer: index,
        isCorrect: correctAnswer === index,
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
    if (currentAnswer === correctAnswer) {
      addTime(15000);
    } else {
      removeTime(5000);
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
    if (index === correctAnswer && answerState.isCorrect !== null) {
      answerClass = "selected active";
    }
    return answerClass;
  }

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
                className={getAnswerClass(index)}
                disabled={answerState.selectedAnswer}
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
