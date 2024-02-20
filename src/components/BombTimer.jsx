/* eslint-disable react/prop-types */

import BombProgress from "./BombProgress";

const maxTime = 75000;

export default function BombTimer({ status, timer, removeTime, endGame }) {
  let timerSection = (
    <>
      <progress value={60} max={100} />
      <p className="time-remaining">45</p>
    </>
  );

  if (status == "running") {
    timerSection = (
      <BombProgress
        timer={timer}
        max={maxTime}
        removeTime={removeTime}
        endGame={endGame}
      />
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
