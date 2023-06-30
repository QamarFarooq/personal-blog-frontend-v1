import React, {createContext, useReducer} from "react";
import Reducer from './Reducer';


// great resource on how to use react reducer/store
// https://devtrium.com/posts/how-to-use-react-usereducer-hook

const initialState = {
    displayMatrix: false,
    displayError: false,
    errorMessage: "This is a default error message. No error message payload was recieved",
    isLoadingGlobal: false,
    currentPage: 1,
    totalPostCount: 0,
    totalPageCount: 1,
    pageSize: 3,
    authToken: null,
    isLoggedIn: false,
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    return (
        <GlobalStore.Provider value={[state, dispatch]}>
            {children}
        </GlobalStore.Provider>
    )
};

export const GlobalStore = createContext(initialState);
export default Store;