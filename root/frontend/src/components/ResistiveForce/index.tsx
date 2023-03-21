import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from "react";
import { render } from "react-dom";



export const ResistiveForce = () => {

  const [isFilePicked, setFileP] = useState(false);
  const [selectedFile, setselectedF] = useState();
  const [result, setResult] = useState([{vel: 0, force: 0,  actualForce: 0}])
  const [newresult, setNewresult]= useState ([{vel: 0, force: 0, actualForce: 0}])
  const data = [{ name: '0', value:200 }, { name: '10', value: 60 }, { name: '20', value: 40 }, { name: '30', value: 30 }, { name: '40', value: 30 }];
  
  
  const changeHandler = (event) => {
    
    setselectedF(event.target.files[0])
    setFileP(true)

    console.log(event.target.files[0])
    
    const reader = new FileReader();
    let provResult = [];

    reader.onload = async (e) => {
      console.log("Loading file")

      let lines = reader.result.toString().split("\n");
      var headers = lines[0].replace("\r", "").split(";");
      console.log(headers)

      //Looping inside file until it reaches the end of it
      for (var i = 1; i < lines.length - 1; i++) {

        var obj = {};
        var currentline = lines[i].split(";");
        

        //For each line, scan through it and save the data
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j].replace("\r", "");
        }
        obj["actualForce"]=0
        provResult.push(obj);
      }
      console.log(provResult);
      setResult(provResult)
    }
    reader.readAsText(event.target.files[0]);
     


  }





 const filePicker = <input type="file" name="file" onChange={changeHandler} />
  const renderLineChart = (
    <div>
      <LineChart width={500} height={300} data={result}>
        <Line type="monotone" dataKey="force" stroke="#8884d8" />
        <Line type="monotone" dataKey="actualForce" stroke="#82ca9d"/>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="velFile" />


        <YAxis />
      </LineChart>
    </div>
  );

  const handleSubmission = () => {
    //setFileP)

  };


  return (
    <div>
      {
        filePicker
      }
      {
        renderLineChart
      }
    </div>



  )
}



