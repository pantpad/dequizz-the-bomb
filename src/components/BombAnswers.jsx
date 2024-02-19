/* eslint-disable react/prop-types */
export default function BombAnswers({ addQuestion }) {
  return (
    <>
      <section className="answers-wrapper">
        <div className="answers">
          <button className="correct" onClick={addQuestion}>
            add
          </button>
          <button className="incorrect"></button>
          <button></button>
          <button></button>
        </div>
      </section>
    </>
  );
}
