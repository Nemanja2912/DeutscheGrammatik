import React, { useState, useRef, useEffect, createRef } from "react";
import "../css/game3.css";
import Line from "./line";
import Line1 from "./line1";
import Line2 from "./line2";
import Line3 from "./line3";

const lists = [
  ["Michaela", "repariert", "das Auto."],
  ["Michaela", "geht", "in die Bibliothek.", "nach dem Seminar"],
  ["in einem Café.", "sitzen", "Sie", "am Abend"],
];

const Game3 = () => {
  return (
    <div className="game3">
      {lists.map((list, index) => (
        <Line list={list} index={index + 1} nounIndex={index === 2 ? 2 : 0} />
      ))}
    </div>
  );
};

export default Game3;
