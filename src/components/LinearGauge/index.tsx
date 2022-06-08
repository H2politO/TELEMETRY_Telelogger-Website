type Props = {
    value : number;
    minVal?: number;
    maxVal?: number;
}

import React from 'react';
import { IgrLinearGauge } from 'igniteui-react-gauges';
import { IgrLinearGaugeModule } from 'igniteui-react-gauges';

IgrLinearGaugeModule.register();

export default class LinearGaugeScale extends React.Component<any,any>{

    constructor(props : Props){
        super(props);

        this.state = {componentVisible: true};
    }

    public render(): JSX.Element {
        return (
            <div>
            <IgrLinearGauge
                height="120px"
                width="600px"
                value={this.props.value}
                minimumValue={0}
                maximumValue={100} 
                interval={10}
                isScaleInverted={false}
                scaleBrush="LightBlue"
                scaleOutline="Black"
                backingOuterExtent={"Transparent"} 
                scaleStrokeThickness={2}
                scaleInnerExtent={0.05}
                scaleOuterExtent={0.65}
                scaleStartExtent={0.05}
                scaleEndExtent={0.95} />
        </div>
        );
    }
}