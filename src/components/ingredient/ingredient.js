import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

function Ingredient({ingredient, getIngredientData}) {

    return (
        <>
            <li className={`${styles.container} mb-8`} onClick={() => getIngredientData(ingredient)}>
                <div className={styles.counter}>
                    <Counter count={1} size="default" extraClass="m-1"/>
                </div>
                <img src={ingredient.image} alt={ingredient._id}/>
                <div className={`${styles.price} mt-1 mb-4`}>
                    <p className={'text text_type_digits-default mr-2'}>{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${styles.name} mt-1 text text_type_main-default`}>{ingredient.name}</p>
            </li>
        </>

    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    getIngredientData: PropTypes.func.isRequired
}

export default Ingredient;