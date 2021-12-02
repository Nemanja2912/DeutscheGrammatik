import React, { useState, createRef, useEffect, useRef } from "react";
import "../css/game4.css";
import Line from "./line";
import Image from "../assets/game4/2.jpg";
import Indicator from "./../component/indicator";
import Info from "../component/info";
import Finger from "../assets/img/finger.svg";

const line1 = ["Leonie", "eine Burg."];
const line2 = ["Ihr Vater", "ihr", "etwas über die Burg"];
const line3 = ["Am Nachmittag", "alle", "dorthin"];

const Group2 = ({ endSession }) => {
  const [lineShow, setLineShow] = useState(0);
  const [indicator, setIndicator] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [info, setInfo] = useState(false);
  const [fingerPos, setFingerPos] = useState([window.innerWidth - 100, 100]);
  const [fingerHide, setFingerHide] = useState(false);
  const [fingerShow, setFingerShow] = useState(false);
  const verbRef = useRef();
  const helpRef = useRef();
  const [disable, setDisable] = useState(false);

  const handleHelp = () => {
    if (disable || lineShow === 3) return;
    setFingerShow(true);
    setDisable(true);

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
        setDisable(false);
      }, 1500);
      setTimeout(() => {
        setFingerHide(false);
      }, 0);
    }, 2000);
  };

  useEffect(() => {
    if (lineShow === 3) {
      endSession();
    }
  }, [lineShow]);

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
      <div
        className="image"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize:
            lineShow === 0
              ? "500%"
              : lineShow === 1
              ? "350%"
              : lineShow === 2
              ? "200%"
              : lineShow === 3
              ? "100%"
              : "",
          backgroundPosition:
            lineShow === 0 ? "65% 20%" : lineShow === 1 ? "60% 30%" : "30% 20%",
        }}
      ></div>
      {lineShow === 0 ? (
        <Line
          verbRef={verbRef}
          helpRef={helpRef}
          setFingerPos={setFingerPos}
          line={line1}
          verb="sieht"
          setIndicator={setIndicator}
          setWrong={setWrong}
          solved={() => setLineShow((prev) => prev + 1)}
        />
      ) : (
        ""
      )}
      {lineShow === 1 ? (
        <Line
          verbRef={verbRef}
          helpRef={helpRef}
          setFingerPos={setFingerPos}
          line={line2}
          verb="erzählt"
          setIndicator={setIndicator}
          setWrong={setWrong}
          solved={() => setLineShow((prev) => prev + 1)}
        />
      ) : (
        ""
      )}
      {lineShow === 2 ? (
        <Line
          verbRef={verbRef}
          helpRef={helpRef}
          setFingerPos={setFingerPos}
          line={line3}
          verb="gehen"
          setIndicator={setIndicator}
          setWrong={setWrong}
          solved={() => setLineShow((prev) => prev + 1)}
        />
      ) : (
        ""
      )}
      <Indicator indicator={indicator} wrong={false} />
      <Indicator indicator={wrong} wrong={true} />
      {lineShow === 3 && (
        <div className="result">
          <div className="result-line">
            Leonie <span className="verb">seiht</span> eine Burg.
          </div>
          <div className="result-line">
            Ihr Vater <span className="verb">erzählt</span> ihr etwas über die
            Burg
          </div>
          <div className="result-line">
            Am Nachmittag <span className="verb">gehen</span> alle dorthin
          </div>
        </div>
      )}
    </>
  );
};

export default Group2;
