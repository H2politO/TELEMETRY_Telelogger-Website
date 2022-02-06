export const Dashboard = () => {
    
    var Components = ["div"];
    
    return(
        <div>
            <div className="bg-stone-100  border border-stone-400 text-stone-700 px-4 py-3 rounded relative text-center w-full">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <select className="w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>Speedometer</option>
                        <option>Fuel Pressure</option>
                        <option>Throttle Pressure</option>
                    </select>
                    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-2 rounded" type="button">
                        Insert
                    </button>
                </div>
            </div>
            <div className="components">
                {Components.map((Component, idx) => {
                    const Tag = Component as "div";
                    return(
                        <Tag className="py-4">A</Tag>
                    );
                })}
            </div>
        </div>
    )
}