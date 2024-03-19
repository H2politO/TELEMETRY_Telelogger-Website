import { numberToString } from "igniteui-react-core";
import React from "react";
import {
  AiOutlineClear,
  AiOutlinePlus,
  AiOutlinePlayCircle,
} from "react-icons/ai";

import "./timer.css";
import { useState, useRef, useEffect } from "react";

//const [isRunning, setIsRunning] = useState(false)
//const [startTime, setStartTime] = useState<number>(0)

export function LapTimer() {
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [laps, setLaps] = useState([]);
  const [time, setTime] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 100);
        setTotalTime((time) => time + 100);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsActive(false);
      setIsPaused(true);
    }
    computeAverage();
  };

  const handleNewLap = () => {
    if (time != 0) {
      setIsActive(true);
      laps.push(time);
      computeAverage();
      setTime(0);
    }
  };

  const computeAverage = () => {
    const sum = laps.reduce((a, b) => a + b, 0);
    const avg = sum / laps.length || 0;
    setAverageTime(avg);
  };

  const clearAll = () => {
    setLaps([]);
    setIsActive(false);
    setTime(0);
    setAverageTime(0);
    setTotalTime(0);
  };

  function deleteLap(passedI: number) {
    laps.splice(passedI, 1);
    setLaps(laps);
    computeAverage();
    setTotalTime(laps.reduce((a, b) => a + b, 0));
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleStart}>
          <AiOutlinePlayCircle size={50}></AiOutlinePlayCircle>
        </button>
        &emsp;
        <button onClick={handleNewLap}>
          <AiOutlinePlus size={50}></AiOutlinePlus>
        </button>
        &emsp;
        <button onClick={clearAll}>
          <AiOutlineClear size={50}></AiOutlineClear>
        </button>
      </div>
      <hr></hr>
      <div className="mainTimer">
        LAP&emsp;
        <span className="timer">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="timer">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        <span className="timerms">
          .{("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>

      <div className="secondaryTimer">
        AVG&emsp;
        <span className="timer">
          {("0" + Math.floor((averageTime / 60000) % 60)).slice(-2)}:
        </span>
        <span className="timer">
          {("0" + Math.floor((averageTime / 1000) % 60)).slice(-2)}
        </span>
        <span className="timerms">
          .{("0" + ((averageTime / 10) % 100)).slice(-2)}
        </span>
      </div>

      <div className="secondaryTimer">
        TOT&emsp;
        <span className="timer">
          {("0" + Math.floor((totalTime / 60000) % 60)).slice(-2)}:
        </span>
        <span className="timer">
          {("0" + Math.floor((totalTime / 1000) % 60)).slice(-2)}
        </span>
        <span className="timerms">
          .{("0" + ((totalTime / 10) % 100)).slice(-2)}
        </span>
      </div>

      <hr></hr>

      {laps.map((lap: number, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <span className="list">{index}</span>
          <span>
            &emsp;
            <span className="timer">
              {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:
            </span>
            <span className="timer">
              {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}.
            </span>
            <span className="timerms">
              {("0" + ((lap / 10) % 100)).slice(-2)}
            </span>
            <button onClick={() => deleteLap(index)}>R</button>
          </span>
        </div>
      ))}
    </div>
  );
}
