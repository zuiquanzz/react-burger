import {useEffect} from 'react';
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/Ingredients/actions";
import {getAllIngredients} from "../../services/selectors";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {

    const dispatch = useDispatch();

    const {
        ingredients,
        isLoading,
        error,
    } = useSelector(getAllIngredients)

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                {!isLoading && !error && ingredients.length &&
                <main className={appStyles.main}>

                    <div className={'mr-10'}>
                        <BurgerIngredients/>
                    </div>
                    <BurgerConstructor/>
                </main>
                }
            </DndProvider>
        </div>
    );
}

export default App;