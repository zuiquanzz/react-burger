import {initialState, ordersReducer} from './reducer';
import {GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from './actions';


describe('Redux store ordersReducer', () => {
    // test('success', () => {
    //     const testObj = {
    //         ok: true,
    //         json: function () {
    //             return {result: 'OK'}
    //         }
    //     }
    //     const result = checkResponse(testObj)
    //     expect(result).toEqual({result:'OK'})
    //
    // })

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
        let isLoading = true
        expect(ordersReducer(initialState, {type: GET_ORDER_REQUEST})).toEqual(
            {
                order: null,
                isLoading: isLoading,
                error: false,
            }
        )
    })

    test('test orders error', () => {
        let error = true
        expect(ordersReducer(initialState, {type: GET_ORDER_FAILURE, payload: error})).toEqual(
            {
                order: null,
                isLoading: false,
                error: error,
            }
        )
    })

    test('test orders success', () => {
        let order =
            {
                "success": true,
                "name": "Флюоресцентный space бургер",
                "order": {
                    "ingredients": [
                        {
                            "_id": "643d69a5c3f7b9001cfa093d",
                            "name": "Флюоресцентная булка R2-D3",
                            "type": "bun",
                            "proteins": 44,
                            "fat": 26,
                            "carbohydrates": 85,
                            "calories": 643,
                            "price": 988,
                            "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                            "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                            "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                            "__v": 0
                        },
                        {
                            "_id": "643d69a5c3f7b9001cfa0943",
                            "name": "Соус фирменный Space Sauce",
                            "type": "sauce",
                            "proteins": 50,
                            "fat": 22,
                            "carbohydrates": 11,
                            "calories": 14,
                            "price": 80,
                            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                            "__v": 0
                        },
                        {
                            "_id": "643d69a5c3f7b9001cfa0943",
                            "name": "Соус фирменный Space Sauce",
                            "type": "sauce",
                            "proteins": 50,
                            "fat": 22,
                            "carbohydrates": 11,
                            "calories": 14,
                            "price": 80,
                            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                            "__v": 0
                        }
                    ],
                    "_id": "65a730f687899c001b829653",
                    "owner": {
                        "name": "mihaliccc",
                        "email": "123@test.com",
                        "createdAt": "2023-11-07T01:34:52.030Z",
                        "updatedAt": "2024-01-13T01:44:28.333Z"
                    },
                    "status": "done",
                    "name": "Флюоресцентный space бургер",
                    "createdAt": "2024-01-17T01:44:22.824Z",
                    "updatedAt": "2024-01-17T01:44:23.174Z",
                    "number": 31795,
                    "price": 1148
                }
            }
        expect(ordersReducer(initialState, {type: GET_ORDER_SUCCESS, payload: order})).toEqual(
            {
                order: order,
                isLoading: false,
                error: false,
            }
        )
    })

})