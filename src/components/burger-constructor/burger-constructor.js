import React, {useEffect} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "../burger-constructor/burger-constructor.module.css"
import Modal from "../modal/modal"
import OrderDetails from "../modal/modal-content/order-details/order-details"

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
        setPrice(pr);
    }

    function handleOpenModal() {
        setVisible(true);
    }

    function handleCloseModal() {
        setVisible(false);
    }

    let modalShow =
        <Modal modalClose={handleCloseModal}>
            <OrderDetails orderPrice={price}/>
        </Modal>;

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
                {burgerData.map((burger, id) =>
                    burger.type !== 'bun' &&
                    <div key={id}>
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
                    text={burgerData[burgerData.length - 1].name + '(низ)'}
                    thumbnail={burgerData[burgerData.length - 1].image}
                    price={burgerData[burgerData.length - 1].price}
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

export default BurgerConstructor;