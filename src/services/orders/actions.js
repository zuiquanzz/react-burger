import {postOrder} from "../../utils/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE'

export const getOrder = (burgerData) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST})
    postOrder(burgerData)
        .then(data => {
            dispatch({type: GET_ORDER_SUCCESS, payload: data})
        })
        .catch(e => {
            dispatch({type: GET_ORDER_FAILURE})
            console.error(e)
        });
}