
import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Sensor } from "../../models/sensor"
import ApexAxisChartSeries from "react-apexcharts";

interface Props {
    id: string;
    passedData: number;
    minVal: number,
    maxVal: number,
    sensorList: Sensor
}

const availableColors= ['#E74C3C', '#9B59B6', '#3498DB', '#2ECC71', '#F4D03F', '#5D6D7E']

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
                        speed: 1
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
                range: 200,
            },
            colors: [availableColors[Math.floor(Math.random()*availableColors.length)]],

            stroke: {
                curve: 'stepline'
            },

            /*
             type: 'line'
             */

        },
        series: [{
            name: this.props.sensorList.sensorName,
            data: []
        }],

        newData: this.props.passedData,
    };

    idInt: any;


    componentDidMount() {
        this.idInt = setInterval(() => {
            this.state.newData = this.props.passedData;
            this.myData.push(this.state.newData);
            if(this.myData.length>200){
                this.myData.shift();
                console.log(this.myData)
            }

            ApexCharts.exec(this.props.id, 'updateSeries', [{
                data: this.myData
            }])
        }, 200);
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