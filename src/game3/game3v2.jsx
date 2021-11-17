import React, { createRef, useEffect } from "react";
import "../css/game3v2.css";
import Linev2 from "./linev2";

const lists = [
  ["Michaela", "repariert", "das Auto."],
  ["Michaela", "geht", "in die Bibliothek.", "nach dem Seminar"],
  ["in einem Café.", "sitzen", "Sie", "am Abend"],
];

console.log(lists[0][3]);

const Game3v2 = () => {
  return (
    <div className="game3v2">
      {lists.map((list, index) => (
        <Linev2
          leftWord={list[0]}
          centerWord={list[1]}
          rightWord1={list[2]}
          rightWord2={list[3] === undefined ? false : list[3]}
          list={list}
          index={index + 1}
          nounIndex={index === 2 ? 2 : 0}
        />
      ))}
    </div>
  );
};

export default Game3v2;
