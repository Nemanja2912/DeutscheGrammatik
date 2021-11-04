import React, { useState, useEffect, useRef, createRef } from "react";
import "../css/game2.css";

const texts = [
  "Der Wecker klingelt. ",
  "Michaela liegt noch im Bett.",
  "In der Küche frühstückt sie schnell.",
  "Danach geht Michaela aus dem Haus.",
  "Auf dem Wegtrifft Michaela ihren Nachbarn Jürgen.",
  "Sein Auto ist kaputt.",
  "Michaela repariert das Auto.",
  "Jürgen fährt sie in die Uni.",
  "Am Ende ist sie aber pünktlich dort.",
  "Am Abend sitzen sie in einem Café.",
];

const verbs = [
  "klingelt.",
  "liegt",
  "frühstückt",
  "geht",
  "ihren",
  "ist",
  "repariert",
  "fährt",
  "ist",
  "sitzen",
];

let index = 0;
for (let sentence of texts) {
  texts[index] = texts[index].split(" ");
  index++;
}

const Game2 = () => {
  const blueBoxRef = useRef(null);
  const [step, setStep] = useState(0);
  const [pos, setPos] = useState([]);
  const lineRef = useRef([]);
  const verbRef = useRef([]);

  const position = [];

  verbRef.current = texts.map((el, i) => verbRef.current[i] ?? createRef());
  lineRef.current = texts.map((el, i) => lineRef.current[i] ?? createRef());

  for (let i = 0; i < texts.length; i++) {
    position[i] = [0, 0];
  }

  const [linePos, setLinePos] = useState([...position]);

  const handleMove = (num) => {
    let cursorY;
    let cursorX;

    let initX = verbRef.current[num].current.getBoundingClientRect().left;
    let initY = verbRef.current[num].current.getBoundingClientRect().top;

    let position = [...linePos];
    function moveCursor(e) {
      position[num] = [e.clientX - pos[0], e.clientY - pos[1]];
      setLinePos([...position]);
      cursorY = e.clientY;
      cursorX = e.clientX;
    }

    window.addEventListener("mousemove", moveCursor);

    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", moveCursor);

      let blueBox = blueBoxRef.current.getBoundingClientRect();

      if (
        cursorY > blueBox.top + step * 40 &&
        cursorY < blueBox.top + (step + 1) * 40 &&
        cursorX > blueBox.left &&
        cursorX < blueBox.left + 100
      ) {
        position[num] = [
          blueBox.left - initX,
          //  +
          // (blueBoxRef.current.offsetWidth -
          //   verbRef.current[num].current.offsetWidth) /
          //   2
          blueBox.top - initY + ((step + 1) * 40 - 30),
        ];
        setLinePos([...position]);

        verbRef.current[num].current.style.margin = `0 ${
          (blueBoxRef.current.offsetWidth -
            verbRef.current[num].current.offsetWidth) /
          2
        }px`;

        setStep(num + 1);
      } else {
        position[num] = [0, 0];
        setLinePos([...position]);
      }
    });
  };

  return (
    <div className="game2">
      <div className="drop-area">
        <div
          className="blue-box"
          ref={blueBoxRef}
          style={{ height: `${10 * (step + 1)}%` }}
        ></div>
      </div>
      <div className="texts">
        {texts.map((texts, i) => (
          <div
            className="line"
            style={{ left: linePos[i][0], top: linePos[i][1] }}
            ref={lineRef.current[i]}
          >
            {texts.map((word) => {
              if (word === verbs[i])
                return (
                  <>
                    <span
                      className="click-area"
                      onMouseDown={() => {
                        if (step !== i) return;
                        handleMove(i);
                      }}
                      onMouseMove={(e) => {
                        setPos([e.clientX, e.clientY]);
                      }}
                      ref={verbRef.current[i]}
                    >
                      {verbs[i]}
                    </span>{" "}
                  </>
                );
              return word + " ";
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game2;
