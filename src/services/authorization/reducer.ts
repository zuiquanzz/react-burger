import {
    GET_AUTH_FAILURE,
    GET_AUTH_FORGOT_PASSWORD_SUCCESS,
    GET_AUTH_LOGOUT_SUCCESS,
    GET_AUTH_REFRESH_TOKEN_SUCCESS,
    GET_AUTH_REQUEST,
    GET_AUTH_RESET_PASSWORD_SUCCESS,
    GET_AUTH_SUCCESS,
    GET_AUTH_USER_SUCCESS,
    TAuthAction
} from "./actions";
import {TUser} from "../../types/types";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/api";

export const initialState: IAuthStore = {
    isLoading: false,
    error: false,
    user: null,
    isAuth: false,
    forgotPassword: null
}

interface IAuthStore {
    isLoading: boolean
    error: boolean
    user: TUser | null
    isAuth: boolean
    forgotPassword: string | null
}

export const authReducer = (state = initialState, action: TAuthAction): IAuthStore => {
    switch (action.type) {
        case GET_AUTH_REQUEST: {
            return {...state, isLoading: true, error: false}
        }
        case GET_AUTH_SUCCESS: {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            console.log("set acT",ACCESS_TOKEN)
            console.log("set reT",REFRESH_TOKEN)
            return {...state, user: action.payload.user, isLoading: false, error: false, isAuth: true}
        }
        case GET_AUTH_FORGOT_PASSWORD_SUCCESS: {
            return {...state, isLoading: false, error: false, forgotPassword: action.payload.message}
        }
        case GET_AUTH_RESET_PASSWORD_SUCCESS: {
            return {...state, isLoading: false, error: false, forgotPassword: null}
        }
        case GET_AUTH_REFRESH_TOKEN_SUCCESS: {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            return {...state, user: null, isLoading: false, error: false, isAuth: true}
        }
        case GET_AUTH_USER_SUCCESS: {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
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