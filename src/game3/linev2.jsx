import React, { createRef, useEffect, useRef, useState } from "react";
import "../css/game3v2.css";

const Linev2 = ({
  list,
  index,
  leftWord,
  centerWord,
  rightWord1,
  rightWord2 = false,
  nounIndex,
}) => {
  let reciArr = [];
  for (let i = 0; i < list.length; i++) {
    reciArr[i] = createRef();
  }

  let centerRef = useRef();
  let circleRef = useRef();

  const [reciArrValues, setReciArrValues] = useState([]);
  const pos = [];
  let prihvatamoPos = true;
  let pomerajStari;
  const setPos = (e) => {
    if (!prihvatamoPos) return;
    pos[0] = e.clientX;
    pos[1] = e.clientY;
  };

  useEffect(() => {
    initValues();

    let leftPos = centerRef.current.getBoundingClientRect().left;

    let centerPos = {
      left: centerRef.current.getBoundingClientRect().left - 15,
      right:
        window.innerWidth -
        centerRef.current.getBoundingClientRect().right -
        15,
      top: centerRef.current.getBoundingClientRect().top - 40,
      bottom:
        window.innerHeight -
        centerRef.current.getBoundingClientRect().bottom -
        40,
    };

    circleRef.current.style.left = centerPos.left + "px";
    circleRef.current.style.right = centerPos.right + "px";
    circleRef.current.style.top = centerPos.top + "px";
    circleRef.current.style.bottom = centerPos.bottom + "px";

    console.log(centerRef.current.getBoundingClientRect().top);
    console.log(
      window.innerHeight - centerRef.current.getBoundingClientRect().bottom
    );

    if (reciArr[nounIndex].current.getBoundingClientRect().left < leftPos) {
      circleRef.current.style.left =
        reciArr[nounIndex].current.getBoundingClientRect().left - 15 + "px";
    } else {
      circleRef.current.style.right =
        window.innerWidth -
        reciArr[nounIndex].current.getBoundingClientRect().right -
        15 +
        "px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (i) => {
    const posXLeft = reciArr[i].current.getBoundingClientRect().left;
    const posXRight = reciArr[i].current.getBoundingClientRect().right;
    const posYTop = reciArr[i].current.getBoundingClientRect().top;
    const posYBottom = reciArr[i].current.getBoundingClientRect().bottom;

    reciArr[i].current.classList.remove("transition");

    if (i === nounIndex) {
      circleRef.current.classList.remove("opacity");
    }
    const initLeft = reciArrValues[i].leftRelative;
    let didMove = false;
    prihvatamoPos = false;
    const move = (e) => {
      reciArr[i].current.style.zIndex = "10000000";

      if (i === 1) {
        reciArr[i].current.style.left = initLeft + e.clientX - pos[0] + "px";
        reciArr[i].current.style.top = e.clientY - pos[1] + "px";
        return;
      }

      if (i === nounIndex) {
        if (
          e.clientX - (pos[0] - posXLeft) <
            centerRef.current.getBoundingClientRect().left -
              reciArr[i].current.getBoundingClientRect().width -
              50 ||
          e.clientX - (pos[0] - posXRight) >
            centerRef.current.getBoundingClientRect().right +
              reciArr[i].current.getBoundingClientRect().width +
              50 ||
          e.clientY - (pos[1] - posYTop) <
            centerRef.current.getBoundingClientRect().top - 50 ||
          e.clientY - (pos[1] - posYBottom) >
            centerRef.current.getBoundingClientRect().bottom + 50
        ) {
          moveEnd();
          return;
        }

        if (
          reciArr[i].current.getBoundingClientRect().left <
          centerRef.current.getBoundingClientRect().left
        ) {
          circleRef.current.style.left =
            reciArr[nounIndex].current.getBoundingClientRect().left - 15 + "px";
        }

        if (
          reciArr[i].current.getBoundingClientRect().right >
          centerRef.current.getBoundingClientRect().right
        ) {
          circleRef.current.style.right =
            window.innerWidth -
            reciArr[nounIndex].current.getBoundingClientRect().right -
            15 +
            "px";
        }

        if (
          reciArr[i].current.getBoundingClientRect().top <
          centerRef.current.getBoundingClientRect().top
        ) {
          circleRef.current.style.top =
            reciArr[nounIndex].current.getBoundingClientRect().top - 40 + "px";
        }

        if (
          reciArr[i].current.getBoundingClientRect().bottom >
          centerRef.current.getBoundingClientRect().bottom
        ) {
          circleRef.current.style.bottom =
            window.innerHeight -
            reciArr[nounIndex].current.getBoundingClientRect().bottom -
            40 +
            "px";
        }
      }

      reciArr[i].current.style.left = initLeft + e.clientX - pos[0] + "px";
      reciArr[i].current.style.top = e.clientY - pos[1] + "px";
      const indexNovi = reciArrValues.findIndex((el) => {
        return e.clientX > el.left && e.clientX < el.right;
      });
      const stari = reciArrValues.find((item) => item.id === i);
      const novi = reciArrValues[indexNovi];
      if (!novi) return;
      if (stari.imenica) {
        if (novi.dynamicID > 2) return;
      }
      if (novi.imenica) {
        if (stari.dynamicID > 2) return;
      }
      if (indexNovi === -1 || indexNovi === 1) return;
      if (
        (!didMove && stari.dynamicID !== novi.dynamicID) ||
        stari.dynamicID !== novi.dynamicID
      ) {
        didMove = true;
      } else {
        return;
      }
      if (stari.dynamicID === novi.dynamicID) return;
      const overCenter = novi.dynamicID < 1 || stari.dynamicID < 1;
      const saDesne = !overCenter;
      if (saDesne) {
        if (stari.dynamicID < novi.dynamicID) {
          pomerajStari = 0;
          let pomerajNovi = 0;
          if (stari.width < novi.width) {
            if (stari.dynamicID + 1 === novi.dynamicID) {
              pomerajNovi -= stari.width;
              pomerajStari += novi.width;
            } else
              for (let j = stari.dynamicID; j < novi.dynamicID + 1; j++) {
                if (j < novi.dynamicID) pomerajNovi -= reciArrValues[i].width;
                if (j !== stari.dynamicID && j < novi.dynamicID + 1)
                  pomerajStari += reciArrValues[j].width;
              }
            reciArr[novi.id].current.style.left =
              reciArrValues[novi.id].leftRelative + pomerajNovi + "px";
          } else {
            if (stari.dynamicID + 1 === novi.dynamicID) {
              pomerajNovi -= stari.width;
              pomerajStari += novi.width;
            } else
              for (let j = stari.dynamicID; j < novi.dynamicID + 1; j++) {
                if (j < novi.dynamicID) pomerajNovi -= reciArrValues[i].width;
                if (j !== stari.dynamicID && j < novi.dynamicID + 1)
                  pomerajStari += reciArrValues[j].width;
              }
            reciArr[novi.id].current.style.left =
              reciArrValues[novi.id].leftRelative + pomerajNovi + "px";
          }
          calcValue(stari.id, novi.dynamicID, pomerajStari, pomerajStari);
          calcValue(novi.id, stari.dynamicID, true, pomerajNovi);
        } else {
          let pomerajNovi = 0;
          pomerajStari = 0;
          pomerajNovi += stari.width;
          pomerajStari -= novi.width;
          reciArr[novi.id].current.style.left =
            reciArrValues[novi.id].leftRelative + pomerajNovi + "px";
          calcValue(stari.id, novi.dynamicID, pomerajStari, pomerajStari);
          calcValue(novi.id, stari.dynamicID, true, pomerajNovi);
        }
      } else {
        if (
          (novi.dynamicID === 0 || novi.dynamicID === reciArr.length - 1) &&
          (stari.dynamicID === 0 || stari.dynamicID === reciArr.length - 1)
        ) {
          const noviStrana = novi.dynamicID > stari.dynamicID ? "r" : "l";
          const centarWidth = reciArrValues[1].width;
          let pomerajNovi = 0;
          let rec;

          if (noviStrana === "r") {
            pomerajNovi += -novi.width - centarWidth;
            rec = reciArrValues.find((t) => t.dynamicID === 2);
            pomerajNovi -= reciArr.length > 3 ? rec.width : 0;
          } else {
            pomerajNovi -= -novi.width - centarWidth;

            rec = reciArrValues.find((t) => t.dynamicID === 2);
            pomerajNovi += reciArr.length > 3 ? rec.width : 0;
          }
          pomerajStari = 0;
          if (noviStrana === "r") {
            pomerajStari -= -stari.width - centarWidth;

            rec = reciArrValues.find((t) => t.dynamicID === 2);
            pomerajStari += reciArr.length > 3 ? rec.width : 0;
          } else {
            pomerajStari += -stari.width - centarWidth;
            rec = reciArrValues.find((t) => t.dynamicID === 2);
            pomerajStari -= reciArr.length > 3 ? rec.width : 0;
          }
          reciArr[novi.id].current.style.left =
            reciArrValues[novi.id].leftRelative + pomerajNovi + "px";

          calcValue(stari.id, novi.dynamicID, pomerajStari, pomerajStari);
          calcValue(novi.id, stari.dynamicID, true, pomerajNovi);
        } else {
          const noviStrana = novi.dynamicID > stari.dynamicID ? "r" : "l";
          const centarWidth = reciArrValues[1].width;
          const pomerajNovi =
            noviStrana === "r"
              ? -novi.width - centarWidth
              : novi.width + centarWidth;
          pomerajStari =
            noviStrana === "r"
              ? stari.width + centarWidth
              : -stari.width - centarWidth;
          reciArr[novi.id].current.style.left =
            reciArrValues[novi.id].leftRelative + pomerajNovi + "px";

          const sirinaRazlika =
            noviStrana === "r"
              ? stari.width - novi.width
              : novi.width - stari.width;

          calcValue(stari.id, novi.dynamicID, pomerajStari, pomerajStari);
          calcValue(novi.id, stari.dynamicID, true, pomerajNovi);
          for (let i = 3; i < reciArr.length; i++) {
            let j = i;
            j = reciArrValues.findIndex((item) => item.dynamicID === j);
            reciArr[j].current.style.left =
              parseFloat(reciArr[j].current.style.left) + sirinaRazlika + "px";
            calcValue(
              reciArrValues[j].id,
              reciArrValues[j].dynamicID,
              true,
              sirinaRazlika
            );
          }
        }
      }
    };
    const moveEnd = () => {
      circleRef.current.classList.add("opacity");

      let centerPos = {
        left: centerRef.current.getBoundingClientRect().left - 15,
        right:
          window.innerWidth -
          centerRef.current.getBoundingClientRect().right -
          15,
        top: centerRef.current.getBoundingClientRect().top - 40,
        bottom:
          window.innerHeight -
          centerRef.current.getBoundingClientRect().bottom -
          40,
      };

      circleRef.current.style.left = centerPos.left + "px";
      circleRef.current.style.right = centerPos.right + "px";
      circleRef.current.style.top = centerPos.top + "px";
      circleRef.current.style.bottom = centerPos.bottom + "px";

      if (i === 1) {
        reciArr[1].current.style.left = 0 + "px";
        reciArr[1].current.style.top = 0 + "px";

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", moveEnd);
        return;
      }
      document.removeEventListener("mousemove", move);
      // calcValue(i, reciArrValues[i].dynamicID, true, 0, true);
      reciArr[i].current.classList.add("transition");
      reciArr[i].current.style.zIndex = "1";
      if (!didMove) reciArr[i].current.style.left = initLeft + "px";
      else reciArr[i].current.style.left = reciArrValues[i].leftRelative + "px";
      didMove = false;
      reciArr[i].current.style.top = "0px";
      document.removeEventListener("mouseup", moveEnd);
      prihvatamoPos = true;

      setTimeout(() => {
        if (
          reciArr[nounIndex].current.getBoundingClientRect().left <
          centerPos.left + 15
        ) {
          circleRef.current.style.left =
            reciArr[nounIndex].current.getBoundingClientRect().left - 15 + "px";
        } else {
          circleRef.current.style.right =
            window.innerWidth -
            reciArr[nounIndex].current.getBoundingClientRect().right -
            15 +
            "px";

          console.log(circleRef.current.style.right);
        }
      }, 300);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", moveEnd);
  };

  function initValues() {
    for (let i = 0; i < reciArr.length; i++) {
      const id = i;
      let side;
      if (i === 0) side = "left";
      else if (i === 1) side = "center";
      else side = "right";
      const boundingRect = reciArr[i].current.getBoundingClientRect();
      const left = boundingRect.left;
      const right = boundingRect.right;
      const width = boundingRect.width;
      const obj = {
        id,
        side,
        left,
        right,
        width,
        leftRelative: parseFloat(reciArr[i].current.style.left),
        imenica: i === nounIndex,
        allowListedIDS: i === 0 ? [2] : [],
        dynamicID: id,
      };
      reciArrValues[i] = obj;
      setReciArrValues(reciArrValues);
    }
  }
  function calcValue(
    id,
    dynamicID,
    shouldUpdateRelative = true,
    pomeraj = false,
    isZadnjiPoziv = false
  ) {
    let i = id;
    let side;
    if (dynamicID === 0) side = "left";
    if (dynamicID === 1) side = "center";
    else side = "right";
    const boundingRect = reciArr[i].current.getBoundingClientRect();
    const left = pomeraj ? reciArrValues[i].left + pomeraj : boundingRect.left;
    const right = pomeraj
      ? reciArrValues[i].right + pomeraj
      : boundingRect.right;

    const width = boundingRect.width;
    const obj = {
      id,
      side,
      left,
      right,
      width,
      leftRelative: isZadnjiPoziv
        ? reciArrValues[i].leftRelative
        : pomeraj
        ? parseFloat(reciArrValues[i].leftRelative) + pomeraj
        : shouldUpdateRelative === true
        ? parseFloat(reciArr[i].current.style.left)
        : reciArrValues[i].leftRelative + shouldUpdateRelative,
      imenica: reciArrValues[i].imenica,
      allowListedIDS: reciArrValues[i].allowListedIDS,
      dynamicID: dynamicID,
    };
    reciArrValues[i] = obj;
  }

  return (
    <div className={`container ${"line" + index}`}>
      <div id="levo">
        <div
          className="word transition"
          ref={reciArr[0]}
          style={{ left: 0, top: 0 }}
          onMouseMove={(e) => setPos(e)}
          onMouseDown={() => handleMove(0)}
        >
          <div className="wrapper">
            <p>{leftWord}</p>
          </div>
        </div>
      </div>
      <div id="centar" ref={centerRef}>
        <div
          className="word transition"
          ref={reciArr[1]}
          style={{ left: 0, top: 0 }}
          onMouseMove={(e) => setPos(e)}
          onMouseDown={() => handleMove(1)}
        >
          <div className="wrapper">
            <p>{centerWord}</p>
          </div>
        </div>
      </div>
      <div id="desno">
        <div
          className="word transition"
          ref={reciArr[2]}
          style={{ left: 0, top: 0 }}
          onMouseMove={(e) => setPos(e)}
          onMouseDown={() => handleMove(2)}
        >
          <div className="wrapper">
            <p>{rightWord1}</p>
          </div>
        </div>
        {rightWord2 && (
          <div
            className="word transition"
            ref={reciArr[3]}
            style={{ left: 0, top: 0 }}
            onMouseMove={(e) => setPos(e)}
            onMouseDown={() => handleMove(3)}
          >
            <div className="wrapper">
              <p>{rightWord2}</p>
            </div>
          </div>
        )}
      </div>

      {<div className="circle opacity" ref={circleRef}></div>}
    </div>
  );
};

export default Linev2;
