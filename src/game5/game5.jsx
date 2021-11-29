import React, { useState, useRef, useEffect, createRef } from "react";
import Indicator from "../component/indicator";
import Info from "../component/info";
import "../css/game5.css";
import Line1 from "./line1";
import Finger from "../assets/img/finger.svg";
import Ende from "./../component/ende";

const lines = [
  {
    verbs: ["Jürgen und Michaela", "bleiben"],
    lastRest: "sehr lange im Café.",
  },
  {
    firstRest: "Danach",
    verbs: ["gehen", "sie"],
    lastRest: "ins Kino.",
  },
  {
    firstRest: "Vor dem Kino",
    verbs: ["warten", "ihre Freunde."],
  },
  {
    verbs: ["Sie", "schauen"],
    lastRest: "eine Komödie.",
  },
  {
    firstRest: "Alle",
    verbs: ["haben", "gute Laune."],
  },
  {
    firstRest: "Zusammen",
    verbs: ["gehen", "die Freunde"],
    lastRest: "ins Restaurant.",
  },
  {
    verbs: ["Dort", "essen"],
    lastRest: "sie Suppe und Kartoffelsalat.",
  },
  {
    firstRest: "Danach",
    verbs: ["gehen", "alle"],
    lastRest: "nach Hause.",
  },
  {
    firstRest: "Morgen",
    verbs: ["haben", "Michaela und Jürgen"],
    lastRest: "wieder ein Treffen.",
  },
];

let helpActive = false;

const Game5 = () => {
  const [indicator, setIndicator] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [info, setInfo] = useState(false);
  const [fingerPos, setFingerPos] = useState([window.innerWidth - 100, 100]);
  const [fingerHide, setFingerHide] = useState(false);
  const [fingerShow, setFingerShow] = useState(false);
  const [ende, setEnde] = useState(false);

  const verbRefs = [];
  const helpRefs = [];

  for (let i = 0; i < lines.length; i++) {
    verbRefs[i] = [createRef(), createRef()];
    helpRefs[i] = createRef();
  }

  const [step, setStep] = useState(0);

  const handleHelp = () => {
    if (step > 8 || helpActive) return;
    helpActive = true;
    setFingerShow(true);

    helpRefs[step].current.click();

    setTimeout(() => {
      setFingerHide(true);
      setFingerShow(false);
      setFingerPos([window.innerWidth - 100, 100]);

      setTimeout(() => {
        setFingerHide(false);
      }, 0);

      setTimeout(() => {
        helpActive = false;
      }, 1000);
    }, 2000);
  };

  return (
    <>
      {info && <Info desc="Ergänze die Sätze." setInfo={setInfo} />}
      {ende && <Ende setEnde={setEnde} />}
      <div className="help-overlay" style={{ opacity: fingerShow ? 1 : 0 }}>
        {!fingerHide && (
          <img
            src={Finger}
            alt=""
            style={{
              left: fingerPos[0],
              top: fingerPos[1],
            }}
            className={`${fingerShow ? "show" : ""}`}
          />
        )}
      </div>
      <div className="game5">
        <div className="help-bar">
          <div className="info" onClick={() => setInfo(true)}>
            i
          </div>
          <div className="help" onClick={handleHelp}>
            ?
          </div>
        </div>
        <div className="help-overlay" style={{ opacity: fingerShow ? 1 : 0 }}>
          {!fingerHide && (
            <img
              src={Finger}
              alt=""
              style={{
                left: fingerPos[0],
                top: fingerPos[1],
              }}
              className={`${fingerShow ? "show" : ""}`}
            />
          )}
        </div>
        <div className="text">
          {lines.map((line, index) => {
            return (
              <>
                {step >= index && (
                  <Line1
                    firstRest={line.firstRest}
                    lastRest={line.lastRest}
                    verbs={line.verbs}
                    setStep={() => setStep(index + 1)}
                    verb1Ref={verbRefs[index][0]}
                    verb2Ref={verbRefs[index][1]}
                    helpRef={helpRefs[index]}
                    setFingerPos={setFingerPos}
                    setIndicator={setIndicator}
                    setWrong={setWrong}
                  />
                )}
              </>
            );
          })}
        </div>
        <Indicator indicator={indicator} wrong={false} />
        <Indicator indicator={wrong} wrong={true} />
        {step >= 9 && (
          <div
            className={`button`}
            onClick={() => {
              setEnde(true);
            }}
          >
            ENDE
          </div>
        )}
      </div>
    </>
  );
};

export default Game5;
