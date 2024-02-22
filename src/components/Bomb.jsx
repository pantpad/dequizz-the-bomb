import { useCallback, useEffect, useRef, useState } from "react";

import BombTimer from "./BombTimer";
import BombScreen from "./BombScreen";
import BombAnswers from "./BombAnswers";

import questions, { getRandomQuestion } from "../utils/questions";

let remainingQuestions;

const startingState = {
  questions: [],
  choiches: [],
  status: undefined,
  timer: 40000,
};

export default function Bomb() {
  const [bombState, setBombState] = useState(startingState);
  const bombExplode = useRef();
  const hasWon = bombState.timer >= 75000 ? true : false;

  useEffect(() => {
    if (bombState.status == "game-over") {
      if (hasWon) {
        bombExplode.current.src = "./audio/bombdefused.mp3";
      } else {
        bombExplode.current.src = "./audio/bombexplosion.mp3";
      }

      bombExplode.current.play();
    }
  }, [bombState.status, hasWon]);

  function handleStart() {
    const firstQuestion = getRandomQuestion(questions, 1, questions.length);
    remainingQuestions = questions.filter(
      (question) => question.id != firstQuestion.id
    );
    setBombState((prevState) => {
      return {
        ...prevState,
        questions: [firstQuestion],
        status: "running",
      };
    });
  }

  const endGame = useCallback(function endGame() {
    setBombState((prevState) => {
      return {
        ...prevState,
        status: "game-over",
      };
    });
  }, []);

  function resetGame() {
    setBombState(startingState);
  }

  function addQuestion(index) {
    if (remainingQuestions.length == 0) {
      setGameCondition(undefined);
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
      if (prevState.timer >= 75000 || prevState.timer <= 0) {
        return {
          ...prevState,
          choiches: [...prevState.choiches, index],
          questions: [...prevState.questions],
        };
      }
      return {
        ...prevState,
        choiches: [...prevState.choiches, index],
        questions: [...prevState.questions, nextQuestion],
      };
    });
  }

  function setGameCondition(condition) {
    setBombState((prevState) => {
      return { ...prevState, status: condition };
    });
  }

  function handleAddTime(value) {
    setBombState((prevState) => {
      return { ...prevState, timer: prevState.timer + value };
    });
  }
  const handleRemoveTime = useCallback(function handleRemoveTime(value) {
    setBombState((prevState) => {
      return { ...prevState, timer: prevState.timer - value };
    });
  }, []);

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
            <BombTimer
              {...bombState}
              removeTime={handleRemoveTime}
              endGame={endGame}
            />
            <BombAnswers
              gameStatus={bombState.status}
              answers={
                bombState.questions[bombState.questions.length - 1]?.answers
              }
              addQuestion={addQuestion}
              correctAnswer={
                bombState.questions[bombState.questions.length - 1]
                  ?.correctAnswer
              }
              addTime={handleAddTime}
              removeTime={handleRemoveTime}
              time={bombState.timer}
            />
          </>
        ) : (
          <>
            <h2>You {hasWon ? "WON :D" : "LOST :("}</h2>
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
                  </article>
                );
              })}
              <button onClick={resetGame} className="restart-btn">
                Restart Game
              </button>
              <audio ref={bombExplode} preload="metadata"></audio>
            </section>
          </>
        )}
      </main>
    </>
  );
}

// const shuffledAnswers = useRef();

// if (!shuffledAnswers.current) {
//   shuffledAnswers.current = [...answers];
// //   shuffledAnswers.current.sort(() => Math.random() - 0.5);
// }
//
