import React, { useState, createRef, useEffect, useRef } from "react";

const Line = ({
  line,
  verb,
  solved,
  setIndicator,
  setWrong,
  verbRef,
  helpRef,
  setFingerPos,
}) => {
  const [verbPos, setVerbPos] = useState([0, 0]);
  const [verbInit, setVerbInit] = useState([0, 0]);
  const [pos, setPos] = useState([0, 0]);
  const [correctPos, setCorrentPos] = useState(0);

  const handleMove = () => {
    const wordObj = [...word];
    let verbWidth = verbRef.current.offsetWidth;

    let answer = false;

    const move = (e) => {
      setVerbPos([e.clientX - pos[0], e.clientY - pos[1]]);

      if (e.clientX < word[0].wordLeft && e.clientY > word[0].wordTop - 30) {
        for (let j = 0; j < line.length; j++) {
          wordObj[j].left = verbWidth / 2;
        }
        answer = false;
      } else if (
        e.clientX > word[line.length - 1].wordRight &&
        e.clientY > word[line.length - 1].wordTop - 30
      ) {
        for (let j = line.length - 1; j >= 0; j--) {
          wordObj[j].left = -verbWidth / 2;
        }
        answer = false;
      } else {
        for (let i = line.length - 1; i >= 0; i--) {
          answer = false;
          if (
            e.clientX > word[i].wordLeft &&
            e.clientY > word[i].wordTop - 30
          ) {
            for (let j = i; j >= 0; j--) {
              wordObj[j].left = -verbWidth / 2;
            }

            for (let j = i + 1; j < line.length; j++) {
              wordObj[j].left = verbWidth / 2;
            }

            if (i === correctPos) {
              console.log("correct!");
              answer = true;
            }
            break;
          } else {
            wordObj[i].left = 0;
          }
        }
      }

      setWord([...wordObj]);
    };

    document.addEventListener("mousemove", move);

    const moveEnd = () => {
      document.removeEventListener("mousemove", move);

      if (answer) {
        setIndicator(true);

        setTimeout(() => {
          setIndicator(false);
        }, 500);

        setVerbPos([
          word[correctPos].wordRight - verbInit[0] + word[correctPos].left + 5,
          word[correctPos].wordTop - verbInit[1],
        ]);

        verbRef.current.style.transition = "0.2s";
        verbRef.current.style.backgroundColor = "#a0c814";

        setTimeout(() => {
          verbRef.current.style.transition = "0s";
        }, 200);
        setTimeout(() => {
          solved();
        }, 1500);
      } else {
        setVerbPos([0, 0]);

        setWrong(true);

        setTimeout(() => {
          setWrong(false);
        }, 500);

        verbRef.current.style.transition = "0.2s";

        setTimeout(() => {
          verbRef.current.style.transition = "0s";
        }, 200);

        for (let i = 0; i < line.length; i++) {
          wordObj[i].left = 0;
        }
      }

      setWord([...wordObj]);

      document.removeEventListener("mouseup", moveEnd);
    };

    document.addEventListener("mouseup", moveEnd);
  };

  const wordList = [];

  for (let i = 0; i < line.length; i++) {
    wordList[i] = {
      ref: createRef(),
      left: 0,
      top: 0,
    };
  }

  const [word, setWord] = useState([...wordList]);

  useEffect(() => {
    const wordObj = [...word];
    for (let i = 0; i < line.length; i++) {
      wordObj[i].wordLeft = word[i].ref.current.getBoundingClientRect().left;
      wordObj[i].wordRight = word[i].ref.current.getBoundingClientRect().right;
      wordObj[i].wordTop = word[i].ref.current.getBoundingClientRect().top;
    }

    setVerbInit([
      verbRef.current.getBoundingClientRect().left,
      verbRef.current.getBoundingClientRect().top,
    ]);

    setWord([...wordObj]);
  }, []);

  const help = () => {
    const wordObj = [...word];
    let verbWidth = verbRef.current.offsetWidth;

    let i = correctPos;

    if (word[i].wordLeft && word[i].wordTop - 30) {
      for (let j = i; j >= 0; j--) {
        wordObj[j].left = -verbWidth / 2;
      }

      for (let j = i + 1; j < line.length; j++) {
        wordObj[j].left = verbWidth / 2;
      }
    } else {
      wordObj[i].left = 0;
    }

    setWord([...wordObj]);

    setVerbPos([
      word[correctPos].wordRight - verbInit[0] + word[correctPos].left + 5,
      word[correctPos].wordTop - verbInit[1],
    ]);

    setFingerPos([
      word[correctPos].wordRight + word[correctPos].left + 5,
      word[correctPos].wordTop + 10,
    ]);

    console.log(word[correctPos].wordRight);

    verbRef.current.style.transition = "1s";
    verbRef.current.style.backgroundColor = "#a0c814";

    setTimeout(() => {
      setIndicator(true);

      setTimeout(() => {
        setIndicator(false);
      }, 500);

      verbRef.current.style.transition = "0s";

      setTimeout(() => {
        solved();
      }, 1500);
    }, 1000);
  };

  return (
    <>
      <div className="click" ref={helpRef} onClick={help}>
        a
      </div>
      <div
        onMouseMove={(e) => setPos([e.clientX, e.clientY])}
        onMouseDown={handleMove}
        className="verb"
        ref={verbRef}
        style={{ left: verbPos[0], top: verbPos[1] }}
      >
        {verb}
      </div>
      <div className="line">
        {line.map((el, i) => {
          return (
            <span
              className="word"
              style={{ left: word[i].left, top: word[i].top }}
              ref={word[i].ref}
            >
              {el}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Line;
