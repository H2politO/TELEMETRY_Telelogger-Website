export  type Coord = {
    lat:number,
    lng:number,
}

export type StratRecord = {
    id: number,
    pos:Coord,
    strategy:number,
    sector:number,
    note:string
}
