export  type Coord = {
    lat:number,
    lng:number,
}

export type StratRecord = {
    dataToDisplay: any
    id: number,
    pos:Coord,
    strategy:number,
    sector:number,
    speed: number,
    altitude: number,
    note:string
}

export type RawData = {
    pos: Coord,
    altitude: number,
    speed: number,
}