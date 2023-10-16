import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    GET_INGREDIENTS_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SORT_STUFF
} from "./actions";

const initialState = {
    ingredients: [],
    isLoading: false,
    error: null,
    burgerData: [],
}


export default (state = initialState, action) => {
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
        //todo refactor
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