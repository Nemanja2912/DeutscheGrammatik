import React, { createRef, useState, useRef } from "react";
import "../css/game3v2.css";
import Linev2 from "./linev2";
import Info from "../component/info";
import Finger from "../assets/img/finger.svg";

const lists = [
  ["Michaela", "repariert", "das Auto."],
  ["Michaela", "geht", "in die Bibliothek.", "nach dem Seminar"],
  ["in einem Café.", "sitzen", "Sie", "am Abend"],
];

const Game3v2 = () => {
  const [lineShow, setLineShow] = useState(0);
  const [indicator, setIndicator] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [info, setInfo] = useState(true);
  const [fingerPos, setFingerPos] = useState([window.innerWidth - 100, 100]);
  const [fingerHide, setFingerHide] = useState(false);
  const [fingerShow, setFingerShow] = useState(false);
  const verbRef = useRef();
  const helpRef = useRef();

  const handleHelp = () => {
    setFingerShow(true);

    setFingerPos([
      verbRef.current.offsetLeft + 5,
      verbRef.current.offsetTop + 5,
    ]);
    setTimeout(() => {
      helpRef.current.click();
    }, 1000);

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
      {info && (
        <Info
          desc="Ziehe das Verb aus jedem Satz auf den blauen Balken."
          setInfo={setInfo}
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
    </>
  );
};

export default Game3v2;
