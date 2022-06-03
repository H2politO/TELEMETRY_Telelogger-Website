import React, { Component } from 'react';
import { IoAdd, IoHomeOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { GoDashboard } from "react-icons/go";

export class Navbar extends Component {

    render() {

        return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <img src={"../logo_team.svg"} alt="Logo" height={100} width={100} />
                    <a className="navbar-brand" href="/">H2politO telemetry</a>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/"><p>Home</p></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/dashboard"><p>Dashboard</p></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/team">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Add sensors</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Visualize past runs</a>
                            </li>
                        </ul>
                    </div>

                    <button className="d-flex btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                        <IoAdd size={30} />
                    </button>
                </div>
            </nav>

        )
    }
}