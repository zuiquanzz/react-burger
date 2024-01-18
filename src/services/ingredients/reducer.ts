import {
    ADD_INGREDIENT,
    CLEAR_STUFF,
    DELETE_INGREDIENT,
    GET_INGREDIENTS_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SORT_STUFF,
    TIngredientsAction
} from "./actions";
import {Iingredient, IingredientKey} from "../../types/types";

interface IIngredientsStore {
    ingredients: Iingredient[],
    isLoading: boolean,
    error: boolean,
    burgerData: IingredientKey[],
}

export const initialState: IIngredientsStore = {
    ingredients: [],
    isLoading: false,
    error: false,
    burgerData: [],
}


export const ingredientsReducer = (state = initialState, action: TIngredientsAction): IIngredientsStore => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoading: true, error: false}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredients: action.payload, isLoading: false, error: false}
        }
        case GET_INGREDIENTS_FAILURE: {
            return {...state, ingredients: [], isLoading: false, error: true}
        }
        case ADD_INGREDIENT: {
            return {...state, burgerData: [...state.burgerData, action.payload]}
        }
        case DELETE_INGREDIENT: {
            return {...state, burgerData: state.burgerData.filter(({uniqId}) => uniqId !== action.payload)}
        }
        case CLEAR_STUFF: {
            return {...state, burgerData: []}
        }
        case SORT_STUFF: {
            const stuff = [...state.burgerData];
            stuff.splice(action.hoverIndex, 0, stuff.splice(action.dragIndex, 1)[0]);
            return {
                ...state,
                burgerData: stuff
            }
        }
        default:
            return state;
    }
}