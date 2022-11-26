import React from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { useState } from "react";
import { useEffect } from "react";


export const AltimetryMap = (passedData) => {

    const [series, setSeries] = useState([{ name: "A", data: [] }])
    const [chartOptions, setChartOptions] = useState({
        annotations: {
            points:
                [
                    {
                        x: 100,
                        y: 292,
                        marker: {
                            size: 8,
                        },
                        label: {
                            borderColor: '#FF4560',
                            text: 'Point Annotation'
                        }
                    }
                ]
        },
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            type: 'numeric'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        }
    });


    //Useeffect called on file change
    useEffect(() => {
        console.log("Altimetry update")

        setSeries([{
            name: "Desktops",
            data: passedData.data[0]
        }]);

    }, [passedData.data[0]]);

    //UseEffect called on car position update
    useEffect(() => {
        setChartOptions({
            annotations: {
                points:
                    [
                        {
                            x: passedData.data[1] % passedData.data[0].length,
                            y: passedData.data[0][passedData.data[1] % passedData.data[0].length],
                            marker: {
                                size: 8,
                            },
                            label: {
                                borderColor: '#FF4560',
                                text: 'IDRA'
                            }
                        }
                    ]
            },
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            xaxis: {
                type: 'numeric'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Altimetry',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            }
        });

    }, [passedData.data[1]]);

    return (

        <div id="chartASD">
            <Chart
                // @ts-ignore
                options={chartOptions}
                // @ts-ignore
                series={series}
                type="line" height={350} />
        </div>
        )
}