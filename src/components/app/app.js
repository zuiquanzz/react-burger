import React from 'react';
import appStyles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {burgerData} from "../../utils/data";

function App() {
    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={appStyles.main}>
                <div className={'mr-10'}>
                    <BurgerIngredients/>
                </div>
                <BurgerConstructor burgerData={burgerData}/>
            </main>
        </div>
    );
}

export default App;