import React, { Component } from "react";
import { Sensor } from "../../models/sensor"
import ApexAxisChartSeries from "react-apexcharts";

export class LiveGraph3 extends Component {

    options = {
        title: {
            text: "Basic Column Chart in React"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Apple", y: 10 },
                { label: "Orange", y: 15 },
                { label: "Banana", y: 25 },
                { label: "Mango", y: 30 },
                { label: "Grape", y: 28 }
            ]
        }]
    }

}
