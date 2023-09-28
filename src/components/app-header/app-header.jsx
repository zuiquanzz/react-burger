import React from 'react';
// import headerStyles from "./app-header.module.css"
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {

    return (
        <header className={styles.header}>
            {/*<nav className={styles.left_menu}>*/}
                <a href="#" className="pt-4 pb-4 pl-5 pr-5">
                    <BurgerIcon type="primary"/>
                    <p className="text_type_main-default pl-2">
                        Конструктор
                    </p>
                </a>
                <a href="#" className="pt-4 pb-4 pl-5 pr-5">
                    <ListIcon type="secondary"/>
                    <p className="text_type_main-default text_color_inactive pl-2">
                        Лента зазаов
                    </p>
                </a>
            {/*</nav>*/}
            <a href="#" className="pt-4 pb-4 pl-5 pr-5">
                <Logo/>
            </a>
            <p className="text text_type_main-default p-4 m-4" style={{display: 'flex'}}>
                <BurgerIcon/> Конструктор
            </p>
            <p className="text text_type_main-default p-4 m-4"  style={{display: 'flex'}}>
                <ListIcon/> Лента заказов
            </p>
            <Logo></Logo>
            <p className="text text_type_main-default;p-4 m-4" style={{display: 'flex'}}>
                <ProfileIcon/> Личный кабинет
            </p>
            {/*<img className={headerStyles.logo} src={headerLogo} alt={"logo"}/>*/}
            {/*<h1 className={headerStyles.logo}>Собачки, следящие за тобой, пока ты изучаешь React</h1>*/}
        </header>
    );
}

export default AppHeader;