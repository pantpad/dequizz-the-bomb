/* eslint-disable react/prop-types */

import { useContext } from "react";
import { BombContext } from "../store/bomb-context";

export default function Question({ question, index }) {
  const { choiches } = useContext(BombContext);

  return (
    <>
      <article className="question">
        <div className="question-description">{question.question}</div>
        <p
          className={`question-answer ${
            choiches[index] !== undefined
              ? question.correctAnswer === choiches[index]
                ? "correct"
                : "incorrect"
              : "skipped"
          }`}
        >
          {question.answers[choiches[index]] || "No Answer"}
        </p>
      </article>
    </>
  );
}
