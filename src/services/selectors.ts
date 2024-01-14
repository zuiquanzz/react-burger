import {RootState} from '../types/types'

export const getAllIngredients = (state:RootState) => state.ingredientsReducer
export const getOrders = (state:RootState) => state.ordersReducer
export const getAuth = (state:RootState) => state.authReducer
export const getUser = (state:RootState) => state.authReducer.user;
export const getBurgerData = (state: RootState) => state.ingredientsReducer.burgerData;
export const getIngredientsData = (state: RootState) => state.ingredientsReducer.ingredients;
export const getWsData = (state: RootState) => state.wsReducer;