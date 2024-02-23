import Bomb from "./components/Bomb";
import BombContextProvider from "./store/bomb-context";
function App() {
  //mettere provider dentro bomb
  return (
    <>
      <h2 className="title">7355608</h2>
      <BombContextProvider>
        <Bomb></Bomb>
      </BombContextProvider>
    </>
  );
}

export default App;
