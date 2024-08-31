import "./About.css";
import { FaGithub } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about">
      <h1 className="main">
        About{" "}
        <span style={{ color: "var(--f1-red)" }}>Visualizing F1 Positions</span>
      </h1>
      <div className="nav">
        <ul>
          <Link className="link" to="/">
            <li>
              <FaGlobeAmericas className="icon" />
              Visualizing F1 Positions
            </li>
          </Link>
          <a
            href="https://github.com/AnshC/visualizing-f1-positions"
            className="link"
          >
            <li>
              <FaGithub className="icon" />
              Github
            </li>
          </a>
        </ul>
      </div>
      <p>
        Visualizing F1 Positions graphs individual driver data as their position
        changes with time.
      </p>
      <h2 className="f1-text red">Data</h2>
      <p>
        All of the data, including the drivers' names, teams, race information,
        and data points are all pulled from{" "}
        <a href="https://openf1.org/">OpenF1.</a> This application is solely
        dependent on the OpenF1 API. Any issues with an API request will lead to
        an error displayed on the website.
      </p>
      <h2 className="f1-text red">Developer Dependencies</h2>
      <p>
        Visualizing F1 Positions is a React.js project and uses these packages
      </p>
      <div className="indent">
        <h3>axios</h3>
        <p>
          <a href="https://axios-http.com/docs/intro">Axios</a> is used to fetch
          data from the OpenF1 API
        </p>
        <h3>react-google-charts</h3>
        <p>
          The graph rendering is handled by{" "}
          <a href="https://www.react-google-charts.com/">react-google-charts</a>
        </p>
        <h3>react-icons</h3>
        <p>
          All icons used are provided by{" "}
          <a href="https://react-icons.github.io/react-icons/">react-icons</a>
        </p>
      </div>
      <h2 className="f1-text red">Fonts</h2>
      <div className="indent">
        <h3 className="f1-text">Formula1-Bold</h3>
        <p className="red">
          by Marc Rouault{" "}
          <a href="https://www.wk.com/work/formula-1-rebrand/">
            (Wieden Kennedy)
          </a>
        </p>
        <h3>Inter</h3>
        <p className="red">
          by Google Fonts{" "}
          <a href="https://fonts.google.com/specimen/Inter?query=Inter">
            (Google Fonts)
          </a>
        </p>
      </div>
      <h2 className="f1-text red">Colors</h2>
      <p>Team colors are pulled from the OpenF1 API</p>
      <div className="indent colors-container">
        <h3 className="f1-text">Website Theme</h3>
        <div className="colors">
          <div
            className="color f1-text"
            style={{ backgroundColor: "var(--f1-red)" }}
          >
            #FF232B
          </div>
          <div
            className="color f1-text"
            style={{ backgroundColor: "var(--f1-red-active)" }}
          >
            #ba1319
          </div>
          <div
            className="color f1-text"
            style={{ backgroundColor: "var(--f1-green)" }}
          >
            #52E252
          </div>
          <div
            className="color f1-text"
            style={{ backgroundColor: "var(--f1-orange)" }}
          >
            #FF8000
          </div>
          <div
            className="color f1-text"
            style={{
              backgroundColor: "var(--f1-black)",
              color: "white",
              border: "3px solid white",
            }}
          >
            #010000
          </div>
        </div>
        <h3 className="f1-text">Team Colors</h3>
        <div className="colors">
          <div className="color f1-text" style={{ backgroundColor: "#3671C6" }}>
            #3671C6
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#6692FF" }}>
            #6692FF
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#FF8000" }}>
            #FF8000
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#0093CC" }}>
            #0093CC
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#229971" }}>
            #229971
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#E80020" }}>
            #E80020
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#B6BABD" }}>
            #B6BABD
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#64C4FF" }}>
            #64C4FF
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#52E252" }}>
            #52E252
          </div>
          <div className="color f1-text" style={{ backgroundColor: "#27F4D2" }}>
            #27F4D2
          </div>
        </div>
      </div>
      <h2 className="f1-text red">Images</h2>
      <p>
        Car images from <a href="https://motorsport.com">motorsport.</a> Driver
        images pulled from OpenF1 API{" "}
        <a href="https://www.formula1.com/">(Formula 1)</a>
      </p>
      <div className="indent cars">
        <img src="/img/cars/Red Bull Racing.png" alt="Redbull 2024 F1 Car" />
        <img src="/img/cars/McLaren.png" alt="McLaren 2024 F1 Car" />
        <img src="/img/cars/Ferrari.png" alt="Ferrari 2024 F1 Car" />
        <img src="/img/cars/Mercedes.png" alt="Mercedes 2024 F1 Car" />
        <img src="/img/cars/Aston Martin.png" alt="Aston Martin 2024 F1 Car" />
        <img src="/img/cars/Haas F1 Team.png" alt="Haas 2024 F1 Car" />
        <img src="/img/cars/RB.png" alt="Visa Cash App Red Bull 2024 F1 Car" />
        <img src="/img/cars/Alpine.png" alt="Alpine 2024 F1 Car" />
        <img src="/img/cars/Williams.png" alt="Williams 2024 F1 Car" />
        <img src="/img/cars/Kick Sauber.png" alt="Kick Sauber 2024 F1 Car" />
      </div>
      <p className="f1-text" id="credit">
        Website Developed & Designed by{" "}
        <a href="https://anshc.netlify.app" className="f1-text">
          Ansh Chauhan
        </a>
      </p>
    </div>
  );
}
