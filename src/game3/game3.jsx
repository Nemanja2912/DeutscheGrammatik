import React, { createRef, useState, useRef, useEffect } from "react";
import "../css/game3.css";
import Line from "./line";
import Info from "../component/info";
import Finger from "../assets/img/finger.svg";
import Regel from "./regel";
import Regel2 from "./regel2";

const lists = [
  ["Michaela", "repariert", "das Auto"],
  ["Michaela", "geht", "in die Bibliothek", "nach dem Seminar"],
  ["in einem Café", "sitzen", "Sie", "am Abend"],
];

const Game3 = ({ nextLesson }) => {
  const [infoDesc, setInfoDesc] = useState(
    <>
      <p>Verschiebe die Satzteile.</p>
      <p>Was kannst du verschieben, was bleibt immer stehen?</p>
    </>
  );
  const [info, setInfo] = useState(true);
  const [fingerPos, setFingerPos] = useState([window.innerWidth - 100, 100]);
  const [fingerHide, setFingerHide] = useState(false);
  const [fingerShow, setFingerShow] = useState(false);
  const helpRef = [useRef(), useRef(), useRef()];
  const regelHelpRef = useRef();
  const [regel, setRegel] = useState(0);
  const [regel2, setRegel2] = useState(false);
  const [wrongPos1, setWrongPos1] = useState(false);
  const [wrongPos2, setWrongPos2] = useState(false);

  const [answer, setAnswer] = useState([true, false, false]);
  const [interaction, setInteraction] = useState([false, false, false]);
  const answerResult = [
    [0, 1, 2],
    [0, 1, 3, 2],
    [3, 1, 0, 2],
  ];

  const resultArr = [
    [0, 1, 2],
    [0, 1, 3, 2],
    [2, 1, 3, 0],
  ];

  const answerPos = [
    [0, 0, 0],
    [0, 0, 188.038, -161.512],
    [403.3, 0, -196.237, -46.2375],
  ];

  const [result, setResult] = useState(false);

  useEffect(() => {
    let result = true;
    for (let i = 0; i < answer.length; i++) {
      if (!answer[i]) result = false;
    }

    if (result) {
      setInfoDesc("Lies die Sätze und formuliere die Regel.");

      setResult(true);
      setInfo(true);
    }
  }, [answer]);

  useEffect(() => {
    let result = true;
    for (let i = 0; i < interaction.length; i++) {
      if (!interaction[i]) result = false;
    }

    if (result) {
      setInfoDesc("Lies die Sätze und formuliere die Regel.");

      setResult(true);
      setInfo(true);
    }
  }, [interaction]);

  const handleHelp = () => {
    setFingerShow(true);
    if (result) {
      regelHelpRef.current.click();
    } else {
      for (let i = 0; i < answer.length; i++) {
        if (!answer[i]) {
          helpRef[i].current.click();
          break;
        }
      }
    }

    setTimeout(() => {
      setFingerHide(true);
      setFingerShow(false);
      setFingerPos([window.innerWidth - 100, 100]);

      setTimeout(() => {
        setFingerHide(false);
      }, 0);
    }, 2000);
  };

  return (
    <>
      {wrongPos1 && (
        <div className="wrong1">
          Das ist leider falsch. Diese Wörter stehen auf Position 1.
        </div>
      )}
      {wrongPos2 && (
        <div className="wrong1 wrong2">
          Das ist leider falsch. Diese Wörter stehen auf Position 3.
        </div>
      )}
      {info && <Info desc={infoDesc} setInfo={setInfo} />}
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
      <div className="game3v2">
        {lists.map((list, index) => (
          <Line
            leftWord={list[0]}
            centerWord={list[1]}
            rightWord1={list[2]}
            rightWord2={list[3] === undefined ? false : list[3]}
            list={list}
            index={index + 1}
            nounIndex={index === 2 ? 2 : 0}
            answerResult={answerResult[index]}
            result={result}
            resultArr={resultArr[index]}
            answerPos={answerPos[index]}
            helpRef={helpRef[index]}
            setFingerPos={setFingerPos}
            setInteraction={(par) =>
              setInteraction((prev) => {
                console.log(par);
                let answ = [...prev];
                answ[index] = par;
                return answ;
              })
            }
            setAnswer={(par) =>
              setAnswer((prev) => {
                let answ = [...prev];
                answ[index] = par;
                return answ;
              })
            }
            wrongPos1={wrongPos1}
            wrongPos2={wrongPos2}
          />
        ))}
        {result && !regel2 && (
          <Regel
            regel={regel}
            setRegel={setRegel}
            setRegel2={setRegel2}
            helpRef={regelHelpRef}
            setFingerPos={setFingerPos}
          />
        )}
        {result && regel2 && (
          <Regel2
            regel={regel}
            setRegel={setRegel}
            helpRef={regelHelpRef}
            setFingerPos={setFingerPos}
            setWrongPos1={setWrongPos1}
            setWrongPos2={setWrongPos2}
          />
        )}

        {regel >= 2 && (
          <div onClick={nextLesson} className={`button`}>
            WEITER
          </div>
        )}
      </div>
    </>
  );
};

export default Game3;
