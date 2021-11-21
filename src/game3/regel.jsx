import React, { useState, createRef, useRef } from "react";
import Indicator from "./../component/indicator";

const Regel = ({ setFingerPos, helpRef, regel, setRegel, setRegel2 }) => {
  const [indicator, setIndicator] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [pos, setPos] = useState([]);

  const opt = ["Nomen", "Verb", "Pronomen"];

  const blankRef = useRef();

  let optObj = [];
  for (let i = 0; i < opt.length; i++) {
    optObj[i] = {
      left: 0,
      top: 0,
      transition: 0,
      color: "#a0c814",
      ref: createRef(),
    };
  }

  const [option, setOption] = useState(optObj);

  const handleMove = (index) => {
    let newObj = [...optObj];

    newObj[index].zIndex = 1000000;

    let initX = newObj[index].left;
    let initY = newObj[index].top;

    newObj[index].transition = "0s";

    let relativeLeft = option[index].ref.current.getBoundingClientRect().left;
    let relativeTop = option[index].ref.current.getBoundingClientRect().top;

    let clientX;
    let clientY;

    const move = (e) => {
      newObj[index].left = e.clientX - pos[0] + initX;
      newObj[index].top = e.clientY - pos[1] + initY;

      clientX = e.clientX;
      clientY = e.clientY;

      setOption([...newObj]);
    };

    const moveEnd = () => {
      document.removeEventListener("mousemove", move);

      newObj[index].zIndex = 1;
      newObj[index].transition = "0.2s";

      if (
        clientX > blankRef.current.getBoundingClientRect().left &&
        clientX < blankRef.current.getBoundingClientRect().right &&
        clientY > blankRef.current.getBoundingClientRect().top &&
        clientY < blankRef.current.getBoundingClientRect().bottom &&
        index === 1
      ) {
        newObj[index].left =
          blankRef.current.getBoundingClientRect().left - relativeLeft;
        newObj[index].top =
          blankRef.current.getBoundingClientRect().top - relativeTop;

        setIndicator(true);

        setTimeout(() => {
          setIndicator(false);
        }, 500);
        setTimeout(() => {
          setRegel(true);
          setTimeout(() => {
            setRegel2(true);
          }, 500);
        }, 1000);
      } else {
        if (
          clientX > blankRef.current.getBoundingClientRect().left &&
          clientX < blankRef.current.getBoundingClientRect().right &&
          clientY > blankRef.current.getBoundingClientRect().top &&
          clientY < blankRef.current.getBoundingClientRect().bottom
        ) {
          if (index !== 1) newObj[index].color = "#eb6400";
          setWrong(true);

          setTimeout(() => {
            setWrong(false);
          }, 500);
        }
        newObj[index].left = 0;
        newObj[index].top = 0;
      }

      setOption([...newObj]);

      document.removeEventListener("mouseup", moveEnd);
    };

    document.addEventListener("mousemove", move);

    document.addEventListener("mouseup", moveEnd);
  };

  const handleHelp = () => {
    let newObj = [...option];
    let relativeLeft = option[1].ref.current.getBoundingClientRect().left;
    let relativeTop = option[1].ref.current.getBoundingClientRect().top;

    option[1].ref.current.style.transition = "1s";

    setFingerPos([
      option[1].ref.current.getBoundingClientRect().left +
        option[1].ref.current.getBoundingClientRect().width / 2,
      option[1].ref.current.getBoundingClientRect().top +
        option[1].ref.current.getBoundingClientRect().height / 2,
    ]);

    setTimeout(() => {
      setFingerPos([
        blankRef.current.getBoundingClientRect().left +
          blankRef.current.getBoundingClientRect().width / 2,
        blankRef.current.getBoundingClientRect().top +
          blankRef.current.getBoundingClientRect().height / 2,
      ]);

      newObj[1].left =
        blankRef.current.getBoundingClientRect().left - relativeLeft;
      newObj[1].top =
        blankRef.current.getBoundingClientRect().top - relativeTop;

      setIndicator(true);

      setTimeout(() => {
        setIndicator(false);

        setTimeout(() => {
          setRegel(true);

          setTimeout(() => {
            setRegel2(true);
          }, 500);
        }, 1000);
      }, 500);

      setOption([...newObj]);
    }, 1000);
  };

  return (
    <>
      <div className={`regel ${regel > 0 && "regelOpacity"}`}>
        <div className="title">REGEL</div>
        <div className="sentence">
          Das
          <p className="blank" ref={blankRef}>
            Verb
          </p>
          bleibt im Satz immer stehen.
        </div>
        <div className="options">
          {opt.map((opt, index) => {
            return (
              <div
                className="opt"
                onMouseMove={(e) => setPos([e.clientX, e.clientY])}
                style={{
                  left: option[index].left,
                  top: option[index].top,
                  zIndex: option[index].zIndex,
                  backgroundColor: option[index].color,
                  transition: option[index].transition,
                }}
                onMouseDown={() => handleMove(index)}
                ref={option[index].ref}
              >
                {opt}
              </div>
            );
          })}
        </div>
        <div className="help-btn" onClick={handleHelp} ref={helpRef}></div>
      </div>
      <Indicator indicator={indicator} wrong={false} />
      <Indicator indicator={wrong} wrong={true} />
    </>
  );
};

export default Regel;
