/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function BombProgress({ timer, max, removeTime }) {
  useEffect(() => {
    const timerI = setInterval(() => {
      removeTime(1000);
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
