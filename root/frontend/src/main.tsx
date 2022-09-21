import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import 'flowbite';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
