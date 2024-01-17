import {ingredientsReducer, initialState} from './reducer';
import {ADD_INGREDIENT, CLEAR_STUFF, DELETE_INGREDIENT, GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, SORT_STUFF} from "./actions";
import {burgerIngredientBun, burgerIngredientMain, error, ingredientsData, isLoading} from "../../utils/test-data";


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
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST})).toEqual(
            {
                ...initialState,
                isLoading: isLoading,
            }
        )
    })

    test('test ingredients error', () => {
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_FAILURE, payload: error})).toEqual(
            {
                ...initialState,
                error: error,
            }
        )
    })

    test('test ingredients success', () => {
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_SUCCESS, payload: ingredientsData})).toEqual(
            {
                ...initialState,
                ingredients: ingredientsData,
            }
        )
    })

    test('test add burger ingredient', () => {
        expect(ingredientsReducer(initialState, {type: ADD_INGREDIENT, payload: burgerIngredientBun})).toEqual(
            {
                ...initialState,
                burgerData: [...initialState.burgerData, burgerIngredientBun],
            }
        )
    })

    test('test delete burger ingredient', () => {
        let id = "someId"
        let initState = {
            ...initialState,
            burgerData: [...initialState.burgerData, burgerIngredientBun],
        }
        expect(ingredientsReducer(initState, {type: DELETE_INGREDIENT, payload: id})).toEqual(initialState)
    })


    test('test clear burger ingredient', () => {
        let initState = {
            ...initialState,
            burgerData: [...initialState.burgerData, burgerIngredientBun],
        }
        expect(ingredientsReducer(initState, {type: CLEAR_STUFF})).toEqual(initialState)
    })

    test('test sort burger ingredient', () => {
        let initBurgerData = [burgerIngredientBun, burgerIngredientMain];
        let expBurgerData = [burgerIngredientMain, burgerIngredientBun];

        let initState = {
            ...initialState,
            burgerData: initBurgerData,
        }
        expect(ingredientsReducer(initState, {type: SORT_STUFF, dragIndex: 0, hoverIndex: 1})).toEqual(
            {
                ...initialState,
                burgerData: expBurgerData,
            }
        )
    })
})