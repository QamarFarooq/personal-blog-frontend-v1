import './CreatePost.css'
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

  const CreatePost = ( props ) => {

    const navigate = useNavigate()

    const test = "testing something";

    useEffect(() => {

    },[])

    return (
        <div className="create-post-container">
            <div className="title-heading">Title</div>
            <textarea className="title-input-box" defaultValue={test} rows="2" cols="50"></textarea>

            {/* make it so you cannot increase/decrease size of text area */}
            <div className="content-heading">Content</div>
            <textarea className="content-input-box" defaultValue={test} rows="15" cols="50"></textarea>

            {/* very important point! when you put '/about' it means it is going back to root and searching route from there, 
            but if you do just 'about' than the route will be 'createpost/about' and it will give an error on console log 
            saying that the route could not be found, remember that */}
            <button className="submit button" onClick={() => navigate('/about')}>Submit</button>
            
        </div>
    )
};

export default CreatePost