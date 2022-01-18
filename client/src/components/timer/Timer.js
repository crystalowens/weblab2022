import React from "react";
import Card from "../card/Card.js";

const Timer = (props) => {
  return (
    <Card reactClassName = {props.reactClassName}>
      <div>Time remaining: {props.timeLeft} </div>
    </Card>
  );
};

export default Timer;
