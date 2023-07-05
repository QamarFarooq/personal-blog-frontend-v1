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
                This is a blog post by Qamar to showcase my awesome coding skills
                also, maybe after I am done with the website, you can make it so that
                whenever about tab is clicked, the matrix rain falls, and when you switch 
                away from about tab, than the rain stops? that might be cool. You can also
                state in the about page a brief bio about yourself and stuff
            </div>
        </div>
    )
};

export default About