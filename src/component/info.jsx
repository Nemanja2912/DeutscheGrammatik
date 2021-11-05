import React from "react";
import Arrow from "../assets/img/chevron-right-solid.svg";

const Info = ({ setInfo, desc }) => {
  return (
    <div className="info-overlay">
      <div className="info-box">
        <div className="title">AUFGABE</div>
        <div className="text">{desc}</div>
        <div className="close" onClick={() => setInfo(false)}>
          <img src={Arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Info;
