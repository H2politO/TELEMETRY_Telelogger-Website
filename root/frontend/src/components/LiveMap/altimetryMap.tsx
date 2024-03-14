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
                        x: 0,
                        y: 0,
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
            type: 'line',
            zoom: {
                enabled: false
            },
            //foreColor: '#373d3f',
            //background: '#001d3d'
        },
        colors: ['#ffc300'],
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
                //colors: ['#f3f3f3', '#000000'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },

        yaxis: {
            forceNiceScale: true,
        }
    });


    //Useeffect called on file change
    useEffect(() => {
        console.log("Altimetry update")
        console.log(passedData)

        setSeries([{
            name: "Desktops",
            data: passedData.data[0]
        }]);

    }, [passedData.data[0]]);

    //UseEffect called on car position update
    useEffect(() => {
        console.log(passedData.data[1])
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
                                text: 'Car'
                            }
                        }
                    ]
            },
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                },
                //foreColor: '#FFC300',
                //background: ' #001d3d'
            },
            colors: ['#ffc300'],

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
                align: 'center'
            },
            grid: {
                row: {
                    //colors: ['var(--myLightBlue)'], // takes an array which will be repeated on columns
                    opacity: 0.4
                },
            },
            yaxis: {
                forceNiceScale: true,
            }
        });

    }, [passedData.data[1]]);

    return (

        <div id="chartASD" >
            <Chart
                // @ts-ignore
                options={chartOptions}
                // @ts-ignore
                series={series}
                type="line" height={300}/>
        </div>
        )
}