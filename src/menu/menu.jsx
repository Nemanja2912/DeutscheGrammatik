import React, { useState } from "react";
import Arrow from "../assets/img/arrow_down.svg";

const Menu = () => {
  const [move, setMove] = useState(false);
  const [move2, setMove2] = useState(false);
  const [textNone, setTextNone] = useState(false);
  const handleMove = () => {
    setMove(true);
    setTimeout(() => {
      setTextNone(true);
    }, 1000);
  };

  const handleMove2 = () => {
    setMove2(true);
  };

  return (
    <div className={`menu ${move2 ? "menu-small" : ""}`}>
      <div className={`top ${move ? "move" : ""} ${move2 ? "move2" : ""}`}>
        <p className={`title`}>Interaktive Grammatik</p>
        <p className="subtitle">Position des Verbs im Aussagesatz</p>
      </div>
      {textNone ? (
        ""
      ) : (
        <p className={`text ${move ? "hidden" : ""}`}>
          Wo steht das Verb im Aussagesatz? Dafür gibt es eine Regel.
          <br />
          Diese Regel kannst du in dieser Lektion lernen oder wiederholen.
        </p>
      )}
      <div
        className={`next ${move ? "nextShow" : ""} ${move2 ? "nextShow2" : ""}`}
      >
        <div className="title">1. VERB MARKIEREN</div>
        <div className="subtitle">WO STEHT DAS VERB?</div>
        <p style={{ display: move2 ? "none" : "block" }}>
          Hier arbeitest du mit Sätzen und markierst das Verb. Am Ende siehst du
          eine Audio-Bilder-Geschichte.
        </p>
      </div>
      <div
        onClick={handleMove}
        className={`button ${move ? "buttonHidden" : ""}`}
      >
        WEITER
      </div>
      <div
        onClick={handleMove2}
        className={` button2 ${move ? "buttonShow" : ""}`}
        style={{ display: move2 ? "none" : "block" }}
      >
        WEITER
      </div>
      <div className={`info ${move2 ? "info-small" : ""}`}>
        DEUTSCHE <br />
        GRAMMATIK
      </div>
      <div className={`bottom ${move2 ? "bottomHide" : ""}`}>
        <p>Credits</p>
        <p>Impressum</p>
      </div>
      <div className="arrow">
        <img
          className={`image ${move2 ? "imageShow" : ""}`}
          src={Arrow}
          alt=""
        />
      </div>
    </div>
  );
};

export default Menu;
