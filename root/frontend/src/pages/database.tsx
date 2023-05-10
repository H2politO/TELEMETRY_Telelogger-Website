import React, { useEffect, useState } from "react";
import { LiveMap } from "../components/LiveMap";
import { Formik } from "formik";
import { CustomFileUploader } from "../components/FileUploader/CustomFileUploader";

export const Database = () => {

    let listRuns = [{ fileName: 'Name11', fileDate: '20/12/2000', fileLocation: 'Cerrina', fileHour: "12:13" }, { fileName: 'Name2', fileDate: '20/12/2000', fileLocation: 'Silverstone', fileHour: "12:13" }];

    const [selectedMode, setSelectedMode] = useState('List everything');
    const [fetchedTracks, setSelectedTracks] = useState({});

    useEffect(() => {
        const getDatabaseRuns = async () => {
            const response = await fetch('/circuit/getCircuits', {
                mode: 'no-cors',
                method: 'GET',
            })
            /*.then(response => {
                response.json().then(json => {
                    console.log(json)
                })
            })*/
            const json = await response


            //if (response.ok)
                //setSelectedTracks(json)

            console.log(json)
        }

        getDatabaseRuns()

        console.log(selectedMode)
    })

    /*TO DO: implement api call to retrieve csv file names*/
    function getDatabaseRuns() {
        return listRuns
    }

    function changeModeSelection(e) {
        setSelectedMode(e.target.value)
    }



    return (

        <div className="bg-slate-100">
            <div className="bg-slate-400">Retrieve excel data from database. Select one of the following modes to get data from

                <form>
                    <div>
                        Perform a selection by:
                        <select value={selectedMode} onChange={changeModeSelection}>
                            <option>List everything</option>
                            <option>Date</option>
                            <option>Location</option>

                        </select>
                    </div>

                    {selectedMode === "Date" &&
                        <div>Select a date<input type="date"></input></div>
                    }
                    {selectedMode === "Location" &&
                        <div>Location</div>
                    }
                    {selectedMode === "List everything" &&
                        <div>List everything</div>
                    }

                    <input type="submit" value="Submit" />
                </form>

                <div>
                    {listRuns.map(element => {
                        return <div>{element.fileName.toString()}</div>
                    })}
                </div>

            </div>
        </div >

    )
}