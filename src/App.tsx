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

import './App.css'

import Paho from 'paho-mqtt';
import { MinSummaryCalculator } from 'igniteui-react-core';

export class App extends React.Component {

  state = {
    outputList: new Array<ComponentsPage>(),
  }

  handleCallback = (childData: ComponentsPage[]) => {
    this.setState({ outputList: childData })
  }

  render() {
    const { outputList } = this.state;

    return (
      <div className="bg-slate-600 flex flex-col min-h-screen justify-between">

        <Navbar></Navbar>
        <Sidebar parentCallback={this.handleCallback}></Sidebar>

        <div>
          
        </div>

        <main className="mb-auto mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/dashboard" element={<Dashboard compPageList={this.state.outputList}/>} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;