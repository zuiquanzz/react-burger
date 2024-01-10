import {RootState} from '../types/types'

export const getAllIngredients = (state:RootState) => state.ingredients
export const getOrders = (state:RootState) => state.orders
export const getAuth = (state:RootState) => state.auth

export const getUser = (state:RootState) => {
    // @ts-ignore
    return state.auth.user;
}