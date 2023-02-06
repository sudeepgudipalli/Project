import React from 'react';
import home from './Images/Home.png';
import {Link} from 'react-router-dom';

export default function Home(){
    document.title = "University Research Activity";
    return (
        <>
        <nav className="navbar navbar-dark navbar-expand-lg" style ={{backgroundColor:"darkblue"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={home} alt="" height="35" width="35" className="d-inline-block align-text-top"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#NavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-white fs-4" id="NavBar">
                    University Research Activity Portal
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="NavBar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 fw-light" to="/login">Log in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5 fw-light" to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="d-flex align-items-center justify-content-end bghmin" style={{backgroundColor: "grey",height:"50vh"}}>
            <div className="bgcard">
                <center>
                    <h1 className="display-4 fw-lighter">Welcome to Our Site</h1>
                    <p className="fs-5 fw-light">Find ongoing Researches using the following button</p>
                    <Link className="btn btn-dark" to="/dashboard/">View Data</Link>
                </center>
            </div>
        </div>
        <div className="container p-4">
            <div className="row">
                <div className="col-8">
                    <p className="fs-1">University Research Activity Portal</p>
                    <p className="h6 fw-light">
                        We created this website to have a easier access to research and make it easier for
                        the universities to access their research statistics based on our site users
                    </p>
                </div>
                <div className="col-1"></div>
                <div className="col-3">
                    <div className="fs-2">Contact Us</div>
                    <ul className="list-unstyled">
                        <li>
                          <a href="mailto:admin@gmail.com" className="text-dark contact">Admin</a>
                        </li>
                        <li>
                          <a href="/" className="text-dark contact">12345678</a>
                        </li>
                      </ul>
                </div>
            </div>
        </div>
        <div className="foot fixed-bottom">
            <span className="fs-5 fw-light text-white me-2">Register here</span>
            <Link className="supbutton fs-6 fw-lighter ps-3 pe-3" to="/signup">Sign Up</Link>
        </div>
    </>
    );
}