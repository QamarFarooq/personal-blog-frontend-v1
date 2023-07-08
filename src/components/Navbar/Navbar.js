import './Navbar.css';
import axios from 'axios';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements } from 'react-router-dom';
import { GlobalStore } from '../../store/Store.js';
import MatrixRain from '../../containers/MatrixRain/MatrixRain';
import Logout from '../Logout/Logout'

const Navbar = ( props ) => {

    const [state, dispatch] = useContext(GlobalStore);

    const handlelogout = () => {
        console.log("I am inside handlelog out local");
        Logout();
    }

    return (
        <div className="nav-bar">
            <NavLink className="nav-link" to="/">Home</NavLink>
            {state.isLoggedIn ? <NavLink className="nav-link" to="profilepage">ProfilePage</NavLink> : null}
            {state.isLoggedIn ? <NavLink className="nav-link" to="createpost">Create Post</NavLink> : null}
            <NavLink className="nav-link" to="about">About</NavLink>
            <NavLink className="nav-link" to="login">Login</NavLink>
            {state.isLoggedIn ? <div onClick={() => handlelogout()}className="nav-link" to="logout">Logout</div> : <NavLink className="nav-link" to="login">Login</NavLink>}

            <div className="nav-link" onClick={() => dispatch({type: 'MATRIX_DISPLAY_BUTTON_CHANGE_MATRIX_DISPLAY_STATE'})}>Matrix Display {state.displayMatrix ? 'Off' : 'On'}</div>
        </div>
    )
};

export default Navbar