import React, { Component } from 'react';
import { IoMenu } from 'react-icons/io5';

export class Sidebar extends Component {


    sidebarToggle?: boolean;

    render() {
        return (

            <div className="offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header header">
                    <h2 className="offcanvas-title" id="offcanvasRightLabel">Menu</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Placeholder text
                    </div>

                    <div>
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>

                    </div>


                </div>
            </div>
        )
    }


}