import React, {Component} from 'react';
import CanvasJS from 'canvasjs';
import CanvasJSReact from 'canvasjs';
import CanvasJSChart from 'canvasjs';
import {Data} from './data';
var dataPoints1 : any[] = [];
var dataPoints2 : any[] = [];
var updateInterval = 2000;
//initial values
var yValue1 = 408;
var yValue2 = 350;
var xValue = 5;
export default class Canvas extends Component<any,any>{
    private chart : CanvasJS.Chart;
	constructor(props:any) {
		super(props);
		this.updateChart = this.updateChart.bind(this);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	componentDidMount(){
		this.updateChart(20);
		setInterval(this.updateChart, updateInterval);
	}
	toggleDataSeries(e : any) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	updateChart(count : number) {
		count = count || 1;
		var deltaY1, deltaY2;
		for (var i = 0; i < count; i++) {
			xValue += 2;
			deltaY1 = 5 + Math.random() *(-5-5);
			deltaY2 = 5 + Math.random() *(-5-5);
			yValue1 = Math.floor(Math.random()*(408-400+1)+400);
			yValue2 = Math.floor(Math.random()*(350-340+1)+340);
			dataPoints1.push({
			  x: xValue,
			  y: yValue1
			});
			dataPoints2.push({
			  x: xValue,
			  y: yValue2
			});
		}
		this.chart.options.data[0].legendText = " Bugatti Veyron - " + yValue1 + " km/h";
		this.chart.options.data[1].legendText = " Lamborghini Aventador - " + yValue2 + " km/h";
		this.chart.render();
	}
	public render() : JSX.Element {
		const options = {
			zoomEnabled: true,
			theme: "light2",
			title: {
				text: "Speed of Bugatti vs Lamborghini"
			},
			axisX: {
				title: "chart updates every 2 secs"
			},
			axisY:{
				suffix: " km/h"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor:"pointer",
				verticalAlign: "top",
				fontSize: 18,
				fontColor: "dimGrey",
				itemclick : this.toggleDataSeries
			},
			data: [
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Bugatti Veyron",
					dataPoints: dataPoints1
				},
				{
					type: "stepLine",
					xValueFormatString: "#,##0 seconds",
					yValueFormatString: "#,##0 km/h",
					showInLegend: true,
					name: "Lamborghini Aventador" ,
					dataPoints: dataPoints2
				}
			]
		}
		return (
			<div>
				<CanvasJS.Chart options = {options}
					onRef={(ref : any) => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}