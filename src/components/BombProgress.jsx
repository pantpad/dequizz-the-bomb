/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function BombProgress({ timer, max, removeTime, endGame }) {
  const bombTick = useRef();

  useEffect(() => {
    if (timer < 0 || timer >= 75000) {
      endGame();
    }
  }, [timer, endGame]);

  useEffect(() => {
    const bombTickInterval = setInterval(() => {
      bombTick.current.play();
    }, 1008);

    const timerI = setInterval(() => {
      removeTime(1000);
    }, 1000);

    return () => {
      console.log("unmount");
      clearInterval(timerI);
      clearInterval(bombTickInterval);
    };
  }, [removeTime]);

  return (
    <>
      <progress value={timer} max={max} />
      <p className="time-remaining">{timer / 1000}</p>
      <audio ref={bombTick} src="./audio/singlebombtick.mp3" autoPlay></audio>
    </>
  );
}
