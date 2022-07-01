import React, { Component } from "react";
import { Sensor } from "../../models/sensor"
import { IgrLegendModule, IgrCategoryChartModule } from 'igniteui-react-charts';
import { IgrLegend, IgrCategoryChart } from 'igniteui-react-charts';

interface Props {
    id: string;
    passedData: number;
    minVal: number,
    maxVal: number,
    sensorList: Sensor
}

export class LiveGraph extends Component<any> {

    public dataIndex: number = 0;
    myData: number[] = [];
    interval: number;
    public data: any[];

    state = {
        newData: this.props.passedData,
    }

    private legend: IgrLegend;
    private legendRef(r: IgrLegend) {
        this.legend = r;
        this.setState({});
    }
    private chart: IgrCategoryChart
    private chartRef(r: IgrCategoryChart) {
        this.chart = r;
        this.setState({});
    }

    constructor(props: any) {
        super(props);

        this.legendRef = this.legendRef.bind(this);
        this.chartRef = this.chartRef.bind(this);
    }

    public setupInterval(): void {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }

        this.interval = window.setInterval(() => this.tick(),
            200);
    }

    public tick(): void {

            this.dataIndex++;
            const oldItem = this.data[0];
            const newItem = CategoryChartSharedData.getNewItem(this.data, this.dataIndex);

            // updating data source and notifying category chart
            this.data.push(newItem);
            this.chart.notifyInsertItem(this.data, this.data.length - 1, newItem);
            this.data.shift();
            this.chart.notifyRemoveItem(this.data, 0, oldItem);
        }
    }

    render() {
        return (
            < div >
                <div className="container sample">

                    <div className="container sample">
                        <div className="container" style={{ height: "calc(100% - 45px)" }} >
                            <IgrCategoryChart
                                //ref={this.onChartRef}
                                width="100%"
                                height="100%"
                                chartType="Line"
                                dataSource={this.state.newData}
                                yAxisExtent={40}
                                //xAxisEnhancedIntervalPreferMoreCategoryLabels="false"
                                shouldAutoExpandMarginForInitialLabels="false"
                                crosshairsDisplayMode="None"
                                markerTypes="None" />
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}
