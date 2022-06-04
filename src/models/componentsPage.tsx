import { NumberLiteralType } from "typescript";
import { Sensor } from './sensor'

export class ComponentsPage{
    sensorSelected!: Sensor[];
    nameComponent!: string;
    typeComponent!: number;
    cmpMinRange?: number;
    cmpMaxRange?: number;
    prescaler?: number;

}