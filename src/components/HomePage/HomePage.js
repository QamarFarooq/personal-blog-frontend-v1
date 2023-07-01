
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
    
    // const navigate = useNavigate()

    const [receivedData, setReceivedData] = useState([null]);
    const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    const [state, dispatch] = useContext(GlobalStore);

    useEffect(() => {
        dispatch({type: 'MATRIX_RAIN_DISPLAY_TRUE'});

        axios.post("http://localhost:8081/", { page: state.currentPage }).then(response => {
            setReceivedData(response.data)
            setIsLoadingLocal(false)
            console.log("this is the data => ", response.data)
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
                {/* <label>
                    Name:
                    <input className="text-input-box" type="text" name="name" placeholder="placeholder" />
                </label> */}
    
                {/* <button onClick={() => navigate('about')}>nav to about</button> */}
    
                <div className="blog-list-container">
                    {receivedData.posts.map(post => <Link key={post._id} to='about' className="blog-element">{post.title}</Link>)}
                </div>
    
                <Pagination/>
            </div> 
        )
    }
}

export default HomePage;