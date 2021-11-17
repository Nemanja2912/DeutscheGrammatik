import React, { createRef, useEffect } from "react";
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

  const p = [];
  const reciArrValues = [];
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
  }, []);

  const handleMove = (i) => {
    reciArr[i].current.classList.remove("transition");
    const initLeft = reciArrValues[i].leftRelative;
    let didMove = false;
    prihvatamoPos = false;
    const move = (e) => {
      reciArr[i].current.style.zIndex = "100000000";

      if (i === 1) {
        reciArr[i].current.style.left = initLeft + e.clientX - pos[0] + "px";
        reciArr[i].current.style.top = e.clientY - pos[1] + "px";
        return;
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
        console.log(stari.dynamicID);
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
      if (stari.dynamicID == novi.dynamicID) return;
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

          if (noviStrana == "r") {
            pomerajNovi += -novi.width - centarWidth;
            rec = reciArrValues.find((t) => t.dynamicID === 2);
            pomerajNovi -= reciArr.length > 3 ? rec.width : 0;
          } else {
            pomerajNovi -= -novi.width - centarWidth;

            rec = reciArrValues.find((t) => t.dynamicID === 2);
            pomerajNovi += reciArr.length > 3 ? rec.width : 0;
          }
          pomerajStari = 0;
          if (noviStrana == "r") {
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
            noviStrana == "r"
              ? -novi.width - centarWidth
              : novi.width + centarWidth;
          pomerajStari =
            noviStrana == "r"
              ? stari.width + centarWidth
              : -stari.width - centarWidth;
          reciArr[novi.id].current.style.left =
            reciArrValues[novi.id].leftRelative + pomerajNovi + "px";

          const sirinaRazlika =
            noviStrana == "r"
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
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", moveEnd);
  };

  function initValues() {
    for (let i = 0; i < reciArr.length; i++) {
      const id = i;
      let side;
      if (i == 0) side = "left";
      else if (i == 1) side = "center";
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
        allowListedIDS: i == 0 ? [2] : [],
        dynamicID: id,
      };
      reciArrValues[i] = obj;
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
    if (dynamicID == 0) side = "left";
    if (dynamicID == 1) side = "center";
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
    <div class={`container ${"line" + index}`}>
      <div id="levo">
        <div
          class="word transition"
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
      <div id="centar">
        <div
          class="word transition"
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
          class="word transition"
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
            class="word transition"
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
    </div>
  );
};

export default Linev2;
