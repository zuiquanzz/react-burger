import {authReducer, initialState} from './reducer';
import {GET_AUTH_FAILURE, GET_AUTH_LOGOUT_SUCCESS, GET_AUTH_REQUEST, GET_AUTH_RESET_PASSWORD_SUCCESS, GET_AUTH_SUCCESS, GET_AUTH_USER_SUCCESS} from "./actions";
import {TUser} from "../../types/types";


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
        let isLoading = true
        expect(authReducer(initialState, {type: GET_AUTH_REQUEST})).toEqual(
            {
                isLoading: isLoading,
                error: false,
                user: null,
                isAuth: false,
                forgotPassword: null
            }
        )
    })

    test('test auth error', () => {
        let error = true
        expect(authReducer(initialState, {type: GET_AUTH_FAILURE, payload: error})).toEqual(
            {
                isLoading: false,
                error: error,
                user: null,
                isAuth: false,
                forgotPassword: null
            }
        )
    })

    test('test auth success', () => {
        let user =
            {
                email: "test@test.com",
                name: "testovich",
                password: "test"
            }

        let res = {
            user: user,
            accessToken: 'blabla',
            refreshToken: 'refbla',
            message: 'hmmm'
        }
        expect(authReducer(initialState, {type: GET_AUTH_SUCCESS, payload: res})).toEqual(
            {
                error: false,
                forgotPassword: null,
                isAuth: true,
                isLoading: false,
                user: user
            }
        )
    })

    test('test auth user success', () => {
        let user =
            {
                email: "test@test.com",
                name: "testovich",
                password: "test"
            }
        let res = {
            user: user,
            accessToken: 'blabla',
            refreshToken: 'refbla',
            message: 'hmmm'
        }

        expect(authReducer(initialState, {type: GET_AUTH_USER_SUCCESS, payload: res})).toEqual(
            {
                error: false,
                forgotPassword: null,
                isAuth: true,
                isLoading: false,
                user: user
            }
        )
    })

    test('test auth forgot password success', () => {
        let forgotPass = 'some_uniq_code'
        expect(authReducer(initialState, {type: "GET_AUTH_FORGOT_PASSWORD_SUCCESS", payload: forgotPass})).toEqual(
            {
                isLoading: false,
                error: false,
                user: null,
                isAuth: false,
            }
        )
    })

    test('test auth reset password success', () => {
        expect(authReducer(initialState, {type: "GET_AUTH_RESET_PASSWORD_SUCCESS"})).toEqual({
            error: false,
            forgotPassword: null,
            isAuth: false,
            isLoading: false,
            user: null
        })
    })

    test('test auth logOut', () => {
        expect(authReducer(initialState, {type: GET_AUTH_LOGOUT_SUCCESS})).toEqual(
            {
                isLoading: false,
                error: false,
                user: null,
                isAuth: false,
                forgotPassword: null
            }
        )
    })

    test('test auth Failure', () => {
        let error = true;
        expect(authReducer(initialState, {type: GET_AUTH_FAILURE})).toEqual(
            {
                isLoading: false,
                error: error,
                user: null,
                isAuth: false,
                forgotPassword: null
            }
        )
    })
})