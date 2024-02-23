/* eslint-disable react/prop-types */
import { useRef } from "react";
import Questions from "./Questions";
const bombDefused = "./audio/bombdefused.mp3";
const bombExplosion = "./audio/bombexplosion.mp3";

export default function Summary({ timer, questions, choiches, resetGame }) {
  const hasWon = timer >= 75000 ? true : false;
  const bombExplode = useRef();

  let bombAudio = hasWon ? bombDefused : bombExplosion;

  return (
    <>
      <h2>You {hasWon ? "WON :D" : "LOST :("}</h2>
      <section className="summary">
        <Questions questions={questions} choiches={choiches} />
        <button onClick={resetGame} className="restart-btn">
          Restart Game
        </button>
        <audio
          ref={bombExplode}
          preload="metadata"
          src={bombAudio}
          autoPlay
        ></audio>
      </section>
    </>
  );
}
