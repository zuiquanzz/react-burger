import React from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from "../modal/modal-content/ingredient-details/ingredient-details";
import PropTypes from "prop-types";

function Ingredient({ingredient}) {
    const [visible, setVisible] = React.useState(false);

    function modalOpen() {
        setVisible(true);
    }

    function modalClose() {
        setVisible(false);
    }

    const modalIngredient =
        <Modal modalClose={modalClose}>
            <IngredientDetails ingredient={ingredient} modalClose={modalClose}/>
        </Modal>;

    return (
        <>
            <li className={`${styles.container} mb-8`} onClick={modalOpen}>
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
            {visible && modalIngredient}
        </>

    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired
}

export default Ingredient;