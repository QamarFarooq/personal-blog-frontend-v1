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
        }
        else {
            setEditMode('edit name');
        }
    }

    const ToggleEditEmail = () => {
        if (editMode === 'edit email') {
            setEditMode('default')
        }
        else {
            setEditMode('edit email');
        }
    }

    const ToggleEditPassword = () => {
        if (editMode === 'edit password') {
            setEditMode('default')
        }
        else {
            setEditMode('edit password');
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
                    Authorization: "Bearer " + process.env.REACT_APP_USER_TOKEN
                },
            }).then(response => {
                
                console.log(response);
                navigate('/');
    
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const HandleEditEmailSubmit = (e) => {
        
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log("information inside edit submit is => ", formJson.editEmail);

        if (formJson.editEmail.length === 0) {
            setErrorMessage("Input fields is empty, Please input content in input field");
        }
        else {
            axios.put("http://localhost:8081/user/change-email", {
                email: formJson.editEmail,
            }, {
                headers: {
                    Authorization: "Bearer " + process.env.REACT_APP_USER_TOKEN
                },
            }).then(response => {
                
                console.log(response);
                navigate('/');
    
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const DeleteUser = () => {

        console.log("user id is => ", receivedData.userId);
        
        // axios.put("http://localhost:8081/user/delete-user", {
        //     userId: "user Id goes here",
        // }, {
        //     headers: {
        //         Authorization: "Bearer " + process.env.REACT_APP_USER_TOKEN
        //     },
        // }).then(response => {
            
        //     console.log(response);
        //     // log person out, reset token to null, and than navigate to home page
        //     navigate('/');

        // }).catch(error => {
        //     console.log(error);
        // })
    }


    useEffect (() => {

        axios.get("http://localhost:8081/user/get-user-details")
        .then(response => {

            console.log("this is what you get?=> ", response.data.userEmail);
            setReceivedData(response.data)
            setIsLoadingLocal(false);
            
        }).catch(error => {

            console.log(error);
        })
    }, [])

    if (isLoadingLocal) {
        return (
            <div className="profile-page-container">content is loading....</div>
        )
    }
    else {
        return (
            <div className="profile-page-container">
                
                <div className="current-user-details-container">
                    <div className="current-name" >curent name: {receivedData.userName}</div>
                    <div className="current-email" >current email: {receivedData.userEmail}</div>
                    {/* <div className="current-passworda" >current password: {}</div> */}
                </div>
    
                <div className="edit-button-container">
                    <button onClick={() => ToggleEditName()}>Edit Name</button>
                    <button onClick={() => ToggleEditEmail()}>Edit Email</button>
                    <button onClick={() => DeleteUser()}>Delete User</button>
                </div>
    
                {
                    (() => {
                        switch(editMode) {
                            case 'edit name':
                                return <div>
                                            <form className="form-container" onSubmit={HandleEditNameSubmit}>                                       
                                                <textarea name="editName"  rows="1" cols="50"></textarea>
                                                <div>
                                                    <button className="submit-button" type="submit">Submit</button>
                                                </div>
                                            </form>
    
                                            <div className="error-message">{errorMessage}</div>
                                        </div>
                            case 'edit email':
                                return <div>
                                            <form className="form-container" onSubmit={HandleEditEmailSubmit}>
                                                <textarea name="editEmail"  rows="1" cols="50"></textarea>
                                                <div>
                                                    <button className="submit-button" type="submit">Submit</button>
                                                </div>

                                                <div className="error-message">{errorMessage}</div>
                                            </form>
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