import './LoginPage.css'
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

  const LoginPage = ( props ) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [state, dispatch] = useContext(GlobalStore);
    const [receivedData, setReceivedData] = useState([null]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log("email is this => ", formJson.email);
        console.log("password is this => ", formJson.password);

        if (formJson.email.length === 0 || formJson.password.length === 0) {
            setErrorMessage("One of the input fields is empty, both input fields must have value to login");
        }
        else {
            axios.post("http://localhost:8081/user/signin", { 

                email: formJson.email,
                password: formJson.password

            }).then(response => {
            
                console.log("recieved data isa => ", response.data);
                setReceivedData(response.data)
                dispatch({type: 'USER_LOGGED_IN', payload: response.data.token});
                navigate('/');

            }).catch(error => {
                console.log(error);
                setReceivedData("Unable to login");
            })
        }
    }

    useEffect(() => {   
        console.log("I am inside useEffect");
        console.log("new authToken iss => ", state.authToken);
        console.log("state isloggedin is => ", state.isLoggedIn);
    }, [state.isLoggedIn, state.authToken])

    return (
        <form onSubmit={handleSubmit} className="login-page-container" >
            <div className="login-email-title">Email</div>
            <textarea className="login-email-input-box" name="email"  rows="1" cols="30"></textarea>

            <div className="login-username-password">Password</div>
            <textarea className="login-password-input-box" name="password" rows="1" cols="30"></textarea>

            <button className="login-button" type="submit">login</button>

            <div className="error-message">{errorMessage}</div>
        </form>
    )
};

export default LoginPage