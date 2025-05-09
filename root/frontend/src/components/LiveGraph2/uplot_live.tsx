//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { Sensor } from "../../models/sensor";
import { useLayoutEffect } from "react";
import uPlot from "uplot";
import { Height } from "@mui/icons-material";
import { height } from "@mui/system";

//test vars for resizing
let testHeight;
let testWidth;

export const UplotLive = (passedData) => {
  const timestamp = useRef(0);
  const [data, setData] = useState([[0], [0]]);

  const colors = [
    "red",
    "blue",
    "lightblue",
    "green",
    "Orange",
    "black",
    "brown",
  ];

  const maxDataLength = 50;

  const plot = useRef();

  //on load of the component
  useEffect(() => {
    plot.current = new uPlot(opts, data, plot.current);
  }, []);

  useEffect(() => {
    //console.log(data)
    if (data != undefined) {
      plot.current.setData([
        [...data[0], timestamp.current],
        [...data[1], passedData.passedData[0]],
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (plot.current) {
      //if the "window" is resized
      if (
        testHeight != passedData.parentRef.current.offsetHeight - 100 ||
        testWidth != passedData.parentRef.current.offsetWidth - 100
      ) {
        plot.current.setSize({
          height: passedData.parentRef.current.offsetHeight - 100,
          width: passedData.parentRef.current.offsetWidth - 100,
        });
        console.log("test");
        //sets test vars to the current dimensions of the plot
        testHeight = passedData.parentRef.current.offsetHeight - 100;
        testWidth = passedData.parentRef.current.offsetWidth - 100;
      }
    }

    if (passedData.passedData[0] != undefined) {
      setData((prevData) => {
        let date = new Date();
        timestamp.current = timestamp.current + 0.5;

        //current_date = date.getMinutes() + "-" + (date.getSeconds())
        const newData = [
          [...prevData[0], timestamp.current],
          [...prevData[1], passedData.passedData[0]],
        ];
        if (newData[0].length > maxDataLength) {
          newData[0] = newData[0].slice(-maxDataLength);
          newData[1] = newData[1].slice(-maxDataLength);
        }
        return newData;
      });
    }
  }, [passedData]);

  useEffect(() => {
    console.log("plot update");
  }, [plot]);

  const opts = {
    id: Math.random(),
    series: [
      {},
      {
        label: passedData.sensorList[0].sensorName,

        stroke: colors[Math.floor(Math.random() * colors.length)],
      },
    ],

    scales: {
      x: {
        time: false,
      },

      y: {
        auto: false,
        range: [
          passedData.sensorList[0].minValue,
          passedData.sensorList[0].maxValue,
        ],
      },
    },
  };
  return <div ref={plot} key={passedData.sensorList[0].ID}></div>;
};
