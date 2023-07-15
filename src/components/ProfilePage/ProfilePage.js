import './ProfilePage.css'
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
    useParams,
    useHistory
  } from 'react-router-dom';
  

  const ProfilePage = ( props ) => {
    const [receivedData, setReceivedData] = useState();
    const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    const [state, dispatch] = useContext(GlobalStore);
    const [errorMessage, setErrorMessage] = useState(null);

    const [editMode, setEditMode] = useState('default');

    const navigate = useNavigate()

    const ToggleEditName = () => {
        if (editMode === 'edit name') {
            setEditMode('default');
            setErrorMessage(null);
        }
        else {
            setEditMode('edit name');
            setErrorMessage(null);
        }
    }

    const ToggleEditEmail = () => {
        if (editMode === 'edit email') {
            setEditMode('default');
            setErrorMessage(null);
        }
        else {
            setEditMode('edit email');
            setErrorMessage(null);
        }
    }

    const ToggleEditPassword = () => {
        if (editMode === 'edit password') {
            setEditMode('default');
            setErrorMessage(null);
        }
        else {
            setEditMode('edit password');
            setErrorMessage(null);
        }
    }

    const ToggleDeleteUser = () => {
        if (editMode === 'delete user') {
            setEditMode('default');
            setErrorMessage(null);
        }
        else {
            setEditMode('delete user');
            setErrorMessage(null);
        }
    }

    const HandleEditNameSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log("information inside edit submit is => ", formJson.editName);

        if (formJson.editName.length === 0) {
            setErrorMessage("Input fields is empty, Please input content in input field");
        }
        else {
            axios.put("http://localhost:8081/user/change-name", {
                name: formJson.editName,
            }, {
                headers: {
                    Authorization: "Bearer " + state.authToken
                },
            }).then(response => {
                
                console.log(response);
                navigate('/');
    
            }).catch(error => {

                console.log(error);
                navigate('/errorpage', { state: error});

            })
        }
    }

    const HandleEditEmailSubmit = (e) => {
        
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (formJson.editEmail.length === 0) {
            setErrorMessage("Input fields is empty, Please input content in input field");
        }
        else {
            axios.put("http://localhost:8081/user/change-email", {
                email: formJson.editEmail,
            }, {
                headers: {
                    Authorization: "Bearer " + state.authToken
                },
            }).then(response => {
                
                console.log(response);
                navigate('/');
    
            }).catch(error => {

                console.log(error);
                navigate('/errorpage', { state: error});

            })
        }
    }

    const DeleteUser = () => {

        axios.put("http://localhost:8081/user/delete-user", {
            userId: state.userId
        }, {
            headers: {
                Authorization: "Bearer " + state.authToken
            },
        }).then(response => {
            
            console.log(response);
            // log person out, reset token to null, and than navigate to home page
            dispatch({type: 'USER_LOGGED_OUT'});
            dispatch({type: 'MAKE_NEO_USER_EXIST_FALSE'});
            navigate('/');

        }).catch(error => {

            console.log(error);
            navigate('/errorpage', { state: error});

        })
    }

    useEffect (() => {
        axios.get("http://localhost:8081/user/get-user-details")
        .then(response => {

            setReceivedData(response.data)
            setIsLoadingLocal(false);
            
        }).catch(error => {

            console.log(error);
            navigate('/errorpage', { state: error});
            
        })
    }, [])

    if (isLoadingLocal) {
        return (
            <div className="profile-page-container">{null}</div>
        )
    }
    else {
        return (
            <div className="profile-page-container">
                
                <div className="current-user-details-container">
                    <div className="current-name" >curent name: {receivedData.userName}</div>
                    <div className="current-email" >current email: {receivedData.userEmail}</div>
                </div>
    
                <div className="edit-button-container">
                    <button onClick={() => ToggleEditName()}>EDIT NAME</button>
                    <button onClick={() => ToggleEditEmail()}>EDIT EMAIL</button>
                    <button onClick={() => ToggleDeleteUser()}>DELETE USER</button>
                </div>
    
                {
                    (() => {
                        switch(editMode) {
                            case 'edit name':
                                return <div>
                                            <form className="form-container" onSubmit={HandleEditNameSubmit}>                                       
                                                <textarea name="editName" placeholder="new username" rows="1" cols="50"></textarea>
                                                <div>
                                                    <button className="submit-button" type="submit">SUBMIT</button>
                                                </div>
                                            
                                                <div className="error-message">{errorMessage}</div>
                                            </form>
                                        </div>
                            case 'edit email':
                                return <div>
                                            <form className="form-container" onSubmit={HandleEditEmailSubmit}>
                                                <textarea name="editEmail" placeholder="new email" rows="1" cols="50"></textarea>
                                                <div>
                                                    <button className="submit-button" type="submit">SUBMIT</button>
                                                </div>

                                                <div className="error-message">{errorMessage}</div>
                                            </form>
                                       </div>
                            case 'delete user':
                                return <div>
                                            <div className="delete-user-container">
                                                <div className="delete-user-message">
                                                    You are about to delete the Neo Matrix User, This action cannot be undone. The User along with 
                                                    all posts created by the user will be permanently deleted and cannot be retrieved. are you sure
                                                    you wish to proceed with this action ?
                                                </div>
                                                <div>
                                                    <button className="submit-button" onClick={() => DeleteUser()} type="submit">CONFIRM</button>
                                                </div>
                                            </div>
                                       </div>
                            case 'default':
                                return <div>{null}</div>
                        }
                    })()
                }
            </div>
        )
    }
};

export default ProfilePage