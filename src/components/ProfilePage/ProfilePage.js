import './ProfilePage.css'
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

  const ProfilePage = ( props ) => {

    return (
        <div className="ProfilePage-container">
            Hello everyone, i am inside ProfilePage
        </div>
    )
};

export default ProfilePage