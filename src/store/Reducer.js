

const Reducer = (state, action) => {
    // we are copying the state into the copyOfState obj
    // to change it immutability, refer to link below
    // https://medium.com/@housecor/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
    let copyOfState = Object.assign({}, state)

    switch (action.type) {
        case 'MATRIX_DISPLAY_BUTTON_CHANGE_MATRIX_DISPLAY_STATE':
            copyOfState.displayMatrix = !copyOfState.displayMatrix
            return copyOfState

        case 'ERROR_BUTTON_CHANGE_ERROR_STATE':
            copyOfState.displayError = !copyOfState.displayError
            copyOfState.errorMessage = action.payload
            return copyOfState

        case 'ERROR_STATE_MESSAGE':
            copyOfState.errorMessage = action.payload
            return copyOfState

        case 'ERROR_STATE_TRUE':
            copyOfState.displayError = true
            return copyOfState

        case 'ERROR_STATE_FALSE':
            copyOfState.displayError = false
            return copyOfState

        case 'MATRIX_RAIN_DISPLAY_TRUE':
            copyOfState.displayMatrix = true
            return copyOfState
        
        case 'MATRIX_RAIN_DISPLAY_FALSE':
            copyOfState.displayMatrix = false
            return copyOfState

        case 'IS_LOADING_TRUE':
            copyOfState.displayMatrix = true
            return copyOfState

        case 'IS_LOADING_FALSE':
            copyOfState.displayMatrix = false
            return copyOfState

        case 'UPDATE_CURRENT_PAGE':
            copyOfState.currentPage = action.payload
            return copyOfState

        case 'UPDATE_TOTAL_POST_COUNT':
            copyOfState.totalPostCount = action.payload
            copyOfState.totalPageCount = Math.ceil(action.payload / copyOfState.pageSize)
            return copyOfState

        case 'UPDATE_SELECTED_POST':
            copyOfState.selectedPost = action.payload
            return copyOfState

        case 'USER_LOGGED_IN':
            copyOfState.isLoggedIn = true
            copyOfState.authToken = action.payload
            return copyOfState

        case 'USER_LOGGED_OUT':
            copyOfState.isLoggedIn = false
            copyOfState.authToken = null
            return copyOfState

        case 'TESTING':
            console.log("I am inside reducer!!!!");
            return copyOfState

        // case 'SAVE_ERROR_MESSAGE':
        //     copyOfState.errorMessage = action.payload
        //     return copyOfState

        default:
                return copyOfState;
    }
};

export default Reducer;