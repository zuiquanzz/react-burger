import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./Ingredients/reducer";
import ordersReducer from "./Orders/reducer";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer
})

export const store = configureStore({
    reducer: rootReducer,
})