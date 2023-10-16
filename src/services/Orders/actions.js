import {serverUrl, requestType, orderEndpoint, checkResponse} from "../../utils/urls";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE'

export const getOrder = (burgerData) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST})
    fetch(serverUrl.concat(requestType).concat(orderEndpoint), {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "ingredients": burgerData
        })
    })
        .then(checkResponse)
        .then(data => {dispatch({type: GET_ORDER_SUCCESS, payload: data})})
        .catch(e => {
            dispatch({type: GET_ORDER_FAILURE})
            console.error(e)
        });
}