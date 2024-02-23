/* eslint-disable react/prop-types */
import { useContext } from "react";
import { BombContext } from "../store/bomb-context";

import Questions from "./Questions";

const bombDefused = "./audio/bombdefused.mp3";
const bombExplosion = "./audio/bombexplosion.mp3";

export default function Summary() {
  const { resetGame, questions, timer } = useContext(BombContext);
  const hasWon = timer >= 75000 ? true : false;

  let bombAudio = hasWon ? bombDefused : bombExplosion;

  return (
    <>
      <h2>You {hasWon ? "WON :D" : "LOST :("}</h2>
      <section className="summary">
        <Questions questions={questions} />
        <button onClick={resetGame} className="restart-btn">
          Restart Game
        </button>
        <audio preload="metadata" src={bombAudio} autoPlay></audio>
      </section>
    </>
  );
}
