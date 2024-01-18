import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TOrderAction} from "./actions";
import {TOrderResponse} from "../../types/types";


interface IOrdersStore {
    order: null | TOrderResponse;
    isLoading: boolean;
    error: boolean;
}

export const initialState: IOrdersStore = {
    isLoading: false,
    error: false,
    order: null
}

export const ordersReducer = (state = initialState, action: TOrderAction): IOrdersStore => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {...state, isLoading: true, error: false}
        }
        case GET_ORDER_SUCCESS: {
            return {...state, order: action.payload, isLoading: false, error: false}
        }
        case GET_ORDER_FAILURE: {
            return {...state, order: null, isLoading: false, error: true}
        }
        default:
            return state;
    }
}