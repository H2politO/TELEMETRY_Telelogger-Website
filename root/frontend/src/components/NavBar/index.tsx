import React, { Component } from 'react';
import { IoAdd, IoHomeOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { GoDashboard } from "react-icons/go";
import '../../App.css' 

export class Navbar extends Component {

    render() {

        return (
            <nav className="navbar navbar-expand-sm py-4  bg-slate-100 border-b-2 border-stone-200">
                <div className="container-fluid">
                    <img src={"../logo_team.svg"} alt="Logo" height={80} width={80} />
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
                                <a className="nav-link active" aria-current="page" href="/team">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled " href="/team">Add sensors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Visualize past runs</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/testing"><p>Testing</p></a>
                            </li>
                        </ul>
                    </div>
                    
                    <button className="d-flex btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                        <IoAdd size={50} />
                    </button>
                </div>
            </nav>

        )
    }
}