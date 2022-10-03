
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Sensor } from "../../models/sensor"
import ApexAxisChartSeries from "react-apexcharts";

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

    componentDidUpdate() {
        //console.log('Update graph');
    }

    myData: number[] = [];

    state = {
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

        newData: this.props.passedData,
    };


    idInt: any;

    allData: number[][] = []


    componentDidMount() {

        console.log(this.props.minVal, this.props.maxVal);

        this.props.sensorList.forEach((e, index) => {
            this.allData[index]=[]
        });

        console.log(this.state.series)

        this.idInt = setInterval(() => {


            this.allData.forEach((data, index) => {

                data.push(this.props.passedData[index])
                if(data.length>100){
                    data.shift();
                }
            });

            ApexCharts.exec(this.props.id, 'updateSeries', this.allData.map((e, index) => {
                return {data: this.allData[index]}
            }))
        }, 100)
    }

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
                </div>
            </div>
        );
    }
}

export default LiveGraph2;