import React, { useState, useRef, useEffect, createRef } from "react";

const Line2 = () => {
  const list = ["Michaela", "geht", "in die Bibliothek.", "nach dem Seminar"];

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
    }, 200);
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

    let isMove = false;

    const move = (e) => {
      const elementIndex = wordObj.findIndex((word) => index === word.key);
      wordObj[elementIndex].left = e.clientX - pos[0] + initX;
      wordObj[elementIndex].top = e.clientY - pos[1] + initY;

      wordObj[elementIndex].ref.current.style.zIndex = "100000";

      let targetElementIndex = wordObj.findIndex(
        (word) =>
          clientX > word.coordXStart + 0 &&
          clientX < word.coordXEnd - 0 &&
          index !== word.key &&
          word.key !== 1
      );

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
        ) &&
        !isMove
      ) {
        isMove = true;

        let tempCoordStart = wordObj[targetElementIndex].coordXStart;
        let tempCoordEnd = wordObj[targetElementIndex].coordXEnd;
        let tempSide = wordObj[targetElementIndex].side;

        wordObj[targetElementIndex].ref.current.style.transition = "0.2s";

        setTimeout(() => {
          wordObj[targetElementIndex].ref.current.style.transition = "0s";
        }, 200);

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
          for (let i = 0; i < list.length; i++) {
            if (
              wordObj[i].side === "right" &&
              i !== targetElementIndex &&
              i !== 0
            ) {
              wordObj[i].ref.current.style.transition = "0.2s";
              wordObj[i].left =
                wordObj[elementIndex].width -
                wordObj[targetElementIndex].width +
                wordObj[i].left;

              setTimeout(() => {
                wordObj[i].coordXStart =
                  wordObj[i].ref.current.getBoundingClientRect().left;

                wordObj[i].coordXEnd =
                  wordObj[i].ref.current.getBoundingClientRect().right;

                wordObj[i].ref.current.style.transition = "0s";
              }, 200);
            }
          }

          rightToLeft();
        } else {
          for (let i = 0; i < list.length; i++) {
            if (
              wordObj[i].side === "right" &&
              i !== targetElementIndex &&
              i !== elementIndex &&
              i !== 0
            ) {
              wordObj[i].left =
                wordObj[targetElementIndex].width -
                wordObj[elementIndex].width +
                wordObj[i].left;

              wordObj[i].ref.current.style.transition = "0.2s";

              setTimeout(() => {
                wordObj[i].coordXStart =
                  wordObj[i].ref.current.getBoundingClientRect().left;

                wordObj[i].coordXEnd =
                  wordObj[i].ref.current.getBoundingClientRect().right;

                wordObj[i].ref.current.style.transition = "0s";
              }, 200);
            }
          }

          leftToRight();
        }

        wordObj[targetElementIndex].side = wordObj[elementIndex].side;
        wordObj[elementIndex].side = tempSide;

        setTimeout(() => {
          isMove = false;
        }, 500);
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

      wordObj[elementIndex].ref.current.style.zIndex = "0";
      wordObj[elementIndex].ref.current.style.transition = "0.2s";

      setTimeout(() => {
        wordObj[elementIndex].ref.current.style.transition = "0s";
      }, 200);

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
