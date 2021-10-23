import React, { useState, useEffect } from "react";

const Screen2 = ({ movePos, changePos, item, changeItem }) => {
  const [opacity, setOpacity] = useState(true);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setOpacity(true);
  }, [movePos]);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 750);
  }, [display]);

  return (
    <>
      <div
        className={`next ${movePos === 1 ? "nextShow" : ""} ${
          movePos === 2 ? "nextShow2" : ""
        }${movePos === 3 ? "nextShow3" : ""}
        ${movePos === 2 || movePos === 3 ? "nextAnimation" : ""}`}
      >
        {display && (
          <>
            <div className={`titles ${movePos === 3 ? "titles-full" : ""}`}>
              <div
                onClick={() => {
                  if (item === 0) return;
                  setDisplay(false);
                  changePos(1);
                  setTimeout(() => {
                    setOpacity(false);
                    changeItem(0);
                  }, 1000);
                }}
                className={`title ${item === 0 ? "active" : ""} ${
                  movePos === 2 ? "titleReduce" : ""
                } `}
                style={{
                  transition: opacity ? "1s" : "0s",
                  transform:
                    movePos === 3
                      ? `translateY(0%)`
                      : `translateY(-${100 * item}%)`,
                }}
              >
                1. VERB MARKIEREN
              </div>

              <div
                className={`title ${item === 1 ? "active" : ""} ${
                  movePos === 2 ? "titleReduce" : ""
                }`}
                style={{
                  transition: opacity ? "1s" : "0s",
                  transform:
                    movePos === 3
                      ? `translateY(0%)`
                      : `translateY(-${100 * item}%)`,
                }}
                onClick={() => {
                  if (item === 1) return;
                  setDisplay(false);
                  changePos(1);
                  setTimeout(() => {
                    setOpacity(false);
                    changeItem(1);
                  }, 1000);
                }}
              >
                2. POSITION DES VERBS FINDEN
              </div>
              <div
                className={`title ${item === 2 ? "active" : ""} ${
                  movePos === 2 ? "titleReduce" : ""
                }`}
                style={{
                  transition: opacity ? "1s" : "0s",
                  transform:
                    movePos === 3
                      ? `translateY(0%)`
                      : `translateY(-${100 * item}%)`,
                }}
                onClick={() => {
                  if (item === 2) return;
                  setDisplay(false);
                  changePos(1);
                  setTimeout(() => {
                    setOpacity(false);
                    changeItem(2);
                  }, 1000);
                }}
              >
                3. REGEL FORMULIEREN
              </div>
              <div
                className={`title ${item === 3 ? "active" : ""} ${
                  movePos === 2 ? "titleReduce" : ""
                }`}
                style={{
                  transition: opacity ? "1s" : "0s",
                  transform:
                    movePos === 3
                      ? `translateY(0%)`
                      : `translateY(-${100 * item}%)`,
                }}
                onClick={() => {
                  if (item === 3) return;
                  setDisplay(false);
                  changePos(1);
                  setTimeout(() => {
                    setOpacity(false);
                    changeItem(3);
                  }, 1000);
                }}
              >
                4. Übung 1
              </div>
              <div
                className={`title ${item === 4 ? "active" : ""} ${
                  movePos === 2 ? "titleReduce" : ""
                }`}
                style={{
                  transition: opacity ? "1s" : "0s",
                  transform:
                    movePos === 3
                      ? `translateY(0%)`
                      : `translateY(-${100 * item}%)`,
                }}
                onClick={() => {
                  if (item === 4) return;
                  setDisplay(false);
                  changePos(1);
                  setTimeout(() => {
                    setOpacity(false);
                    changeItem(4);
                  }, 1000);
                }}
              >
                5. Übung 2
              </div>
            </div>
            <div
              className="subtitle"
              style={{
                opacity: movePos === 2 || movePos === 3 ? "0" : "1",
                transition: "0.5s",
              }}
            >
              {item === 0
                ? "WO STEHT DAS VERB?"
                : item === 1
                ? "Welche Position hat das Verb? "
                : item === 2
                ? "Wie heisst die Regel?"
                : "Was weißt du?"}
            </div>
            <p
              style={{
                opacity: movePos === 2 || movePos === 3 ? "0" : "1",
                transition: "0.5s",
              }}
            >
              {item === 0
                ? "Hier arbeitest du mit Sätzen und markierst das Verb. Am Ende siehst du eine Audio-Bilder-Geschichte."
                : item === 1
                ? "In diesem Schritt ordnest du die Sätze."
                : item === 2
                ? "Du hast viel mit Sätzen gearbeitet und kannst selbst eine Regel formulieren."
                : item === 3
                ? "In dieser Übung bildest du Sätze und siehst Bilder."
                : "In dieser Übung bildest du Sätze."}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Screen2;
