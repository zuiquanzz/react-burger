import {ThunkAction} from 'redux-thunk';

import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {store} from "../services/store";
import {TOrderAction} from "../services/orders/actions";
import {TIngredientsAction} from "../services/ingredients/actions";
import {TAuthAction} from "../services/authorization/actions";
import {TWs} from "../services/websocket/actions";

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

export type TUser = {
    email: string
    name: string
    password: string
}

export type TAuthResponse = {
    user: TUser
    accessToken: string
    refreshToken: string
    message: string
}

export interface IingredientKey extends Iingredient {
    uniqId: string;
}

export interface WebsocketOrders {

}

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

export interface IwebsocketItemOrder {
    orders: IwebsocketItemOrderOrders[];
    success: boolean;
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
export type AppThunk<TReturn = void> = ThunkAction<TReturn,
    RootState,
    unknown,
    TActions>;

export type AppDispatch<TReturnType = void> = (action: TActions | AppThunk<TReturnType>) => TReturnType;

// @ts-ignore
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;