import React, { useState, useRef, useEffect } from "react";

let verb1Cond = [];
let verb2Cond = [];

if (Math.random() < 0.5) {
  verb1Cond = [250, 400];
  verb2Cond = [600, 400];
} else {
  verb1Cond = [600, 400];
  verb2Cond = [250, 400];
}

const Line1 = ({
  setStep,
  firstRest,
  verbs,
  lastRest,
  verb1Ref,
  verb2Ref,
  helpRef,
  setFingerPos,
  setIndicator,
  setWrong,
}) => {
  const [pos, setPos] = useState([]);

  const [verb1Pos, setVerb1Pos] = useState(verb1Cond);
  const [verb2Pos, setVerb2Pos] = useState(verb2Cond);

  const [move1, setMove1] = useState(true);
  const [move2, setMove2] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (!move1 && !move2) setStep();
    }, 1000);
  }, [move1, move2]);

  const blank1Ref = useRef();
  const blank2Ref = useRef();

  const [blank1, setBlank1] = useState([0, 0]);
  const [blank1Width, setBlank1Width] = useState(120);

  const [blank2, setBlank2] = useState([0, 0]);
  const [blank2Width, setBlank2Width] = useState(120);

  useEffect(() => {
    setBlank1([
      blank1Ref.current.getBoundingClientRect().left,
      blank1Ref.current.getBoundingClientRect().top,
    ]);

    setBlank2([
      blank2Ref.current.getBoundingClientRect().left,
      blank2Ref.current.getBoundingClientRect().top,
    ]);
  }, []);

  const handleMove = () => {
    if (!move1) return;

    verb1Ref.current.style.zIndex = 1000;

    let clientX, clientY;

    const move = (e) => {
      setVerb1Pos([
        e.clientX - pos[0] + verb1Pos[0],
        e.clientY - pos[1] + verb1Pos[1],
      ]);

      clientX = e.clientX;
      clientY = e.clientY;
    };

    const moveEnd = () => {
      document.removeEventListener("mousemove", move);

      if (
        clientX > blank1[0] &&
        clientX < blank1[0] + blank1Width &&
        clientY > blank1[1] &&
        clientY < blank1[1] + 40
      ) {
        setVerb1Pos([blank1[0], blank1[1]]);

        setBlank1Width(verb1Ref.current.offsetWidth);

        blank1Ref.current.style.backgroundColor = "#fff";
        verb1Ref.current.style.backgroundColor = "#fff";

        setTimeout(() => {
          setBlank2([
            blank2Ref.current.getBoundingClientRect().left,
            blank2Ref.current.getBoundingClientRect().top,
          ]);
        }, 250);

        if (
          !move2 &&
          blank2Ref.current.getBoundingClientRect().left +
            verb1Ref.current.offsetWidth -
            120 >
            50
        ) {
          verb2Ref.current.style.transition = "0.2s";
          setVerb2Pos([
            blank2Ref.current.getBoundingClientRect().left +
              verb1Ref.current.offsetWidth -
              120,
            blank2Ref.current.getBoundingClientRect().top,
          ]);
        }

        setMove1(false);

        setTimeout(() => {
          setIndicator(true);

          setTimeout(() => {
            setIndicator(false);
          }, 500);
        }, 0);
      } else {
        verb1Ref.current.style.transition = "0.2s";
        setVerb1Pos(verb1Cond);

        setTimeout(() => {
          verb1Ref.current.style.transition = "0s";

          setTimeout(() => {
            setWrong(true);

            setTimeout(() => {
              setWrong(false);
            }, 500);
          }, 0);
        }, 200);
      }
      verb1Ref.current.style.zIndex = 10;
      document.removeEventListener("mouseup", moveEnd);
    };

    document.addEventListener("mousemove", move);

    document.addEventListener("mouseup", moveEnd);
  };

  const handleMove2 = () => {
    if (!move2) return;

    verb2Ref.current.style.zIndex = 1000;

    let clientX, clientY;

    const move = (e) => {
      setVerb2Pos([
        e.clientX - pos[0] + verb2Pos[0],
        e.clientY - pos[1] + verb2Pos[1],
      ]);

      clientX = e.clientX;
      clientY = e.clientY;
    };

    const moveEnd = () => {
      document.removeEventListener("mousemove", move);

      if (
        clientX > blank2[0] &&
        clientX < blank2[0] + blank2Width &&
        clientY > blank2[1] &&
        clientY < blank2[1] + 40
      ) {
        setVerb2Pos([blank2[0], blank2[1]]);

        setBlank2Width(verb2Ref.current.offsetWidth);

        blank2Ref.current.style.backgroundColor = "#fff";
        verb2Ref.current.style.backgroundColor = "#fff";

        setTimeout(() => {
          setIndicator(true);

          setTimeout(() => {
            setIndicator(false);
          }, 500);
        }, 0);

        setMove2(false);
      } else {
        verb2Ref.current.style.transition = "0.2s";
        setVerb2Pos(verb2Cond);

        setTimeout(() => {
          verb2Ref.current.style.transition = "0s";

          setTimeout(() => {
            setWrong(true);

            setTimeout(() => {
              setWrong(false);
            }, 500);
          }, 0);
        }, 200);
      }
      verb2Ref.current.style.zIndex = 10;
      document.removeEventListener("mouseup", moveEnd);
    };

    document.addEventListener("mousemove", move);

    document.addEventListener("mouseup", moveEnd);
  };

  const handleHelp = () => {
    let verb1 = verb1Ref.current;
    let verb2 = verb2Ref.current;
    if (move1) {
      verb1Ref.current.style.transition = "1s";

      setFingerPos([verb1.offsetLeft + 5, verb1.offsetTop + 15]);

      setTimeout(() => {
        setVerb1Pos([blank1[0], blank1[1]]);
        setFingerPos([blank1[0], blank1[1] + 10]);

        setTimeout(() => {
          setBlank1Width(verb1.offsetWidth);

          blank1Ref.current.style.backgroundColor = "#fff";
          verb1.style.backgroundColor = "#fff";

          setTimeout(() => {
            setBlank2([
              blank2Ref.current.getBoundingClientRect().left,
              blank2Ref.current.getBoundingClientRect().top,
            ]);
          }, 250);

          if (
            !move2 &&
            blank2Ref.current.getBoundingClientRect().left +
              verb1.offsetWidth -
              120 >
              50
          ) {
            verb2.style.transition = "0.2s";
            setVerb2Pos([
              blank2Ref.current.getBoundingClientRect().left +
                verb1.offsetWidth -
                120,
              blank2Ref.current.getBoundingClientRect().top,
            ]);
          }

          setTimeout(() => {
            setIndicator(true);

            setTimeout(() => {
              setIndicator(false);
            }, 500);
          }, 200);

          setMove1(false);
        }, 800);
      }, 1000);
    } else if (move2) {
      verb2Ref.current.style.transition = "1s";

      setFingerPos([verb2.offsetLeft + 5, verb2.offsetTop + 15]);

      setTimeout(() => {
        setVerb2Pos([blank2[0], blank2[1]]);
        setFingerPos([blank2[0], blank2[1] + 10]);

        setTimeout(() => {
          setBlank2Width(verb2.offsetWidth);

          blank2Ref.current.style.backgroundColor = "#fff";
          verb2.style.backgroundColor = "#fff";

          setTimeout(() => {
            setIndicator(true);

            setTimeout(() => {
              setIndicator(false);
            }, 500);
          }, 200);

          setMove2(false);
        }, 800);
      }, 1000);
    }
  };

  return (
    <>
      <div className="helpRef" onClick={handleHelp} ref={helpRef}>
        a
      </div>
      {firstRest ? <div className="rest">{firstRest}</div> : ""}
      <div
        className="blank"
        style={{ width: blank1Width }}
        ref={blank1Ref}
      ></div>
      <div
        className="blank"
        style={{ width: blank2Width }}
        ref={blank2Ref}
      ></div>
      {lastRest ? <div className="rest">{lastRest}</div> : ""}
      <div className="verbs">
        <div
          className="verb"
          onMouseMove={(e) => {
            setPos([e.clientX, e.clientY]);
          }}
          onMouseDown={handleMove}
          ref={verb1Ref}
          style={{ left: verb1Pos[0], top: verb1Pos[1] }}
        >
          {verbs[0]}
        </div>
        <div
          className="verb"
          onMouseMove={(e) => {
            setPos([e.clientX, e.clientY]);
          }}
          onMouseDown={handleMove2}
          ref={verb2Ref}
          style={{ left: verb2Pos[0], top: verb2Pos[1] }}
        >
          {verbs[1]}
        </div>
      </div>
    </>
  );
};

export default Line1;
