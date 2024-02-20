import { useState } from "react";

import BombTimer from "./BombTimer";
import BombScreen from "./BombScreen";
import BombAnswers from "./BombAnswers";

import questions, { getRandomQuestion } from "../utils/questions";

let remainingQuestions;

export default function Bomb() {
  const [bombState, setBombState] = useState({
    questions: [],
    choiches: [],
    status: undefined,
  });

  function handleStart() {
    console.log("start");
    const firstQuestion = getRandomQuestion(questions, 1, questions.length);
    remainingQuestions = questions.filter(
      (question) => question.id != firstQuestion.id
    );
    setBombState(() => {
      return { questions: [firstQuestion], choiches: [], status: "running" };
    });
  }

  function endGame() {
    setBombState((prevState) => {
      return {
        ...prevState,
        choiches: [...prevState.choiches, undefined],
        status: "game-over",
      };
    });
  }

  function addQuestion(index) {
    //go to game over page -> status: 'game over'
    if (remainingQuestions.length == 0) {
      setBombState((prevState) => {
        return { ...prevState, status: undefined };
      });
    }

    if (remainingQuestions.length == 1) {
      const nextQuestion = remainingQuestions[0];
      remainingQuestions = [];
      setBombState((prevState) => {
        return {
          ...prevState,
          choiches: [...prevState.choiches, index],
          questions: [...prevState.questions, nextQuestion],
        };
      });
      return;
    }

    //prettier-ignore
    const nextQuestion = getRandomQuestion(remainingQuestions,1,remainingQuestions.length - 1);
    remainingQuestions = remainingQuestions.filter(
      (question) => question.id != nextQuestion.id
    );

    setBombState((prevState) => {
      return {
        ...prevState,
        choiches: [...prevState.choiches, index],
        questions: [...prevState.questions, nextQuestion],
      };
    });
  }

  console.log(bombState);

  return (
    <>
      <main className="bomb">
        {bombState.status !== "game-over" ? (
          <>
            <BombScreen
              question={
                bombState.questions[bombState.questions.length - 1]?.question
              }
              isStarted={bombState.status}
              handleStart={handleStart}
            />
            <BombTimer />
            <BombAnswers
              gameStatus={bombState.status}
              answers={
                bombState.questions[bombState.questions.length - 1]?.answers
              }
              addQuestion={addQuestion}
              endGame={endGame}
              correctAnswer={
                bombState.questions[bombState.questions.length - 1]
                  ?.correctAnswer
              }
            />
          </>
        ) : (
          <>
            <h2>You Won / Lost :D :/</h2>
            <section className="summary">
              {bombState.questions.map((question, index) => {
                return (
                  <article key={index} className="question">
                    <div className="question-description">
                      {question.question}
                    </div>
                    <p
                      className={`question-answer ${
                        bombState.choiches[index] !== undefined
                          ? question.correctAnswer === bombState.choiches[index]
                            ? "correct"
                            : "incorrect"
                          : "skipped"
                      }`}
                    >
                      {question.answers[bombState.choiches[index]] ||
                        "No Answer"}
                    </p>
                    {/* <p className="question-answer correct">correct</p>
                    <p className="question-answer incorrect">incorrect</p>
                    <p className="question-answer skipped">no-answer</p> */}
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
}
