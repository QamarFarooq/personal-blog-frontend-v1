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
            <div className="about-text">
                This is a matrix styled blog post created by Qamar. I created it to understand
                the basics of full stack web development, from user authentication on both backend
                and front end, how content creation is done etc. 
            </div>
        </div>
    )
};

export default About