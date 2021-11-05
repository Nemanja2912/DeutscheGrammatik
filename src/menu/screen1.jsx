import React, { useState, useEffect } from "react";

const Screen1 = ({ movePos }) => {
  const [textNone, setTextNone] = useState(false);

  useEffect(() => {
    if (movePos === 1) {
      setTimeout(() => {
        setTextNone(true);
      }, 1000);
    }
  });

  return (
    <>
      <div
        className={`top ${movePos !== 0 ? "move" : ""} ${
          movePos === 2 ? "move2" : ""
        }`}
      >
        <p className={`title`}>Interaktive Grammatik</p>
        <p className="subtitle">Position des Verbs im Aussagesatz</p>
      </div>
      {textNone ? (
        ""
      ) : (
        <p className={`text ${movePos !== 0 ? "hidden" : ""}`}>
          Wo steht das Verb im Aussagesatz? Dafür gibt es eine Regel.
          <br />
          Diese Regel kannst du in dieser Lektion lernen oder wiederholen.
        </p>
      )}
    </>
  );
};

export default Screen1;