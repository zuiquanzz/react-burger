import React from 'react';
import headerStyles from "./app-header.module.css"
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {

    return (
        <header className={headerStyles.header}>
            <p className="text text_type_main-default;p-1" style={{display: 'flex'}}>
                <BurgerIcon/> Конструктор
            </p>
            <p className="text text_type_main-default;p-1" style={{display: 'flex'}}>
                <ListIcon/> Лента заказов
            </p>
            <Logo></Logo>
            <p className="text text_type_main-default;p-1" style={{display: 'flex'}}>
                <ProfileIcon/> Личный кабинет
            </p>
            {/*<img className={headerStyles.logo} src={headerLogo} alt={"logo"}/>*/}
            {/*<h1 className={headerStyles.logo}>Собачки, следящие за тобой, пока ты изучаешь React</h1>*/}
        </header>
    );
}

export default AppHeader;