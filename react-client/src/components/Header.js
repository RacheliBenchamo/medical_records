import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/styles.css";

function Header() {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="https://res.cloudinary.com/db8eidwqd/image/upload/c_scale,w_350/v1585697185/Hygiene%20Hub/virus-white_q3sgxv.jpg" alt="Logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/records">
                                Records
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Registration
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
