import React from 'react';
import {
    Tab,
    Counter,
    CurrencyIcon,
    ConstructorElement,
    DragIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import {burgerData} from "../../utils/data";
import styles from "../burger-constructor/burger-constructor.module.css"
import Modal from "../modal/modal"

function BurgerConstructor() {
    const [visible, setVisible] = React.useState(false);

    function handleOpenModal() {
        setVisible(true);
    }

    function handleCloseModal() {
        setVisible(false);
    }

    let modalEx;
    if (visible) {
        modalEx = <Modal modalClose={handleCloseModal}>
            <>
                <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="mb-30 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </>
        </Modal>
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div className={`${styles.scroll_box} custom-scroll`}>
                {burgerData.map((burger, id) =>
                    <div>
                        <DragIcon/>
                        <ConstructorElement
                            text={burger.name}
                            thumbnail={burger.image}
                            price={burger.price}
                            isLocked={true}
                        />
                    </div>
                )}
            </div>
            <div style={{display: 'flex'}}>
                <p className="text text_type_digits-default">610 <CurrencyIcon/></p>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>

            {/*<div style={{overflow: 'hidden'}}>*/}
            {/*<button onClick={handleOpenModal}>Открыть модальное окно</button>*/}
            {modalEx}
            {/*</div>*/}
        </div>
    )
}

export default BurgerConstructor;