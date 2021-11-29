import React from "react";
import Arrow from "../assets/img/chevron-right-solid.svg";

const Ende = ({ setEnde, desc }) => {
  return (
    <div className="info-overlay">
      <div className="info-box">
        <div className="title">ENDE</div>
        <div className="text">
          Das war die letzte Aufgabe.
          <br /> Du kannst im Menü eine andere Aufgabe auswählen <br /> und sie
          wiederholen.
        </div>
        <div className="close" onClick={() => setEnde(false)}>
          <img src={Arrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Ende;
