import React, { useEffect, useState } from "react";

export const AverageData = ({ value, minVal, maxVal }) => {
  const [valAr, setValAr] = useState([]);
  const [avDat, setAvDat] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  let sum = 0;

  useEffect(() => {
    if (value[0] != 0 && value[0] != undefined) {
      setValAr((prevArray) => [...prevArray, value[0]]);
    }
  }, [value]);

  useEffect(() => {
    for (let i = 0; i < valAr.length; i++) {
      sum += valAr[i];
    }
    if (valAr.length != 0) {
      setAvDat(sum / valAr.length);
    }
    if (Math.max(...valAr) != -Infinity && Math.min(...valAr) != Infinity) {
      setMax(Math.max(...valAr));
      setMin(Math.min(...valAr));
    }
  }, [valAr]);

  // useEffect(() => {
  //   console.log(valAr);
  // }, [valAr]);

  const resetData = () => {
    setAvDat(0);
    setMax(0);
    setMin(0);
    setValAr([]);
  };

  return (
    <div>
      <span style={{ color: "darkblue", fontSize: "18px" }}>Min of Data: </span>
      <span style={{ fontSize: "20px" }}> {min}</span>

      <br></br>
      <span style={{ color: "darkblue", fontSize: "18px" }}>Max of Data: </span>
      <span style={{ fontSize: "20px" }}> {max}</span>

      <br></br>
      <span style={{ color: "darkred", fontSize: "18px" }}>
        Average of Data:{" "}
      </span>
      <span style={{ fontSize: "20px" }}> {avDat.toFixed(2)}</span>

      <button style={{}} onClick={resetData}>
        {" "}
        <u>RESET</u>
      </button>
    </div>
  );
};
export default AverageData;
