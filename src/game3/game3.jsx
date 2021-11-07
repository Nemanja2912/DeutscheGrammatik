import React, { useState, useRef, useEffect, createRef } from "react";
import "../css/game3.css";

const line = [["0. Michaela", "1. repariert", "2. das Auto."]];

const n = [0, 1, 2];

const Game3 = () => {
  const wordRef = useRef([]);
  const containerRef = useRef([]);
  const [wordWidth, setWordWidth] = useState(["100%"]);
  const [wordPos, setWordPos] = useState([
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
      for (let i = 0; i < 3; i++) {
        width[i] = wordRef.current[i].current.offsetWidth;
      }

      setWordWidth([...width]);
    }, 100);
  }, []);

  const handleMove = (index) => {
    let position = [...wordPos];
    let clientX;

    const initPosX = [];

    for (let i = 0; i < 3; i++) {
      initPosX[i] = wordRef.current[i].current.getBoundingClientRect().left;
    }

    // initPosX.sort((x, y) => x - y);

    console.log(initPosX);

    const move = (e) => {
      position[index] = [
        wordPos[index][0] + (e.clientX - pos[0]),
        wordPos[index][1] + (e.clientY - pos[1]),
      ];
      setWordPos([...position]);
      clientX = e.clientX;
    };

    window.addEventListener("mousemove", move);

    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", move);

      for (let i = 2; i >= 0; i--) {
        wordRef.current[i].current.style.transition = "0.5s";
      }

      const initEl = initPosX[index];
      let trueElement;

      for (let i = 2; i >= 0; i--) {
        trueElement = initPosX[i];

        if (clientX > initPosX[i]) {
          console.log("============================");
          console.log("initEl", initEl);
          console.log("trueEl", trueElement);
          console.log("wordPos InitEl", wordPos[index]);
          console.log("wordPos TrueEl", wordPos[i]);
          console.log("============================");
          console.log("calc", trueElement - initEl + wordPos[index][0]);
          console.log("============================");

          position[index] = [trueElement - initEl + wordPos[index][0], 0];

          position[i] = [initEl - trueElement + wordPos[i][0], 0];

          break;
        }
      }

      setWordPos([...position]);

      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          wordRef.current[i].current.style.transition = "0s";
        }
      }, 500);
    });

    // if (
    //   containerRef.current[2].current.getBoundingClientRect().left < e.clientX
    // ) {
    //   let position = [...wordPos];
    //   position[2] = [
    //     containerRef.current[index].current.getBoundingClientRect().left -
    //       containerRef.current[2].current.getBoundingClientRect().left,
    //     0,
    //   ];
    //   position[index] = [e.clientX - pos[0], e.clientY - pos[1]];
    //   wordRef.current[2].current.style.transition = "0.5s";
    //   setWordPos([...position]);
    // }
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
