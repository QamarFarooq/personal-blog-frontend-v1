import './Navbar.css';
import axios from 'axios';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements } from 'react-router-dom';
import { GlobalStore } from '../../store/Store.js';
import MatrixRain from '../../containers/MatrixRain/MatrixRain';

const Navbar = ( props ) => {

    const [state, dispatch] = useContext(GlobalStore);

    return (
        <div className="nav-bar">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="about">About</NavLink>
            {state.isLoggedIn ? <NavLink className="nav-link" to="createpost">Create Post</NavLink> : null}
            <div className="nav-link" onClick={() => dispatch({type: 'MATRIX_DISPLAY_BUTTON_CHANGE_MATRIX_DISPLAY_STATE'})}>Matrix Display {state.displayMatrix ? 'Off' : 'On'}</div>
        </div>
    )
};

export default Navbar