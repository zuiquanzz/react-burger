import {authReducer, initialState} from './reducer';
import {
    GET_AUTH_FAILURE,
    GET_AUTH_LOGOUT_SUCCESS,
    GET_AUTH_REQUEST,
    GET_AUTH_FORGOT_PASSWORD_SUCCESS,
    GET_AUTH_RESET_PASSWORD_SUCCESS,
    GET_AUTH_SUCCESS,
    GET_AUTH_USER_SUCCESS
} from "./actions";
import {authResponse, error, forgotPassword, isAuth, isLoading, messageResponse, user} from "../../utils/test-data";


describe('Redux store authReducer', () => {

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

    test('test auth state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    test('test auth isLoading', () => {
        expect(authReducer(initialState, {type: GET_AUTH_REQUEST})).toEqual(
            {
                ...initialState,
                isLoading: isLoading,
            }
        )
    })

    test('test auth error', () => {
        expect(authReducer(initialState, {type: GET_AUTH_FAILURE, payload: error})).toEqual(
            {
                ...initialState,
                error: error,
            }
        )
    })

    test('test auth success', () => {
        expect(authReducer(initialState, {type: GET_AUTH_SUCCESS, payload: authResponse})).toEqual(
            {
                ...initialState,
                user: user,
                isAuth: isAuth,
            }
        )
    })

    test('test auth user success', () => {
        expect(authReducer(initialState, {type: GET_AUTH_USER_SUCCESS, payload: authResponse})).toEqual(
            {
                ...initialState,
                user: user,
                isAuth: isAuth
            }
        )
    })

    test('test auth forgot password success', () => {
        expect(authReducer(initialState, {type: GET_AUTH_FORGOT_PASSWORD_SUCCESS, payload: messageResponse})).toEqual(
            {
                ...initialState,
                forgotPassword: forgotPassword
            })
    })

    test('test auth reset password success', () => {
        expect(authReducer(initialState, {type: GET_AUTH_RESET_PASSWORD_SUCCESS})).toEqual(initialState)
    })

    test('test auth logOut', () => {
        expect(authReducer(initialState, {type: GET_AUTH_LOGOUT_SUCCESS})).toEqual(initialState)
    })

    test('test auth Failure', () => {
        expect(authReducer(initialState, {type: GET_AUTH_FAILURE})).toEqual(
            {
                ...initialState,
                error: error,
            }
        )
    })
})