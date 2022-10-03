import React from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);
    }

        state = {
            series: [
                {
                    data: [
                        {
                            x: 'New Delhi',
                            y: 218
                        },
                        {
                            x: 'Kolkata',
                            y: 149
                        },
                        {
                            x: 'Mumbai',
                            y: 184
                        },
                        {
                            x: 'Ahmedabad',
                            y: 55
                        },
                        {
                            x: 'Bangaluru',
                            y: 84
                        },
                        {
                            x: 'Pune',
                            y: 31
                        },
                        {
                            x: 'Chennai',
                            y: 70
                        },
                        {
                            x: 'Jaipur',
                            y: 30
                        },
                        {
                            x: 'Surat',
                            y: 44
                        },
                        {
                            x: 'Hyderabad',
                            y: 68
                        },
                        {
                            x: 'Lucknow',
                            y: 28
                        },
                        {
                            x: 'Indore',
                            y: 19
                        },
                        {
                            x: 'Kanpur',
                            y: 29
                        }
                    ]
                }
            ],
            options: {
                legend: {
                    show: false
                },
                chart: {
                    height: 350,
                    type: 'treemap'
                },
                title: {
                    text: 'Basic Treemap'
                },
                key: {
                    text: 'MyKey'
                }
            },


        };

    render() {
        return (
           
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="treemap" height={350} />
            </div>
        )
    }
}