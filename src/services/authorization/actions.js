import {
    api,
    authEndpoint,
    authToken,
    authUser,
    checkResponse,
    postForgotPassword,
    postLogin,
    postLogout, postRefreshToken,
    postRegistration,
    postResetPassword,
    serverUrl
} from "../../utils/api";

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'

export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_USER_SUCCESS = 'GET_AUTH_USER_SUCCESS'
export const GET_AUTH_REFRESH_TOKEN_SUCCESS = 'GET_AUTH_REFRESH_TOKEN_SUCCESS'
export const GET_AUTH_FORGOT_PASSWORD_SUCCESS = 'GET_AUTH_FORGOT_PASSWORD_SUCCESS'
export const GET_AUTH_RESET_PASSWORD_SUCCESS = 'GET_AUTH_RESET_PASSWORD_SUCCESS'

export const GET_AUTH_LOGOUT_SUCCESS = 'GET_AUTH_LOGOUT_SUCCESS'
export const GET_AUTH_FAILURE = 'GET_AUTH_FAILURE'


const getAuthUserEndPoint = serverUrl.concat(api).concat(authEndpoint).concat(authUser);

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
        const res = await fetch(getAuthUserEndPoint, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: token
            }
        });
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await postRefreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("accessToken", refreshData.accessToken);
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            token = refreshData.accessToken;
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
            const refreshData = await postRefreshToken();
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
