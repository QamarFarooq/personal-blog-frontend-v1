import { GlobalStore } from './store/Store';
import React, { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route, Link, NavLink, Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import MatrixRain from './containers/MatrixRain/MatrixRain'
import Title from './components/Title/Title.js';
import Navbar from './components/Navbar/Navbar.js';
import HomePage from './components/HomePage/HomePage';
import Pagination from './components/Pagination/Pagination';
import CreatePost from './components/CreatePost/CreatePost';
import About from './components/AboutPage/About';
import DisplayPost from './components/DisplayPost/DisplayPost';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';


// this format below is called REACT ARROW FUNCTION COMPONENT
function App() {

  const [state, dispatch] = useContext(GlobalStore);
  const [receivedData, setReceivedData] = useState([null]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      axios.get("http://localhost:8081/user/get-user-info").then(response => {

          setReceivedData(response.data)
          setIsLoadingLocal(false)
          
          // if user does not exist, than navigate to the signup page
          if (receivedData.userExists) {
            dispatch({type:"MAKE_NEO_USER_EXIST_TRUE"});
          }
          // user does not exist
          else {
            dispatch({type:"MAKE_NEO_USER_EXIST_FALSE"});
          }
      }).catch(error => {
          console.log(error);
      })

  }, [state.neoUserExist]);

  // show signup version of the website if no neo user exist

  if (receivedData != null) {
      if (!receivedData.userExists) {
        return (
            <div className="App">
                <MatrixRain/>
                <Routes>
                  <Route path='/' element={<SignupPage/>}></Route>
                </Routes>
            </div>
        )
      }
      // show normal version of the website when user exists
      else {
        return (
            // because you are not really loading data from the server here, there is no
            // need for an isloading exception rendering here.
            <div className="App">
                <MatrixRain/>
                <Title/>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='displaypost/:_id' element={<DisplayPost/>}></Route>
                    {state.isLoggedIn && <Route path='createpost' element={<CreatePost/>}></Route>}
                    {state.isLoggedIn && <Route path='profilepage' element={<ProfilePage/>}></Route>}
                    <Route path='about' element={<About/>}></Route>
                    <Route path='login' element={<LoginPage/>}></Route>
                    <Route path='signup' element={<SignupPage/>}></Route>
                </Routes>
            </div>
        );
      }
  }
  else {
      return (
        <div className="App">
          <div>{null}</div>
        </div>
      )
  }
}

export default App;
