import React, { useState, useRef, useEffect, createRef } from "react";
import "../css/game3.css";

const Game3 = () => {
  const list = ["Michaela", "repariert", "das Auto"];

  const [pos, setPos] = useState([0, 0]);

  const wordObj = [];

  for (let i = 0; i < list.length; i++) {
    wordObj[i] = {
      left: 0,
      top: 0,
      ref: createRef(),
      key: i,
      coordX: 0,
    };
  }

  useEffect(() => {
    const wordObj = [...word];

    for (let i = 0; i < list.length; i++) {
      wordObj[i].coordXStart = word[i].ref.current.getBoundingClientRect().left;
      wordObj[i].coordXEnd = word[i].ref.current.getBoundingClientRect().right;
      wordObj[i].width = word[i].ref.current.getBoundingClientRect().width;

      console.log(wordObj[i].width);
    }

    updateWord([...wordObj]);
  }, []);

  const [word, updateWord] = useState(wordObj);

  const handleMove = (index) => {
    const wordObj = [...word];

    wordObj.sort((x, y) => x.coordX - y.coordX);

    let initX = wordObj[index].left;
    let initY = wordObj[index].top;

    const elementIndex = wordObj.findIndex((word) => index === word.key);
    let initCoordX = wordObj[elementIndex].coordXStart;

    let clientX;

    const move = (e) => {
      const elementIndex = wordObj.findIndex((word) => index === word.key);
      wordObj[elementIndex].left = e.clientX - pos[0] + initX;
      wordObj[elementIndex].top = e.clientY - pos[1] + initY;

      let targetElementIndex = wordObj.findIndex(
        (word) =>
          clientX > word.coordXStart &&
          clientX < word.coordXEnd &&
          index !== word.key
      );

      if (targetElementIndex !== -1) {
        let tempCoordStart = wordObj[targetElementIndex].coordXStart;
        let tempCoordEnd = wordObj[targetElementIndex].coordXEnd;

        wordObj[targetElementIndex].left =
          wordObj[elementIndex].coordXStart -
          wordObj[targetElementIndex].coordXStart +
          wordObj[targetElementIndex].left;

        wordObj[targetElementIndex].coordXStart =
          wordObj[elementIndex].coordXStart;

        wordObj[targetElementIndex].coordXEnd = wordObj[elementIndex].coordXEnd;

        wordObj[elementIndex].coordXStart = tempCoordStart;
        wordObj[elementIndex].coordXEnd = tempCoordEnd;
      }

      clientX = e.clientX;

      updateWord([...wordObj]);
    };

    const moveEnd = () => {
      document.removeEventListener("mousemove", move);

      const elementIndex = wordObj.findIndex((word) => index === word.key);

      wordObj[elementIndex].left =
        wordObj[elementIndex].coordXStart - initCoordX + initX;
      wordObj[elementIndex].top = 0;

      updateWord([...wordObj]);

      document.removeEventListener("mouseup", moveEnd);
    };

    document.addEventListener("mousemove", move);

    document.addEventListener("mouseup", moveEnd);
  };

  return (
    <div className="game3">
      {list.map((item, index) => {
        return (
          <div
            className="word"
            onMouseMove={(e) => setPos([e.clientX, e.clientY])}
            onMouseDown={() => handleMove(index)}
            style={{ left: word[index].left, top: word[index].top }}
            ref={word[index].ref}
            wordKey={word[index].key}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Game3;
