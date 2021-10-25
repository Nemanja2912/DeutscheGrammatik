import React, { useEffect } from "react";
import "./css/style.css";
import Menu from "./menu/menu";

function App() {
  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute("content", "width=1000", "initial-scale=1");

    document.firstElementChild.style.zoom = 1;
  }, []);

  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;
