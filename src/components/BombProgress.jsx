/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function BombProgress({ timer, max, removeTime, endGame }) {
  const bombTick = useRef();

  useEffect(() => {
    play();
  }, []);

  function wait() {
    setTimeout(play, 1010);
  }

  function play() {
    bombTick.current.play();
    bombTick.current.onEnded = wait();
  }

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
      <audio
        ref={bombTick}
        src="./audio/singlebombtick.mp3"
        preload="auto"
      ></audio>
    </>
  );
}
