import { Sensor } from "../../models/sensor";
import { Component } from "react";
import React from 'react';


type Props = {
    sensors: Sensor[];
}

export class SensorList extends React.Component<any, any> {


    constructor(props: Props) {
        super(props);

        this.state = { componentVisible: true };
    }

    render() {

        return this.props.sensors.map((sensor: Sensor) => (
            <option value={JSON.stringify(sensor)}> {sensor.ID} - {sensor.sensorName}; Range: {sensor.minValue} - {sensor.maxValue}</option>

        ))

    }
}