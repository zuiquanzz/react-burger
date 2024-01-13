import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {ordersReducer} from "./orders/reducer";
import {ingredientsReducer} from "./ingredients/reducer";
import {authReducer} from "./authorization/reducer";
import {wsReducer} from "./websocket/reducers";

import {socketMiddleware} from "./websocket/middleware";
import {
    connect as liveConnect,
    disconnect as liveDisconnect,
    connecting as liveConnecting,
    open as liveOpen,
    close as liveClose,
    message as liveMessage,
    error as liveError
} from '../services/websocket/actions';
import {composeWithDevTools} from "redux-devtools-extension";

const liveSocketMiddleware = socketMiddleware({
    connect: liveConnect,
    disconnect: liveDisconnect,
    connecting: liveConnecting,
    open: liveOpen,
    close: liveClose,
    message: liveMessage,
    error: liveError
})

export const rootReducer = combineReducers({
    ingredientsReducer,
    ordersReducer,
    authReducer,
    wsReducer
})

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunkMiddleware, liveSocketMiddleware))
    )
    return store;
}

export const store = createStore(rootReducer);