import './Navbar.css';
import axios from 'axios';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements, useNavigate  } from 'react-router-dom';
import { GlobalStore } from '../../store/Store.js';
import MatrixRain from '../../containers/MatrixRain/MatrixRain';


const Navbar = ( props ) => {

    const [state, dispatch] = useContext(GlobalStore);

    const navigate = useNavigate();

    const handlelogout = () => {

        dispatch({type: 'USER_LOGGED_OUT'});

        navigate('/login');
    }

    return (
        <div className="nav-bar">
            <NavLink className="nav-link" to="/">Home</NavLink>
            {state.isLoggedIn ? <NavLink className="nav-link" to="profilepage">PROFILE PAGE</NavLink> : null}
            {state.isLoggedIn ? <NavLink className="nav-link" to="createpost">CREATE POST</NavLink> : null}
            <NavLink className="nav-link" to="about">ABOUT</NavLink>
            {/* <NavLink className="nav-link" to="login">LOGIN</NavLink> */}
            {state.isLoggedIn ? <div onClick={() => handlelogout()}className="nav-link" to="logout">LOGOUT</div> : <NavLink className="nav-link" to="login">LOGIN</NavLink>}

            <div className="nav-link" onClick={() => dispatch({type: 'MATRIX_DISPLAY_BUTTON_CHANGE_MATRIX_DISPLAY_STATE'})}>MATRIX DISPLAY {state.displayMatrix ? 'OFF' : 'ON'}</div>
        </div>
    )
};

export default Navbar