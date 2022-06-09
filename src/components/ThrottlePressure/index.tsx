type Props = {
    value : number;
}

import React from 'react';
import { IgrBulletGraph } from 'igniteui-react-gauges';
import { IgrBulletGraphModule } from 'igniteui-react-gauges';

IgrBulletGraphModule.register();

export default class ThrottlePressure extends React.Component <any,any>{

    constructor(props : Props){
        super(props);

        this.state = {componentVisible: true};
    }

    public render(): JSX.Element {
        return (
            <div className="bg-stone-100" >
                <IgrBulletGraph
                     height="120px"
                     width="600px"
                     minimumValue={0}
                     maximumValue={100}

                     value={this.props.value}
                     valueBrush="LimeGreen"
                     valueStrokeThickness={1}
                     valueInnerExtent={0.5}
                     valueOuterExtent={0.65}

                     targetValue={this.props.value}
                     targetValueBreadth={10}
                     targetValueBrush="LimeGreen"
                     targetValueOutline="LimeGreen"
                     targetValueStrokeThickness={1}
                     targetValueInnerExtent={0.3}
                     targetValueOuterExtent={0.85}

                     scaleBackgroundBrush = "#e5e5e5"
                     scaleBackgroundOutline = "#e5e5e5"
                     backingBrush = "#f7f7f7"
                     backingOutline = "#bfbfbf"
                     tickStrokeThickness = {1.5} />
            </div>
        );
    }
}
