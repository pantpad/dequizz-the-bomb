/* eslint-disable react/prop-types */
import { useEffect, useContext, useRef } from "react";
import { BombContext } from "../store/bomb-context";

export default function BombProgress() {
  const { timer, maxTimer, handleRemoveTime, endGame } =
    useContext(BombContext);
  const bombTick = useRef();

  useEffect(() => {
    const timerI = setInterval(() => {
      handleRemoveTime(1000);
    }, 1000);

    return () => {
      clearInterval(timerI);
    };
  }, [handleRemoveTime]);

  useEffect(() => {
    bombTick.current.play();
    if (timer < 0 || timer >= 75000) {
      endGame();
    }
  }, [timer, endGame]);

  return (
    <>
      <progress value={timer} max={maxTimer} />
      <p className="time-remaining">{timer / 1000}</p>
      <audio
        ref={bombTick}
        src="./audio/singlebombtick.mp3"
        preload="metadata"
      ></audio>
    </>
  );
}
