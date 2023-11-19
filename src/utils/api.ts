import {IingredientKey} from "../../types/types";

const serverUrl = "https://norma.nomoreparties.space/api"

const ingredientsEndpoint = "/ingredients"
const orderEndpoint = "/orders"

const authEndpoint = "/auth"
const authLogin = "/login"
const authRegister = "/register"
const authLogout = "/logout"
const authUser = "/user"
const authToken = "/token"

const passwordResetEndpoint = "/password-reset"
const passwordResetReset = "/reset"

const getIngredientsEndPoint = ingredientsEndpoint;
const getOrderEndPoint = orderEndpoint;

const getForgotPasswordEndPoint = passwordResetEndpoint;
const getResetPasswordEndPoint = passwordResetEndpoint.concat(passwordResetReset);

const getAuthRegisterEndPoint = authEndpoint.concat(authRegister);
const getAuthLoginEndPoint = authEndpoint.concat(authLogin);
const getAuthLogOutEndPoint = authEndpoint.concat(authLogout);
const getAuthRefreshTokenEndPoint = authEndpoint.concat(authToken);
const getAuthUserEndPoint = authEndpoint.concat(authUser);

export const getAllIngredients = () => {
    const options = {
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    }
    return normaRequest(getIngredientsEndPoint, options);
}
export const postRegistration = (name:string, email:string, password:string) => {
    return normaRequest(getAuthRegisterEndPoint, postOptions({
        "name": name,
        "email": email,
        "password": password
    }))
}

export const postLogin = (email:string, password:string) => {
    return normaRequest(getAuthLoginEndPoint, postOptions({
        "email": email,
        "password": password
    }))
}

export const postOrder = (burgerData: IingredientKey[]) => {
    return normaRequest(getOrderEndPoint, postOptions({"ingredients": burgerData}))
}

export const postForgotPassword = (email:string) => {
    return normaRequest(getForgotPasswordEndPoint, postOptions({"email": email}))
}

export const postResetPassword = (password:string, confirmPass:string) => {
    return normaRequest(getResetPasswordEndPoint, postOptions({
        "password": password,
        "token": confirmPass
    }))
}

export const postLogout = (token:string) => {
    return normaRequest(getAuthLogOutEndPoint, postOptions({"token": token}))
}

export const postRefreshToken = () => {
    return normaRequest(getAuthRefreshTokenEndPoint, postOptions({
        token: localStorage.getItem("refreshToken"),
    }))
}

export const userOrRefresh = (token:string) => {
    return normaRequest(getAuthUserEndPoint, tokenOptions(token))
}

export const editUserOrRefresh = (name:string, email:string, password:string, token:string) => {
    return normaRequest(getAuthUserEndPoint, editTokenOptions(name, email, password, token))
}

const postOptions = (body: Object) => {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(body)
    };
}

const tokenOptions = (token:string) => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: token
        }
    }
}

const editTokenOptions = (name:string, email:string, password:string, token:string) => {
    return {
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
    }
}

const normaRequest = (url:string, options: Object) => {
    return fetch(serverUrl.concat(url), options).then(checkResponse)
}

const checkResponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}