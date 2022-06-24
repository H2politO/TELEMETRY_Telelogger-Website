import React, { useState, useEffect, Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Team } from './pages/team';
import { Dashboard } from './pages/dashboard';
import { IoMenu } from "react-icons/io5";
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/NavBar';
import { Sensor } from './models/sensor';
import { ComponentsPage } from './models/componentsPage';
import Cookies from 'universal-cookie';
import './App.css'

import Paho from 'paho-mqtt';
import { MinSummaryCalculator } from 'igniteui-react-core';

export class App extends React.Component {


  state = {
    outputList: new Array<ComponentsPage>(),
  }

  setOutputList = () => {
    this.setState(this.state.outputList);
  }

  cookie = new Cookies();

  handleCallback = (childData: ComponentsPage[]) => {
    
    console.log('cookieeeee', this.cookie.get('compList'));
    if (this.cookie.get('compList') != undefined)
      this.setState({ outputList: this.cookie.get('compList') })
    else
      this.setState({ outputList: childData })
  }



  useEffect = (
    console.log(''), [this.state.outputList]
  )



  render() {

    return (
      <div className="bg-slate-600 flex flex-col min-h-screen justify-between">

        <Navbar></Navbar>
        <Sidebar parentCallback={this.handleCallback}></Sidebar>

        <main className="mb-auto mx-auto w-full">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/" element={<Dashboard compPageList={this.state.outputList} />} />
          </Routes>
          <div className="text-gray-400 fixed bottom-0 left-0">
            <p>Made with &hearts; by Electronics (and Informatics) division</p>
          </div>
        </main>


      </div>
    );
  }
}

export default App;