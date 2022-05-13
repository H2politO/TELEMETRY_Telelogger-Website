export class DataItem {
    public constructor(init: Partial<DataItem>) {
        Object.assign(this, init);
    }
    
    public time: string;
    public speed: number;
    public rpm: number;
    public map: number;
    public crank: number;
    public launchstate: number;

}
export class Data extends Array<DataItem> {
    public constructor(loadTime: number) {
        super();
        this.push(new DataItem(
        {
            time: String(Math.round((new Date()). getTime() / 1000) - loadTime),
            speed: 1,
            rpm: 2,
            map: 3,
            crank: 4,
            launchstate: 5
        }));
    }

}