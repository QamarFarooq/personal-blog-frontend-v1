import { GlobalStore } from './store/Store';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import MatrixRain from './containers/MatrixRain/MatrixRain'
import Title from './components/Title/Title.js';
import Navbar from './components/Navbar/Navbar.js';
import HomePage from './components/HomePage/HomePage';
import Pagination from './components/Pagination/Pagination';
import CreatePost from './components/CreatePost/CreatePost';
import About from './components/AboutPage/About';


// this format below is called REACT ARROW FUNCTION COMPONENT
function App() {

  const [state, dispatch] = useContext(GlobalStore);

  return (
      <div className="App">
          <MatrixRain/>
          <Title/>
          <Navbar/>

          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='createpost' element={<CreatePost/>}></Route>
            <Route path='about' element={<About/>}></Route>
          </Routes>
      </div>
  );
}

export default App;
