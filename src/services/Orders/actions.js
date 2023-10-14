import {orderApi} from "../../utils/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE'

export const getOrder = (burgerData) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST})
    fetch(orderApi, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "ingredients": burgerData
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
        .then(data => {dispatch({type: GET_ORDER_SUCCESS, payload: data})})
        .catch(e => {
            dispatch({type: GET_ORDER_FAILURE})
            console.error(e)
        });
}