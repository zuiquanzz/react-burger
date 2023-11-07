export const serverUrl = "https://norma.nomoreparties.space"

export const requestType = '/api'

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


export function  checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}