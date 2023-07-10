
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

    // create local variable here, and make context state equal to it,
    // if that doesnt work, than you can also make dummy state here, set it to
    // context state, and than see if that works for neouserexists;

    useEffect(() => {

        dispatch({type: 'MATRIX_RAIN_DISPLAY_TRUE'});

        axios.post("http://localhost:8081/", { page: state.currentPage }).then(response => {
            
            setReceivedData(response.data)
            setIsLoadingLocal(false)

            // when you console.log output from a axios request, do this "console.log("this is the response => ", response.data)"
            // do NOT do this "console.log("this is the response => " + response.data)" if you do '+' the console log gives you [Object Object]
            // console.log("responde.data is => ", response.data);

            dispatch({type: 'UPDATE_TOTAL_POST_COUNT', payload: response.data.totalCount});
            dispatch({type: 'MATRIX_RAIN_DISPLAY_FALSE'});
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
            <div className="blog-list-container">{null}</div>
        )
    }
    else {
        if (receivedData.totalCount == 0)  {
            return (
                <div>
                    <div className="blog-list-container">
                        <div className="no-post-available-message">
                            No Posts available, please create posts to view them here
                        </div> 
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="blog-list-container">
                        {receivedData.posts.map((post) => (
                            <div key={post._id} className="blog-row">
                                <Link to={`displaypost/${post._id}`} className="blog-element">{post.title}</Link> 
                            </div>)
                            )
                        }
                    </div>
        
                    <Pagination/>
                </div> 
            )
        }
    }
}

export default HomePage;