
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
                    speed: 100,
                    dynamicAnimation: {
                        enabled: true,
                        speed: 100
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
            colors: ['#FF9933'],
            
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
            this.state.newData = this.props.passedData,
                this.myData.push(this.state.newData),
                ApexCharts.exec(this.props.id, 'updateSeries', [{
                    data: this.myData
                }])
        }, 100);
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