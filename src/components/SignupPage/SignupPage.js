import './SignupPage.css'
import { GlobalStore } from '../../store/Store'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    useParams,
    useNavigate
  } from 'react-router-dom';

  const SignupPage = ( props ) => {

    const [state, dispatch] = useContext(GlobalStore);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log("email is this =>", formJson.email);
        console.log("username is this => ", formJson.username);
        console.log("password is this => ", formJson.password);
        console.log("password is this => ", formJson.confirmpassword);

        if (formJson.email.length === 0 || formJson.email.username === 0  || formJson.password.length === 0  || formJson.confirmpassword.length === 0 ) {
            setErrorMessage("input field is empty. Please enter data in all fields");
        }
        else {
            if (formJson.password !== formJson.confirmpassword) {
                setErrorMessage("passwords do not match, please enter the same password");
            }
            else {
                axios.post("http://localhost:8081/user/user-signup", { 
                
                    email: formJson.email,
                    name: formJson.username,
                    password: formJson.password

                }).then(response => {
                
                    // console.log("recieved data in user signup page is => ", response.data);
                    dispatch({type:"MAKE_NEO_USER_EXIST_TRUE"});
                    dispatch({type: 'MATRIX_RAIN_DISPLAY_FALSE'});
     
                }).catch(error => {
                    console.log(error);
                    setErrorMessage("Encountered an Error. Unable to create user");
                })
            }
        }
    }

    useEffect(() => {
        // console.log("state.neoUserExist is =>", state.neoUserExist);
        dispatch({type: 'MATRIX_RAIN_DISPLAY_TRUE'});
    }, [state.neoUserExist])

    return (
        <form onSubmit={handleSubmit}  className="signup-page-container">
            
            <div className="signup-form-container" >
                <div className="signup-message">
                    <div>The Matrix can only have ONE NEO</div>
                    <div>Enter details your below NEO</div>
                </div>

                <div className="signup-username-title">USERNAME</div>
                <textarea className="signup-username-input-box" placeholder="enter username" name="username"  rows="1" cols="30"></textarea>

                <div className="signup-email-title">EMAIL</div>
                <textarea className="signup-email-input-box" placeholder="enter email" name="email"  rows="1" cols="30"></textarea>

                <div className="signup-password-title">PASSWORD</div>
                <textarea className="signup-password-input-box" placeholder="enter password" name="password" rows="1" cols="30"></textarea>
                <textarea className="signup-password-confirm-input-box" placeholder="confirm password" name="confirmpassword" rows="1" cols="30"></textarea>

                <button className="signup-button" type="submit">SIGNUP</button>
                <div className="error-message">{errorMessage}</div>
            
            </div>

        </form>
    )
};

export default SignupPage