import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {rootReducer, store} from "../services/store";
import {TOrderAction} from "../services/orders/actions";
import {TIngredientsAction} from "../services/ingredients/actions";
import {TAuthAction} from "../services/authorization/actions";
import {TWs} from "../services/websocket/actions";
import {Dispatch} from "redux";

export interface Iingredient {
    _id: string;
    name: string;
    type: string;
    fat: number;
    proteins: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
}

export interface IingredientKey extends Iingredient {
    uniqId: string;
}

export type TUser = {
    email: string
    name: string
    password: string
}

export type TOrderData = {
    _id: string
    ingredients: Array<string>
    status: string
    name: string
    createdAt: string | number | Date
    updatedAt: string
    number: number
}

//NormaResponses

export type TOrderResponse = {
    name: string;
    order: {
        createdAt: string;
        ingredients: Iingredient[];
        name: string;
        number: number;
        owner: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        }
        price: number;
        status: string;
        updatedAt: string;
        _id: string;

    }
}

export type TIngredientResponse = {
    data: Array<Iingredient>
}

export type TMessageResponse = {
    message: string
}

export type TRefreshResponse = {
    success: boolean
    accessToken: string
    refreshToken: string
}

export type TAuthResponse = {
    user: TUser
    accessToken: string
    refreshToken: string
    message: string
}

export type TUserOrderResponse = {
    orders: Array<TOrderData>
}

//WebSocket

export interface IwebsocketOrders {
    success: boolean;
    orders: IwebsocketOrdersOrders[];
    total: string;
    totalToday: string;
}

export interface IwebsocketOrdersOrders {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: string;
}

export interface IwebsocketItemOrderOrders {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner: string;
    status: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}


export type TActions =
    TOrderAction |
    TIngredientsAction |
    TAuthAction |
    TWs;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;