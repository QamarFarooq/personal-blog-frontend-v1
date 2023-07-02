
import Pagination from '../Pagination/Pagination'
import './HomePage.css'
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

const HomePage = ( props ) => {

    const [receivedData, setReceivedData] = useState([null]);
    const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    const [state, dispatch] = useContext(GlobalStore);

    useEffect(() => {

        dispatch({type: 'MATRIX_RAIN_DISPLAY_TRUE'});

        axios.post("http://localhost:8081/", { page: state.currentPage }).then(response => {
            
            setReceivedData(response.data)
            setIsLoadingLocal(false)

            // when you console.log output from a axios request, do this "console.log("this is the response => ", response.data)"
            // do NOT do this "console.log("this is the response => " + response.data)" if you do '+' the console log gives you [Object Object]
            // console.log("responde.data is => ", response.data);

            dispatch({type: 'UPDATE_TOTAL_POST_COUNT', payload: response.data.totalItems})
            dispatch({type: 'MATRIX_RAIN_DISPLAY_FALSE'})

    }).catch(error => {
        console.log(error);
    })
    }, [state.currentPage]);

    // the 'isLoadingLocal' state is added because if you just render and do the map function, than 
    // it will give error of undefined because it takes a split second for the posts to be fetched
    // and while the posts are fetched, the response.data is undefined, so map cannot map to 
    // undefined elements
    if (isLoadingLocal) {
        return (
            <div className="blog-list-container">content is loading....</div>
        )
    }
    else {
        return (
            <div>
                <div className="blog-list-container">
                    {receivedData.posts.map((post) => (
                        <div className="blog-row"> 
                            <Link key={post._id} to='about' className="blog-element">{post.title}</Link> 
                            {state.isLoggedIn ? <div className="blog-element-button">Edit</div>  : null}
                            {state.isLoggedIn ? <div className="blog-element-button">Delete</div>  : null}
                        </div>))
                    }
                </div>
    
                <Pagination/>
            </div> 
        )
    }
}

export default HomePage;