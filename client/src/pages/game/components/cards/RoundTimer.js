import React, { useEffect } from "react";
import {useState} from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import "./RoundTimer.css";

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">{remainingTime}</div>
  );
};

const RoundTimer = ({restart}) => {
  const [key, setKey] = useState(0);
  useEffect(()=> {
    if(restart){
      setKey(key => key + 1);
    }
  }, [restart]);
  return (
    <div className="timer-wrapper">
    <CountdownCircleTimer
      key={key}
      isPlaying
      strokeWidth={9}
      duration={3}
      size={140}
      trailColor="#084799"
      colors={[["#ffd620"]]}
    >
      {renderTime}
    </CountdownCircleTimer>
  </div>
  );
}

export default RoundTimer;