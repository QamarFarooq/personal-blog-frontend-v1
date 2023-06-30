import './App.css';
import {GlobalStore} from './store/Store';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import axios from 'axios';

// this format below is called REACT ARROW FUNCTION COMPONENT
function App() {

  const [state, dispatch] = useContext(GlobalStore);

  // when you console.log output from a axios request, do this "console.log("this is the response => ", response.data)"
  // do NOT do this "console.log("this is the response => " + response.data)" if you do '+' the console log gives you [Object Object]

  console.log('I am accessting state.displayMatrix => ' + state.displayMatrix);

  useEffect (() => {
    axios.post('http://localhost:8081/').then(response => {
      console.log("this is the response => ", response.data)
    }).catch(error => {
      console.log(error);
    })

  }, []);

  return (
    <div className="App">
        <div>testing git commmit again for second time</div>
        <p>
          Edit <code>src/App.js</code> and save to reload!!!!!.
        </p>
        <div className="nav-link">This is a link</div>
        <div className="pagination-element">This is a pagination element</div>
        <div className="button-element">This is a button element</div>
    </div>
  );
}

export default App;
