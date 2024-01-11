import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, TOrderAction} from "./actions";
import {Iingredient} from "../../types/types";

export interface IgetOrderProjectApi{
    name: string;
    order: {
        createdAt: string;
        ingredients: Iingredient[];
        name: string;
        number: number;
        owner:{
            name: string;
            email: string;
            createdAt: string;
            updatedAt:string;
        }
        price: number;
        status: string;
        updatedAt: string;
        _id: string;

    }
}

interface IinitialState{
    order: null | IgetOrderProjectApi;
    isLoading: boolean;
    error: boolean;
}

const initialState: IinitialState = {
    isLoading: false,
    error: false,
    order: null
}

export const ordersReducer = (state = initialState, action:TOrderAction):IinitialState => {
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