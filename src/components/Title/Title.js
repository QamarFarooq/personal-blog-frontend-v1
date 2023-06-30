import React from 'react'
import './Title.css';
import { useEffect, useContext } from 'react';
import { GlobalStore } from '../../store/Store.js'

const Title = ( props ) => {

    return (
        <div>
            <h1 className="blog-title">The Matrix Blog</h1>
        </div>
    )
};

export default Title