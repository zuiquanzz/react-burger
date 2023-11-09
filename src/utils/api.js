export const serverUrl = "https://norma.nomoreparties.space"

export const api = '/api'

export const ingredientsEndpoint = "/ingredients"
export const orderEndpoint = "/orders"
export const authEndpoint = "/auth"
export const passwordResetEndpoint = "/password-reset"

export const authLogin = "/login"
export const authRegister = "/register"
export const authLogout = "/logout"
export const authUser = "/user"
export const authToken = "/token"

export const passwordResetReset = "/reset"

const getIngredientsEndPoint = api.concat(ingredientsEndpoint);
const getOrderEndPoint = api.concat(orderEndpoint);
const getAuthLoginEndPoint = api.concat(authEndpoint).concat(authLogin);
const getPasswordResetEndPoint = api.concat(passwordResetEndpoint);
const getAuthRegisterEndPoint = api.concat(authEndpoint).concat(authRegister);
const getAuthLogOutEndPoint = api.concat(authEndpoint).concat(authLogout);
const getAuthRefreshTokenEndPoint = api.concat(authEndpoint).concat(authToken);

export const getAllIngredients = () => {
    const options = {
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    }
    return normaRequest(getIngredientsEndPoint, options);
}
export const postRegistration = (name, email, password) => {
    return normaRequest(getAuthRegisterEndPoint, postOptions({
        "name": name,
        "email": email,
        "password": password
    }))
}

export const postLogin = (email, password) => {
    return normaRequest(getAuthLoginEndPoint, postOptions({
        "email": email,
        "password": password
    }))
}

export const postOrder = (burgerData) => {
    return normaRequest(getOrderEndPoint, postOptions({"ingredients": burgerData}))
}

export const postForgotPassword = (email) => {
    return normaRequest(getPasswordResetEndPoint, postOptions({"email": email}))
}

export const postResetPassword = (password, confirmPass) => {
    return normaRequest(getPasswordResetEndPoint, postOptions({
        "password": password,
        "token": confirmPass
    }))
}

export const postLogout = (token) => {
    return normaRequest(getAuthLogOutEndPoint, postOptions({"token": token}))
}

export const postRefreshToken = () => {
    return normaRequest(getAuthRefreshTokenEndPoint, postOptions({
        token: localStorage.getItem("refreshToken"),
    }))
}

export const getOnRefresh = (token) => {
    return normaRequest(getAuthRefreshTokenEndPoint,tokenOptions(token))
}

const postOptions = (body) => {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(body)
    };
}

const tokenOptions = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: token
        }
    }
}

const normaRequest = (url, options) => {
    return fetch(serverUrl.concat(url), options).then(checkResponse)
}

//todo delete export
export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}