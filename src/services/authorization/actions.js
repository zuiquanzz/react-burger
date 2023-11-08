import {
    authEndpoint,
    authLogin,
    authLogout,
    authRegister,
    authToken,
    authUser,
    checkResponse,
    passwordResetEndpoint,
    passwordResetReset,
    requestType,
    serverUrl
} from "../../utils/urls";

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_USER_SUCCESS = 'GET_AUTH_USER_SUCCESS'
export const GET_AUTH_REFRESH_TOKEN_SUCCESS = 'GET_AUTH_REFRESH_TOKEN_SUCCESS'
export const GET_AUTH_FORGOT_PASSWORD_SUCCESS = 'GET_AUTH_FORGOT_PASSWORD_SUCCESS'
export const GET_AUTH_RESET_PASSWORD_SUCCESS = 'GET_AUTH_RESET_PASSWORD_SUCCESS'


export const GET_AUTH_LOGOUT_SUCCESS = 'GET_AUTH_LOGOUT_SUCCESS'
export const GET_AUTH_FAILURE = 'GET_AUTH_FAILURE'

const getAuthLoginEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authLogin);
const getAuthRegisterEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authRegister);
const getAuthLogOutEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authLogout);
const getAuthUserEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authUser);
const getAuthRefreshTokenEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authToken);
const getPasswordResetEndPoint = serverUrl.concat(requestType).concat(passwordResetEndpoint);
const getPasswordResetConfirmEndPoint = serverUrl.concat(requestType).concat(passwordResetEndpoint).concat(passwordResetReset);


export const getAuthLogin = (email, password) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    fetch(getAuthLoginEndPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then(checkResponse)
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
    return fetch(getPasswordResetEndPoint, {
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "email": email
        })
    }).then(checkResponse)
        .then(data => {
            dispatch({type: GET_AUTH_FORGOT_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const getResetPassword = (password, confirmPass) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    return fetch(getPasswordResetConfirmEndPoint, {
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "password": password,
            "token": confirmPass
        })
    }).then(checkResponse)
        .then(data => {
            dispatch({type: GET_AUTH_RESET_PASSWORD_SUCCESS, payload: data})
        }).catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}


export const getAuthRegister = (name, email, password) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    fetch(getAuthRegisterEndPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    })
        .then(checkResponse)
        .then(data => {
            dispatch({type: GET_AUTH_SUCCESS, payload: data})
        })
        .catch(e => {
            dispatch({type: GET_AUTH_FAILURE})
            console.error(e)
        });
}

export const getUserSession = () => (dispatch) => {
    if (localStorage.getItem("accessToken")) {
        dispatch(getUserByToken(localStorage.getItem("accessToken")));
    }
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
    editOrRefresh(token)
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
    fetch(getAuthLogOutEndPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "token": token,
        })
    })
        .then(checkResponse)
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
        const res = await fetch(getAuthUserEndPoint, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: token
            }
        });
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            token.headers.authorization = refreshData.accessToken;
            const res = await fetch(getAuthUserEndPoint, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: token
                }
            });
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const editOrRefresh = async (token, name, email, password) => {
    try {
        const res = await fetch(getAuthUserEndPoint, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: token
            },
            body: JSON.stringify({

                "name": name,
                "email": email,
                "password": password
            })
        });

        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            token.headers.authorization = refreshData.accessToken;
            const res = await fetch(getAuthUserEndPoint, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: token
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password
                })
            });
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};


const refreshToken = () => {
    return fetch(getAuthRefreshTokenEndPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};