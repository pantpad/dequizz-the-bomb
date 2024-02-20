/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function BombProgress({ timer, max, handleTimerMoving }) {
  useEffect(() => {
    const timerI = setInterval(() => {
      console.log(timer);
      handleTimerMoving();
    }, 1000);

    return () => {
      clearInterval(timerI);
    };
  }, []);
  return (
    <>
      <progress value={timer} max={max} />
      <p className="time-remaining">{timer}</p>
    </>
  );
}
