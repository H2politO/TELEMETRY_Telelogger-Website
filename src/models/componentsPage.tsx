import { NumberLiteralType } from "typescript";
import { Sensor } from './sensor'

export class ComponentsPage{
<<<<<<< Updated upstream
    sensorSelected!: Sensor;
    nameComponent?: string;
=======
    deleted:boolean;
    sensorSelected!: Sensor[];
    nameComponent!: string;
>>>>>>> Stashed changes
    typeComponent!: number;
    cmpMinRange?: number;
    cmpMaxRange?: number;
    prescaler?: number;

}