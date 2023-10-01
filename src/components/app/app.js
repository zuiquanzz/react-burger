import React from 'react';
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {burgerData} from "../../utils/data";

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: null
    })

    const [ingredients, setIngredients] = React.useState();

    React.useEffect(() => {
        getIngredients()
    }, [])

    const getIngredients = () => {
        setState({...state, hasError: false, isLoading: true});
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(res => res.json())
            .then(data => {
                    setState({...state, data, isLoading: false})
                    setIngredients(data.data)
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
                    <BurgerIngredients ingredients={ingredients}/>
                </div>
                <BurgerConstructor burgerData={burgerData}/>
            </main>}
        </div>
    );
}

export default App;