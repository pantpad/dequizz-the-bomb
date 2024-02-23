/* eslint-disable react/prop-types */
import { useState, createContext, useCallback } from "react";
import questions, { getRandomQuestion } from "../utils/questions";

const startingState = {
  questions: [
    {
      id: 0,
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: 0,
    },
  ],
  choiches: [],
  status: undefined,
  timer: 40000,
};

const maxTime = 75000;
let remainingQuestions;

const BombContext = createContext({
  questions: [],
  remainingQuestions: [],
  choiches: [],
  status: null,
  timer: undefined,
  maxTimer: undefined,
  lastQuestion: {},
  lastQuestionAnswers: [], //tirare fuori
  lastQuestionCorrectAnswer: undefined, //tirare fuori
  lastQuestionText: "", //tirare fuori
  startGame: () => {},
  endGame: () => {},
  resetGame: () => {},
  addQuestion: () => {},
  handleAddTime: () => {},
  handleRemoveTime: () => {},
});

export { BombContext };

export default function BombContextProvider({ children }) {
  const [bombState, setBombState] = useState(startingState);

  //bombState
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

  const bombCtx = {
    questions: bombState.questions,
    remainingQuestions: remainingQuestions,
    choiches: bombState.choiches,
    status: bombState.status,
    timer: bombState.timer,
    maxTimer: maxTime,
    lastQuestion: bombState.questions[bombState.questions.length - 1],
    lastQuestionAnswers:
      bombState.questions[bombState.questions.length - 1]?.answers,
    lastQuestionCorrectAnswer:
      bombState.questions[bombState.questions.length - 1]?.correctAnswer,
    lastQuestionText:
      bombState.questions[bombState.questions.length - 1]?.question,
    startGame: handleStart,
    endGame: endGame,
    resetGame: resetGame,
    addQuestion: addQuestion,
    handleAddTime: handleAddTime,
    handleRemoveTime: handleRemoveTime,
  };

  return (
    <BombContext.Provider value={bombCtx}>{children}</BombContext.Provider>
  );
}
