import { useNavigate } from 'react-router-dom';
import { GlobalStore } from '../../store/Store'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useParams
  } from 'react-router-dom';

  const LogOut = ( props ) => {

    return (
        <div className="LoginInPage-container">
            Hello everyone, i am inside Logout
        </div>
    )
};

export default LoginOut