import React, { useState, useRef, useEffect, createRef } from "react";

const Line2 = () => {
  const list = ["Michaela", "repariert", "das Auto."];

  const [pos, setPos] = useState([0, 0]);

  const wordObj = [];

  for (let i = 0; i < list.length; i++) {
    wordObj[i] = {
      left: 0,
      top: 0,
      ref: createRef(),
      key: i,
      coordX: 0,
      side: i === 0 ? "left" : i === 1 ? "center" : "right",
    };
  }

  useEffect(() => {
    setTimeout(() => {
      const wordObj = [...word];

      for (let i = 0; i < list.length; i++) {
        wordObj[i].coordXStart =
          word[i].ref.current.getBoundingClientRect().left;
        wordObj[i].coordXEnd =
          word[i].ref.current.getBoundingClientRect().right;
        wordObj[i].width = word[i].ref.current.getBoundingClientRect().width;
      }

      console.log("Finished!");
      updateWord([...wordObj]);
    }, 500);
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
          clientX > word.coordXStart + word.width * 0.3 &&
          clientX < word.coordXEnd - word.width * 0.3 &&
          index !== word.key &&
          word.key !== 1
      );

      console.log(elementIndex);

      if (
        targetElementIndex !== -1 &&
        elementIndex !== 1 &&
        !(
          elementIndex === 0 &&
          wordObj[elementIndex].side === wordObj[targetElementIndex].side
        ) &&
        !(
          targetElementIndex === 0 &&
          wordObj[elementIndex].side === wordObj[targetElementIndex].side
        )
      ) {
        let tempCoordStart = wordObj[targetElementIndex].coordXStart;
        let tempCoordEnd = wordObj[targetElementIndex].coordXEnd;
        let tempSide = wordObj[targetElementIndex].side;

        const leftToRight = () => {
          // ElementTarget
          wordObj[targetElementIndex].left =
            wordObj[elementIndex].coordXStart -
            wordObj[targetElementIndex].coordXStart +
            wordObj[targetElementIndex].left;

          wordObj[targetElementIndex].coordXStart =
            wordObj[elementIndex].coordXStart;

          wordObj[targetElementIndex].coordXEnd =
            wordObj[elementIndex].coordXStart +
            wordObj[targetElementIndex].width;

          // ElementMove

          wordObj[elementIndex].coordXStart =
            tempCoordEnd - wordObj[elementIndex].width;
          wordObj[elementIndex].coordXEnd = tempCoordEnd;
        };

        const rightToLeft = () => {
          // ElementTarget
          wordObj[targetElementIndex].left =
            wordObj[elementIndex].coordXEnd -
            wordObj[targetElementIndex].width -
            wordObj[targetElementIndex].coordXStart +
            wordObj[targetElementIndex].left;

          wordObj[targetElementIndex].coordXStart =
            wordObj[elementIndex].coordXEnd - wordObj[targetElementIndex].width;

          wordObj[targetElementIndex].coordXEnd =
            wordObj[elementIndex].coordXEnd;

          // ElementMove

          wordObj[elementIndex].coordXStart = tempCoordStart;
          wordObj[elementIndex].coordXEnd =
            tempCoordStart + wordObj[elementIndex].width;
        };

        if (
          e.clientX > wordObj[elementIndex].coordXStart &&
          wordObj[elementIndex].side === wordObj[targetElementIndex].side
        ) {
          leftToRight();
        } else if (
          e.clientX < wordObj[elementIndex].coordXStart &&
          wordObj[elementIndex].side === wordObj[targetElementIndex].side
        ) {
          rightToLeft();
        } else if (
          e.clientX > wordObj[elementIndex].coordXStart &&
          wordObj[elementIndex].side !== wordObj[targetElementIndex].side
        ) {
          rightToLeft();
        } else {
          leftToRight();
        }

        wordObj[targetElementIndex].side = wordObj[elementIndex].side;
        wordObj[elementIndex].side = tempSide;
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
    <div className="line line2">
      {list.map((item, index) => {
        return (
          <>
            {index === 1 ? (
              <div className="center">
                <div
                  className="verb"
                  onMouseMove={(e) => setPos([e.clientX, e.clientY])}
                  onMouseDown={() => handleMove(index)}
                  style={{ left: word[index].left, top: word[index].top }}
                  ref={word[index].ref}
                  wordKey={word[index].key}
                >
                  {item}
                </div>
              </div>
            ) : (
              <div
                className={`word`}
                onMouseMove={(e) => setPos([e.clientX, e.clientY])}
                onMouseDown={() => handleMove(index)}
                style={{ left: word[index].left, top: word[index].top }}
                ref={word[index].ref}
                wordKey={word[index].key}
              >
                {item}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Line2;
