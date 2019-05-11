import React from "react";
import "./style.css";

function Scores(props) {
  return <h2 className="scores">{props.children}</h2>;
}

export default Scores;