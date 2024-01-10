import {postOrder} from "../../utils/api";
import {AppDispatch, IingredientKey} from "../../types/types";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE'

interface ILoadingOrderAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
interface IGetOrderAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: Object;
}
interface IFailureOrderAction {
    readonly type: typeof GET_ORDER_FAILURE;
}
export type TOrderAction =
    ILoadingOrderAction |
    IGetOrderAction |
    IFailureOrderAction;

export const getOrder = (burgerData:IingredientKey[]) => (dispatch:AppDispatch) => {
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