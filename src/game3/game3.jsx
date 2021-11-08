import React, { useState, useRef, useEffect, createRef } from "react";
import "../css/game3.css";

const line = [["Michaela", "repariert", "bolest", "das Auto."]];

const n = [0, 1, 2, 3];

const Game3 = () => {
  const wordRef = useRef([]);
  const containerRef = useRef([]);
  const [wordWidth, setWordWidth] = useState(["100%"]);
  const [wordPos, setWordPos] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const [pos, setPos] = useState([]);

  wordRef.current = n.map((el, i) => wordRef.current[i] ?? createRef());
  containerRef.current = n.map(
    (el, i) => containerRef.current[i] ?? createRef()
  );

  useEffect(() => {
    setTimeout(() => {
      const width = [];
      for (let i = 0; i < line[0].length; i++) {
        width[i] = wordRef.current[i].current.offsetWidth;
      }

      setWordWidth([...width]);
    }, 100);
  }, []);

  const handleMove = (index) => {
    let position = [...wordPos];
    let clientX;

    const initPosX = [];

    for (let i = 0; i < line[0].length; i++) {
      initPosX[i] = [
        i,
        wordRef.current[i].current.getBoundingClientRect().left,
      ];
    }

    initPosX.sort((x, y) => x[1] - y[1]);

    const findIndex = (n) => {
      let newIndex;

      initPosX.find((x, ind) => {
        if (x[0] === n) {
          newIndex = ind;
        }
        return x[0] === n;
      });

      return newIndex;
    };

    const move = (e) => {
      position[index] = [
        wordPos[index][0] + (e.clientX - pos[0]),
        wordPos[index][1] + (e.clientY - pos[1]),
      ];
      setWordPos([...position]);
      clientX = e.clientX;
    };

    window.addEventListener("mousemove", move);

    const mouseUp = () => {
      window.removeEventListener("mousemove", move);

      for (let i = line[0].length - 1; i >= 0; i--) {
        wordRef.current[i].current.style.transition = "0.5s";
      }

      const initEl = initPosX[findIndex(index)][1];
      let trueElement;
      const newWidth = [...wordWidth];

      for (let i = line[0].length - 1; i >= 0; i--) {
        const newIndex = initPosX[i][0];
        trueElement = initPosX[i][1];

        if (clientX > initPosX[i][1] || i === 0) {
          position[index] = [trueElement - initEl + wordPos[index][0], 0];

          position[newIndex] = [initEl - trueElement + wordPos[newIndex][0], 0];

          // newWidth[i] = wordRef.current[index].current.offsetWidth;
          // newWidth[index] = wordRef.current[i].current.offsetWidth;
          // position[index] = [position[index][0] - 25, 0];

          break;
        }
      }

      setWordWidth([...newWidth]);

      setWordPos([...position]);

      setTimeout(() => {
        for (let i = 0; i < line[0].length; i++) {
          wordRef.current[i].current.style.transition = "0s";
        }
      }, 500);

      window.removeEventListener("mouseup", mouseUp);
    };

    window.addEventListener("mouseup", mouseUp);
  };

  return (
    <div className="game3">
      <div className="display">
        {line.map((line, index) => (
          <div className="line">
            {line.map((word, index) => (
              <>
                <div
                  className="container"
                  style={{ width: wordWidth[index] }}
                  ref={containerRef.current[index]}
                >
                  <div
                    className="word"
                    ref={wordRef.current[index]}
                    style={{ left: wordPos[index][0], top: wordPos[index][1] }}
                    onMouseDown={() => handleMove(index)}
                    onMouseMove={(e) => {
                      setPos([e.clientX, e.clientY]);
                    }}
                  >
                    {word}
                  </div>
                </div>
              </>
            ))}
          </div>
        ))}

        {/* <div className="line">
          <span className="word">Michaela</span>
          <span className="word verb">geht</span>
          <span className="word">nach dem Seminar</span>
          <span className="word">in die Bibliothek.</span>
        </div>
        <div className="line">
          <span className="word">Am Abend</span>
          <span className="word verb">sitzen</span>
          <span className="word">sie</span>
          <span className="word">in einem Café.</span>
        </div> */}
      </div>

      <div className="verb-area">
        <div className="bluebox"></div>
      </div>
    </div>
  );
};

export default Game3;
