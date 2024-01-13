import {getAllIngredients} from "../../utils/api";
import {AppDispatch} from "../../types/types";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const SORT_STUFF = 'SORT_STUFF'
export const CLEAR_STUFF = 'CLEAR_STUFF'

interface ILoadingIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Object;
}

interface IFailureIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_FAILURE;
}

interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: Object;
}

interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: Object;
}

interface ISortStuffAction {
    readonly type: typeof SORT_STUFF;
    readonly hoverIndex: number;
    readonly dragIndex: number;
}

interface ICleatStuffAction {
    readonly type: typeof CLEAR_STUFF;
}

export type TIngredientsAction =
    ILoadingIngredientsAction |
    IGetIngredientsAction |
    IFailureIngredientsAction |
    IAddIngredientAction |
    IDeleteIngredientAction |
    ISortStuffAction |
    ICleatStuffAction;

export const getIngredients = () => (dispatch: AppDispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    getAllIngredients()
        .then(data => {
                dispatch({type: GET_INGREDIENTS_SUCCESS, payload: data.data})
            }
        )
        .catch(e => {
            dispatch({type: GET_INGREDIENTS_FAILURE})
            console.error(e)
        });
}