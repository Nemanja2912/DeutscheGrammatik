import React, { useState, useEffect, useRef, createRef } from "react";
import Indicator from "../component/indicator";
import Info from "../component/info";
import "../css/game2.css";
import Finger from "../assets/img/finger.svg";

const texts = [
  "Der Wecker klingelt. ",
  "Michaela liegt noch im Bett.",
  "In der Küche frühstückt sie schnell.",
  "Danach geht Michaela aus dem Haus.",
  "Auf dem Weg trifft Michaela ihren Nachbarn Jürgen.",
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
  "trifft",
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

const Game2 = ({ nextLesson }) => {
  const [activeHelp, setActiveHelp] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [step, setStep] = useState(0);
  const [pos, setPos] = useState([]);
  const [info, setInfo] = useState(true);
  const blueBoxRef = useRef(null);
  const dropBoxRef = useRef(null);
  const lineRef = useRef([]);
  const verbRef = useRef([]);
  const [lessonBtn, setLessonBtn] = useState(false);

  const [fingerPos, setFingerPos] = useState([100, window.innerWidth - 100]);
  const [fingerHide, setFingerHide] = useState(false);
  const [fingerShow, setFingerShow] = useState(false);

  const position = [];

  verbRef.current = texts.map((el, i) => verbRef.current[i] ?? createRef());
  lineRef.current = texts.map((el, i) => lineRef.current[i] ?? createRef());

  for (let i = 0; i < texts.length; i++) {
    position[i] = [0, 0];
  }

  const [linePos, setLinePos] = useState([...position]);

  const handleMove = (num) => {
    if (num > 10) return;

    let cursorY;
    let cursorX;

    lineRef.current[
      num
    ].current.style.width = `${lineRef.current[num].current.offsetWidth}px`;

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

    function mouseUp() {
      window.removeEventListener("mousemove", moveCursor);

      let blueBox = blueBoxRef.current.getBoundingClientRect();

      let dropBox = dropBoxRef.current;

      if (
        cursorY > blueBox.top &&
        cursorY < blueBox.top + (step + 1) * (dropBox.offsetHeight / 10) &&
        cursorX > blueBox.left &&
        cursorX < blueBox.left + blueBoxRef.current.offsetWidth
      ) {
        position[num] = [
          blueBox.left - initX,
          blueBox.top -
            initY +
            step * (dropBox.offsetHeight / 10) +
            (dropBox.offsetHeight / 10 -
              lineRef.current[num].current.offsetHeight) /
              2,
        ];
        setLinePos([...position]);

        verbRef.current[num].current.style.margin = `0 ${
          (blueBoxRef.current.offsetWidth -
            verbRef.current[num].current.offsetWidth) /
          2
        }px`;

        if (num === 9) {
          setStep(9);
          setLessonBtn(true);
        } else {
          setStep(num + 1);
        }

        setWrong(false);
        setIndicator(true);
        setTimeout(() => {
          setIndicator(false);
        }, 500);
      } else {
        position[num] = [0, 0];
        setLinePos([...position]);

        setWrong(true);
        setIndicator(true);
        setTimeout(() => {
          setIndicator(false);
        }, 500);
      }
      window.removeEventListener("mouseup", mouseUp);
    }

    window.addEventListener("mouseup", mouseUp);
  };

  const handleHelp = () => {
    if (activeHelp) return;
    setActiveHelp(true);
    setFingerShow(true);
    lineRef.current[
      step
    ].current.style.width = `${lineRef.current[step].current.offsetWidth}px`;

    let initX = verbRef.current[step].current.getBoundingClientRect().left;
    let initY = verbRef.current[step].current.getBoundingClientRect().top;

    console.log(verbRef.current[step].current.offsetLeft);
    console.log(verbRef.current[step].current.offsetTop);
    console.log(initY);
    setFingerPos([initY + 15, initX + 10]);

    lineRef.current[step].current.style.transition = "1s";

    setTimeout(() => {
      let blueBox = blueBoxRef.current.getBoundingClientRect();

      let dropBox = dropBoxRef.current;

      let position = [...linePos];

      position[step] = [
        blueBox.left - initX,
        blueBox.top -
          initY +
          step * (dropBox.offsetHeight / 10) +
          (dropBox.offsetHeight / 10 -
            lineRef.current[step].current.offsetHeight) /
            2,
      ];

      setFingerPos([
        blueBoxRef.current.offsetTop + step * (dropBox.offsetHeight / 10) + 10,
        blueBoxRef.current.offsetLeft + blueBoxRef.current.offsetWidth / 3 - 10,
      ]);

      setLinePos([...position]);

      setTimeout(() => {
        verbRef.current[step].current.style.margin = `0 ${
          (blueBoxRef.current.offsetWidth -
            verbRef.current[step].current.offsetWidth) /
          2
        }px`;

        if (step === 9) {
          setStep(9);
        } else {
          setStep((prev) => prev + 1);
        }

        setWrong(false);
        setIndicator(true);
        setTimeout(() => {
          setIndicator(false);
        }, 500);

        setTimeout(() => {
          setFingerShow(false);
          setFingerPos([100, window.innerWidth - 100]);
          setActiveHelp(false);
        }, 1000);
      }, 1000);
    }, 1000);
    // lineRef.current[step].current.style.transition = "0s";
  };

  return (
    <>
      <div className="help-overlay" style={{ opacity: fingerShow ? 1 : 0 }}>
        {!fingerHide && (
          <img
            src={Finger}
            alt=""
            style={{
              top: fingerPos[0],
              left: fingerPos[1],
            }}
            className={`${fingerShow ? "show" : ""}`}
          />
        )}
      </div>
      {info && (
        <Info
          setInfo={setInfo}
          desc="Ziehe das Verb aus jedem Satz auf den blauen Balken."
        />
      )}
      <div className="help-bar">
        <div className="info" onClick={() => setInfo(true)}>
          i
        </div>
        <div className="help" onClick={handleHelp}>
          ?
        </div>
      </div>
      <div className="game2">
        <div className="drop-area" ref={dropBoxRef}>
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
              <div className="line-wrap">
                {texts.map((word) => {
                  if (word === verbs[i])
                    return (
                      <>
                        <span
                          className={`click-area ${
                            step === i ? "active-verb" : ""
                          }`}
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
            </div>
          ))}
        </div>
        <Indicator indicator={indicator} wrong={wrong} />
        {lessonBtn && (
          <div onClick={nextLesson} className={`button`}>
            WEITER
          </div>
        )}
      </div>
    </>
  );
};

export default Game2;
