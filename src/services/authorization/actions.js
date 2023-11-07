import {authEndpoint, authLogin, authLogout, authRegister, authToken, authUser, checkResponse, requestType, serverUrl} from "../../utils/urls";

export const GET_AUTH_REQUEST = 'GET_AUTH_REQUEST'
export const GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS'
export const GET_AUTH_USER_SUCCESS = 'GET_AUTH_USER_SUCCESS'
export const GET_AUTH_REFRESH_TOKEN_SUCCESS = 'GET_AUTH_REFRESH_TOKEN_SUCCESS'
export const GET_AUTH_LOGOUT_SUCCESS = 'GET_AUTH_LOGOUT_SUCCESS'
export const GET_AUTH_FAILURE = 'GET_AUTH_FAILURE'

const getAuthLoginEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authLogin);
const getAuthRegisterEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authRegister);
const getAuthLogOutEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authLogout);
const getAuthUserEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authUser);
const getAuthRefreshTokenEndPoint = serverUrl.concat(requestType).concat(authEndpoint).concat(authToken);

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

//todo
const getUserByToken = (token) => (dispatch) => {
    const type = 'get';
    dispatch({type: GET_AUTH_REQUEST})
    fetch(getAuthUserEndPoint, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: token
        },
    })
        .then(checkResponse)
        .then(data => {
            dispatch({type: GET_AUTH_USER_SUCCESS, payload: data})
        })
        .catch(e => {
            if (e.message === "jwt expired") {
                console.log("jwt expired")
                dispatch(refreshToken(type, null, null, null));
            } else {
                dispatch({type: GET_AUTH_FAILURE})
                console.error(e)
            }
        });
};

//todo
export const editUserByToken = (name, email, password, token) => (dispatch) => {
    const type = 'patch';
    dispatch({type: GET_AUTH_REQUEST})
    fetch(getAuthUserEndPoint, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: token
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        })
    })
        .then(checkResponse)
        .then(data => {
            dispatch({type: GET_AUTH_USER_SUCCESS, payload: data})
        })
        .catch(e => {
            if (e.message === "jwt expired") {
                console.log("jwt expired")
                dispatch(refreshToken(type, name, email, password));
            } else {
                dispatch({type: GET_AUTH_FAILURE})
                console.error(e)
            }
        });
};


const refreshToken = (type, name, email, password) => (dispatch) => {
    dispatch({type: GET_AUTH_REQUEST})
    fetch(getAuthRefreshTokenEndPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        })
    })
        .then(checkResponse)
        .then(data => {
            dispatch({type: GET_AUTH_REFRESH_TOKEN_SUCCESS, payload: data})
            if (type === 'get') {
                getUserByToken(localStorage.getItem("accessToken"))
            } else {
                editUserByToken(localStorage.getItem("accessToken"),name, email, password)
            }
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