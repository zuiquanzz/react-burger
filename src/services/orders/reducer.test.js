import {initialState, ordersReducer} from './reducer';
import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from './actions';
import {error, isLoading, order} from "../../utils/test-data";


describe('Redux store ordersReducer', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(
                {result: 'ok'}
            ),
            ok: true,
        })
    });
    afterEach(() => {
        jest.resetAllMocks();
    })

    test('test orders state', () => {
        expect(ordersReducer(undefined, {})).toEqual(initialState)
    })

    test('test orders isLoading', () => {
        expect(ordersReducer(initialState, {type: GET_ORDER_REQUEST})).toEqual(
            {
                ...initialState,
                isLoading: isLoading,
            }
        )
    })

    test('test orders error', () => {
        expect(ordersReducer(initialState, {type: GET_ORDER_FAILURE, payload: error})).toEqual(
            {
                ...initialState,
                error: error,
            }
        )
    })

    test('test orders success', () => {
        expect(ordersReducer(initialState, {type: GET_ORDER_SUCCESS, payload: order})).toEqual(
            {
                ...initialState,
                order: order,
            }
        )
    })
})