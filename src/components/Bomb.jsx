import { useContext } from "react";
import { BombContext } from "../store/bomb-context";

import BombTimer from "./BombTimer";
import BombScreen from "./BombScreen";
import BombAnswers from "./BombAnswers";
import Summary from "./Summary";

export default function Bomb() {
  const { status } = useContext(BombContext);

  return (
    <>
      <main className="bomb">
        {status !== "game-over" ? (
          <>
            <BombScreen />
            <BombTimer />
            <BombAnswers />
          </>
        ) : (
          <Summary />
        )}
      </main>
    </>
  );
}

// const shuffledAnswers = useRef();

// if (!shuffledAnswers.current) {
//   shuffledAnswers.current = [...answers];
// //   shuffledAnswers.current.sort(() => Math.random() - 0.5);
// }
//
