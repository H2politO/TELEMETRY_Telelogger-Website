import React, { Component } from 'react';
import { IoAdd, IoHomeOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { GoDashboard } from "react-icons/go";
import Paho from 'paho-mqtt';
import { useState, useEffect } from 'react';

import idraPNG from './idra.png';
import junoPNG from './juno.png';
import '../../App.css'

import logoTeam from './logoTeam.svg'

export const Navbar = () => {

    const [idraOn, setIdra] = useState(false);
    const [prov, setProv] = useState(false);
    let timeoutIdIdra = null; 
    let timeoutIdJuno = null; 
    const [junoOn, setJuno] = useState(false)
    let navBarClient = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", 'navBar' + new Date().getTime());


    useEffect(() => {
        _init();
    }, [])

    const _init = () => {

        navBarClient.onConnectionLost = onConnectionLost;
        navBarClient.onMessageArrived = onMessageArrived;
        navBarClient.connect({ onSuccess: onConnect, onFailure: onFailureConnect });
    }


    // Function called when the client manages to connect to the topic
    function onConnect() {
        if (navBarClient == undefined) {
            console.log('Client undefined');
        }
        navBarClient.subscribe("H2polito/Idra/Status");
        navBarClient.subscribe("H2polito/Juno/Status");

        //console.log('Navbar connected');
    }


    // Function called when the connection has been lost
    function onConnectionLost(responseObject: any) {
        if (responseObject.errorCode !== 0) {
            console.error("onConnectionLost:" + responseObject.errorMessage);
        }

    }


    function onFailureConnect() {
        console.error("Connection failed from navbar");

        setInterval(() => {
            _init();
        }, 1000);

    }

    // Function called when a message arrives at destination
    function onMessageArrived(message: any) {

        if (message.destinationName === "H2polito/Idra/Status") {
            setIdra(message.payloadString === '1');
            clearTimeout(timeoutIdIdra);
            timeoutIdIdra = setTimeout(() => {
                setIdra(false);
            }, 1000);
        }

        if (message.destinationName === "H2polito/Juno/Status") {
            setJuno(message.payloadString === '1')
            clearTimeout(timeoutIdJuno);
            timeoutIdJuno = setTimeout(() => {
                setJuno(false);
            }, 1000);
        }
    }

    return (
        <nav className="navbar navbar-expand-sm py-4 bg-slate-100 border-b-2 border-stone-200">
            <div className="container-fluid">
                <img src={logoTeam} alt="Logo" height={80} width={80} />
                <a className="navbar-brand" href="/">H2politO telemetry</a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/demo"><p>Demo</p></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/"><p>My dashboard</p></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="https://areeweb.polito.it/didattica/h2polito/">Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled " href="/team">Add sensors</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/database">Database </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/testing"><p>Testing</p></a>
                        </li>


                    </ul>
                </div>

                <div className="led-box">
                    <div className={idraOn ? "led-green" : "led-red"}></div>
                </div>

                <div className='nav-item'>
                    <img src={idraPNG} style={{ "height": "100px" }} className='carImages' />
                </div>

                <div className="led-box">
                    <div className={junoOn ? "led-green" : "led-red"}></div>
                </div>

                <div className='nav-item'>
                    <img src={junoPNG} style={{ "height": "100px" }} className='carImages' />
                </div>

                {window.location.pathname == "/dashboard" || window.location.pathname == "/" && <button className="d-flex btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                    <IoAdd size={50} />
                </button>}
            </div>
        </nav>

    )
}