import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import {RootState} from "../../types/types";



export type TWsActionTypes = {
    connect: ActionCreatorWithPayload<string>,
    disconnect: ActionCreatorWithoutPayload,
    sendMessage?: ActionCreatorWithPayload<any>,
    connecting: ActionCreatorWithoutPayload,
    open: ActionCreatorWithoutPayload,
    close: ActionCreatorWithoutPayload,
    message: ActionCreatorWithPayload<any>,
    error: ActionCreatorWithPayload<string>,
}


export const socketMiddleware = (wsActions: { disconnect: ActionCreatorWithoutPayload<"SOCKET_DISCONNECT">; connecting: ActionCreatorWithoutPayload<"SOCKET_SCONNECTING">; message: ActionCreatorWithPayload<any, "SOCKET_MESSAGE">; error: ActionCreatorWithPayload<string, "SOCKET_ERROR">; close: ActionCreatorWithoutPayload<"SOCKET_CLOSE">; connect: ActionCreatorWithPayload<string, "SOCKET_CONNECT">; open: ActionCreatorWithoutPayload<"SOCKET_OPEN"> }): Middleware<{}, RootState> => {
    return ((store) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            console.log(action);
            const {dispatch} = store;
            const { connect, disconnect, open, close, message, error, connecting } = wsActions;
            if (connect.match(action)) {
                console.log('3');
                socket = new WebSocket(action.payload);
                dispatch(connecting());
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(open());
                };

                socket.onerror = event => {
                    dispatch(error('Error'));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (data.message == 'Invalid or missing token') {
                        //@ts-ignore
                        dispatch(refreshToken());
                    } else {
                        dispatch(message(parsedData));
                    }
                };

                socket.onclose = event => {
                    dispatch(close());
                };

                if(disconnect.match(action)){
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        }
    })
}