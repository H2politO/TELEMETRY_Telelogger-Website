type Props = {
    speed: number;
    minSpeed: number;
    maxSpeed: number;
    height: string;
    prescaler?: number;
}


import React from 'react';
import ReactDOM from 'react-dom';
import { SweepDirection } from 'igniteui-react-core';
import { IgrRadialGauge } from 'igniteui-react-gauges';
import { IgrRadialGaugeModule } from 'igniteui-react-gauges';
import { IgrRadialGaugeRange } from 'igniteui-react-gauges';
import { RadialGaugeBackingShape } from 'igniteui-react-gauges';
import { RadialGaugeNeedleShape } from 'igniteui-react-gauges';
import { RadialGaugePivotShape } from 'igniteui-react-gauges';
import { RadialGaugeScaleOversweepShape } from 'igniteui-react-gauges';

IgrRadialGaugeModule.register();

export default class Speedometer extends React.Component<any, any>{

    constructor(props: Props) {
        super(props);

        this.state = { componentVisible: true };
    }

    public render(): JSX.Element {


        return (
            <div className='relative'>
                <IgrRadialGauge
                    value={this.props.value[0]}
                    isNeedleDraggingEnabled={false}
                    isNeedleDraggingConstrained={true}
                    scaleStartExtent={0.50}
                    scaleEndExtent={0.570}
                    backingStrokeThickness={8}
                    needleShape="NeedleWithBulb"
                    needleBrush="#ff1230"
                    needleOutline="#9f9f9f"
                    //needleEndExtent={0.475}
                    needleStrokeThickness={1}
                    needlePivotShape="CircleOverlay"
                    needlePivotBrush="#9f9f9f"
                    needlePivotOutline="#9f9f9f"
                    needlePivotWidthRatio={0.2}
                    needlePivotStrokeThickness={1}
                    height="250px"
                    minimumValue={this.props.minSpeed}
                    maximumValue={this.props.maxSpeed}
                    interval={(this.props.maxSpeed - this.props.minSpeed) / 5}
                    rangeBrushes="#e3e3e3, #5bb551, #ffb638, red"
                    rangeOutlines="grey">
                    <IgrRadialGaugeRange name="range1"
                        startValue={this.props.minSpeed} endValue={(0.2 * this.props.maxSpeed)}
                        innerStartExtent={0.50} innerEndExtent={0.50}
                        outerStartExtent={0.57} outerEndExtent={0.57} />
                    <IgrRadialGaugeRange name="range2"
                        startValue={(0.2 * this.props.maxSpeed)} endValue={(0.6 * this.props.maxSpeed)}
                        innerStartExtent={0.50} innerEndExtent={0.50}
                        outerStartExtent={0.57} outerEndExtent={0.57} />
                    <IgrRadialGaugeRange name="range3"
                        startValue={(0.60 * this.props.maxSpeed)} endValue={(0.8 * this.props.maxSpeed)}
                        innerStartExtent={0.50} innerEndExtent={0.50}
                        outerStartExtent={0.57} outerEndExtent={0.57} />
                    <IgrRadialGaugeRange name="range4"
                        startValue={this.props.maxSpeed * 0.8 } endValue={this.props.maxSpeed}
                        innerStartExtent={0.50} innerEndExtent={0.50}
                        outerStartExtent={0.57} outerEndExtent={0.57} />
                </IgrRadialGauge>


            </div>

        );
    }
}