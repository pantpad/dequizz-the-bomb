/* eslint-disable react/prop-types */
import { useEffect, useContext, useRef } from "react";
import { BombContext } from "../store/bomb-context";

export default function BombTimer() {
  const { status, timer, maxTimer, handleRemoveTime, endGame } =
    useContext(BombContext);

  const bombTick = useRef();

  useEffect(() => {
    let timerI;
    if (status == "running") {
      timerI = setInterval(() => {
        handleRemoveTime(1000);
      }, 1000);
    }

    return () => {
      clearInterval(timerI);
    };
  }, [status, handleRemoveTime]);

  useEffect(() => {
    if (status == "running") {
      bombTick.current.play();
    }
    if (timer < 0 || timer >= 75000) {
      endGame();
    }
  }, [status, timer, endGame]);

  return (
    <>
      <div className="timer">
        <div className="progress-wrapper">
          <progress value={timer} max={maxTimer} />
          <p className="time-remaining">{timer / 1000}</p>
          <audio
            ref={bombTick}
            src="./audio/singlebombtick.mp3"
            preload="metadata"
          ></audio>
        </div>
      </div>
    </>
  );
}
