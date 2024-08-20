import "./styles.css";
import { useState } from "react";

export default function Driver(props) {
  const [backgroundColor, setBackgroundColor] = useState("var(--f1-black)");
  const [teamTextColor, setTeamTextColor] = useState(`#${props.color}`);

  return (
    <div
      onMouseEnter={() => {
        setBackgroundColor(`#${props.color}`);
        setTeamTextColor("var(--f1-black)");
      }}
      onMouseLeave={() => {
        setBackgroundColor("var(--f1-black)");
        setTeamTextColor(`#${props.color}`);
      }}
      className="driver"
      style={{
        border: `solid 3px #${props.color}`,
        backgroundColor: backgroundColor,
      }}
    >
      <div className="number">
        <h2>{props.number}</h2>
      </div>
      <div className="text">
        <h2>{props.name}</h2>
        <p style={{ color: teamTextColor }}>{props.team}</p>
      </div>
      <div className="img">
        <img src={props.img_url} alt="" />
      </div>
    </div>
  );
}
