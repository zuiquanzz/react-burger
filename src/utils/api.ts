import {IingredientKey, TAuthResponse, TIngredientResponse, TMessageResponse, TOrderResponse, TRefreshResponse, TUserOrderResponse} from "../types/types";

const serverUrl = "https://norma.nomoreparties.space/api"
export const urlWebSocket = 'wss://norma.nomoreparties.space/orders/all';

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

export const ACCESS_TOKEN = localStorage.getItem('accessToken');
export const REFRESH_TOKEN = localStorage.getItem('refreshToken');
//ingredients
export const getAllIngredients = (): Promise<TIngredientResponse> => {
    return normaRequest<TIngredientResponse>(getIngredientsEndPoint, baseOptions);
}

//orders
export const postAuthOrder = (burgerData: IingredientKey[]): Promise<TOrderResponse> => {
    return normaRequest<TOrderResponse>(getOrderEndPoint, postAuthOptions({"ingredients": burgerData}))
}

export const getAuthOrder = (orderId: string): Promise<TUserOrderResponse> => {
    return normaRequest<TUserOrderResponse>(getOrderEndPoint.concat('/').concat(orderId), baseOptions);
}

//auth
export const postRegistration = (name?: string, email?: string, password?: string): Promise<TAuthResponse> => {
    return normaRequest<TAuthResponse>(getAuthRegisterEndPoint, postOptions({
        "name": name,
        "email": email,
        "password": password
    }))
}

export const postLogin = (email?: string, password?: string): Promise<TAuthResponse> => {
    return normaRequest<TAuthResponse>(getAuthLoginEndPoint, postOptions({
        "email": email,
        "password": password
    }))
}

export const postForgotPassword = (email?: string): Promise<TMessageResponse> => {
    return normaRequest<TMessageResponse>(getForgotPasswordEndPoint, postOptions({"email": email}))
}

export const postResetPassword = (password?: string, confirmPass?: string): Promise<TMessageResponse> => {
    return normaRequest<TMessageResponse>(getResetPasswordEndPoint, postOptions({
        "password": password,
        "token": confirmPass
    }))
}

export const postLogout = () => {
    return normaRequest<TMessageResponse>(getAuthLogOutEndPoint, postOptions({"token": REFRESH_TOKEN}))
}

export const postRefreshToken = (): Promise<TRefreshResponse> => {
    return normaRequest<TRefreshResponse>(getAuthRefreshTokenEndPoint, postOptions({
        token: REFRESH_TOKEN,
    }))
}

export const userOrRefresh = (): Promise<TAuthResponse> => {
    return normaRequest<TAuthResponse>(getAuthUserEndPoint, tokenOptions())
}

export const editUserOrRefresh = (name?: string, email?: string, password?: string): Promise<TAuthResponse> => {
    return normaRequest<TAuthResponse>(getAuthUserEndPoint, editTokenOptions(name, email, password))
}

//options

const baseOptions = {
    headers: {'Content-Type': 'application/json;charset=utf-8'}
}
const postOptions = (body: Object) => {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(body)
    };
}

const postAuthOptions = (body: Object) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: ACCESS_TOKEN
        },
        body: JSON.stringify(body)
    };
}

const tokenOptions = () => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: ACCESS_TOKEN
        }
    }
}

const editTokenOptions = (name?: string, email?: string, password?: string) => {
    return {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: ACCESS_TOKEN
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    }
}

//BaseRequest

const normaRequest = <T>(url: string, options: Object): Promise<T> => {
    return fetch(serverUrl.concat(url), options).then(checkResponse<T>)
}

export const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}