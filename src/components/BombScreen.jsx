/* eslint-disable react/prop-types */

import { useContext } from "react";
import { BombContext } from "../store/bomb-context";

export default function BombScreen() {
  const { lastQuestion, status, startGame } = useContext(BombContext);
  return (
    <>
      <div className="question">
        {status ? (
          <p>{lastQuestion.question}</p>
        ) : (
          <div className="initial-screen" onClick={startGame}>
            <h2>DEQUIZZ</h2>
            <p>the</p>
            <h2>BOMB</h2>
          </div>
        )}
      </div>
    </>
  );
}
