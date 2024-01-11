import {
    editUserOrRefresh,
    postForgotPassword,
    postLogin,
    postLogout,
    postRefreshToken,
    postRegistration,
    postResetPassword,
    userOrRefresh
} from "../../utils/api";
import {GET_INGREDIENTS_REQUEST} from "../ingredients/actions";
import {AppDispatch, TAuthResponse} from "../../types/types";

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
    readonly payload: TAuthResponse;
}

interface IGetResetPasswordAction {
    readonly type: typeof GET_AUTH_RESET_PASSWORD_SUCCESS;
    readonly payload: TAuthResponse;
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
    if (localStorage.getItem("accessToken")) {
        dispatch({type: GET_AUTH_REQUEST})
        getOrRefresh(localStorage.getItem("accessToken"))
            .then(res => {
                dispatch({type: GET_AUTH_USER_SUCCESS, payload: res})
            })
            .catch(e => {
                dispatch({type: GET_AUTH_FAILURE})
                console.error(e)
            });
    }
}

export const getAuthRegister = (name: string | undefined, email: string | undefined, password: string | undefined) => (dispatch: AppDispatch) => {
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

export const getAuthLogin = (email: string | undefined, password: string | undefined ) => (dispatch: AppDispatch) => {
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

export const getForgotPassword = (email: string) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postForgotPassword(email)
        .then(data => {
            dispatch({type: GET_AUTH_FORGOT_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
        dispatch({type: GET_AUTH_FAILURE})
        console.error(e)
    });
}

export const getResetPassword = (password: string | undefined, confirmPass: string | undefined) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postResetPassword(password, confirmPass)
        .then(data => {
            dispatch({type: GET_AUTH_RESET_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
        dispatch({type: GET_AUTH_FAILURE})
        console.error(e)
    });
}

// const getUserByToken = (token: any) => (dispatch: AppDispatch) => {
//     dispatch({type: GET_AUTH_REQUEST})
//     getOrRefresh(token)
//         .then(res => {
//             dispatch({type: GET_AUTH_USER_SUCCESS, payload: res})
//         })
//         .catch(e => {
//             dispatch({type: GET_AUTH_FAILURE})
//             console.error(e)
//         });
// }

export const editUserByToken = (name: string | undefined, email: string | undefined, password: string | undefined, token: any) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    editOrRefresh(name, email, password, token)
        .then(res => {
            dispatch({type: GET_AUTH_USER_SUCCESS, payload: res})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const logout = (token: any) => (dispatch: AppDispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postLogout(token)
        .then(res => {
            dispatch({type: GET_AUTH_LOGOUT_SUCCESS})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
};

const getOrRefresh = async (token: any) => {
    try {
        return await userOrRefresh(token)
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await postRefreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            token = refreshData.accessToken;
            return await userOrRefresh(token);
        } else {
            return Promise.reject(err);
        }
    }
};

const editOrRefresh = async (name: string | undefined, email: string | undefined, password: string | undefined, token: any) => {
    try {
        return await editUserOrRefresh(name, email, password, token)
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await postRefreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            token.headers.authorization = refreshData.accessToken;
            return editUserOrRefresh(name, email, password, token)
        } else {
            return Promise.reject(err);
        }
    }
};
