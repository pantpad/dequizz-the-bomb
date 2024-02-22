/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function BombProgress({ timer, max, removeTime, endGame }) {
  useEffect(() => {
    const timerI = setInterval(() => {
      removeTime(1000);
    }, 1000);

    if (timer < 0 || timer >= 75000) {
      endGame();
    }

    return () => {
      clearInterval(timerI);
    };
  }, [timer, removeTime, endGame]);
  return (
    <>
      <progress value={timer} max={max} />
      <p className="time-remaining">{timer / 1000}</p>
    </>
  );
}
