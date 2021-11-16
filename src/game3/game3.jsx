import React, { useState, useRef, useEffect, createRef } from "react";
import "../css/game3.css";
import Line1 from "./line1";
import Line2 from "./line2";

const Game3 = () => {
  return (
    <div className="game3">
      <Line1 />
      <Line2 />
    </div>
  );
};

export default Game3;
