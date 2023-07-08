import './DisplayPost.css'
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
    useParams,
    useHistory
  } from 'react-router-dom';

  const DisplayPost = ( props ) => {
    
    const [receivedData, setReceivedData] = useState();
    const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [state, dispatch] = useContext(GlobalStore);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const params = useParams();
    const postId = params._id;

    const navigate = useNavigate();

    const ToggleEditMode = () => {
        setEditMode(!editMode);
    }

    const EditSubmit = (e) => {
        console.log("this is the postid in EditSubmit => ", postId);

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (formJson.postTitle.length === 0 || formJson.postContent.length === 0) {
            setErrorMessage("One of the input fields is empty, both input fields must have value to create a post");
        }
        else {
            axios.put("http://localhost:8081/edit-post", {
                title: formJson.postTitle,
                content: formJson.postContent,
                postId: postId
            }, {
                headers: {
                    Authorization: "Bearer " + process.env.REACT_APP_USER_TOKEN
                },
            }).then(response => {
                
                navigate('/');

            }).catch(error => {
                console.log(error);
            })
        }        
    }

    const HandleDeleteButtonClick = () => {

        axios.delete(`http://localhost:8081/delete-post/${postId}`, 
        {
            headers: {
                Authorization: "Bearer " + process.env.REACT_APP_USER_TOKEN,
            }
        }).then(response => {
            console.log("delete was successful");
            dispatch({type: 'UPDATE_TOTAL_POST_COUNT', payload: response.data.totalCount});
            dispatch({type: 'UPDATE_CURRENT_PAGE', payload: 1});
            navigate('/');

        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {

        dispatch({type: 'MATRIX_RAIN_DISPLAY_TRUE'});

        axios.post("http://localhost:8081/get-post-by-id", { _id: postId }).then(response => {

            setReceivedData(response.data)
            setIsLoadingLocal(false)
            dispatch({type: 'MATRIX_RAIN_DISPLAY_FALSE'})

    }).catch(error => {
        console.log(error);
    })
    }, []);

    if (isLoadingLocal) {
        return (
            <div className="blog-list-container">Post is loading....</div>
        )
    }
    else {
        return (
            <div>
                {editMode ? 
                    <div>
                        <div className="display-post-container">

                            <form onSubmit={EditSubmit} className="create-post-container" >
                                <div className="title-heading">Title</div>
                                <textarea className="title-input-box" name="postTitle" defaultValue={receivedData.post[0].title} rows="2" cols="50"></textarea>

                                <div className="content-heading">Content</div>
                                <textarea className="content-input-box" name="postContent" defaultValue={receivedData.post[0].content} rows="15" cols="50"></textarea>
                                
                                <button className="submit-button" type="submit">Submit Changes</button>
                                <button className="button" onClick={() => ToggleEditMode()}>Back</button>

                                <div className="error-message">{errorMessage}</div>
                            </form>
                        </div>
                    </div> : 
                    <div>
                        <div className="display-post-container">
                            <div className="display-post-button-container">
                                <button className="button" onClick={() => HandleDeleteButtonClick()}>Delete Post</button>
                                <button className="button" onClick={() => ToggleEditMode()}>Edit Post</button>
                            </div>

                            <div className="post-title">
                                {receivedData.post[0].title}
                            </div>
                
                            <div className="post-content">
                                {receivedData.post[0].content}
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
};

export default DisplayPost