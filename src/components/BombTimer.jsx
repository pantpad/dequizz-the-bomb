export default function BombTimer() {
  return (
    <>
      <div className="timer">
        <div className="progress-wrapper">
          <progress value={50} max={100} />
          <p className="time-remaining">00:45:00</p>
        </div>
      </div>
    </>
  );
}
