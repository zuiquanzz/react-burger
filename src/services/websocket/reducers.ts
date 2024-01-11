import { createReducer } from '@reduxjs/toolkit';
import {WebsocketOrders, WebsocketStatus} from '../../types/types';
import { connecting, open, close, error, message } from './actions';


interface IinitialState{
    status: any;
    orders: any ;
    webSocketError: string
}

const initialState:IinitialState = {
    status: WebsocketStatus.OFFLINE,
    orders: {},
    webSocketError: '',
};


export const wsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connecting, (state:any) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(open, (state:any) => {
            state.status = WebsocketStatus.ONLINE;
            state.webSocketError = '';
        })
        .addCase(close, (state:any) => {
            state.status = WebsocketStatus.OFFLINE;
        })
        .addCase(error, (state:any, action:any) => {
            state.webSocketError = action.payload;
        })
        .addCase(message, (state:any, action:any) => {
            state.orders = action.payload;
        })
})