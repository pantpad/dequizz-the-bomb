import Bomb from "./components/Bomb";
import questions from "./utils/questions";

console.log(questions);

function App() {
  return (
    <>
      <h2 className="title">Are you a pro? Click to find out</h2>
      <Bomb></Bomb>
    </>
  );
}

export default App;
