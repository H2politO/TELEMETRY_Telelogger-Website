import React, { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/home';
import { Team } from './pages/team';
import { Dashboard } from './pages/dashboard';
import './App.css'

import Paho from 'paho-mqtt';

function App() {

  return (
    <div className="bg-slate-600 flex flex-col min-h-screen justify-between">
      <header className="">
        <nav className="flex sm:justify-center space-x-4 bg-slate-200">
          {[
            ['Home', '/'],
            ['Team', '/team'],
            ['Dashboard', '/dashboard']
          ].map(([title, url], idx) => (
            <a key={idx} href={url} className="rounded-lg px-3 py-2 text-gray-900 font-medium hover:bg-gray-100">{title}</a>
          ))}
        </nav>
      </header>
      <main className="mb-auto mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/team" element={<Team />}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>  
    </div>
  );
}

export default App;