import { useState } from "react";

import BombTimer from "./BombTimer";
import BombScreen from "./BombScreen";
import BombAnswers from "./BombAnswers";

import questions, { getRandomQuestion } from "../utils/questions";

// let currentQuestion = getRandomQuestion(questions);
// let univoqueQuestions = questions.filter(
//   (question) => question.id != currentQuestion.id
// );
// console.log(univoqueQuestions);

// currentQuestion = getRandomQuestion(questions);
// univoqueQuestions = univoqueQuestions.filter(
//   (question) => question.id != currentQuestion.id
// );
// console.log(univoqueQuestions);

let remainingQuestions;

export default function Bomb() {
  const [bombState, setBombState] = useState({
    questions: [],
    status: undefined,
  });

  function handleStart() {
    console.log("start");
    const firstQuestion = getRandomQuestion(questions, 1, questions.length);
    remainingQuestions = questions.filter(
      (question) => question.id != firstQuestion.id
    );
    setBombState(() => {
      return { questions: [firstQuestion], status: "running" };
    });
  }

  function addQuestion() {
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
          questions: [...prevState.questions, nextQuestion],
        };
      });
      return;
    }

    //prettier-ignore
    const nextQuestion = getRandomQuestion(remainingQuestions,1,remainingQuestions.length - 1);
    if (nextQuestion) {
      remainingQuestions = remainingQuestions.filter(
        (question) => question.id != nextQuestion.id
      );
    }

    setBombState((prevState) => {
      return {
        ...prevState,
        questions: [...prevState.questions, nextQuestion],
      };
    });
  }

  console.log(bombState);

  return (
    <>
      <main className="bomb">
        <BombScreen
          question={
            bombState.questions[bombState.questions.length - 1]?.question
          }
          isStarted={bombState.status}
          handleStart={handleStart}
        />
        <BombTimer />
        <BombAnswers addQuestion={addQuestion} />
      </main>
    </>
  );
}
