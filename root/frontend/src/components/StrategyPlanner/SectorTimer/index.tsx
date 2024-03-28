import { LensTwoTone } from "@material-ui/icons";
import React, { CSSProperties, Component, useEffect, useState } from "react";
import {
  AiOutlineClear,
  AiOutlinePlus,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import * as Styles from "./styles";
import { Close } from "@mui/icons-material";
import { OutlinedInput, Divider, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";

export const SectorTimer = ({ pointIndex, setSecTimConfigEn, mapData }) => {
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [sectorTime, setSectorTime] = useState([]);
  const [dispTime, setDispTime] = useState([]);
  const [lastSector, setLastSector] = useState(0);
  const [secTimeData, setSecTimData] = useState([]);

  const closeWindow = () => {
    setSecTimConfigEn(false);
  };

  //console.log(pointIndex);
  //starts timer
  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 100);
        //setTotalTime((time) => time + 100);
      }, 100);
    } //else {
    //clearInterval(interval);
    //}
    //return () => {
    // clearInterval(interval);
    //};
  }, [isActive, isPaused]);

  useEffect(() => {
    let currentSector = mapData[pointIndex].sector;
    if (currentSector != lastSector) {
      //stops the timer
      setIsActive(true);
      // setSectorTime((prevArray) => [...prevArray, time]);
      setDispTime((prevArray) => [
        ...prevArray,
        [
          "Sector ",
          lastSector,
          ": ",
          "0",
          Math.floor((time / 60000) % 60)
            .toString()
            .slice(-2),
          ":",
          "0",
          Math.floor((time / 1000) % 60)
            .toString()
            .slice(-2),
          ".",
          "0",
          Math.floor((time / 10) % 100)
            .toString()
            .slice(-2),
          <br></br>,
        ],
      ]);
      setSectorTime((prevArray) => [...prevArray, time]);
      setLastSector(currentSector);
      setIsActive(false);
      setTime(0);
      setSecTimData((prevArray) => [
        ...prevArray,
        { SectorNumber: lastSector, SectorTime: time },
      ]);
      console.log(sectorTime);
    }
  }, [pointIndex]);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsActive(false);
      setIsPaused(true);
    }
  };

  return (
    <div style={Styles.rootStyle}>
      <div className="dragHandle" id="header" style={Styles.headerStyle}>
        <h1 style={Styles.titleStyle}>Sector Timer</h1>
        <Button style={Styles.xButtonStyle} onClick={closeWindow}>
          {" "}
          <Close />
        </Button>
      </div>
      <Divider
        sx={{
          position: "relative",
          top: "-20px",
          bgcolor: "black",
          width: "100%",
          stroke: "1px",
        }}
      ></Divider>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleStart}>
          <AiOutlinePlayCircle size={50}></AiOutlinePlayCircle>
        </button>
      </div>
      <CSVLink data={secTimeData} separator={";"}>
        Sector Timer Sheet
      </CSVLink>

      <div style={Styles.mainTimer}>
        CST: {""}
        {/*Current Sector Time */}
        <span style={Styles.timer}>
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
        <div style={Styles.secTime}>
          {/* Sector {lastSector}: {""} */}
          <span style={{ color: "black" }}>
            {dispTime}

            {/* {"0" +
              Math.floor((sectorTime[sectorTime.length - 1] / 60000) % 60)
                .toString()
                .slice(-2)}
            :
            {"0" +
              Math.floor((sectorTime[sectorTime.length - 1] / 1000) % 60)
                .toString()
                .slice(-2)}
            .
            {"0" +
              Math.floor((sectorTime[sectorTime.length - 1] / 10) % 100)
                .toString()
                .slice(-2)} */}
            {/* {(sectorTime[sectorTime.length - 1])} */}
          </span>
        </div>
        {/* sectorTime[lastSector]*/}
      </div>
    </div>
  );
};

export default SectorTimer;
