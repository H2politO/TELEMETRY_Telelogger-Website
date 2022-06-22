type Props = {
    value: number;
    minVal: number;
    maxVal: number;
}

import React from 'react';
import { IgrLinearGauge } from 'igniteui-react-gauges';
import { IgrLinearGaugeModule, IgrLinearGraphRange } from 'igniteui-react-gauges';

IgrLinearGaugeModule.register();

export default class LinearGaugeScale extends React.Component<any, any>{

    constructor(props: Props) {
        super(props);

        this.state = { componentVisible: true };
    }

    public render(): JSX.Element {
        return (
            <div>
                <IgrLinearGauge
                    height='120px'
                    width='100%'
                    value={this.props.value}
                    minimumValue={this.props.minVal}
                    maximumValue={this.props.maxVal}
                    interval={10}
                    isScaleInverted={false}
                    //scaleBrush="LightBlue"
                    //scaleOutline="Black"
                    backingOuterExtent={"Transparent"}
                    //scaleStrokeThickness={2}
                    //scaleInnerExtent={0.05}
                    //scaleOuterExtent={0.65}
                    //scaleStartExtent={0.05}
                    rangeBrushes="#a4bd29, #F86232"
                    rangeOutlines="#a4bd29, #F86232"
                    scaleEndExtent={0.95}>
                    <IgrLinearGraphRange name="range1"
                        startValue={this.props.minVal} endValue={this.props.maxVal * 0.7}
                        innerStartExtent={0.075} innerEndExtent={0.075}
                        outerStartExtent={0.25} outerEndExtent={0.4} />
                    <IgrLinearGraphRange name="range2"
                        startValue={this.props.maxVal * 0.7} endValue={this.props.maxVal}
                        innerStartExtent={0.075} innerEndExtent={0.075}
                        outerStartExtent={0.4} outerEndExtent={0.55} />
                </IgrLinearGauge>
            </div>
        );
    }
}