import React from 'react';
// import headerStyles from "./app-header.module.css"
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {

    return (
        <header className={styles.header}>
            <nav className={styles.left_menu}>
                <p className="text_type_main-default pl-2 p-4 pt-4 pb-4 pl-5 pr-5" style={{display: 'flex'}}>
                    {/*<p className="text_type_main-default pl-2">*/}
                    <BurgerIcon type="primary"/>
                    {/*</p>*/}
                    <p> Конструктор</p>
                </p>
                <p className="p-4  pt-4 pb-4 pl-5 pr-5" style={{display: 'flex'}}>
                    <ListIcon type="secondary"/>
                    <p className="text_type_main-default text_color_inactive pl-2 "> Лента заказов</p>
                </p>
            </nav>
            {/*<a href="#" className="pt-4 pb-4 pl-5 pr-5">*/}
            <Logo classname={styles.logo}/>
            {/*</a>*/}
            {/*<p className="text text_type_main-default p-4 m-4" style={{display: 'flex'}}>*/}
            {/*    <BurgerIcon/> Конструктор*/}
            {/*</p>*/}
            {/*<p className="text text_type_main-default p-4 m-4"  style={{display: 'flex'}}>*/}
            {/*    <ListIcon/> Лента заказов*/}
            {/*</p>*/}
            {/*<Logo></Logo>*/}
            <nav className={styles.right_menu}>
                <p className="text text_type_main-default p-4 m-4" style={{display: 'flex'}}>
                    <ProfileIcon/>
                    <p>Личный кабинет </p>
                </p>
            </nav>

            {/*<img className={headerStyles.logo} src={headerLogo} alt={"logo"}/>*/}
            {/*<h1 className={headerStyles.logo}>Собачки, следящие за тобой, пока ты изучаешь React</h1>*/}
        </header>
    );
}

export default AppHeader;