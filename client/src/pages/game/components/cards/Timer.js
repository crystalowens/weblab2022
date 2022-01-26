import React from "react";
import Card from "../../../../components/card/Card.js";
import useWindowSize from "../../useWindowSize.js";

import "./Timer.css";
//Time remaining: <span className={ props.timeLeft>5 ? "LongTime": "ShortTime"}>{props.timeLeft} </span>
const Timer = (props) => {
  const [width, height] = useWindowSize();
  const cname = `Timer ${props.timeLeft > 7 ? "LongTime": (props.timeLeft > 3 ? "ShortTime" : "EndTime" )}`;
  return (
    <Card cname = {cname}>{width > 1153 ? "Time remaining: " : (width < 550 ? "" : "Time: ") }{props.timeLeft}</Card>
  );
};

export default Timer;
