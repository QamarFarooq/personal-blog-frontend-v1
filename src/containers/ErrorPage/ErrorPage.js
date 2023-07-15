import React from 'react';
import { useEffect, useState, useContext, useRef } from 'react';
import { createBrowserRouter, Routes, Route, Link, NavLink, createRoutesFromElements, useNavigate, useLocation  } from 'react-router-dom';
import { GlobalStore } from '../../store/Store';
import './ErrorPage.css';


const ErrorPage = ( props ) => {

  const [state, dispatch] = useContext(GlobalStore);

  const canvasRef = useRef(null);

  const [intervalIdForErrorPage, setintervalIdForErrorPage] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  return (
      <div className="error-container">
        <div className="error-text ">
            <div>THE MATRIX HAS A GLITCH!</div>
            <div>DETAILS OF THE ERROR IS BELOW</div>
            {data}
        </div>
      </div>
  )
};

export default ErrorPage;


  