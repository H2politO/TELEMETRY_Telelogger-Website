import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from "react";
import { render } from "react-dom";

interface passedData{
  velocity: number,
  car: string
}


let oldVelocity = 0;

export const ResistiveForce = (passedDataVariable : passedData) => {

  const IDRAMASS=30;
  const JUNOMASS=130;
  const [isFilePicked, setFileP] = useState(false);
  const [selectedFile, setselectedF] = useState();
  const [result, setResult] = useState([{vel: 0, force: 0,  actualForce: 0}])
  

  let d= new Date()
  let oldTime = d.getTime() - 10

  
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
          obj[headers[j]] = parseFloat(currentline[j].replace("\r", ""));
         //console.log(obj[headers[j]])
        
        }
        obj["actualForce"]=0
        provResult.push(obj);
       
      }

      console.log(provResult)

      for(let i=0; i<provResult.length; i++){
        console.log(provResult[i].Vel)
       // console.log(provResult)
       provResult[i].Vel = provResult[i].Vel.toFixed(1)

      }
      setResult(provResult)
    }
    reader.readAsText(event.target.files[0]);
     
  }

  useEffect(() => {
    
    let a=(passedDataVariable.velocity-oldVelocity)/(500);

    

    //oldTime=d.getTime();
    oldVelocity=passedDataVariable.velocity;
    
    if(passedDataVariable.car == "Idra/Speed"){
      //idra
      let resultCopy= result;
      if(resultCopy.length==1){
        return
      }
     if (a<0){
      console.log(a, passedDataVariable.velocity)
      resultCopy[parseFloat(passedDataVariable.velocity.toFixed(1))*10].actualForce = Math.abs(a * IDRAMASS);
      setResult([...resultCopy]);}
     }else{
      //juno
      let resultCopy= result;
     
      let f=result.find(f => f.vel===passedDataVariable.velocity)
      let index = result.indexOf(f);

      setResult(resultCopy)
    }

    }, [passedDataVariable])


 const filePicker = <input type="file" name="file" onChange={changeHandler} />
  const renderLineChart = (
    <div>
      <LineChart width={500} height={300} data={result}>
        <Line type="monotone" dataKey="Force" stroke="#ffa500" />
        <Line type="monotone" dataKey="actualForce" stroke="#6495ed"/>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Vel" />


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



