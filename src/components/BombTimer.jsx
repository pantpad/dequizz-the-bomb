/* eslint-disable react/prop-types */

import BombProgress from "./BombProgress";

export default function BombTimer({ status }) {
  let timerSection = (
    <>
      <progress value={56} max={100} />
      <p className="time-remaining">40</p>
    </>
  );

  if (status == "running") {
    timerSection = <BombProgress />;
  }

  return (
    <>
      <div className="timer">
        <div className="progress-wrapper">{timerSection}</div>
      </div>
    </>
  );
}
