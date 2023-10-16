import {ingredientApi} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const SORT_STUFF = 'SORT_STUFF'

export const getIngredients = () => (dispatch) => {
    dispatch({type: GET_INGREDIENTS_REQUEST})
    fetch(ingredientApi)
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
        .then(data => {
                // setState({...state, data, isLoading: false})
                // setIngredients(data.data)
                // console.log("data app", data)
                dispatch({type: GET_INGREDIENTS_SUCCESS, payload: data.data})
            }
        )
        .catch(e => {
            // setState({...state, hasError: true, isLoading: false});
            dispatch({type: GET_INGREDIENTS_FAILURE})
            console.error(e)
        });
}