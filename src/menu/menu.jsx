import React, { useState, useEffect } from "react";
import Arrow from "../assets/img/arrow_down.svg";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import "../css/style.css";

const Menu = ({ navMenuItem, setNavMenuItem }) => {
  const [movePos, setMovePos] = useState(0);
  const [buttonAnimation, setButtonAnimation] = useState(false);

  const increaseMovePos = () => {
    if (movePos === 3) {
      setMovePos(0);
    } else {
      setMovePos(movePos + 1);
    }

    setButtonAnimation(true);
  };

  const setSpecificPos = (n) => {
    setMovePos(n);
  };

  useEffect(() => {
    if (movePos === 1) {
      setTimeout(() => {
        setButtonAnimation(false);
      }, 1000);
    }
  }, [movePos]);

  const handleOpenMenu = () => {
    if (movePos === 2) {
      setMovePos(3);
    } else {
      setMovePos(2);
    }
  };

  return (
    <div
      className={`menu ${
        movePos === 2 ? "menu-small" : movePos === 3 ? "menu-medium" : ""
      }`}
      onClick={() => {
        if (movePos === 2) handleOpenMenu();
      }}
    >
      <Screen1 movePos={movePos} />
      {movePos !== 0 && (
        <Screen2
          item={navMenuItem}
          changeItem={(n) => setNavMenuItem(n)}
          movePos={movePos}
          changePos={setSpecificPos}
        />
      )}
      <div
        onClick={increaseMovePos}
        className={`button ${buttonAnimation ? "buttonHidden" : ""}`}
      >
        WEITER
      </div>
      <div
        className={`info ${movePos === 1 || movePos === 2 ? "info-small" : ""}`}
      >
        DEUTSCHE <br />
        GRAMMATIK
      </div>
      <div className={`bottom ${movePos === 2 ? "bottomHide" : ""}`}>
        <p>Credits</p>
        <p>Impressum</p>
      </div>
      <div className="arrow" onClick={handleOpenMenu}>
        <img
          className={`image ${
            movePos === 2 || movePos === 3 ? "imageShow" : ""
          }`}
          style={{ transform: movePos === 3 ? "rotate(180deg)" : "rotate(0)" }}
          src={Arrow}
          alt=""
        />
      </div>
    </div>
  );
};

export default Menu;
