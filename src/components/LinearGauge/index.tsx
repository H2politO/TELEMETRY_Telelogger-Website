type Props = {
    value : number;
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
                width="100%"
                minimumValue={0} value={this.props.value}
                maximumValue={100} interval={10}
                isScaleInverted={false}
                scaleBrush="Orange"
                scaleOutline="Red"
                scaleStrokeThickness={2}
                scaleInnerExtent={0.05}
                scaleOuterExtent={0.65}
                scaleStartExtent={0.05}
                scaleEndExtent={0.95} />
        </div>
        );
    }
}