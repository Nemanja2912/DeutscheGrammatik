import React, { useState, useRef, useEffect } from "react";
import "../css/game1.css";
import MediaBox from "./mediaBox";
import Finger from "../assets/img/finger.svg";
import Play from "../assets/img/play.svg";
import Indicator from "../component/indicator";
import Info from "../component/info";

let myTimeout;

const Game1 = () => {
  const [level, setLevel] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  const [play, setPlay] = useState(false);
  const [info, setInfo] = useState(true);
  const [text, setText] = useState("");
  const [topPos, setTopPos] = useState(0);
  const [leftPos, setLeftPos] = useState(0);
  const [fingerPos, setFingerPos] = useState([100, window.innerWidth - 100]);
  const [fingerHide, setFingerHide] = useState(false);
  const [fingerShow, setFingerShow] = useState(false);

  let imageList = [];

  for (let i = 1; i < 11; i++) {
    imageList.push(
      <img
        style={{ opacity: level >= i ? 1 : 0.5 }}
        src={require(`../assets/game1/${i}.jpg`).default}
        alt=""
      />
    );
  }

  const span1Ref = useRef(null);
  const span2Ref = useRef(null);
  const span3Ref = useRef(null);
  const span4Ref = useRef(null);
  const span5Ref = useRef(null);
  const span6Ref = useRef(null);
  const span7Ref = useRef(null);
  const span8Ref = useRef(null);
  const span9Ref = useRef(null);
  const span10Ref = useRef(null);
  const span11Ref = useRef(null);
  const span12Ref = useRef(null);
  const span13Ref = useRef(null);
  const span14Ref = useRef(null);
  const span15Ref = useRef(null);
  const span16Ref = useRef(null);
  const span17Ref = useRef(null);
  const span18Ref = useRef(null);
  const span19Ref = useRef(null);
  const span20Ref = useRef(null);
  const span21Ref = useRef(null);
  const span22Ref = useRef(null);
  const span23Ref = useRef(null);
  const span24Ref = useRef(null);
  const span25Ref = useRef(null);
  const span26Ref = useRef(null);
  const span27Ref = useRef(null);
  const span28Ref = useRef(null);

  const correctRef1 = useRef(null);
  const correctRef2 = useRef(null);
  const correctRef3 = useRef(null);
  const correctRef4 = useRef(null);
  const correctRef5 = useRef(null);
  const correctRef6 = useRef(null);
  const correctRef7 = useRef(null);
  const correctRef8 = useRef(null);
  const correctRef9 = useRef(null);
  const correctRef10 = useRef(null);

  const handleError = (element, text) => {
    clearTimeout(myTimeout);
    setText(text);
    setError(true);
    setTopPos(element.current.offsetTop);
    setLeftPos(
      element.current.offsetLeft - (87.5 - element.current.offsetWidth / 2)
    );
    element.current.classList.add("shake");

    setTimeout(() => {
      element.current.classList.remove("shake");
    }, 1000);

    myTimeout = setTimeout(() => {
      setError(false);
      console.log("remove");
    }, 5000);
  };

  let imageUrl = require(`../assets/game1/${
    level === 10 ? 10 : level + 1
  }.jpg`).default;

  const handleHelp = () => {
    if (level > 9) return;

    setFingerShow(true);

    if (level === 0) {
      correctRef1.current.click();
      setFingerPos([
        correctRef1.current.offsetTop + 5,
        correctRef1.current.offsetLeft + 5,
      ]);
    }
    if (level === 1) {
      correctRef2.current.click();
      setFingerPos([
        correctRef2.current.offsetTop + 5,
        correctRef2.current.offsetLeft + 5,
      ]);
    }
    if (level === 2) {
      correctRef3.current.click();
      setFingerPos([
        correctRef3.current.offsetTop + 5,
        correctRef3.current.offsetLeft + 5,
      ]);
    }
    if (level === 3) {
      correctRef4.current.click();
      setFingerPos([
        correctRef4.current.offsetTop + 5,
        correctRef4.current.offsetLeft + 5,
      ]);
    }
    if (level === 4) {
      correctRef5.current.click();
      setFingerPos([
        correctRef5.current.offsetTop + 5,
        correctRef5.current.offsetLeft + 5,
      ]);
    }
    if (level === 5) {
      correctRef6.current.click();
      setFingerPos([
        correctRef6.current.offsetTop + 5,
        correctRef6.current.offsetLeft + 5,
      ]);
    }
    if (level === 6) {
      correctRef7.current.click();
      setFingerPos([
        correctRef7.current.offsetTop + 5,
        correctRef7.current.offsetLeft + 5,
      ]);
    }
    if (level === 7) {
      correctRef8.current.click();
      setFingerPos([
        correctRef8.current.offsetTop + 5,
        correctRef8.current.offsetLeft + 5,
      ]);
    }
    if (level === 8) {
      correctRef9.current.click();
      setFingerPos([
        correctRef9.current.offsetTop + 5,
        correctRef9.current.offsetLeft + 5,
      ]);
    }
    if (level === 9) {
      correctRef10.current.click();
      setFingerPos([
        correctRef10.current.offsetTop + 5,
        correctRef10.current.offsetLeft + 5,
      ]);
    }

    setTimeout(() => {
      setFingerHide(true);
      setFingerShow(false);
      setFingerPos([100, window.innerWidth - 100]);

      setTimeout(() => {
        setFingerHide(false);
      }, 0);
    }, 2000);
  };

  return (
    <div className="game1">
      <div className="content">
        <div
          className="image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {level >= 10 && (
            <div className="play" onClick={() => setPlay(true)}>
              <img src={Play} alt="" />
            </div>
          )}
        </div>
        <Indicator indicator={correct} />

        {error && (
          <div
            className="error"
            style={{ position: "absolute", top: topPos + 50, left: leftPos }}
          >
            {text}
          </div>
        )}
        <div className="help-bar">
          <div className="info" onClick={() => setInfo(true)}>
            i
          </div>
          <div className="help" onClick={handleHelp}>
            ?
          </div>
        </div>
        <div className="text">
          {/* Level 0 */}
          <span
            ref={span1Ref}
            onClick={() => {
              if (level === 0) {
                handleError(
                  span1Ref,
                  `„Der Wecker“ ist kein Verb. Es ist ein Nomen mit Artikel. Versuch es
                  noch einmal.`
                );
              }
            }}
            className={`text-group1 ${level > 0 ? "disable" : ""}`}
          >
            Der Wecker
          </span>
          <span
            className={`text-group show ${level > 0 ? "selected" : ""}`}
            ref={correctRef1}
            onClick={() => {
              if (level === 0) {
                setError(false);
                setLevel(1);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            klingelt.
          </span>

          {/* Level 1 */}
          <span
            className={`text-group ${level > 0 ? "show" : ""} ${
              level > 1 ? "disable" : ""
            }`}
            ref={span2Ref}
            onClick={() => {
              if (level === 1) {
                handleError(
                  span2Ref,
                  `„Michaela“ ist kein Verb. Es ist ein Nomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            Michaela
          </span>
          <span
            className={`text-group ${level > 0 ? "show" : ""} ${
              level > 1 ? "selected" : ""
            }`}
            ref={correctRef2}
            onClick={() => {
              if (level === 1) {
                setError(false);
                setLevel(2);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            liegt
          </span>
          <span
            className={`text-group ${level > 0 ? "show" : ""} ${
              level > 1 ? "disable" : ""
            }`}
            ref={span3Ref}
            onClick={() => {
              if (level === 1) {
                handleError(
                  span3Ref,
                  ` „noch“ ist kein Verb. Tipp: „schlafen, hören, duschen“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            noch
          </span>
          <span
            className={`text-group ${level > 0 ? "show" : ""} ${
              level > 1 ? "disable" : ""
            }`}
            ref={span4Ref}
            onClick={() => {
              if (level === 1) {
                handleError(
                  span4Ref,
                  ` „im Bett“ ist kein Verb. Es ist ein Nomen mit Präposition. Versuch es noch einmal.`
                );
              }
            }}
          >
            im Bett.
          </span>

          {/* Level 2 */}
          <span
            className={`text-group ${level > 1 ? "show" : ""} ${
              level > 2 ? "disable" : ""
            }`}
            ref={span5Ref}
            onClick={() => {
              if (level === 2) {
                handleError(
                  span5Ref,
                  `„In der Küche“ ist kein Verb. Es ist ein Nomen mit Präposition und Artikel. Versuch es noch einmal.`
                );
              }
            }}
          >
            In der Küche
          </span>
          <span
            className={`text-group ${level > 1 ? "show" : ""}  ${
              level > 2 ? "selected" : ""
            }`}
            ref={correctRef3}
            onClick={() => {
              if (level === 2) {
                setError(false);
                setLevel(3);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            frühstückt
          </span>
          <span
            className={`text-group ${level > 1 ? "show" : ""} ${
              level > 2 ? "disable" : ""
            }`}
            ref={span6Ref}
            onClick={() => {
              if (level === 2) {
                handleError(
                  span6Ref,
                  `„sie“ ist kein Verb. Es ist ein Pronomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            sie
          </span>
          <span
            className={`text-group ${level > 1 ? "show" : ""} ${
              level > 2 ? "disable" : ""
            }`}
            ref={span7Ref}
            onClick={() => {
              if (level === 2) {
                handleError(
                  span7Ref,
                  `„schnell“ ist kein Verb. Es ist ein Adverb. Versuch es noch einmal.`
                );
              }
            }}
          >
            schnell.
          </span>

          {/* Level 3 */}
          <span
            className={`text-group ${level > 2 ? "show" : ""} ${
              level > 3 ? "disable" : ""
            }`}
            ref={span8Ref}
            onClick={() => {
              if (level === 3) {
                handleError(
                  span8Ref,
                  `„Danach“ ist kein Verb. Es ist eine Partikel. Versuch es noch einmal.`
                );
              }
            }}
          >
            Danach
          </span>
          <span
            className={`text-group ${level > 2 ? "show" : ""} ${
              level > 3 ? "selected" : ""
            }`}
            ref={correctRef4}
            onClick={() => {
              if (level === 3) {
                setError(false);
                setLevel(4);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            geht
          </span>
          <span
            className={`text-group ${level > 2 ? "show" : ""} ${
              level > 3 ? "disable" : ""
            }`}
            ref={span9Ref}
            onClick={() => {
              if (level === 3) {
                handleError(
                  span9Ref,
                  `„Michaela“ ist kein Verb. Es ist ein Nomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            Michaela
          </span>
          <span
            className={`text-group ${level > 2 ? "show" : ""} ${
              level > 3 ? "disable" : ""
            }`}
            ref={span10Ref}
            onClick={() => {
              if (level === 3) {
                handleError(
                  span10Ref,
                  `„aus dem Haus“ ist kein Verb. Tipp: „laufen, machen, essen“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            aus dem Haus.
          </span>

          {/* Level 4 */}
          <span
            className={`text-group ${level > 3 ? "show" : ""} ${
              level > 4 ? "disable" : ""
            }`}
            ref={span11Ref}
            onClick={() => {
              if (level === 4) {
                handleError(
                  span11Ref,
                  `„Auf dem Weg“ ist kein Verb. Tipp: „sprechen, gehen, fahren“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            Auf dem Weg
          </span>
          <span
            className={`text-group ${level > 3 ? "show" : ""}  ${
              level > 4 ? "selected" : ""
            }`}
            ref={correctRef5}
            onClick={() => {
              if (level === 4) {
                setError(false);
                setLevel(5);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            trifft
          </span>
          <span
            className={`text-group ${level > 3 ? "show" : ""} ${
              level > 4 ? "disable" : ""
            }`}
            ref={span12Ref}
            onClick={() => {
              if (level === 4) {
                handleError(
                  span12Ref,
                  `„Michaela“ ist kein Verb. Es ist ein Nomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            Michaela
          </span>
          <span
            className={`text-group ${level > 3 ? "show" : ""} ${
              level > 4 ? "disable" : ""
            }`}
            ref={span13Ref}
            onClick={() => {
              if (level === 4) {
                handleError(
                  span13Ref,
                  `„ihren Nachbarn Jürgen“ ist kein Verb. Tipp: „sprechen, gehen, fahren“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            ihren Nachbarn Jürgen.
          </span>

          {/* Level 5 */}
          <span
            className={`text-group ${level > 4 ? "show" : ""} ${
              level > 5 ? "disable" : ""
            }`}
            ref={span14Ref}
            onClick={() => {
              if (level === 5) {
                handleError(
                  span14Ref,
                  `„Sein Auto“ ist kein Verb. Es ist ein Nomen mit Artikel. Versuch es noch einmal.`
                );
              }
            }}
          >
            Sein Auto
          </span>
          <span
            className={`text-group ${level > 4 ? "show" : ""}  ${
              level > 5 ? "selected" : ""
            }`}
            ref={correctRef6}
            onClick={() => {
              if (level === 5) {
                setError(false);
                setLevel(6);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            ist
          </span>
          <span
            className={`text-group ${level > 4 ? "show" : ""} ${
              level > 5 ? "disable" : ""
            }`}
            ref={span15Ref}
            onClick={() => {
              if (level === 5) {
                handleError(
                  span15Ref,
                  `„kaputt“ ist kein Verb. Es ist ein Adjektiv. Versuch es noch einmal.`
                );
              }
            }}
          >
            kaputt.
          </span>

          {/* Level 6 */}
          <span
            className={`text-group ${level > 5 ? "show" : ""} ${
              level > 6 ? "disable" : ""
            }`}
            ref={span16Ref}
            onClick={() => {
              if (level === 6) {
                handleError(
                  span16Ref,
                  `„Michaela“ ist kein Verb. Es ist ein Nomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            Michaela
          </span>
          <span
            className={`text-group ${level > 5 ? "show" : ""} ${
              level > 6 ? "selected" : ""
            }`}
            ref={correctRef7}
            onClick={() => {
              if (level === 6) {
                setError(false);
                setLevel(7);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            repariert
          </span>
          <span
            className={`text-group ${level > 5 ? "show" : ""} ${
              level > 6 ? "disable" : ""
            }`}
            ref={span17Ref}
            onClick={() => {
              if (level === 6) {
                handleError(
                  span17Ref,
                  `„das Auto“ ist kein Verb. Es ist ein Nomen mit Artikel. Versuch es noch einmal.`
                );
              }
            }}
          >
            das Auto.
          </span>

          {/* Level 7 */}
          <span
            className={`text-group ${level > 6 ? "show" : ""} ${
              level > 7 ? "disable" : ""
            }`}
            ref={span18Ref}
            onClick={() => {
              if (level === 7) {
                handleError(
                  span18Ref,
                  `„Jürgen“ ist kein Verb. Es ist ein Nomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            Jürgen
          </span>
          <span
            className={`text-group ${level > 6 ? "show" : ""} ${
              level > 7 ? "selected" : ""
            }`}
            ref={correctRef8}
            onClick={() => {
              if (level === 7) {
                setError(false);
                setLevel(8);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            fährt
          </span>
          <span
            className={`text-group ${level > 6 ? "show" : ""} ${
              level > 7 ? "disable" : ""
            }`}
            ref={span19Ref}
            onClick={() => {
              if (level === 7) {
                handleError(
                  span19Ref,
                  `„sie“ ist kein Verb. Es ist ein Pronomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            sie
          </span>
          <span
            className={`text-group ${level > 6 ? "show" : ""} ${
              level > 7 ? "disable" : ""
            }`}
            ref={span20Ref}
            onClick={() => {
              if (level === 7) {
                handleError(
                  span20Ref,
                  `„in die Uni“ ist kein Verb. Tipp: „lernen, studieren, schreiben“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            in die Uni.
          </span>

          {/* Level 8 */}
          <span
            className={`text-group ${level > 7 ? "show" : ""} ${
              level > 8 ? "disable" : ""
            }`}
            ref={span21Ref}
            onClick={() => {
              if (level === 8) {
                handleError(
                  span21Ref,
                  `„Am Ende“ ist kein Verb. Es ist ein Nomen mit Präposition. Versuch es noch einmal.`
                );
              }
            }}
          >
            Am Ende
          </span>
          <span
            className={`text-group ${level > 7 ? "show" : ""} ${
              level > 8 ? "selected" : ""
            }`}
            ref={correctRef9}
            onClick={() => {
              if (level === 8) {
                setError(false);
                setLevel(9);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            ist
          </span>
          <span
            className={`text-group ${level > 7 ? "show" : ""} ${
              level > 8 ? "disable" : ""
            }`}
            ref={span22Ref}
            onClick={() => {
              if (level === 8) {
                handleError(
                  span22Ref,
                  `„sie“ ist kein Verb. Es ist ein Pronomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            sie
          </span>
          <span
            className={`text-group ${level > 7 ? "show" : ""} ${
              level > 8 ? "disable" : ""
            }`}
            ref={span23Ref}
            onClick={() => {
              if (level === 8) {
                handleError(
                  span23Ref,
                  `„aber“ ist kein Verb. Tipp: „kommen, telefonieren, schicken“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            aber
          </span>
          <span
            className={`text-group ${level > 7 ? "show" : ""} ${
              level > 8 ? "disable" : ""
            }`}
            ref={span24Ref}
            onClick={() => {
              if (level === 8) {
                handleError(
                  span24Ref,
                  `„pünktlich“ ist kein Verb. Tipp: „kommen, telefonieren, schicken“ sind Verben. Versuch es noch einmal.`
                );
              }
            }}
          >
            pünktlich
          </span>
          <span
            className={`text-group ${level > 7 ? "show" : ""} ${
              level > 8 ? "disable" : ""
            }`}
            ref={span25Ref}
            onClick={() => {
              if (level === 8) {
                handleError(
                  span25Ref,
                  `„dort“ ist kein Verb. Es ist ein Adverb. Versuch es noch einmal.`
                );
              }
            }}
          >
            dort.
          </span>

          {/* Level 9 */}
          <span
            className={`text-group ${level > 8 ? "show" : ""} ${
              level > 9 ? "disable" : ""
            }`}
            ref={span26Ref}
            onClick={() => {
              if (level === 9) {
                handleError(
                  span26Ref,
                  `„Am Abend“ ist kein Verb. Es ist ein Nomen mit Präposition. Versuch es noch einmal.`
                );
              }
            }}
          >
            Am Abend
          </span>
          <span
            className={`text-group ${level > 8 ? "show" : ""} ${
              level > 9 ? "selected" : ""
            }`}
            ref={correctRef10}
            onClick={() => {
              if (level === 9) {
                setError(false);
                setLevel(10);
                setCorrect(true);
                setTimeout(() => {
                  setCorrect(false);
                }, 500);
              }
            }}
          >
            sitzen
          </span>
          <span
            className={`text-group ${level > 8 ? "show" : ""} ${
              level > 9 ? "disable" : ""
            }`}
            ref={span27Ref}
            onClick={() => {
              if (level === 9) {
                handleError(
                  span27Ref,
                  `„sie“ ist kein Verb. Es ist ein Pronomen. Versuch es noch einmal.`
                );
              }
            }}
          >
            sie
          </span>
          <span
            className={`text-group ${level > 8 ? "show" : ""} ${
              level > 9 ? "disable" : ""
            }`}
            ref={span28Ref}
            onClick={() => {
              if (level === 9) {
                handleError(
                  span28Ref,
                  `„in einem Café“ ist kein Verb. Was machen Jürgen und Michaela im Café? Probiere es noch einmal.`
                );
              }
            }}
          >
            in einem Café.
          </span>
        </div>
      </div>
      <div className="images">{imageList}</div>
      {play && <MediaBox setPlay={setPlay} />}
      {info && (
        <Info setInfo={setInfo} desc="Lies den Satz und markiere das Verb." />
      )}

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
    </div>
  );
};

export default Game1;
