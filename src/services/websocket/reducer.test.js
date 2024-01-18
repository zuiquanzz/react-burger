import { wsReducer } from './reducers';
import {WebsocketStatus} from '../../types/types';
import { connecting, open, close, error, message } from './actions';



describe('Redux WS reducer', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(
                { result: 'ok' }
            ),
            ok: true,
        })
    });
    afterEach(() => {
        jest.resetAllMocks();
    })

    test(' test websocket init', () => {
        expect(wsReducer(undefined, {})).toEqual(
            {
                status: WebsocketStatus.OFFLINE,
                orders: null,
                webSocketError: '',
            }
        )
    })

    test('test websocket connect', () => {
        expect(wsReducer(undefined, {type: connecting })).toEqual(
            {
                status: WebsocketStatus.CONNECTING,
                orders: null,
                webSocketError: '',
            }
        )
    })

    test('test websocket open', () => {
        expect(wsReducer(undefined, {type:open})).toEqual(
            {
                status: WebsocketStatus.ONLINE,
                orders: null,
                webSocketError: '',
            }
        )
    })

    test('test websocket close', () => {
        expect(wsReducer(undefined, {type:close})).toEqual(
            {
                status: WebsocketStatus.OFFLINE,
                orders: null,
                webSocketError: '',
            }
        )
    })


    test('test websocket error', () => {
        let test = 'error';
        expect(wsReducer(undefined, {type: error, payload: test})).toEqual(
            {
                status: WebsocketStatus.OFFLINE,
                orders: null,
                webSocketError: test,
            }
        )
    })

    test('test websocket message', () => {
        let test = {success: true, total: 1, totalToday: 1, orders: ['1', '2', '3'] }
        expect(wsReducer(undefined, {type: message, payload: test})).toEqual(
            {
                status: WebsocketStatus.OFFLINE,
                orders: test,
                webSocketError: '',
            }
        )
    })

})