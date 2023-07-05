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
    const [state, dispatch] = useContext(GlobalStore);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (formJson.postTitle.length === 0 || formJson.postContent.length === 0) {
            setErrorMessage("One of the input fields is empty, both input fields must have value to create a post");
        }
        else {
            axios.post("http://localhost:8081/create-post", {
                title: formJson.postTitle,
                content: formJson.postContent
            }, {
                headers: {
                    Authorization: "Bearer " + process.env.REACT_APP_USER_TOKEN
                },
            }).then(response => {
                
                dispatch({type: 'UPDATE_TOTAL_POST_COUNT', payload: response.data.totalCount})
                navigate('/');

            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="create-post-container" >
            <div className="title-heading">Title</div>
            <textarea className="title-input-box" name="postTitle"  rows="2" cols="50"></textarea>

            <div className="content-heading">Content</div>
            <textarea className="content-input-box" name="postContent" rows="15" cols="50"></textarea>

            {/* very important point! when you put '/about' it means it is going back to root and searching route from there, 
            but if you do just 'about' than the route will be 'createpost/about' and it will give an error on console log 
            saying that the route could not be found, remember that */}
            <button className="submit-button" type="submit">Submit</button>

            <div className="error-message">{errorMessage}</div>
        </form>
    )
};

export default CreatePost