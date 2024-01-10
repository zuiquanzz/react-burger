import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TOrderAction} from "./actions";

const initialState = {
    isLoading: false,
    error: null,
    order: null
}

export default (state = initialState, action:TOrderAction) => {
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