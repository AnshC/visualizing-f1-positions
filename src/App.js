import './App.css';
import { DateISOtoNumber } from './functions/date';

import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { Chart } from 'react-google-charts';

import { FaRegFaceDizzy } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

import Driver from './components/driver';
import { Link } from 'react-router-dom';

export function reloadPage() {
  window.location.reload();
}


function App() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState("Copy");

  const [driverData, setDriverData] = useState([]);
  const [raceData, setRaceData] = useState([{year: "Loading", meeting_name: ""}])
  const [sessionData, setSessionData] = useState([{session_name: "Data..."}])
  const [timeStart, setTimeStart]= useState("");
  
  const [positionData, setPositionData] = useState([]);
  const [averagePos, setAveragePos] = useState("--");
  const [posChange, setPosChange] = useState("--");
  const [peakPos, setPeakPos] = useState("--");
  const [finalPos, setFinalPos] = useState("--");
  const [currentDriver, setCurrentDriver] = useState({
    nameAcr: "VER",
    color: "3671C6",
    team: "Red Bull Racing",
    number: 1,
    name: "Max VERSTAPPEN"
  });

  // Chart Formatting
  const options = {
    scales: {
      x: {
        grid: {
          display: false
        }
      }
    },
    curveType: "function",
    legend: { position: "bottom" },
    lineWidth: 4,
    backgroundColor: "#010000",
    hAxis: {
      gridlines: {
        count: 0
      },
      title: 'Time (s)',
      titleTextStyle: { color: "white",
        fontName: "Inter",
        fontSize: 20,
        bold: true,
        italic: false
       }
    },
    vAxis: {
      title: 'Position',
      baseline: 1,
      titleTextStyle: {
        color: "white",
        fontName: "Inter",
        fontSize: 20,
        bold: true,
        italic: false
      },
      format: 'decimal',
      gridlines: {
        count: 2,
        color: '#0f0f0f'
      },
      direction: -1,
      maxValue: 20,
      minValue: 1
    },
    colors: [`#${currentDriver.color}`, "#ffffff"]
  };

  // Initial Default Driver Data Fetching
  useEffect(()=>{

    setLoading(true);
    // Driver List Data Fetch
    axios.get("https://api.openf1.org/v1/drivers?session_key=latest")
    .then(response => {
      setDriverData(response.data)
    // Session Information Data Fetch (session_name)
    axios.get("https://api.openf1.org/v1/sessions?session_key=latest")
    .then(response => {
      setSessionData(response.data);
      setTimeStart(response.data[0].date_start);
      
    // Race Information Data Fetch (year, meeting_name)
    axios.get("https://api.openf1.org/v1/meetings?meeting_key=latest")
    .then(response => {
      setRaceData(response.data);
    })
    .catch(error => {
      console.log(error)
      setErr(true);
    })
    })
    })
    .catch(error => {
      console.log(error)
      setErr(true);
    })

  }, [])

  // Fetches Data and Parses Data to react useState objects 

  const writeData = useCallback((driverNumber, nameAcr, driverColor, driverTeam, driverFullName)=>{
    setLoading(true);
    // Setting Chart Columns
    const mainArray = [["Time", nameAcr]];

    // Fetching Data from OpenF1 API
    axios.get(`https://api.openf1.org/v1/position?meeting_key=latest&driver_number=${driverNumber}&session_key=latest`)
    .then(response => {
      const data = response.data;
      const positionArray = []

      // Pushing intial position at time = 0 seconds
      const defaultArray = [0, data[0].position];
      mainArray.push(defaultArray);
      positionArray.push(data[0].position)

      data.forEach(dataPoint => {
        
        if (DateISOtoNumber(dataPoint.date).value >= DateISOtoNumber(timeStart).value){
          // Pushing Position Data to Position Array
        positionArray.push(dataPoint.position);
        
        // Pushing data points to chart array
        var array = [DateISOtoNumber(dataPoint.date).value - DateISOtoNumber(timeStart).value, dataPoint.position];
        mainArray.push(array);
        
        setPositionData(mainArray);
        }
      });

      // Calculating Average position using position array

      let average = 0;
      for (let i = 0; i < positionArray.length; i++) {
        average = average + positionArray[i];
      }

      // Setting Driver Position Information
      setPeakPos(Math.min(...positionArray));
      setAveragePos(Math.round(average/positionArray.length));
      setPosChange(positionArray[0]-positionArray[positionArray.length-1]);
      setFinalPos(positionArray[positionArray.length-1]);

      // Null Color, Null Team handling 
      if (driverColor === null) {
        driverColor ="FFFFFF";
      } if (driverTeam === null) {
        driverTeam = "null"
      }

      // Creating Current Driver Object
      const currentDriverObject = {
        nameAcr: nameAcr,
        color: driverColor,
        number: driverNumber,
        team: driverTeam,
        name: driverFullName
      }
      setCurrentDriver(currentDriverObject);
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
      setErr(true);
    })

  }, [timeStart])

  // Default Load Up Driver Data
  useEffect(()=>{
    writeData(1, "VER", "3671C6", "Red Bull Racing", "Max VERSTAPPEN")
  }, [writeData])

  // Component Rendering
  // error render
  if (err === true) {
    return (
      <div className="error">
        <FaRegFaceDizzy id="icon"/>
        <h1>Error Fetching Data from Source.</h1>
        <h2>Try reloading the page.</h2>
        <div className="reload" onClick={()=>{reloadPage()}}><TbReload id="reload-icon"/>REFRESH</div>
        <p>Visualizing F1 Postions by <a href="https://anshc.netlify.app">Ansh Chauhan</a></p>
      </div>
    )
  }
   else {
    return (
      <div className="App">
        <div className="main">
          <div className="header">
          <div className="left">
          <h1 id='header'>Visualizing F1 Positions.</h1>
          <p>Visualize the change of positions of formula 1 drivers from the latest race. By <a className="link" href="https://anshc.netlify.app">Ansh Chauhan.</a></p>
          <p className='openf1'>Data by <a href='https://openf1.org/' className='link'>OpenF1.</a></p>
          <h2 className='race-header'><span style={{ color: "var(--f1-red)" }}>{raceData[0].year}</span> {raceData[0].meeting_name} - <span style={{ color: "var(--f1-red)" }}>{sessionData[0].session_name}</span></h2>
          </div>
          <div className="right">
            <ul>
              <Link to="/about" className='link'><li><FaInfoCircle className='icon'/>About</li></Link>
              <span onClick={()=>{navigator.clipboard.writeText("https://f1positions.netlify.app"); setIsCopied("Copied!")}}><li><FaLink className='icon'/>{isCopied}</li></span>
            </ul>
          </div>
          </div>
          <div className="data">
            { loading === true ? <div className="loading">
              <h1><AiOutlineLoading3Quarters className='icon'/>LOADING...</h1>
            </div> : 
            <Chart
              chartType="LineChart"
              width="100%"
              height="100%"
              data={positionData}
              options={options}
            /> }
          </div>
          <div className="driver-data">
              <div className="driver-header-container">
              <div>
              <h2 className='driver-header'><span style={{ color: `#${currentDriver.color}` }}>{currentDriver.number}</span> {currentDriver.name}</h2>
              <p className="driver-header-team" style={{ color: `#${currentDriver.color}` }}>{currentDriver.team === "null" ? "N/A" : currentDriver.team}</p>
              </div>
              <div className="img">
                <img src={`/img/cars/${currentDriver.team}.png`} alt={`${currentDriver.team} Formula 1 Car`}/>
              </div>
              </div>
              <div className="main-data">
                <div className="container">
                  <h2>Average Position</h2>
                  <h2 className='number'>{averagePos}</h2>
                </div>
                <div className="container">
                  <h2>Positions {posChange < 0 ? "Lost" : "Gained"}</h2>
                  {posChange < 0 ? <h2 className='number' style={{ color: "var(--f1-red)" }}>{posChange}</h2> : posChange === 0 ? <h2 className='number' style={{ color: "var(--f1-orange)" }}>{posChange}</h2> : <h2 className='number' style={{ color: "var(--f1-green)" }}>+{posChange}</h2>}
                </div>
                <div className="container">
                  <h2>Peak Position</h2>
                  <h2 className='number'>{peakPos}</h2>
                </div>
                <div className="container">
                  <h2>Final Position</h2>
                  <h2 className='number'>{finalPos}</h2>
                </div>
              </div>
            </div>
        </div>
        <div className="navigation">
          <div className="drivers-list">
            {driverData.map((d)=>{
              return <span key={d.driver_number} onClick={()=>{writeData(d.driver_number, d.name_acronym, d.team_colour, d.team_name, d.full_name); window.scrollTo(0,0); setLoading(true)}}><Driver name={d.full_name} img_url={d.headshot_url} name_acr={d.name_acronym} team={d.team_name} color={d.team_colour} number={d.driver_number} /></span>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
