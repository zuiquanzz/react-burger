import {ACCESS_TOKEN, editUserOrRefresh, postForgotPassword, postLogin, postLogout, postRegistration, postResetPassword, userOrRefresh} from "../../utils/api";
import {AppDispatch, TAuthResponse, TMessageResponse} from "../../types/types";

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_USER_SUCCESS = 'GET_AUTH_USER_SUCCESS'
export const GET_AUTH_REFRESH_TOKEN_SUCCESS = 'GET_AUTH_REFRESH_TOKEN_SUCCESS'
export const GET_AUTH_FORGOT_PASSWORD_SUCCESS = 'GET_AUTH_FORGOT_PASSWORD_SUCCESS'
export const GET_AUTH_RESET_PASSWORD_SUCCESS = 'GET_AUTH_RESET_PASSWORD_SUCCESS'

export const GET_AUTH_LOGOUT_SUCCESS = 'GET_AUTH_LOGOUT_SUCCESS'
export const GET_AUTH_FAILURE = 'GET_AUTH_FAILURE'

interface ILoadingAuthAction {
    readonly type: typeof GET_AUTH_REQUEST;
}

interface IGetAuthAction {
    readonly type: typeof GET_AUTH_SUCCESS;
    readonly payload: TAuthResponse;
}

interface IGetAuthUserAction {
    readonly type: typeof GET_AUTH_USER_SUCCESS;
    readonly payload: TAuthResponse;
}

interface IGetRefreshTokenAction {
    readonly type: typeof GET_AUTH_REFRESH_TOKEN_SUCCESS;
    readonly payload: TAuthResponse;
}

interface IGetForgotPasswordAction {
    readonly type: typeof GET_AUTH_FORGOT_PASSWORD_SUCCESS;
    readonly payload: TMessageResponse;
}

interface IGetResetPasswordAction {
    readonly type: typeof GET_AUTH_RESET_PASSWORD_SUCCESS;
    readonly payload: TMessageResponse;
}

interface IGetLogOutAction {
    readonly type: typeof GET_AUTH_LOGOUT_SUCCESS;
}

interface IAuthFailure {
    readonly type: typeof GET_AUTH_FAILURE;
}

export type TAuthAction =
    ILoadingAuthAction |
    IGetAuthAction |
    IGetAuthUserAction |
    IGetRefreshTokenAction |
    IGetForgotPasswordAction |
    IGetResetPasswordAction |
    IGetLogOutAction |
    IAuthFailure;

export const getUserSession = () => (dispatch: AppDispatch) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        dispatch({type: GET_AUTH_REQUEST})
        userOrRefresh()
            .then(res => {
                dispatch({type: GET_AUTH_USER_SUCCESS, payload: res})
            })
            .catch(e => {
                dispatch({type: GET_AUTH_FAILURE})
                console.error(e)
            });
    }
}

export const getAuthRegister = (name?: string, email?: string, password?: string) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postRegistration(name, email, password)
        .then(data => {
            dispatch({type: GET_AUTH_SUCCESS, payload: data})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const getAuthLogin = (email?: string, password?: string) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postLogin(email, password)
        .then(data => {
            dispatch({type: GET_AUTH_SUCCESS, payload: data})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const getForgotPassword = (email?: string) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postForgotPassword(email)
        .then(data => {
            dispatch({type: GET_AUTH_FORGOT_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
        dispatch({type: GET_AUTH_FAILURE})
        console.error(e)
    });
}

export const getResetPassword = (password?: string, confirmPass?: string) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postResetPassword(password, confirmPass)
        .then(data => {
            dispatch({type: GET_AUTH_RESET_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
        dispatch({type: GET_AUTH_FAILURE})
        console.error(e)
    });
}

export const editUserByToken = (name?: string, email?: string, password?: string) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    editUserOrRefresh(name, email, password)
        .then(res => {
            dispatch({type: GET_AUTH_USER_SUCCESS, payload: res})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postLogout()
        .then(res => {
            dispatch({type: GET_AUTH_LOGOUT_SUCCESS})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
};
