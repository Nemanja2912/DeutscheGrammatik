import React, { useState } from "react";
import Group1 from "./group1";
import Group2 from "./group2";
import Group3 from "./group3";

const Game4 = ({ nextLesson }) => {
  const [buttonAnimation, setButtonAnimation] = useState(true);
  const [movePos, setMovePos] = useState(0);

  const increaseMovePos = () => {
    setMovePos((prev) => prev + 1);

    if (movePos === 2) nextLesson();

    setButtonAnimation(true);
  };

  return (
    <div className="game4">
      {movePos === 0 ? (
        <Group1 endSession={() => setButtonAnimation(false)} />
      ) : movePos === 1 ? (
        <Group2 endSession={() => setButtonAnimation(false)} />
      ) : (
        <Group3 endSession={() => setButtonAnimation(false)} />
      )}
      <div
        onClick={increaseMovePos}
        className={`button ${buttonAnimation ? "buttonHidden" : ""}`}
      >
        WEITER
      </div>
    </div>
  );
};

export default Game4;
