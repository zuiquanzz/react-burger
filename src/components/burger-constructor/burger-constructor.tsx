import React, {useEffect, useMemo} from 'react';
import {BurgerIcon, Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-constructor.module.css"
import Modal from "../modal/modal"
import OrderDetails from "../modal/modal-content/order-details/order-details"
import {useModal} from "../../hooks/use-modal";
import {useDispatch, useSelector} from "../../types/types";
import {ADD_INGREDIENT, DELETE_INGREDIENT} from "../../services/ingredients/actions";
import {getAuth} from "../../services/selectors";
import {getBurgerData} from "../../services/selector"
import {useDrop} from "react-dnd";
import {nanoid} from "@reduxjs/toolkit";
import BurgerStuff from "./burger-stuff/burger-stuff";
import {useNavigate} from "react-router-dom";
import {Iingredient, IingredientKey} from "../../types/types";
import {postOrder} from "../../services/orders/actions";

function BurgerConstructor() {
    const burgerData:IingredientKey[] = useSelector(getBurgerData)
    const {user} = useSelector(getAuth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {isModalOpen, openModal, closeModal} = useModal();
    const [burgerBun, setBurgerBun] = React.useState<IingredientKey | null>(null);
    const [tooltip, setTooltip] = React.useState(false);

    useEffect(() => {
        if (burgerData.length) {
            if (!burgerBun) {
                let bun = burgerData.find(ing => ing.type === 'bun');
                if (bun) {
                    setBurgerBun(bun)
                    setTooltip(false);
                }
            }
        } else {
            setBurgerBun(null);
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
        drop(item: Iingredient) {
            let nano = nanoid();
            if (item.type !== 'bun') {
                dispatch({type: ADD_INGREDIENT, payload: {...item, uniqId: nano}})
            } else {

                if (burgerBun) {

                    dispatch({type: DELETE_INGREDIENT, payload: burgerBun.uniqId})
                    dispatch({type: ADD_INGREDIENT, payload: {...item, uniqId: nano}})
                    setBurgerBun({...item, uniqId: nano})
                } else {
                    dispatch({type: ADD_INGREDIENT, payload: {...item, nano}})
                }
            }
        },
    });

    const handleOffer = () => {
        if (user) {
            if (burgerBun) {
                dispatch(postOrder(burgerData, localStorage.getItem('accessToken')))
                openModal()
            } else {
                setTooltip(true)
            }
        } else {
            navigate("/sign-in")
        }
    }

    const modalShow =
        <Modal modalClose={closeModal}>
            <OrderDetails/>
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
                        price={burgerBun.price}
                        isLocked={true}
                    />}
                {!burgerBun &&
                    <BurgerIcon type="primary"/>
                }
            </div>
            <div className={`${styles.scroll_box} custom-scroll`}>
                {burgerData.map((stuff: IingredientKey, index:number) =>
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
                <Button htmlType="button" type="primary" size="medium" onClick={handleOffer}>
                    Оформить заказ
                </Button>

            </div>
            {tooltip && <p>Добавьте булку</p>}
            {isModalOpen && modalShow}
        </div>
    )
}

export default BurgerConstructor;