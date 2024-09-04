import "./styles.css";
import { useState, useEffect } from "react";

import { FaUser } from "react-icons/fa";

export default function Driver(props) {
  const [backgroundColor, setBackgroundColor] = useState("var(--f1-black)");
  const [teamTextColor, setTeamTextColor] = useState(`#${props.color}`);
  const [mainColor, setMainColor] = useState(props.color);
  const [altColor, setAltColor] = useState("#FFFFFF");

  useEffect(() => {
    if (props.color === null) {
      setMainColor("FFFFFF");
      setTeamTextColor("#FFFFFF");
    }
  }, [props.color]);

  return (
    <div
      onMouseEnter={() => {
        setBackgroundColor(`#${mainColor}`);
        setTeamTextColor("var(--f1-black)");
        if (props.color === null) {
          setAltColor("#000000");
        }
      }}
      onMouseLeave={() => {
        setBackgroundColor("var(--f1-black)");
        setTeamTextColor(`#${mainColor}`);
        if (props.color === null) {
          setAltColor("#FFFFFF");
        }
      }}
      className="driver"
      style={{
        border: `solid 3px #${mainColor}`,
        backgroundColor: backgroundColor,
      }}
    >
      <div className="number">
        <h2 style={{ color: altColor }}>{props.number}</h2>
      </div>
      <div className="text">
        <h2 style={{ color: altColor }}>{props.name}</h2>
        <p style={{ color: teamTextColor }}>
          {props.team === null ? "N/A" : props.team}
        </p>
      </div>
      <div className="img">
        {props.img_url === null ? (
          <FaUser style={{ color: altColor }} id="broken-img" />
        ) : (
          <img src={props.img_url} alt={`${props.name} headshot`} />
        )}
      </div>
    </div>
  );
}
