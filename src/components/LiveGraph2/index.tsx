
import React, { Component } from "react";
import Chart from "react-apexcharts";

interface Props {
    nThread: number;
    passedData: number;
    minVal: number,
    maxVal: number
}

export class LiveGraph2 extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    componentDidUpdate(){
        console.log('Update graph');
    }

    myData: number[] = [];


    state = {
        options: {
            chart: {
                id: "realtime",
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
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
            stroke: {
                curve: 'smooth'
            },
            type: 'line'
        },
        series: [{
            data: []
        }],

        newData: this.props.passedData
    };

    idInt:any;


    componentDidMount() {
        this.idInt=setInterval(() => {
            this.state.newData = this.props.passedData,
                this.myData.push(this.state.newData),
                ApexCharts.exec('realtime', 'updateSeries', [{
                    data: this.myData
                }])
        }, 100, (this.props.nThread));
    }

    componentWillUnmount(){
        console.log('Unmount graph');
        clearInterval(this.idInt);
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="300"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LiveGraph2;