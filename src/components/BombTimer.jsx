/* eslint-disable react/prop-types */

import BombProgress from "./BombProgress";

const maxTime = 75000;

export default function BombTimer({ status, timer, removeTime }) {
  let timerSection = (
    <>
      <progress value={60} max={100} />
      <p className="time-remaining">00:45:00</p>
    </>
  );

  if (status == "running") {
    timerSection = (
      <BombProgress timer={timer} max={maxTime} removeTime={removeTime} />
    );
  }

  return (
    <>
      <div className="timer">
        <div className="progress-wrapper">{timerSection}</div>
      </div>
    </>
  );
}
