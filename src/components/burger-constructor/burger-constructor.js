import React, {useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "../burger-constructor/burger-constructor.module.css"
import Modal from "../modal/modal"
import OrderDetails from "../modal/modal-content/order-details/order-details"
import PropTypes from "prop-types";

function BurgerConstructor({burgerData}) {
    const [visible, setVisible] = React.useState(false);
    const [price, setPrice] = React.useState(0);

    useEffect(() => {
        getOrderPrice();
    }, [burgerData])

    function getOrderPrice() {
        let pr = 0;
        burgerData.map(item => {
                pr = pr + item.price;
            }
        )
        pr = pr + burgerData[0].price;
        pr = pr - burgerData[burgerData.length -1].price;
        setPrice(pr);
    }

    function handleOpenModal() {
        setVisible(true);
    }

    function handleCloseModal() {
        setVisible(false);
    }

    const modalShow =
        <Modal modalClose={handleCloseModal}>
            <OrderDetails orderPrice={price}/>
        </Modal>;

    return (
        <div className={styles.table}>
            <div className="p-15"></div>
            <div className="ml-5">
                <ConstructorElement
                    type="top"
                    text={burgerData[0].name + '(вверх)'}
                    thumbnail={burgerData[0].image}
                    price={burgerData[0].price}
                    isLocked={true}
                />
            </div>
            <div className={`${styles.scroll_box} custom-scroll`}>
                {burgerData.map((burger) =>
                    burger.type !== 'bun' &&
                    <div key={burger._id}>
                        <DragIcon/>
                        <ConstructorElement
                            text={burger.name}
                            thumbnail={burger.image}
                            price={burger.price}
                            isLocked={false}
                        />
                    </div>
                )}
            </div>
            <div className="ml-5">
                <ConstructorElement
                    type="bottom"
                    text={burgerData[0].name + '(низ)'}
                    thumbnail={burgerData[0].image}
                    price={burgerData[0].price}
                    isLocked={true}
                />
            </div>
            <div className={`${styles.order} mt-10`}>

                <p className="text text_type_digits-medium mr-2">{price}</p>
                <div className={'mr-10'}>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
            {visible && modalShow}
        </div>
    )
}

BurgerConstructor.propTypes = {
    burgerData: PropTypes.array.isRequired
}
export default BurgerConstructor;