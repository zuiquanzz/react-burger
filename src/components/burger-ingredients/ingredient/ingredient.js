import React, {useMemo} from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../../services/selectors";
import {useDrag} from "react-dnd";

function Ingredient({ingredient, getIngredientData}) {

    const {burgerData} = useSelector(getAllIngredients)

    const counter = useMemo(() => {
        let length = burgerData.filter(ing => ing._id === ingredient._id).length;
        if (ingredient.type === 'bun') {
            length = length * 2;
        }
        return length;
    }, [burgerData])

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        !isDrag &&
        <>
            <li className={`${styles.container} mb-8`} onClick={() => getIngredientData(ingredient)} ref={dragRef}>
                <div className={styles.counter}>
                    {counter > 0 &&
                    <Counter count={counter} size="default"
                             extraClass="m-1"/>
                    }
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