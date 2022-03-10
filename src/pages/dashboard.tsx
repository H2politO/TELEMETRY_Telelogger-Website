import React, { useState, useEffect } from 'react';
import '../App.css';
import '../index.css';
import Speedometer from "../components/Speedometer";
import Tachometer from '../components/Tachometer';
import LinearGauge from "../components/LinearGauge";
import ThrottlePressure from "../components/ThrottlePressure";

import Paho from 'paho-mqtt';

export const Dashboard = () => {

    const [ connected, setConnected ] = useState(false);
    const [ client, setClient ] = useState<Paho.Client>();
    const _topics = ["H2_car"];
    const [speed, setSpeed] = useState(0);
    const [rpm, setRpm] = useState(0);
    const [throttle, setThrottle] = useState(0);
    const [fuelp, setFuelp] = useState(0);
    const _options = {};
    
    useEffect(() => {
        _init();
      },[])
    
    const _init = () => {
       const c = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", "myClientId" + new Date().getTime());
       c.onConnectionLost = _onConnectionLost;
       c.onMessageArrived = _onMessageArrived;
       c.connect({onSuccess:onConnect});
       setClient(c);
    }

    const onConnect = () => {
        setConnected(true);
        _onSubscribe();
    }
    
    // called when client lost connection
    const _onConnectionLost = (responseObject : any) => {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost: " + responseObject.errorMessage);
        }
        setConnected(false);
    }

    // called when messages arrived
    const _onMessageArrived = (message : any) => {
        var msg2 = message.payloadString;
        msg2 = String(msg2);
        console.log(msg2);
        try{
            var data = JSON.parse(msg2);
        } catch (exc : any) {
            console.log(exc);
        }
        if(data.speed != null){
            setSpeed(data.speed);
        }
        if(data.rpm != null){
            setRpm(data.rpm);
        }
        if(data.throttle != null){
            setThrottle(data.throttle);
        }
        if(data.fuelp != null){
            setFuelp(data.fuelp);
        }
    }


    // called when subscribing topic(s)
    const _onSubscribe = () => {
        if(client == undefined) return
        for (var i = 0; i < _topics.length; i++) {
            client.subscribe(_topics[i], _options);
        }
    }

    // called when subscribing topic(s)
    const _onUnsubscribe = () => {
        if(client == undefined) return
        for (var i = 0; i < _topics.length; i++) {
            client.unsubscribe(_topics[i], _options);
        }
    }

    // called when disconnecting the client
    const _onDisconnect = () => {
        if(client == undefined) return
        client.disconnect();
    }




    var Components = ["div"];
    
    return(
        <div>
            {connected === false &&
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Ops! </strong>
                <span className="block sm:inline">You are not connected!</span>
              </div>
            }

            {connected === true &&
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Connected! </strong>
                <span className="block sm:inline">You are connected to the server!</span>
              </div>
            }

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                Try sending this message to the broker with the topic "H2_car": <br />
                &#123;"speed":80, "rpm": 250, "throttle": 70, "fuelp": 20&#125;    
            </div>

            {/*
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
            */}
            <div className="components">
                <div className="flex flex-wrap d-flex text-center align-center items-center justify-center content-center object-center">
                    <div className="bg-stone-100 centered basis-1/2">
                        <Speedometer value={speed} />
                    </div>
                    <div className="bg-stone-100 centered basis-1/2">
                        <Tachometer value={rpm} />
                    </div>
                    <div className="basis-full">
                        <LinearGauge value={fuelp} />
                    </div>
                    <div className="basis-full">
                        <ThrottlePressure value={throttle} />
                    </div>
                </div>
                {/*Components.map((Component, idx) => {
                    const Tag = Component as "div";
                    return(
                        <Tag key={idx} className="py-4">A</Tag>
                    );
                })*/}
            </div>
        </div>
    )
}