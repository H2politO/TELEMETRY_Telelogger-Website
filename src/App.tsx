import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Team } from './pages/team';
import { Dashboard } from './pages/dashboard';
import { IoMenu } from "react-icons/io5";
import {Sidebar} from './components/Sidebar'
import { Navbar } from './components/NavBar';

import './App.css'

import Paho from 'paho-mqtt';


function App() {

  return (

    <div className="bg-slate-600 flex flex-col min-h-screen justify-between">
      
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      
      <main className="mb-auto mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      
    </div>
  );
}

export default App;