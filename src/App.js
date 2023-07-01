import { GlobalStore } from './store/Store';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import MatrixRain from './containers/MatrixRain/MatrixRain'
import Title from './components/Title/Title.js';
import Navbar from './components/Navbar/Navbar.js';
import HomePage from './components/HomePage/HomePage';
import Pagination from './components/Pagination/Pagination';


// this format below is called REACT ARROW FUNCTION COMPONENT
function App() {

  const [state, dispatch] = useContext(GlobalStore);

      // useEffect(() => {
    //     if (throwError){
    //         try {
    //             throw new Error("I'm your error! I'm erroring so well!")
    //         }
    //         catch (e) {
    //             dispatch({type: 'SAVE_ERROR_MESSAGE', payload: e.toString()})
                
    //             dispatch({type: 'CHANGE_ERROR_STATE'})
    //         }
    //     }
    //   });

  // when you console.log output from a axios request, do this "console.log("this is the response => ", response.data)"
  // do NOT do this "console.log("this is the response => " + response.data)" if you do '+' the console log gives you [Object Object]
  
  // useEffect (() => {
  //   axios.post('http://localhost:8081/').then(response => {
  //     console.log("this is the response a=> ", response.data)
  //   }).catch(error => {
  //     console.log(error);
  //   })

  // }, []);

  return (

      <div className="App">

          <MatrixRain/>
          <Title/>
          <Navbar/>

          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='about' element={<div>About Page</div>}></Route>
          </Routes>

      </div>

  );
}

export default App;
