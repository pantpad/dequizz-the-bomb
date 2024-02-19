import BombTimer from "./BombTimer";
import BombScreen from "./BombScreen";
import BombAnswers from "./BombAnswers";

export default function Bomb() {
  return (
    <>
      <main className="bomb">
        <BombScreen />
        <BombTimer />
        <BombAnswers />
      </main>
    </>
  );
}
