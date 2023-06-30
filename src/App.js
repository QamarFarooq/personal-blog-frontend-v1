import logo from './logo.svg';
import './App.css';
import {GlobalStore} from './store/Store';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';

function App() {

  const [state, dispatch] = useContext(GlobalStore);

  console.log('I am accessting state.displayMatrix => ' + state.displayMatrix);

  return (
    <div className="App">
      <header className="App-header">
        <div>I am simply testing for commit</div>
        <div>This commit for last time</div>
        <div>testing git commmit again for second time</div>
        <p>
          Edit <code>src/App.js</code> and save to reload!!!!!.
        </p>
      </header>
    </div>
  );
}

export default App;
