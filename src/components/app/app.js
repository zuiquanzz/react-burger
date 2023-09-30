import React from 'react';
import appStyles from './app.module.css';
import mainImage from '../../images/main.jpg';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {

    const mainData = {
        title: "Группа поддержки",
        description: "Это самые преданные болельщики, которые будут радоваться твоим успехам и грустить вместе с тобой в тяжёлые времена",
        caption: "Нужно не забыть покормить их",
        image: mainImage
    }

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <div style={{display:'flex'}} >
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
            {/*<Main mainData={mainData}/>*/}
        </div>
    );
}

export default App;