import { LensTwoTone } from "@material-ui/icons";
import React, { CSSProperties, Component, useEffect, useState } from "react";
import {
  AiOutlineClear,
  AiOutlinePlus,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import * as Styles from "./styles";

export const SectorTimer = ({ pointIndex, setSecTimConfigEn, mapData }) => {
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [sectorTime, setSectorTime] = useState([]);

  const closeWindow = () => {
    setSecTimConfigEn(false);
  };

  let lastSector = 0;

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
      setSectorTime((prevArray) => [...prevArray, time]);
      lastSector = currentSector;
      setIsActive(false);
      setTime(0);
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
      <div style={{ textAlign: "center" }}>
        <button onClick={handleStart}>
          <AiOutlinePlayCircle size={50}></AiOutlinePlayCircle>
        </button>
      </div>
      <hr></hr>
      <div id="mainTimer" style={Styles.mainTimer}>
        {" "}
        Sector {lastSector} : {time}{" "}
      </div>
    </div>
  );
};

export default SectorTimer;
