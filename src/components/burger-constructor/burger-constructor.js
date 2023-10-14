import React, {useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "../burger-constructor/burger-constructor.module.css"
import Modal from "../modal/modal"
import OrderDetails from "../modal/modal-content/order-details/order-details"
import {useModal} from "../../hooks/use-modal";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_INGREDIENT} from "../../services/Ingredients/actions";

function BurgerConstructor() {
    const {burgerData} = useSelector(store => store.ingredients)

    const dispatch = useDispatch()

    const {isModalOpen, openModal, closeModal} = useModal();

    const [price, setPrice] = React.useState(0);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {

        if (burgerData.length) {
            setVisible(true);
            getOrderPrice();
        }
    }, [burgerData])

    function getOrderPrice() {
        let pr = 0;
        burgerData.map(item => {
                pr = pr + item.price;
            }
        )
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
                {burgerData.filter(ing => ing.type === 'bun').length &&
                <ConstructorElement
                    type="top"
                    // text={burgerData[0].name + '(вверх)'}
                    text={burgerData.filter(ing => ing.type === 'bun')[0].name + '(вверх)'}
                    thumbnail={burgerData.filter(ing => ing.type === 'bun')[0].image}
                    price={burgerData.filter(ing => ing.type === 'bun')[0].price}
                    isLocked={true}
                />}
                {!burgerData.find(ing => ing.type === 'bun') &&
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
            {/*<div className="ml-5">*/}
            {/*    {visible &&*/}
            {/*    <ConstructorElement*/}
            {/*        type="bottom"*/}
            {/*        text={burgerData[0].name + '(низ)'}*/}
            {/*        thumbnail={burgerData[0].image}*/}
            {/*        price={burgerData[0].price}*/}
            {/*        isLocked={true}*/}
            {/*    />}*/}
            {/*    {!visible &&*/}
            {/*    <ConstructorElement*/}
            {/*        type="bottom"*/}
            {/*        text={'Добавьте булку'}*/}
            {/*    />*/}
            {/*    }*/}
            {/*</div>*/}
            <div className="ml-5">
                {burgerData.filter(ing => ing.type === 'bun').length &&(
                <ConstructorElement
                    type="bottom"
                    // text={burgerData[0].name + '(вверх)'}
                    text={burgerData.filter(ing => ing.type === 'bun')[0].name + '(низ)'}
                    thumbnail={burgerData.filter(ing => ing.type === 'bun')[0].image}
                    price={burgerData.filter(ing => ing.type === 'bun')[0].price}
                    isLocked={true}
                />)}
                {!burgerData.find(ing => ing.type === 'bun') &&
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

// BurgerConstructor.propTypes = {
//     burgerData: PropTypes.array.isRequired
// }
export default BurgerConstructor;