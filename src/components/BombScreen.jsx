/* eslint-disable react/prop-types */
export default function BombScreen({ question = "", isStarted, handleStart }) {
  console.log(isStarted);
  return (
    <>
      <div className="question">
        {isStarted ? (
          <p>{question}</p>
        ) : (
          <div className="initial-screen" onClick={handleStart}>
            <h2>DEQUIZZ</h2>
            <p>the</p>
            <h2>BOMB</h2>
          </div>
        )}
      </div>
    </>
  );
}
