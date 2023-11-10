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

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_USER_SUCCESS = 'GET_AUTH_USER_SUCCESS'
export const GET_AUTH_REFRESH_TOKEN_SUCCESS = 'GET_AUTH_REFRESH_TOKEN_SUCCESS'
export const GET_AUTH_FORGOT_PASSWORD_SUCCESS = 'GET_AUTH_FORGOT_PASSWORD_SUCCESS'
export const GET_AUTH_RESET_PASSWORD_SUCCESS = 'GET_AUTH_RESET_PASSWORD_SUCCESS'

export const GET_AUTH_LOGOUT_SUCCESS = 'GET_AUTH_LOGOUT_SUCCESS'
export const GET_AUTH_FAILURE = 'GET_AUTH_FAILURE'

export const getUserSession = () => (dispatch) => {
    if (localStorage.getItem("accessToken")) {
        dispatch(getUserByToken(localStorage.getItem("accessToken")));
    }
}

export const getAuthRegister = (name, email, password) => (dispatch) => {
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

export const getAuthLogin = (email, password) => (dispatch) => {
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

export const getForgotPassword = (email) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postForgotPassword(email)
        .then(data => {
            dispatch({type: GET_AUTH_FORGOT_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
        dispatch({type: GET_AUTH_FAILURE})
        console.error(e)
    });
}

export const getResetPassword = (password, confirmPass) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postResetPassword(password, confirmPass)
        .then(data => {
            dispatch({type: GET_AUTH_RESET_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
        dispatch({type: GET_AUTH_FAILURE})
        console.error(e)
    });
}

const getUserByToken = (token) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    getOrRefresh(token)
        .then(res => {
            dispatch({type: GET_AUTH_USER_SUCCESS, payload: res})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const editUserByToken = (name, email, password, token) => (dispatch) => {
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

export const logout = (token) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    postLogout(token)
        .then(
            dispatch({type: GET_AUTH_LOGOUT_SUCCESS})
        )
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
};

const getOrRefresh = async (token) => {
    try {
        return await userOrRefresh(token)
    } catch (err) {
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

const editOrRefresh = async (name, email, password,token) => {
    try {
        return await editUserOrRefresh(name, email, password, token)
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await postRefreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            token.headers.authorization = refreshData.accessToken;
            return  editUserOrRefresh(name, email, password,token)
        } else {
            return Promise.reject(err);
        }
    }
};
