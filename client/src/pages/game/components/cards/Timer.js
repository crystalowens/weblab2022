import React from "react";
import Card from "../../../../components/card/Card.js";
import useWindowSize from "../../useWindowSize.js";

import "./Timer.css";
//Time remaining: <span className={ props.timeLeft>5 ? "LongTime": "ShortTime"}>{props.timeLeft} </span>
const Timer = (props) => {
  const [width, height] = useWindowSize();
  const cname = `Timer ${props.timeLeft > 6 ? "LongTime": (props.timeLeft > 3 ? "ShortTime" : "EndTime" )}`;
  return (
    <Card cname = {cname}>{width > 0 ? "Time remaining: " : "" }{props.timeLeft}</Card>
  );
};

export default Timer;
