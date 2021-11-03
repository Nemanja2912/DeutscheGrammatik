import React, { useRef, useState, createRef, useEffect } from "react";

const MediaBox = ({ setPlay }) => {
  const [step, setStep] = useState(0);
  const audioRef = useRef([]);

  let imageList = [];
  let audioList = [];

  let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  audioRef.current = num.map((el, i) => audioRef.current[i] ?? createRef());

  for (let i = 1; i < 11; i++) {
    imageList.push(
      <img src={require(`../assets/game1/${i}.jpg`).default} alt="" />
    );

    audioList.push(
      <audio
        controls
        src={require(`../assets/game1/satz${i}.mp3`).default}
        ref={audioRef.current[i - 1]}
        onEnded={() => {
          setStep((prev) => prev + 1);
        }}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  }

  useEffect(() => {
    if (step >= 10) {
      setPlay(false);
      return;
    }
    setTimeout(() => {
      audioRef.current[step].current.play();
    }, 1000);
  }, [step]);

  return (
    <div className="media-box">
      <div className="box">
        {imageList[step]}
        {audioList[step]}
      </div>
    </div>
  );
};

export default MediaBox;
