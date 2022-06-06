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
            <div className="bg-stone-100">
            <IgrLinearGauge
                height="80px"
                width="50%"
                value={this.props.value}
                minimumValue={0}
                maximumValue={100} 
                interval={10}
                isScaleInverted={false}
                scaleBrush="LightBlue"
                scaleOutline="Black"
                scaleStrokeThickness={2}
                scaleInnerExtent={0.05}
                scaleOuterExtent={0.65}
                scaleStartExtent={0.05}
                scaleEndExtent={0.95} />
        </div>
        );
    }
}