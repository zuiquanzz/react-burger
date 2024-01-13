import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import {RootState} from "../../types/types";
import {postRefreshToken} from "../../utils/api";

export const socketMiddleware = (wsActions: { disconnect: ActionCreatorWithoutPayload<"SOCKET_DISCONNECT">; connecting: ActionCreatorWithoutPayload<"SOCKET_SCONNECTING">; message: ActionCreatorWithPayload<any, "SOCKET_MESSAGE">; error: ActionCreatorWithPayload<string, "SOCKET_ERROR">; close: ActionCreatorWithoutPayload<"SOCKET_CLOSE">; connect: ActionCreatorWithPayload<string, "SOCKET_CONNECT">; open: ActionCreatorWithoutPayload<"SOCKET_OPEN"> }): Middleware<{}, RootState> => {
    return ((store) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const {dispatch} = store;
            const { connect, disconnect, open, close, message, error, connecting } = wsActions;
            if (connect.match(action)) {
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
                        postRefreshToken();
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