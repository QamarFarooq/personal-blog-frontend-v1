
import './Pagination.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useParams
  } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import {GlobalStore} from '../../store/Store.js';



const Pagination = ( props ) => {

    // the is a blog that details how to write a fully developed pagination system
    // with dots and last and first page etc. I didnt implement it here,
    // I choose the easier way, if you have time, you can implement it
    // https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

    const [state, dispatch] = useContext(GlobalStore);
    const [paginationArray, setpaginationArray] = useState([]);

    useEffect(() => {

        const arrayOfPages = [];

        for (let i = 1; i <= state.totalPageCount; i++) {
            var index = 0
            index = i
            arrayOfPages.push(<button onClick={() => dispatch({type: 'UPDATE_CURRENT_PAGE', payload: i})} key={i} className="pagination-element">PAGE {index}</button>);
        }
        
        setpaginationArray(arrayOfPages);

    }, [state.totalPageCount, state.currentPage]);

    return (
        <div className="pagination-container">
            {paginationArray}
        </div>
    )
}

export default Pagination