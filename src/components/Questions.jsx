/* eslint-disable react/prop-types */
import Question from "./Question";
export default function Questions({ questions, choiches }) {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <Question
            key={index}
            question={question}
            choiches={choiches}
            index={index}
          />
        );
      })}
    </>
  );
}
