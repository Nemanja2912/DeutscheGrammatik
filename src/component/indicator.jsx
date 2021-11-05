import React from "react";
import CheckMark from "../assets/img/check-solid.svg";
import Wrong from "../assets/img/wrong.svg";

const Indicator = ({ indicator, wrong }) => {
  return (
    <div
      style={{
        opacity: indicator ? 1 : 0,
        backgroundColor: wrong ? "#e26d19" : "#a0c814",
      }}
      className={`checkmark ${indicator ? "zoom" : ""}`}
    >
      <img src={wrong ? Wrong : CheckMark} alt="" />
    </div>
  );
};

export default Indicator;
