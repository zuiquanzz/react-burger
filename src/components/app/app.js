import {useEffect} from 'react';
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {ingredientApi} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_INGREDIENTS_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../../services/Ingredients/actions";
import {getAllIngredients} from "../../services/selectors";

function App() {

    const dispatch = useDispatch();

    const {
        ingredients,
        isLoading,
        error,
    } = useSelector(getAllIngredients)
    //todo delete
    // const [state, setState] = useState({
    //     isLoading: false,
    //     hasError: false,
    //     data: null
    // })

    // const [ingredients, setIngredients] = React.useState([]);

    useEffect(() => {
        getIngredients()
    }, [dispatch])

    const getIngredients = () => {
        // setState({...state, hasError: false, isLoading: true});
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
    };

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            {!isLoading && !error && ingredients.length &&
            <main className={appStyles.main}>

                <div className={'mr-10'}>
                    {/*<BurgerIngredients ingredients={ingredients}/>*/}
                    <BurgerIngredients/>
                </div>
                {/*<BurgerConstructor burgerData={burgerData}/>*/}
                <BurgerConstructor/>
            </main>
            }
        </div>
    );
}

export default App;