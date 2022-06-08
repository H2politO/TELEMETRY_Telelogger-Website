import { NumberLiteralType } from "typescript";
import { Sensor } from './sensor'

export class ComponentsPage{

    compID!: number;
    nameComponent?: string;
    deleted:boolean;
    sensorSelected?: Sensor;
    typeComponent!: number;
    cmpMinRange?: number;
    cmpMaxRange?: number;
    prescaler?: number;
    value: number;

}