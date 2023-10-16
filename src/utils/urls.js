export const serverUrl = "https://norma.nomoreparties.space"

export const requestType = '/api'

export const ingredientsEndpoint = "/ingredients"
export const orderEndpoint = "/orders"

export function  checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}