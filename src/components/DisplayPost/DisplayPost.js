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
    useParams
  } from 'react-router-dom';

  const DisplayPost = ( props ) => {
    
    const [receivedData, setReceivedData] = useState();
    const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    const [state, dispatch] = useContext(GlobalStore);
    const params = useParams();
    const postId = params._id;


    useEffect(() => {

        dispatch({type: 'MATRIX_RAIN_DISPLAY_TRUE'});

        console.log("post id is => ", postId);

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
            <div className="display-post-container">
                <div className="post-title">
                    {receivedData.post[0].title}
                </div>
    
                <div className="post-content">
                    {receivedData.post[0].content}
                </div>
            </div>
        )
    }
};

export default DisplayPost