import React, { Component } from 'react';
import { IoMenu } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

export class Navbar extends Component {

    LocationView(): string{

        const actualLocation= useLocation();
        const location = useLocation();
        console.log(location.pathname + 'aaa');

        return location.pathname;

    };
    

    render() {

        return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <img src={"../logo_team.svg"} alt="Logo" height={70} width={70} />
                    <a className="navbar-brand" href="/">H2politO telemetry</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/team">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>

                    <button className="d-flex btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <IoMenu size={30} />
                    </button>
                </div>
            </nav>
            
        )
    }
}