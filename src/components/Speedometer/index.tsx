type Props = {
    speed : number;
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

export default class Speedometer extends React.Component <any,any>{
    
    constructor(props : Props){
        super(props);

        this.state = {componentVisible: true};
    }

    public render(): JSX.Element {
        return(
            <div>              
                <IgrRadialGauge
                    value={this.props.value*this.props.prescaler}
                    isNeedleDraggingEnabled={false}
                    isNeedleDraggingConstrained={true}
                    needleShape="NeedleWithBulb"
                    needleBrush="#ff1230"
                    needleOutline="#9f9f9f"
                    needleEndExtent={0.475}
                    needleStrokeThickness={1}
                    needlePivotShape="CircleOverlay"
                    needlePivotBrush="#9f9f9f"
                    needlePivotOutline="#9f9f9f"
                    needlePivotWidthRatio={0.2}
                    needlePivotStrokeThickness={1}
                    height="200px" width="200px"
                    minimumValue={this.props.minSpeed*this.props.prescaler}
                    maximumValue={this.props.maxSpeed*this.props.prescaler} 
                    interval={(this.props.maxSpeed-this.props.minSpeed)/5} 
                />
            </div>

        );
    }
}