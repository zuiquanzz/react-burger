import {ingredientsReducer, initialState} from './reducer';
import {ADD_INGREDIENT, CLEAR_STUFF, DELETE_INGREDIENT, GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, SORT_STUFF} from "./actions";


describe('Redux store ingredientsReducer', () => {

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

    test('test ingredients state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    test('test ingredients isLoading', () => {
        let isLoading = true
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST})).toEqual(
            {
                ingredients: [],
                isLoading: isLoading,
                error: false,
                burgerData: [],
            }
        )
    })

    test('test ingredients error', () => {
        let error = true
        expect(ingredientsReducer(initialState, {type: "GET_INGREDIENTS_FAILURE", payload: error})).toEqual(
            {
                ingredients: [],
                isLoading: false,
                error: error,
                burgerData: [],
            }
        )
    })

    test('test ingredients success', () => {
        let ings = [{
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }, {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v": 0
        }]
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_SUCCESS, payload: ings})).toEqual(
            {
                ingredients: ings,
                isLoading: false,
                error: false,
                burgerData: [],
            }
        )
    })

    test('test add burger ingredient', () => {
        let ing = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0,
            "uniqId": "someId"
        }

        expect(ingredientsReducer(initialState, {type: ADD_INGREDIENT, payload: ing})).toEqual(
            {
                ingredients: [],
                isLoading: false,
                error: false,
                burgerData: [...initialState.burgerData, ing],
            }
        )
    })

    test('test delete burger ingredient', () => {
        let id = "someId"
        let burgerIng = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0,
            "uniqId": id
        };

        let initState = {
            ...initialState,
            ingredients: [],
            isLoading: false,
            error: false,
            burgerData: [...initialState.burgerData, burgerIng],
        }

        expect(ingredientsReducer(initState, {type: DELETE_INGREDIENT, payload: id})).toEqual(
            {
                ingredients: [],
                isLoading: false,
                error: false,
                burgerData: [],
            }
        )
    })


    test('test clear burger ingredient', () => {
        let id = "someId"
        let burgerIng = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0,
            "uniqId": id
        };

        let initState = {
            ...initialState,
            ingredients: [],
            isLoading: false,
            error: false,
            burgerData: [...initialState.burgerData, burgerIng],
        }

        expect(ingredientsReducer(initState, {type: CLEAR_STUFF})).toEqual(
            {
                ingredients: [],
                isLoading: false,
                error: false,
                burgerData: [],
            }
        )
    })

    test('test clear burger ingredient', () => {
        let id = "someId"
        let id2 = "someId2"
        let burgerIng1 = {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0,
            "uniqId": id
        };
        let burgerIng2 =
            {
                "_id": "60666c42cc7b410027a1a9b5",
                "name": "Говяжий метеорит (отбивная)",
                "type": "main",
                "proteins": 800,
                "fat": 800,
                "carbohydrates": 300,
                "calories": 2674,
                "price": 3000,
                "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v": 0,
                "uniqId": id2
            };

        let initBurgerData = [burgerIng1,burgerIng2];
        let expBurgerData = [burgerIng2,burgerIng1];

        let initState = {
            ...initialState,
            ingredients: [],
            isLoading: false,
            error: false,
            burgerData: initBurgerData,
        }

        expect(ingredientsReducer(initState, {type: SORT_STUFF,dragIndex:0,hoverIndex:1})).toEqual(
            {
                ingredients: [],
                isLoading: false,
                error: false,
                burgerData: expBurgerData,
            }
        )
    })
})