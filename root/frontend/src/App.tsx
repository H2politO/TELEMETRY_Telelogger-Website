import React, { useState, useEffect, Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Team } from './pages/team';
import { Demo } from './pages/demo';
import { Dashboard } from './pages/dashboard';
import { Database } from './pages/database';
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

  cookie = new Cookies();

  constructor(props: any) {
    super(props);
    if (this.cookie.get('compPage') != undefined) {
      console.log('%c Found the following cookies ', 'color: lihtyellow; font-weight: bold; font-size: 25px');
      console.table(this.cookie.get('compPage'));
      this.state.outputList = this.cookie.get('compPage');
    } else {
      console.log("Didn't find any cookie");
      this.state.outputList = [];
    }
  }

  handleCallback = (childData: ComponentsPage[]) => {
    console.log("Cookies callback")
    this.setState({ outputList: childData })
  }

  render() {

    return (
      <div className="bg-slate-600 flex flex-col min-h-screen justify-between backgroundImage">

        <Navbar></Navbar>
        <Sidebar parentCallback={this.handleCallback}></Sidebar>

        <main className="mb-auto mx-auto w-full">
          <Routes>
            <Route path="/testing" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/" element={<Dashboard compPageList={this.state.outputList} />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/database" element={<Database/>} />
          </Routes>
          <div className="text-gray-400 fixed bottom-0 left-0">
            <p>Made with &hearts; by Informatics (and Electronics) division</p>
          </div>
        </main>

      </div>
    );
  }
}

export default App;