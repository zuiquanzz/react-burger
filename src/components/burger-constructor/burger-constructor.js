import React, {useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "../burger-constructor/burger-constructor.module.css"
import Modal from "../modal/modal"
import OrderDetails from "../modal/modal-content/order-details/order-details"
import {useModal} from "../../hooks/use-modal";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT, GET_INGREDIENTS_SUCCESS} from "../../services/Ingredients/actions";
import {ingredientApi} from "../../utils/api";

function BurgerConstructor() {
    const {burgerData} = useSelector(store => store.ingredients)

    const dispatch = useDispatch()

    const {isModalOpen, openModal, closeModal} = useModal();

    const [price, setPrice] = React.useState(0);
    const [burgerBun, setBurgerBun] = React.useState(null);

    useEffect(() => {
        if (burgerData.length) {
            getOrderPrice();
            if (!burgerBun) {
                if (burgerData.find(ing => ing.type === 'bun')) {
                    setBurgerBun(burgerData.find(ing => ing.type === 'bun'))
                }
            }
        }
    }, [burgerData])


    function getOrderPrice() {
        let pr = 0;
        burgerData.map(item => {
            if (item.type === 'bun') {
                pr = pr + item.price;
            }
            pr = pr + item.price;
        })
        // pr = pr + burgerData[0].price;
        // pr = pr - burgerData[burgerData.length - 1].price;
        setPrice(pr);
    }

    function onDelete(uniqId) {
        dispatch({type: DELETE_INGREDIENT, payload: uniqId})
    }

    const modalShow =
        <Modal modalClose={closeModal}>
            <OrderDetails orderPrice={price}/>
        </Modal>;

    return (
        <div className={styles.table}>
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
                <ConstructorElement
                    type="top"
                    text={'Добавьте булку'}
                />}
            </div>
            <div className={`${styles.scroll_box} custom-scroll`}>
                {burgerData.map((burger) =>
                    burger.type !== 'bun' &&
                    <div key={burger.uniqId}>
                        <DragIcon/>
                        <ConstructorElement
                            text={burger.name}
                            thumbnail={burger.image}
                            price={burger.price}
                            isLocked={false}
                            handleClose={() => onDelete(burger.uniqId)}
                        />
                    </div>
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
                <ConstructorElement
                    type="bottom"
                    text={'Добавьте булку'}
                />}
            </div>
            <div className={`${styles.order} mt-10`}>

                <p className="text text_type_digits-medium mr-2">{price}</p>
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