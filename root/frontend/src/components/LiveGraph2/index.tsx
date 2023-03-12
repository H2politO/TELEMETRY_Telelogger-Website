
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Sensor } from "../../models/sensor"
import { useState } from "react";
import ApexAxisChartSeries from "react-apexcharts";
import ApexAnnotations from "react-apexcharts"

interface Props {
    id: string;
    passedData: number[];
    minVal: number,
    maxVal: number,
    sensorList: Sensor[]
}

const availableColors = ['#E74C3C', '#9B59B6', '#3498DB', '#2ECC71', '#F4D03F', '#5D6D7E']

export class LiveGraph2 extends Component<any> {
    constructor(props: any) {
        super(props);

    }

    myData: number[] = [];

    state = {

        avg: 0,

        options: {
            chart: {
                height: '100%',
                id: this.props.id,
                animations: {
                    enabled: true,
                    easing: 'linear',
                    speed: 1,
                    dynamicAnimation: {
                        enabled: true,
                        speed: 50
                    },
                },

                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                },
            },

            /*
            annotations: {
                yaxis: [{
                    y: 0,
                    borderColor: 'blue',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            color: '#fff',
                            background: '#00E396',
                        },
                        text: 'Average',
                    }
                }]
            },*/

            xaxis: {
                type: 'numeric',
                range: 100,
            },

            yaxis: {
                max: Number(this.props.maxVal),
                min: Number(this.props.minVal)
            },
            //colors: [availableColors[Math.floor(Math.random() * availableColors.length)], availableColors[Math.floor(Math.random() * availableColors.length)]],

            stroke: {
                curve: 'smooth'
            },

            /*
             type: 'line'
             */

        },
        series:
            this.props.sensorList.map(el => (
                {
                    name: el.sensorName,
                    data: []
                })),

        newData: 0,
    };


    idInt: any;
    allData: number[][] = []

    componentDidMount() {

        //setting all data values to 0 (errors may occur otherwise)
        this.props.sensorList.forEach((e, index) => {
            this.allData[index] = [0]
        });

        this.idInt = setInterval(() => {

            this.state.avg = this.allData[0].reduce((a, b) => a + b, 0) / this.allData[0].length
            this.allData.forEach((data, index) => {

                this.state.avg=this.allData[0].reduce((a, b) => a + b, 0) / this.allData[0].length
                //this.state.options.annotations.yaxis[0].y = this.state.avg;

                data.push(this.props.passedData[index])
                if (data.length > 100) {
                    data.shift();
                }
            });

            ApexCharts.exec(this.props.id, 'updateSeries', this.allData.map((e, index) => {
                return { data: this.allData[index] }
            }))
        }, 500)
    }

    dataX=[0];

    /*
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.passedData != this.props.passedData){
            console.log("component updating")
            //new data just arrived
            this.dataX.push(this.props.passedData[0])
            ApexCharts.exec(this.props.id, 'updateSeries', this.allData.map((e, index) => {
                return { data: this.allData[0] }
            }))
        }
    }*/

    componentWillUnmount() {
        console.log('Unmount graph');
        clearInterval(this.idInt);
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            // @ts-ignore
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="100%"
                            
                        />
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LiveGraph2;