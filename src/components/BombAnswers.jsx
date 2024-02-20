/* eslint-disable react/prop-types */
export default function BombAnswers({ addQuestion, endGame }) {
  return (
    <>
      <section className="answers-wrapper">
        <div className="answers">
          <button
            className="correct"
            onClick={() => {
              addQuestion(0);
            }}
          >
            First
          </button>
          <button
            className="incorrect"
            onClick={() => {
              addQuestion(1);
            }}
          >
            Second
          </button>
          <button
            onClick={() => {
              addQuestion(2);
            }}
          >
            Third
          </button>
          <button
            onClick={() => {
              addQuestion(3);
            }}
          >
            Fourth
          </button>
          <button onClick={endGame}>EndGame</button>
        </div>
      </section>
    </>
  );
}
