type Props = {
    title : string,
    status: number
}

import React from 'react';

export default class SimpleLight extends React.Component <any,any>{

    constructor(props : Props){
        super(props);

        this.state = {componentVisible: true};
    }

    public render(): JSX.Element {
        return (
            <>
            {this.props.status}
            <div className={this.props.status ? "bg-green-500" : "bg-red-500"}>
                <h1 className="text-center">{this.props.title}&nbsp;</h1>
            </div>
            </>
        );
    }

}