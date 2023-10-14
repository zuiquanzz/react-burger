import React from 'react';
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {burgerData} from "../../utils/data";
import {ingredientApi} from "../../utils/api";
import {useDispatch} from "react-redux";
import {GET_INGREDIENTS_SUCCESS} from "../../services/Ingredients/actions";

function App() {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: null
    })

    // const [ingredients, setIngredients] = React.useState([]);

    React.useEffect(() => {
        getIngredients()
    }, [dispatch])

    const getIngredients = () => {
        setState({...state, hasError: false, isLoading: true});
        fetch(ingredientApi)
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
            .then(data => {
                    setState({...state, data, isLoading: false})
                    // setIngredients(data.data)
                    // console.log("data app", data)
                    dispatch({type: GET_INGREDIENTS_SUCCESS, payload: data.data})
                }
            )
            .catch(e => {
                setState({...state, hasError: true, isLoading: false});
                console.error(e)
            });
    };

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            {state.data !== null && !state.isLoading &&
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