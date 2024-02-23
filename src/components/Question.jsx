/* eslint-disable react/prop-types */
export default function Question({ question, choiches, index }) {
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
