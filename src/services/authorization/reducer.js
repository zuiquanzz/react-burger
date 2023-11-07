import {GET_AUTH_FAILURE, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_LOGOUT_SUCCESS, GET_AUTH_USER_SUCCESS, GET_AUTH_REFRESH_TOKEN_SUCCESS} from "./actions";

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    isAuth: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_REQUEST: {
            return {...state, isLoading: true, error: false}
        }
        case GET_AUTH_SUCCESS: {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            return {...state, user: action.payload.user, isLoading: false, error: false, isAuth: true}
        }
        case GET_AUTH_REFRESH_TOKEN_SUCCESS: {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            return {...state, user: null, isLoading: false, error: false, isAuth: true}
        }
        case GET_AUTH_USER_SUCCESS: {
            return {...state, user: action.payload.user, isLoading: false, error: false, isAuth: true}
        }
        case GET_AUTH_LOGOUT_SUCCESS: {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return {...state, user: null, isLoading: false, error: false, isAuth: false}
        }
        case GET_AUTH_FAILURE: {
            return {...state, user: null, isLoading: false, error: true, isAuth: false}
        }
        default:
            return state;
    }
}