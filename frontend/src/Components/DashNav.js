import React from 'react';
import Home from './Images/Home.png';
import Profile from './Images/prof.png';
import {Link, NavLink, Outlet,useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export default function DashNav(){
    const Navigate = useNavigate();
    let isUser = false;
    let isAdmin = false;
    if(document.cookie.match('jwt')!=null){
        const [,token] = document.cookie.match('jwt').input.trim().split('=');
        const decode = jwt_decode(token);
        isUser = true;
        if(decode.admin === true){
            isAdmin = true;
        }
    }
    function LogOut(e){
        Cookies.remove('jwt');
        Navigate('/dashboard/');
    }
    document.title = "Dashboard";
    return(
        <>
        <div style={{backgroundColor:"darkblue",paddingTop:"1%",paddingLeft:"2%"}}>
            <ul className="nav nav-tabs" style={{borderBottom:0}}>
                <li className="nav-item pb-2">
                   <Link className="nav-brand" to="/"><img alt="brand" src={Home}height="35" width="35"/></Link>
                </li>
                <ul className="nav nav-tabs">  
                {
                    isUser?
                    <>
                    <li className="nav-item ps-4">
                    <NavLink className="nav-link" to="/dashboard/">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard/myresearch">My Research</NavLink>
                    </li></>
                    :
                    <></>
                }
                {
                    isAdmin?
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard/statistics">Statistics</NavLink>
                    </li>
                    :<></>
                }
                </ul>
                <li className="nav-item dropdown end">
                    <button className="text-light link dropdown-toggle " id="Menu" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"rgba(0,0,0,0)",border:"0px"}}><img src={Profile} alt="profile" height="35" width="35"/></button>
                    {
                        isUser?
                        <ul className="dropdown-menu" aria-labelledby="Menu">
                        <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                        <li><button className="dropdown-item" onClick={e=>LogOut(e)}>Log Out</button></li>
                        </ul>
                        :
                        <ul className="dropdown-menu" aria-labelledby="Menu">
                        <li><Link className="dropdown-item" to="/login">Log In</Link></li>
                        <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                        </ul>
                    }
                </li>
            </ul>
        </div>
        <Outlet/>
    </>
    );
}