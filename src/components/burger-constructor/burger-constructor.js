import React from 'react';
import {
    Tab,
    Counter,
    CurrencyIcon,
    ConstructorElement,
    DragIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import {burgerData} from "../../utils/data";

function BurgerConstructor() {

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
            <div style={{display: 'flex'}}>
                <p className="text text_type_digits-default">610 <CurrencyIcon/></p>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;