import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/reducer";
import ordersReducer from "./orders/reducer";
import authReducer from "./authorization/reducer";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})