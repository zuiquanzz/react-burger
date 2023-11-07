import React, {useEffect, useMemo} from 'react';
import {BurgerIcon, Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-constructor.module.css"
import Modal from "../modal/modal"
import OrderDetails from "../modal/modal-content/order-details/order-details"
import {useModal} from "../../hooks/use-modal";
import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT, DELETE_INGREDIENT} from "../../services/ingredients/actions";
import {getAllIngredients} from "../../services/selectors";
import {useDrop} from "react-dnd";
import {nanoid} from "@reduxjs/toolkit";
import BurgerStuff from "./burger-stuff/burger-stuff";

function BurgerConstructor() {
    const {burgerData} = useSelector(getAllIngredients)

    const dispatch = useDispatch()

    const {isModalOpen, openModal, closeModal} = useModal();
    const [burgerBun, setBurgerBun] = React.useState(null);

    useEffect(() => {
        if (burgerData.length) {
            if (!burgerBun) {
                if (burgerData.find(ing => ing.type === 'bun')) {
                    setBurgerBun(burgerData.find(ing => ing.type === 'bun'))
                }
            }
        }
    }, [burgerData])

    const orderPrice = useMemo(() => {
        return burgerData.length ? getOrderPrice() : 0;
    }, [burgerData])

    function getOrderPrice() {
        let pr = 0;
        burgerData.map(item => {
            if (item.type === 'bun') {
                pr = pr + item.price;
            }
            pr = pr + item.price;
        })
        return pr;
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            console.log('i', item)
            if (item.type !== 'bun') {
                dispatch({type: ADD_INGREDIENT, payload: {...item, uniqId: nanoid()}})
            } else {
                if (burgerBun) {
                    dispatch({type: DELETE_INGREDIENT, payload: burgerBun.uniqId})
                    dispatch({type: ADD_INGREDIENT, payload: {...item, uniqId: nanoid()}})
                    setBurgerBun(item)
                } else {
                    dispatch({type: ADD_INGREDIENT, payload: {...item, uniqId: nanoid()}})
                }
            }
        },
    });

    const modalShow =
        <Modal modalClose={closeModal}>
            <OrderDetails orderPrice={orderPrice}/>
        </Modal>;
    return (
        <div className={styles.table} ref={dropTarget}>
            <div className="p-15"/>
            <div className="ml-5">
                {burgerBun &&
                <ConstructorElement
                    type="top"
                    text={burgerBun.name + '(вверх)'}
                    thumbnail={burgerBun.image}
                    price={burgerData.find(ing => ing.type === 'bun').price}
                    isLocked={true}
                />}
                {!burgerBun &&
                <BurgerIcon/>
                }
            </div>
            <div className={`${styles.scroll_box} custom-scroll`}>
                {burgerData.map((stuff, index) =>
                    stuff.type !== 'bun' &&
                    <BurgerStuff key={stuff.uniqId} ingredient={stuff} index={index}/>
                )}
            </div>
            <div className="ml-5">
                {burgerBun && (
                    <ConstructorElement
                        type="bottom"
                        text={burgerBun.name + '(низ)'}
                        thumbnail={burgerBun.image}
                        price={burgerBun.price}
                        isLocked={true}
                    />)}
                {!burgerBun &&
                <BurgerIcon type="primary"/>
                }
            </div>
            <div className={`${styles.order} mt-10`}>

                <p className="text text_type_digits-medium mr-2">{orderPrice}</p>
                <div className={'mr-10'}>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && modalShow}
        </div>
    )
}

export default BurgerConstructor;