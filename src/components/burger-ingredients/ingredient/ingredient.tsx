import React, {FC, useMemo} from 'react';
import styles from './ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {Iingredient, IingredientKey} from "../../../../types/types";
import {getBurgerData} from "../../../services/selector";

interface IBurgerIngredientProps  {
    ingredient: Iingredient;
}

const Ingredient: FC<IBurgerIngredientProps> = ({ingredient }) => {

    const burgerData: IingredientKey[] = useSelector(getBurgerData)

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
            isDrag: monitor.isDragging() ? 0.5 : 1
        })
    });

    const location = useLocation();
    const ingredientId = ingredient._id;

    return (
        <>
            <Link
                key={ingredientId}
                to={`/ingredients/${ingredientId}`}
                state={{background: location}}
                className={styles.link}
            >
                <li className={`${styles.container} ${isDrag} mb-8`} ref={dragRef}>
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
            </Link>
        </>
    )
}

export default Ingredient;