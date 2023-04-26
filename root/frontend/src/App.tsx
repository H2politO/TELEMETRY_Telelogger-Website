import React, { useState, useEffect, Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Team } from './pages/team';
import { Demo } from './pages/demo';
import { Dashboard } from './pages/dashboard';
import { Database } from './pages/database';
import { Sidebar } from './components/Sidebar'
import { PostRun } from './pages/postRun';
import { Navbar } from './components/NavBar';
import { Sensor } from './models/sensor';
import { ComponentsPage } from './models/componentsPage';
import Cookies from 'universal-cookie';
import './App.css'

import Paho from 'paho-mqtt';

export class App extends React.Component {

  state = {
    appComponent: new ComponentsPage()
  }

  cookie = new Cookies();

  constructor(props: any) {
    super(props);
  }

  handleCallback = (childComponent: ComponentsPage) => {

    this.setState({ appComponent: childComponent })
  }

  render() {

    return (
      <div className="bg-slate-600 flex flex-col min-h-screen justify-between backgroundImage">

        <Navbar></Navbar>
        {window.location.pathname == "/dashboard" || window.location.pathname == "/" &&
        <Sidebar parentCallback={this.handleCallback}></Sidebar>}

        <main className="mb-auto mx-auto w-full">
          <Routes>
            <Route path="/testing" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/" element={<Dashboard receivedComponent={this.state.appComponent} />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/database" element={<Database/>} />
            <Route path="/postRun" element={<PostRun/>} />
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