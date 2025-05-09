import { NumberLiteralType } from "typescript";
import { Sensor } from './sensor'

export class ComponentsPage{

    compID?: string;
    nameComponent?: string;
    sensorSelected!: Sensor[];
    typeComponent!: number;
    cmpMinRange!: number;
    cmpMaxRange!: number;
    prescaler?: number;
    value: number;
    w?: number;
    h?: number;

}