import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {

    return (
        <header className={styles.header}>
            <nav className={styles.left_menu}>
                <div className={styles.button}>
                    <BurgerIcon type="primary"/>
                    <p className="text_type_main-default ml-2"> Конструктор</p>
                </div>
                <div className={styles.button}>
                    <ListIcon type="secondary"/>
                    <p className="text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                </div>
            </nav>
            <Logo classname={styles.logo}/>
            <nav className={styles.right_menu}>
                <div className={styles.button}>
                    <ProfileIcon type="primary"/>
                    <p className="text_type_main-default ml-2">Личный кабинет</p>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;