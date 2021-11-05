import React, { useEffect, useState } from "react";
import "./css/general.css";
import Game1 from "./game1/game1";
import Game2 from "./game2/game2";
import Menu from "./menu/menu";

function App() {
  const [navMenuItem, setNavMenuItem] = useState(0);

  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute("content", "width=1000", "initial-scale=1");

    document.firstElementChild.style.zoom = 1;
  }, []);

  return (
    <div className="App">
      <Menu navMenuItem={navMenuItem} setNavMenuItem={setNavMenuItem} />
      {navMenuItem === 0 ? <Game1 /> : ""}
      {navMenuItem === 1 ? <Game2 /> : ""}
    </div>
  );
}

export default App;
