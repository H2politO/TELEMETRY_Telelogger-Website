type Props = {
    height: string;
    speedHistory : number[];
    rpmHistory : number[];
    mapHistory : number[];
    crankHistory : number[];
    launchStateHistory : number[];
    data: Data;
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DataItem, Data } from './data';
import { IgrLegendModule, IgrCategoryChartModule } from 'igniteui-react-charts';
import { IgrLegend, IgrCategoryChart } from 'igniteui-react-charts';

const mods: any[] = [
    IgrLegendModule,
    IgrCategoryChartModule
];
mods.forEach((m) => m.register());

export default class LiveGraph extends React.Component<any, any> {
    private legend: IgrLegend
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

    public render(): JSX.Element {

        return (
        <div className="container sample">
            <div className="legend">
                <IgrLegend
                    orientation="Horizontal"
                    ref={this.legendRef}>
                </IgrLegend>
            </div>
            <div className="container fill">
                <IgrCategoryChart
                    chartType="Line"
                    yAxisLabelLeftMargin="0"
                    yAxisTitleLeftMargin="10"
                    yAxisTitleRightMargin="5"
                    yAxisTitle="Values"
                    dataSource={this.props.data}
                    legend={this.legend}
                    isHorizontalZoomEnabled="false"
                    isVerticalZoomEnabled="false"
                    ref={this.chartRef}
                    height={this.props.height}
                    width="100%">
                </IgrCategoryChart>
            </div>

        </div>
        );
    }

}