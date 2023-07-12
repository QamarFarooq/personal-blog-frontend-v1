import React from 'react'
import './Title.css';
import { useEffect, useContext } from 'react';
import { GlobalStore } from '../../store/Store.js'

const Title = ( props ) => {

    return (
        <div>
            <div className="blog-title">The Matrix Blog</div>
        </div>
    )
};

export default Title