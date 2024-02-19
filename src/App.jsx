import "./App.css";

function App() {
  return (
    <>
      <h2 className="title">Are you a pro? Click to find out</h2>
      <main className="bomb">
        <div className="question">
          <div className="initial-screen">
            <h2>DEQUIZZ</h2>
            <p>the</p>
            <h2>BOMB</h2>
          </div>
        </div>
        <div className="timer">
          <div className="progress-wrapper">
            <progress value={50} max={100} />
            <p className="time-remaining">00:45:00</p>
          </div>
        </div>
        <section className="answers-wrapper">
          <div className="answers">
            <button className="correct"></button>
            <button className="incorrect"></button>
            <button></button>
            <button></button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
