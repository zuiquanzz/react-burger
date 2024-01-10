import {Dispatch} from "redux";
import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator} from 'redux';

import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {store} from "../services/store";
import {TOrderAction} from "../services/orders/actions";
import {TIngredientsAction} from "../services/ingredients/actions";
import {TAuthAction} from "../services/authorization/actions";

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

export type TActions =
    TOrderAction |
    TIngredientsAction |
    TAuthAction;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TActions>>;

export type AppDispatch = Dispatch<TActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => {
    //todo
    // @ts-ignore
    return dispatchHook<AppDispatch | AppThunk>();
};