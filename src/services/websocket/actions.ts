import { createAction } from "@reduxjs/toolkit";
import {IwebsocketOrders} from "../../types/types";

export const connect = createAction<string, 'SOCKET_CONNECT'>('SOCKET_CONNECT');
export const disconnect = createAction('SOCKET_DISCONNECT');

export const connecting = createAction('SOCKET_SCONNECTING');
export const open = createAction('SOCKET_OPEN');
export const close = createAction('SOCKET_CLOSE');
export const message = createAction<IwebsocketOrders,'SOCKET_MESSAGE'>('SOCKET_MESSAGE');
export const error = createAction<string,'SOCKET_ERROR'>('SOCKET_ERROR');

export type TWs = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof connecting>
    | ReturnType<typeof open>
    | ReturnType<typeof close>
    | ReturnType<typeof message>
    | ReturnType<typeof error>