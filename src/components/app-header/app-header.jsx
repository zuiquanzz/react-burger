import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {NavLink, useMatch} from "react-router-dom";

const AppHeader = () => {


    return (
        <header className={styles.header}>
            <nav className={styles.left_menu}>
                <NavLink to="/" className={styles.button}>
                    {({isActive}) => isActive ? (
                            <>
                                <BurgerIcon type="secondary"/>
                                <p className="text_type_main-default ml-2">Конструктор</p>
                            </>
                        ) :
                        (
                            <>
                                <BurgerIcon type="primary"/>
                                <p className="text_type_main-default ml-2">Конструктор</p>
                            </>
                        )}
                </NavLink>
                <div className={styles.button}>
                    <ListIcon type="primary"/>
                    <p className="text_type_main-default ml-2">Лента заказов</p>
                </div>
            </nav>
            <Logo classname={styles.logo}/>
            <nav className={styles.right_menu}>
                <NavLink to="/profile" className={styles.button}>
                    {({isActive}) => isActive ? (
                            <>
                                <ProfileIcon type="secondary"/>
                                <p className="text_type_main-default ml-2">Личный кабинет</p>
                            </>
                        ) :
                        (
                            <>
                                <ProfileIcon type="primary"/>
                                <p className="text_type_main-default ml-2">Личный кабинет</p>
                            </>
                        )}
                </NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;