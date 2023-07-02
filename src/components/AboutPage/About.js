import './About.css'
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

  const About = ( props ) => {

    return (
        <div className="about-container">
            This is a blog post by Qamar to showcase my awesome coding skills
        </div>
    )
};

export default About